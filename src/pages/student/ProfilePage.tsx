import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../contexts/ProgressContext'

export default function ProfilePage() {
  const { currentUser, updateUser } = useAuth()
  const { getTotalProgress } = useProgress()
  const { lessonsCompleted, exercisesCompleted } = getTotalProgress()
  
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(currentUser?.name || '')
  const [success, setSuccess] = useState(false)

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-slate-100">Usuario no encontrado</h2>
        <Link to="/dashboard" className="text-neon hover:underline mt-4 block">
          Volver al dashboard
        </Link>
      </div>
    )
  }

  const handleSave = async () => {
    if (name.trim()) {
      await updateUser(currentUser.id, { name: name.trim() })
      setIsEditing(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-VE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="card p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Mi Perfil</h1>
            <p className="text-slate-400 mt-1">Gestiona tu información personal</p>
          </div>
          <Link
            to="/dashboard"
            className="text-slate-400 hover:text-neon transition-colors"
          >
            ← Volver al dashboard
          </Link>
        </div>
      </div>

      {success && (
        <div className="bg-volt/10 border border-volt/40 text-volt px-4 py-3 rounded-xl">
          Perfil actualizado correctamente
        </div>
      )}

      {/* Profile Info */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-100">Información Personal</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-neon hover:text-neon-soft font-medium transition-colors"
            >
              Editar
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <label className="field-label">
              Nombre Completo
            </label>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
            ) : (
              <p className="text-slate-200">{currentUser.name}</p>
            )}
          </div>

          <div>
            <label className="field-label">
              Correo Electrónico
            </label>
            <p className="text-slate-200">{currentUser.email}</p>
            <p className="text-xs text-slate-500 mt-1">No se puede cambiar</p>
          </div>

          {currentUser.age && (
            <div>
              <label className="field-label">
                Edad
              </label>
              <p className="text-slate-200">{currentUser.age} años</p>
            </div>
          )}

          <div>
            <label className="field-label">
              Rol
            </label>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
              currentUser.role === 'admin'
                ? 'chip-ghost'
                : 'chip-neon'
            }`}>
              {currentUser.role === 'admin' ? 'Administrador' : 'Estudiante'}
            </span>
          </div>

          {isEditing && (
            <div className="flex space-x-3 pt-4">
              <button
                onClick={handleSave}
                className="neon-btn"
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setName(currentUser.name)
                }}
                className="ghost-btn"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account Info */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-6">Información de la Cuenta</h2>
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-night-600/40">
            <span className="text-slate-400">Fecha de Registro:</span>
            <span className="font-medium text-slate-200">{formatDate(currentUser.createdAt)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-night-600/40">
            <span className="text-slate-400">Último Inicio de Sesión:</span>
            <span className="font-medium text-slate-200">{formatDate(currentUser.lastLogin)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-400">ID de Usuario:</span>
            <span className="font-medium text-slate-500 text-sm font-mono">{currentUser.id}</span>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-slate-100 mb-6">Resumen de Progreso</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center p-4 bg-night-900 border border-night-600/40 rounded-xl">
            <div className="text-3xl font-bold text-neon">{lessonsCompleted}</div>
            <div className="text-sm text-slate-400 mt-1">Temas Completados</div>
          </div>
          <div className="text-center p-4 bg-night-900 border border-night-600/40 rounded-xl">
            <div className="text-3xl font-bold text-volt">{exercisesCompleted}</div>
            <div className="text-sm text-slate-400 mt-1">Ejercicios Resueltos</div>
          </div>
        </div>
      </div>
    </div>
  )
}
