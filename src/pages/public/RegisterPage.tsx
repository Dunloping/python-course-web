import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { COURSE_CONFIG } from '../../data/config'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { register, getSpotsRemaining } = useAuth()
  const navigate = useNavigate()
  const spots = getSpotsRemaining()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate age
    const ageNum = parseInt(age)
    if (isNaN(ageNum) || ageNum < COURSE_CONFIG.minAge || ageNum > COURSE_CONFIG.maxAge) {
      setError(`La edad debe ser entre ${COURSE_CONFIG.minAge} y ${COURSE_CONFIG.maxAge} años`)
      setIsLoading(false)
      return
    }

    const result = await register({ name, email, password, age: ageNum })

    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } else {
      setError(result.error || 'Error al registrarse')
    }
    
    setIsLoading(false)
  }

  if (spots === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-neon to-volt rounded-2xl flex items-center justify-center shadow-[0_0_30px_-6px_rgba(34,211,238,0.7)]">
              <span className="text-night-950 font-bold text-2xl font-mono">&gt;_</span>
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold text-slate-100">
            Cupos Agotados
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="card py-8 px-4 sm:px-10 text-center">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-slate-400 mb-6">
              Lo sentimos, todos los cupos del curso han sido ocupados.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              El curso tiene un máximo de {COURSE_CONFIG.maxParticipants} participantes.
            </p>
            <Link
              to="/"
              className="neon-btn"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-neon to-volt rounded-2xl flex items-center justify-center shadow-[0_0_30px_-6px_rgba(34,211,238,0.7)]">
              <span className="text-night-950 font-bold text-2xl font-mono">&gt;_</span>
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold text-slate-100">
            ¡Registro Exitoso!
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="card py-8 px-4 sm:px-10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-slate-400 mb-4">
              Tu cuenta ha sido creada correctamente.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Serás redirigido al inicio de sesión en unos segundos...
            </p>
            <Link
              to="/login"
              className="neon-btn"
            >
              Ir a Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    )
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
          Inscribirse al Curso
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium text-neon hover:text-neon-soft transition-colors">
            Inicia sesión
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-volt font-medium">
          {spots} cupo{spots !== 1 ? 's' : ''} disponible{spots !== 1 ? 's' : ''}
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
              <label htmlFor="name" className="field-label">
                Nombre Completo
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">Mínimo 6 caracteres</p>
            </div>

            <div>
              <label htmlFor="age" className="field-label">
                Edad
              </label>
              <div className="mt-1">
                <input
                  id="age"
                  name="age"
                  type="number"
                  min={COURSE_CONFIG.minAge}
                  max={COURSE_CONFIG.maxAge}
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                  placeholder={`${COURSE_CONFIG.minAge} - ${COURSE_CONFIG.maxAge} años`}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Edades permitidas: {COURSE_CONFIG.minAge} - {COURSE_CONFIG.maxAge} años
              </p>
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
                {isLoading ? 'Registrando...' : 'Inscribirse'}
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
