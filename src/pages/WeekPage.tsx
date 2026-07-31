import { useParams, Link } from 'react-router-dom'
import { useProgress } from '../contexts/ProgressContext'
import { lessons, weekInfo } from '../data/lessons'
import { exercises } from '../data/exercises'

export default function WeekPage() {
  const { weekNumber } = useParams<{ weekNumber: string }>()
  const week = parseInt(weekNumber || '1') as 1 | 2 | 3 | 4
  const { progress, getWeekProgress } = useProgress()
  
  const weekLessons = lessons.filter(l => l.week === week)
  const weekExercises = exercises.filter(e => e.week === week)
  const weekData = weekInfo.find(w => w.week === week)
  const weekProgress = getWeekProgress(week)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-blue-600">Inicio</Link>
          <span>/</span>
          <span className="text-gray-900">Semana {week}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Semana {week}: {weekData?.title}
        </h1>
        <p className="text-gray-600">{weekData?.description}</p>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Progreso de la semana</span>
            <span>{weekProgress.lessonsCompleted} temas · {weekProgress.exercisesCompleted} ejercicios</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${((weekProgress.lessonsCompleted + weekProgress.exercisesCompleted) / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Lessons section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Temas</h2>
        <div className="space-y-4">
          {weekLessons.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id)
            return (
              <Link
                key={lesson.id}
                to={`/lesson/${lesson.id}`}
                className={`block bg-white rounded-xl p-6 shadow-sm border transition-all hover:shadow-md ${
                  isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="font-semibold">{lesson.id}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                      {lesson.hasCodeExample && (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded mt-1">
                          Incluye código
                        </span>
                      )}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Exercises section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ejercicios Prácticos</h2>
        <div className="space-y-4">
          {weekExercises.map((exercise) => {
            const result = progress.exerciseResults[exercise.id]
            const isCompleted = result?.completed
            return (
              <Link
                key={exercise.id}
                to={`/exercise/${exercise.id}`}
                className={`block bg-white rounded-xl p-6 shadow-sm border transition-all hover:shadow-md ${
                  isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {isCompleted ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="font-semibold">{'>'}_</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exercise.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {result ? (
                      <div>
                        <div className={`text-sm font-medium ${result.completed ? 'text-green-600' : 'text-orange-600'}`}>
                          {result.completed ? 'Completado' : 'En progreso'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {result.attempts} intento{result.attempts > 1 ? 's' : ''}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Sin intentar</span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        {week > 1 && (
          <Link
            to={`/week/${week - 1}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Semana {week - 1}</span>
          </Link>
        )}
        {week < 4 && (
          <Link
            to={`/week/${week + 1}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 ml-auto"
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
