import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { COURSE_CONFIG } from '../../data/config'
import { lessons } from '../../data/lessons'
import { exercises } from '../../data/exercises'

export default function AdminDashboard() {
  const { users, getSpotsRemaining } = useAuth()
  
  const totalUsers = users.length
  const students = users.filter(u => u.role === 'student')
  const admins = users.filter(u => u.role === 'admin')
  const spots = getSpotsRemaining()
  
  // Calculate completion stats
  const totalLessonsCompleted = students.reduce((acc, s) => 
    acc + (s.progress?.completedLessons?.length || 0), 0
  )
  const avgLessonsCompleted = students.length > 0 
    ? Math.round(totalLessonsCompleted / students.length) 
    : 0
  
  const totalExercisesCompleted = students.reduce((acc, s) => 
    acc + Object.values(s.progress?.exerciseResults || {}).filter(r => r.completed).length, 0
  )
  const avgExercisesCompleted = students.length > 0 
    ? Math.round(totalExercisesCompleted / students.length) 
    : 0

  // Recent registrations (last 7 days)
  const recentUsers = users
    .filter(u => {
      const created = new Date(u.createdAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return created >= weekAgo
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Panel de Administración</h1>
        <p className="text-slate-400 mt-1">Gestiona el curso y los participantes</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Usuarios</p>
              <p className="text-3xl font-bold text-neon">{totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-neon/10 border border-neon/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Estudiantes</p>
              <p className="text-3xl font-bold text-volt">{students.length}</p>
            </div>
            <div className="w-12 h-12 bg-volt/10 border border-volt/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
          </div>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Cupos Disponibles</p>
              <p className={`text-3xl font-bold ${spots === 0 ? 'text-danger' : 'text-volt'}`}>
                {spots}/{COURSE_CONFIG.maxParticipants}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
              spots === 0 ? 'bg-danger/10 border-danger/30' : 'bg-volt/10 border-volt/30'
            }`}>
              <span className="text-2xl">{spots === 0 ? '🚫' : '✅'}</span>
            </div>
          </div>
          <div className="mt-4 progress-track h-2">
            <div
              className="progress-fill"
              style={{ width: `${((COURSE_CONFIG.maxParticipants - spots) / COURSE_CONFIG.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Administradores</p>
              <p className="text-3xl font-bold text-ghost-soft">{admins.length}</p>
            </div>
            <div className="w-12 h-12 bg-ghost/10 border border-ghost/30 rounded-full flex items-center justify-center">
              <span className="text-2xl">👑</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Progreso Promedio</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Temas completados (promedio)</span>
                <span className="font-medium text-slate-200">{avgLessonsCompleted}/{lessons.length}</span>
              </div>
              <div className="progress-track h-2">
                <div
                  className="progress-fill"
                  style={{ width: `${(avgLessonsCompleted / lessons.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Ejercicios resueltos (promedio)</span>
                <span className="font-medium text-slate-200">{avgExercisesCompleted}/{exercises.length}</span>
              </div>
              <div className="progress-track h-2">
                <div
                  className="progress-fill"
                  style={{ width: `${(avgExercisesCompleted / exercises.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-100 mb-4">Información del Curso</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-night-600/40">
              <span className="text-slate-400">Curso:</span>
              <span className="font-medium text-slate-200">Python de Cero a tu Primer Proyecto</span>
            </div>
            <div className="flex justify-between py-2 border-b border-night-600/40">
              <span className="text-slate-400">Inicio:</span>
              <span className="font-medium text-slate-200">1 de Agosto 2026</span>
            </div>
            <div className="flex justify-between py-2 border-b border-night-600/40">
              <span className="text-slate-400">Horario:</span>
              <span className="font-medium text-slate-200">Sáb 9:00 - 10:30 AM</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Duración:</span>
              <span className="font-medium text-slate-200">{COURSE_CONFIG.duration} semanas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/users"
          className="card card-hover p-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-neon/10 border border-neon/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Gestionar Usuarios</h3>
              <p className="text-sm text-slate-400">Crear, editar, eliminar</p>
            </div>
          </div>
        </Link>

        <Link
          to="/student"
          className="card card-hover p-6"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-ghost/10 border border-ghost/30 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🌐</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">Ver Sitio</h3>
              <p className="text-sm text-slate-400">Vista del estudiante</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Registrations */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-100">Registros Recientes</h2>
          <Link to="/admin/users" className="text-neon hover:text-neon-soft text-sm font-medium transition-colors">
            Ver todos →
          </Link>
        </div>

        {recentUsers.length === 0 ? (
          <p className="text-slate-500 text-center py-4">No hay registros recientes</p>
        ) : (
          <div className="space-y-3">
            {recentUsers.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 border-b border-night-600/40 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-night-700 border border-night-600/50 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-neon">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-slate-200">{user.name}</div>
                    <div className="text-sm text-slate-500">{user.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full border ${
                    user.role === 'admin'
                      ? 'bg-ghost/10 text-ghost-soft border-ghost/30'
                      : 'bg-neon/10 text-neon border-neon/30'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : 'Estudiante'}
                  </span>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(user.createdAt).toLocaleDateString('es-VE')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
