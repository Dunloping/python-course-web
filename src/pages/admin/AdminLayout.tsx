import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import type { ReactNode } from 'react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Usuarios', href: '/admin/users', icon: '👥' },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-night-950">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-night-900 border-r border-night-600/50 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-center h-16 border-b border-night-600/50">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-neon to-volt rounded-lg flex items-center justify-center shadow-[0_0_16px_-4px_rgba(34,211,238,0.7)]">
              <span className="text-night-950 font-bold text-lg font-mono">&gt;_</span>
            </div>
            <span className="text-lg font-bold text-slate-100">Admin</span>
          </Link>
        </div>

        <nav className="mt-6 px-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-all ${
                isActive(item.href)
                  ? 'bg-neon/10 text-neon border border-neon/30'
                  : 'text-slate-400 hover:bg-night-800 hover:text-slate-200'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-night-600/50">
          <Link
            to="/student"
            className="flex items-center px-4 py-2 text-slate-400 hover:bg-night-800 hover:text-slate-200 rounded-lg transition-colors"
          >
            <span className="mr-3">🏠</span>
            <span>Ver Sitio</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-night-900/90 backdrop-blur border-b border-night-600/50">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-slate-400 hover:bg-night-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center space-x-4 ml-auto">
              <div className="text-right">
                <div className="text-sm font-medium text-slate-100">{currentUser?.name}</div>
                <div className="text-xs text-slate-500">Administrador</div>
              </div>
              <div className="w-10 h-10 bg-neon/10 border border-neon/30 rounded-full flex items-center justify-center">
                <span className="text-neon font-semibold">
                  {currentUser?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-night-800 rounded-lg transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
