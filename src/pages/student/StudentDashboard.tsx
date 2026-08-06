import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../contexts/ProgressContext'
import { lessons } from '../../data/lessons'
import { exercises } from '../../data/exercises'
import { COURSE_CONFIG } from '../../data/config'
import { getNextClassInfo } from '../../lib/schedule'

export default function StudentDashboard() {
  const { currentUser } = useAuth()
  const { getWeekProgress, getTotalProgress } = useProgress()
  const { lessonsCompleted, exercisesCompleted } = getTotalProgress()
  const classInfo = getNextClassInfo()

  const currentWeek = classInfo.currentWeek

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden bg-night-900 border border-night-600/60 rounded-2xl p-8">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-neon/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-ghost/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10">
          <p className="text-neon font-mono text-sm mb-2">~$ python curso.py</p>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            ¡Hola, {currentUser?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-slate-400 text-lg mb-4">
            Bienvenido al curso de Python. ¡Vamos a programar algo grande!
          </p>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${
            classInfo.type === 'today'
              ? 'bg-volt/15 border-volt/40 text-volt'
              : classInfo.type === 'before' && classInfo.daysUntil <= 2
                ? 'bg-flame/15 border-flame/40 text-flame-soft'
                : 'bg-night-800 border-night-600/50 text-slate-300'
          }`}>
            {classInfo.type === 'today' ? '📚 ' : classInfo.type === 'before' && classInfo.daysUntil <= 2 ? '🔥 ' : '📅 '}
            {classInfo.message}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Semana Actual</p>
              <p className="text-3xl font-bold text-neon">{currentWeek}/{COURSE_CONFIG.duration}</p>
            </div>
            <div className="w-12 h-12 bg-neon/10 border border-neon/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Temas Completados</p>
              <p className="text-3xl font-bold text-volt">{lessonsCompleted}/{lessons.length}</p>
            </div>
            <div className="w-12 h-12 bg-volt/10 border border-volt/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
          <div className="mt-4 progress-track h-2">
            <div
              className="progress-fill"
              style={{ width: `${(lessonsCompleted / lessons.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Ejercicios Resueltos</p>
              <p className="text-3xl font-bold text-ghost-soft">{exercisesCompleted}/{exercises.length}</p>
            </div>
            <div className="w-12 h-12 bg-ghost/10 border border-ghost/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
          <div className="mt-4 progress-track h-2">
            <div
              className="progress-fill"
              style={{ width: `${(exercisesCompleted / exercises.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/student/week/1"
          className="card card-hover p-6 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-neon/10 border border-neon/30 rounded-lg flex items-center justify-center group-hover:shadow-[0_0_16px_-4px_rgba(34,211,238,0.7)] transition-shadow">
              <span className="text-2xl">📖</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Ir a Lecciones</h3>
              <p className="text-sm text-slate-400">Continúa donde lo dejaste</p>
            </div>
          </div>
        </Link>

        <Link
          to="/student/week/1"
          className="card card-hover p-6 group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-volt/10 border border-volt/30 rounded-lg flex items-center justify-center group-hover:shadow-[0_0_16px_-4px_rgba(52,211,153,0.7)] transition-shadow">
              <span className="text-2xl">💻</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Practicar Ejercicios</h3>
              <p className="text-sm text-slate-400">Escribe código Python real</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Weekly Progress */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-4">Progreso por Semana</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((week) => {
            const progress = getWeekProgress(week)
            const isCurrentWeek = week === currentWeek
            const isPast = week < currentWeek

            return (
              <div
                key={week}
                className={`p-4 rounded-xl border transition-colors ${
                  isCurrentWeek
                    ? 'border-neon/50 bg-neon/10'
                    : isPast
                      ? 'border-volt/30 bg-volt/5'
                      : 'border-night-600/50 bg-night-900/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      isCurrentWeek
                        ? 'bg-neon text-night-950 shadow-[0_0_14px_-2px_rgba(34,211,238,0.8)]'
                        : isPast
                          ? 'bg-volt text-night-950'
                          : 'bg-night-600 text-slate-400'
                    }`}>
                      {week}
                    </div>
                    <div>
                      <span className="font-medium text-slate-200">Semana {week}</span>
                      {isCurrentWeek && (
                        <span className="ml-2 chip-neon">Actual</span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-slate-400">
                    {progress.lessonsCompleted} temas · {progress.exercisesCompleted} ejercicios
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Course Info */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-4">Información del Curso</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-slate-500">Inicio</p>
            <p className="font-medium text-slate-200">1 de Agosto 2026</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Horario</p>
            <p className="font-medium text-slate-200">Sáb 9:00 - 10:30</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Lugar</p>
            <p className="font-medium text-slate-200">Biblioteca María Calcaño</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Estado</p>
            <p className="font-medium text-volt">● Activo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
