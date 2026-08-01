import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../contexts/ProgressContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { isAuthenticated, currentUser, logout } = useAuth()
  const { getTotalProgress } = useProgress()
  const { lessonsCompleted, exercisesCompleted, totalLessons, totalExercises } = getTotalProgress()

  return (
    <div className="min-h-screen bg-night-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-night-900/80 backdrop-blur border-b border-night-600/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/student" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-neon to-volt rounded-lg flex items-center justify-center shadow-[0_0_20px_-4px_rgba(34,211,238,0.6)] group-hover:shadow-[0_0_26px_-4px_rgba(34,211,238,0.9)] transition-shadow">
                <span className="text-night-950 font-bold text-xl font-mono">&gt;_</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-100">Python Course</h1>
                <p className="text-xs text-slate-500">Biblioteca María Calcaño</p>
              </div>
            </Link>

            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-neon'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Inicio
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === '/dashboard'
                        ? 'text-neon'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Mi Progreso
                  </Link>

                  {currentUser?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className={`text-sm font-medium transition-colors ${
                        location.pathname.startsWith('/admin')
                          ? 'text-ghost-soft'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Admin
                    </Link>
                  )}

                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <span className="w-2 h-2 bg-volt rounded-full shadow-[0_0_8px_rgba(52,211,153,0.9)]"></span>
                    <span><span className="text-neon font-semibold">{lessonsCompleted}</span>/{totalLessons} temas</span>
                    <span className="text-night-600">|</span>
                    <span><span className="text-volt font-semibold">{exercisesCompleted}</span>/{totalExercises} ejercicios</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-slate-300">
                      {currentUser?.name}
                    </span>
                    <button
                      onClick={logout}
                      className="text-sm font-medium text-danger hover:text-red-400 transition-colors"
                    >
                      Salir
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === '/login'
                        ? 'text-neon'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      location.pathname === '/register'
                        ? 'bg-neon text-night-950 shadow-[0_0_20px_-4px_rgba(34,211,238,0.7)]'
                        : 'bg-neon text-night-950 hover:bg-neon-soft hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.7)]'
                    }`}
                  >
                    Inscribirme
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-night-900/80 border-t border-night-600/60 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-slate-500">
            <p>Proyecto de Servicio Comunitario 2026-2N</p>
            <p>Instituto Universitario de Tecnología READIC UNIR</p>
            <p className="mt-2">Biblioteca del Estado Zulia María Calcaño — Santa Lucía, Maracaibo</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
