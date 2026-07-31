import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { lessons } from '../data/lessons'
import { exercises } from '../data/exercises'

interface ExerciseResult {
  score: number
  attempts: number
  completed: boolean
}

interface UserProgress {
  completedLessons: string[]
  exerciseResults: Record<string, ExerciseResult>
  currentWeek: number
  lastAccessed: string
}

interface ProgressContextType {
  progress: UserProgress
  completeLesson: (lessonId: string) => void
  completeExercise: (exerciseId: string, score: number) => void
  setCurrentWeek: (week: number) => void
  getWeekProgress: (week: number) => { lessonsCompleted: number; exercisesCompleted: number }
  getTotalProgress: () => { lessonsCompleted: number; exercisesCompleted: number; totalLessons: number; totalExercises: number }
}

const defaultProgress: UserProgress = {
  completedLessons: [],
  exerciseResults: {},
  currentWeek: 1,
  lastAccessed: new Date().toISOString(),
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('python-course-progress')
    if (saved) {
      return JSON.parse(saved)
    }
    return defaultProgress
  })

  useEffect(() => {
    localStorage.setItem('python-course-progress', JSON.stringify(progress))
  }, [progress])

  const completeLesson = (lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId],
      lastAccessed: new Date().toISOString(),
    }))
  }

  const completeExercise = (exerciseId: string, score: number) => {
    setProgress(prev => ({
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
    }))
  }

  const setCurrentWeek = (week: number) => {
    setProgress(prev => ({
      ...prev,
      currentWeek: week,
    }))
  }

  const getWeekProgress = (week: number) => {
    const weekLessons = lessons.filter(l => l.week === week)
    const weekExercises = exercises.filter(e => e.week === week)
    const lessonsCompleted = weekLessons.filter(l => progress.completedLessons.includes(l.id)).length
    const exercisesCompleted = weekExercises.filter(e => progress.exerciseResults[e.id]?.completed).length
    return { lessonsCompleted, exercisesCompleted }
  }

  const getTotalProgress = () => {
    const totalLessons = 26
    const totalExercises = 18
    return {
      lessonsCompleted: progress.completedLessons.length,
      exercisesCompleted: Object.values(progress.exerciseResults).filter(r => r.completed).length,
      totalLessons,
      totalExercises,
    }
  }

  return (
    <ProgressContext.Provider value={{
      progress,
      completeLesson,
      completeExercise,
      setCurrentWeek,
      getWeekProgress,
      getTotalProgress,
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
