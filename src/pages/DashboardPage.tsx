import { Link } from 'react-router-dom'
import { useProgress } from '../contexts/ProgressContext'
import { lessons, weekInfo } from '../data/lessons'
import { exercises } from '../data/exercises'

export default function DashboardPage() {
  const { progress, getWeekProgress, getTotalProgress } = useProgress()
  const { lessonsCompleted, exercisesCompleted } = getTotalProgress()

  const totalLessons = 26
  const totalExercises = 18
  const overallProgress = Math.round(((lessonsCompleted + exercisesCompleted) / (totalLessons + totalExercises)) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Mi Progreso</h1>
        <p className="text-gray-600 mt-2">Seguí tu avance en el curso de Python</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Progreso General</p>
              <p className="text-3xl font-bold text-gray-900">{overallProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Temas Completados</p>
              <p className="text-3xl font-bold text-gray-900">{lessonsCompleted}/{totalLessons}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full transition-all"
                style={{ width: `${(lessonsCompleted / totalLessons) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Ejercicios Resueltos</p>
              <p className="text-3xl font-bold text-gray-900">{exercisesCompleted}/{totalExercises}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-purple-600 h-3 rounded-full transition-all"
                style={{ width: `${(exercisesCompleted / totalExercises) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Último Acceso</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date(progress.lastAccessed).toLocaleDateString('es-VE')}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly progress */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Progreso por Semana</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weekInfo.map((week) => {
            const weekProgress = getWeekProgress(week.week)
            const weekLessons = lessons.filter(l => l.week === week.week)
            const weekExercises = exercises.filter(e => e.week === week.week)
            const weekTotal = weekLessons.length + weekExercises.length
            const weekCompleted = weekProgress.lessonsCompleted + weekProgress.exercisesCompleted
            const weekPercent = Math.round((weekCompleted / weekTotal) * 100)

            return (
              <Link
                key={week.week}
                to={`/week/${week.week}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-2">
                      Semana {week.week}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{week.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{weekPercent}%</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Temas</span>
                      <span>{weekProgress.lessonsCompleted}/{weekLessons.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(weekProgress.lessonsCompleted / weekLessons.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Ejercicios</span>
                      <span>{weekProgress.exercisesCompleted}/{weekExercises.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(weekProgress.exercisesCompleted / weekExercises.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Detailed progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Detalle de Temas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tema
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Semana
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lessons.map((lesson) => {
                const isCompleted = progress.completedLessons.includes(lesson.id)
                return (
                  <tr key={lesson.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
                      <div className="text-sm text-gray-500">Tema {lesson.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        Semana {lesson.week}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isCompleted ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Pendiente
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/lesson/${lesson.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        {isCompleted ? 'Revisar' : 'Estudiar'}
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reset progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Zona de Peligro</h2>
        <p className="text-gray-600 mb-4">
          Si necesitás reiniciar tu progreso, podés borrar todos los datos guardados.
        </p>
        <button
          onClick={() => {
            if (confirm('¿Estás seguro de que querés borrar todo tu progreso? Esta acción no se puede deshacer.')) {
              localStorage.removeItem('python-course-progress')
              window.location.reload()
            }
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Borrar Progreso
        </button>
      </div>
    </div>
  )
}
