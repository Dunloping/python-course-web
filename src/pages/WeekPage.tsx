import { useParams, Link } from 'react-router-dom'
import { useProgress } from '../contexts/ProgressContext'
import { lessons, weekInfo } from '../data/lessons'
import { exercises } from '../data/exercises'

export default function WeekPage() {
  const { weekNumber } = useParams<{ weekNumber: string }>()
  const week = parseInt(weekNumber || '1') as 1 | 2 | 3 | 4
  const { progress, getWeekProgress, isLessonUnlocked, isExerciseUnlocked } = useProgress()
  
  const weekLessons = lessons.filter(l => l.week === week)
  const weekExercises = exercises.filter(e => e.week === week)
  const weekData = weekInfo.find(w => w.week === week)
  const weekProgress = getWeekProgress(week)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-sm text-slate-500 mb-4">
            <Link to="/student" className="hover:text-neon transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-slate-300">Semana {week}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            <span className="text-neon font-mono">Semana {week}:</span> {weekData?.title}
          </h1>
          <p className="text-slate-400">{weekData?.description}</p>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
              <span>Progreso de la semana</span>
              <span className="font-mono"><span className="text-neon">{weekProgress.lessonsCompleted}</span> temas · <span className="text-volt">{weekProgress.exercisesCompleted}</span> ejercicios</span>
            </div>
            <div className="progress-track h-3">
              <div
                className="progress-fill"
                style={{ width: `${(weekLessons.length + weekExercises.length) > 0 ? ((weekProgress.lessonsCompleted + weekProgress.exercisesCompleted) / (weekLessons.length + weekExercises.length)) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-6">
          Temas <span className="text-neon">▸</span>
        </h2>
        <div className="space-y-4">
          {weekLessons.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id)
            const isUnlocked = isLessonUnlocked(lesson.id)
            const inner = (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    isCompleted
                      ? 'bg-volt/10 border-volt/40 text-volt shadow-[0_0_12px_-2px_rgba(52,211,153,0.6)]'
                      : isUnlocked
                        ? 'bg-neon/10 border-neon/40 text-neon'
                        : 'bg-night-900 border-night-600/50 text-slate-500'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isUnlocked ? (
                      <span className="font-bold font-mono">{lesson.id.split('.')[1]}</span>
                    ) : (
                      <span className="text-base">🔒</span>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${isUnlocked ? 'text-slate-100' : 'text-slate-500'}`}>{lesson.title}</h3>
                    {lesson.hasCodeExample && isUnlocked && (
                      <span className="chip-neon mt-1">
                        <span className="font-mono">&lt;/&gt;</span> Incluye código
                      </span>
                    )}
                    {!isUnlocked && (
                      <p className="text-xs text-slate-500 mt-1">Completá el tema anterior para desbloquear</p>
                    )}
                  </div>
                </div>
                {isUnlocked ? (
                  <svg className="w-5 h-5 text-neon/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                ) : (
                  <span className="text-slate-500">🔒</span>
                )}
              </div>
            )
            if (!isUnlocked) {
              return (
                <div key={lesson.id} className="block bg-night-900/60 rounded-2xl p-6 border border-night-600/40 cursor-not-allowed opacity-70">
                  {inner}
                </div>
              )
            }
            return (
              <Link
                key={lesson.id}
                to={`/student/lesson/${lesson.id}`}
                className={`card card-hover block p-6 ${
                  isCompleted ? 'border-volt/40 bg-volt/5' : ''
                }`}
              >
                {inner}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Exercises section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-6">
          Ejercicios Prácticos <span className="text-volt">▸</span>
        </h2>
        <div className="space-y-4">
          {weekExercises.map((exercise) => {
            const result = progress.exerciseResults[exercise.id]
            const isCompleted = result?.completed
            const isUnlocked = isExerciseUnlocked(exercise.id)
            const inner = (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border font-mono ${
                    isCompleted
                      ? 'bg-volt/10 border-volt/40 text-volt shadow-[0_0_12px_-2px_rgba(52,211,153,0.6)]'
                      : isUnlocked
                        ? 'bg-flame/10 border-flame/40 text-flame-soft'
                        : 'bg-night-900 border-night-600/50 text-slate-500'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : isUnlocked ? (
                      <span className="font-semibold">{'>'}_</span>
                    ) : (
                      <span className="text-base">🔒</span>
                    )}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${isUnlocked ? 'text-slate-100' : 'text-slate-500'}`}>{exercise.title}</h3>
                    {isUnlocked && <p className="text-sm text-slate-400 mt-1">{exercise.description}</p>}
                    {!isUnlocked && (
                      <p className="text-xs text-slate-500 mt-1">Completá el tema {exercise.lessonId} para desbloquear</p>
                    )}
                  </div>
                </div>
                {isUnlocked ? (
                  <div className="text-right">
                    {result ? (
                      <div>
                        <div className={`text-sm font-medium ${result.completed ? 'text-volt' : 'text-flame-soft'}`}>
                          {result.completed ? 'Completado' : 'En progreso'}
                        </div>
                        <div className="text-xs text-slate-500">
                          {result.attempts} intento{result.attempts > 1 ? 's' : ''}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500">Sin intentar</span>
                    )}
                  </div>
                ) : (
                  <span className="text-slate-500">🔒</span>
                )}
              </div>
            )
            if (!isUnlocked) {
              return (
                <div key={exercise.id} className="block bg-night-900/60 rounded-2xl p-6 border border-night-600/40 cursor-not-allowed opacity-70">
                  {inner}
                </div>
              )
            }
            return (
              <Link
                key={exercise.id}
                to={`/student/exercise/${exercise.id}`}
                className={`card card-hover block p-6 ${
                  isCompleted ? 'border-volt/40 bg-volt/5' : ''
                }`}
              >
                {inner}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        {week > 1 && (
          <Link
            to={`/student/week/${week - 1}`}
            className="flex items-center space-x-2 text-slate-400 hover:text-neon transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Semana {week - 1}</span>
          </Link>
        )}
        {week < 4 && (
          <Link
            to={`/student/week/${week + 1}`}
            className="flex items-center space-x-2 text-slate-400 hover:text-neon transition-colors ml-auto"
          >
            <span>Semana {week + 1}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
