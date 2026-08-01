import { Link } from 'react-router-dom'
import { useProgress } from '../contexts/ProgressContext'
import { lessons, weekInfo } from '../data/lessons'
import { exercises } from '../data/exercises'

export default function DashboardPage() {
  const { progress, getWeekProgress, getTotalProgress, resetProgress } = useProgress()
  const { lessonsCompleted, exercisesCompleted } = getTotalProgress()

  const totalLessons = lessons.length
  const totalExercises = exercises.length
  const overallProgress = Math.round(((lessonsCompleted + exercisesCompleted) / (totalLessons + totalExercises)) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-ghost/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-100">Mi Progreso</h1>
          <p className="text-slate-400 mt-2">Seguí tu avance en el curso de Python</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Progreso General</p>
              <p className="text-3xl font-bold text-neon">{overallProgress}%</p>
            </div>
            <div className="w-12 h-12 bg-neon/10 border border-neon/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
          <div className="mt-4 progress-track h-3">
            <div
              className="progress-fill"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Temas Completados</p>
              <p className="text-3xl font-bold text-volt">{lessonsCompleted}/{totalLessons}</p>
            </div>
            <div className="w-12 h-12 bg-volt/10 border border-volt/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
          <div className="mt-4 progress-track h-3">
            <div
              className="progress-fill"
              style={{ width: `${(lessonsCompleted / totalLessons) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Ejercicios Resueltos</p>
              <p className="text-3xl font-bold text-ghost-soft">{exercisesCompleted}/{totalExercises}</p>
            </div>
            <div className="w-12 h-12 bg-ghost/10 border border-ghost/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <div className="mt-4 progress-track h-3">
            <div
              className="progress-fill"
              style={{ width: `${(exercisesCompleted / totalExercises) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Último Acceso</p>
              <p className="text-lg font-semibold text-slate-200">
                {new Date(progress.lastAccessed).toLocaleDateString('es-VE')}
              </p>
            </div>
            <div className="w-12 h-12 bg-flame/10 border border-flame/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly progress */}
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-6">
          Progreso por Semana <span className="text-neon">▸</span>
        </h2>
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
                to={`/student/week/${week.week}`}
                className="card card-hover p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="chip-neon mb-2">
                      Semana {week.week}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-100">{week.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-neon">{weekPercent}%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
                      <span>Temas</span>
                      <span className="font-mono">{weekProgress.lessonsCompleted}/{weekLessons.length}</span>
                    </div>
                    <div className="progress-track h-2">
                      <div
                        className="progress-fill"
                        style={{ width: `${(weekProgress.lessonsCompleted / weekLessons.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
                      <span>Ejercicios</span>
                      <span className="font-mono">{weekProgress.exercisesCompleted}/{weekExercises.length}</span>
                    </div>
                    <div className="progress-track h-2">
                      <div
                        className="progress-fill"
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
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-6">Detalle de Temas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-night-600/50">
            <thead className="bg-night-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">
                  Tema
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">
                  Semana
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-night-800/50 divide-y divide-night-600/40">
              {lessons.map((lesson) => {
                const isCompleted = progress.completedLessons.includes(lesson.id)
                return (
                  <tr key={lesson.id} className="hover:bg-night-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-100">{lesson.title}</div>
                      <div className="text-sm text-slate-500">Tema {lesson.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="chip-neon">Semana {lesson.week}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isCompleted ? (
                        <span className="chip-volt">Completado</span>
                      ) : (
                        <span className="chip-muted">Pendiente</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        to={`/student/lesson/${lesson.id}`}
                        className="text-neon hover:text-neon-soft font-medium transition-colors"
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
      <div className="card p-6 border-danger/40">
        <h2 className="text-xl font-semibold text-danger mb-4">Zona de Peligro</h2>
        <p className="text-slate-400 mb-4">
          Si necesitás reiniciar tu progreso, podés borrar todos los datos guardados.
        </p>
        <button
          onClick={() => {
            if (confirm('¿Estás seguro de que querés borrar todo tu progreso? Esta acción no se puede deshacer.')) {
              resetProgress()
              window.location.reload()
            }
          }}
          className="px-4 py-2 bg-danger/20 text-danger rounded-lg font-medium border border-danger/40 hover:bg-danger/30 transition-colors"
        >
          Borrar Progreso
        </button>
      </div>
    </div>
  )
}
