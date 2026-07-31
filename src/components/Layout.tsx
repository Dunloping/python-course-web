import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useProgress } from '../contexts/ProgressContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { getTotalProgress } = useProgress()
  const { lessonsCompleted, exercisesCompleted } = getTotalProgress()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Py</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Python Course</h1>
                <p className="text-xs text-gray-500">Biblioteca María Calcaño</p>
              </div>
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className={`text-sm font-medium ${
                  location.pathname === '/'
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Inicio
              </Link>
              <Link
                to="/dashboard"
                className={`text-sm font-medium ${
                  location.pathname === '/dashboard'
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Mi Progreso
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{lessonsCompleted}/26 temas</span>
                <span className="text-gray-300">|</span>
                <span>{exercisesCompleted}/18 ejercicios</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>Proyecto de Servicio Comunitario 2026-2N</p>
            <p>Instituto Universitario de Tecnología READIC UNIR</p>
            <p className="mt-2">Biblioteca del Estado Zulia María Calcaño — Santa Lucía, Maracaibo</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
