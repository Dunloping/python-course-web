import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { lessons } from '../data/lessons'
import { exercises } from '../data/exercises'
import type { UserProgress } from '../types/user'
import { useAuth } from './AuthContext'
import { api } from '../lib/api'

interface ProgressContextType {
  progress: UserProgress
  isLoading: boolean
  completeLesson: (lessonId: string) => void
  completeExercise: (exerciseId: string, score: number) => void
  setCurrentWeek: (week: number) => void
  resetProgress: () => void
  getWeekProgress: (week: number) => { lessonsCompleted: number; exercisesCompleted: number }
  getTotalProgress: () => { lessonsCompleted: number; exercisesCompleted: number; totalLessons: number; totalExercises: number }
  isWeekUnlocked: (week: number) => boolean
  isLessonUnlocked: (lessonId: string) => boolean
  isExerciseUnlocked: (exerciseId: string) => boolean
}

const defaultProgress: UserProgress = {
  completedLessons: [],
  exerciseResults: {},
  currentWeek: 1,
  lastAccessed: new Date().toISOString(),
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth()
  const [progress, setProgress] = useState<UserProgress>(defaultProgress)
  const [isLoading, setIsLoading] = useState(true)
  const saveTimer = useRef<number | null>(null)
  const progressRef = useRef(progress)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  const persist = useCallback(() => {
    if (!currentUser) return
    if (saveTimer.current) window.clearTimeout(saveTimer.current)
    saveTimer.current = window.setTimeout(async () => {
      try {
        await api.put('/progress', progressRef.current)
      } catch {
        // Reintenta en la próxima mutación
      }
    }, 600)
  }, [currentUser])

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setProgress(defaultProgress)

    if (!currentUser) {
      setIsLoading(false)
      return
    }

    api
      .get<{ progress: UserProgress }>('/progress')
      .then(({ progress: p }) => {
        if (!cancelled) setProgress(p)
      })
      .catch(() => {
        if (!cancelled) setProgress(defaultProgress)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [currentUser?.id])

  useEffect(() => {
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current)
    }
  }, [])

  const completeLesson = (lessonId: string) => {
    setProgress((prev) => {
      const next: UserProgress = {
        ...prev,
        completedLessons: prev.completedLessons.includes(lessonId)
          ? prev.completedLessons
          : [...prev.completedLessons, lessonId],
        lastAccessed: new Date().toISOString(),
      }
      return next
    })
    persist()
  }

  const completeExercise = (exerciseId: string, score: number) => {
    setProgress((prev) => {
      const next: UserProgress = {
        ...prev,
        exerciseResults: {
          ...prev.exerciseResults,
          [exerciseId]: {
            score,
            attempts: (prev.exerciseResults[exerciseId]?.attempts || 0) + 1,
            completed: score >= 80,
          },
        },
        lastAccessed: new Date().toISOString(),
      }
      return next
    })
    persist()
  }

  const setCurrentWeek = (week: number) => {
    setProgress((prev) => ({ ...prev, currentWeek: week }))
    persist()
  }

  const resetProgress = () => {
    setProgress(defaultProgress)
    if (currentUser) {
      api.put('/progress', defaultProgress).catch(() => {})
    }
  }

  const getWeekProgress = (week: number) => {
    const weekLessons = lessons.filter((l) => l.week === week)
    const weekExercises = exercises.filter((e) => e.week === week)
    const lessonsCompleted = weekLessons.filter((l) => progress.completedLessons.includes(l.id)).length
    const exercisesCompleted = weekExercises.filter((e) => progress.exerciseResults[e.id]?.completed).length
    return { lessonsCompleted, exercisesCompleted }
  }

  const getTotalProgress = () => {
    return {
      lessonsCompleted: progress.completedLessons.length,
      exercisesCompleted: Object.values(progress.exerciseResults).filter((r) => r.completed).length,
      totalLessons: lessons.length,
      totalExercises: exercises.length,
    }
  }

  const isWeekUnlocked = (_week: number): boolean => {
    return true
  }

  const isLessonUnlocked = (_lessonId: string): boolean => {
    return true
  }

  const isExerciseUnlocked = (_exerciseId: string): boolean => {
    return true
  }

  return (
    <ProgressContext.Provider value={{
      progress,
      isLoading,
      completeLesson,
      completeExercise,
      setCurrentWeek,
      resetProgress,
      getWeekProgress,
      getTotalProgress,
      isWeekUnlocked,
      isLessonUnlocked,
      isExerciseUnlocked,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
