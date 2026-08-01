import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)

    if (result.success) {
      // El router redirige a /admin si el usuario es administrador
      navigate('/dashboard')
    } else {
      setError(result.error || 'Error al iniciar sesión')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-neon to-volt rounded-2xl flex items-center justify-center shadow-[0_0_30px_-6px_rgba(34,211,238,0.7)]">
            <span className="text-night-950 font-bold text-2xl font-mono">&gt;_</span>
          </div>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-slate-100">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="font-medium text-neon hover:text-neon-soft transition-colors">
            Inscríbete aquí
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card py-8 px-4 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-danger/10 border border-danger/40 text-danger px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="field-label">
                Correo Electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="field-label">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 rounded-lg text-sm font-semibold text-night-950 transition-all ${
                  isLoading
                    ? 'bg-neon/40 cursor-not-allowed'
                    : 'bg-neon hover:bg-neon-soft hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.7)]'
                }`}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-night-600/60" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-night-800 text-slate-500">O</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-slate-400 hover:text-neon transition-colors">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
