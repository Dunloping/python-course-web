import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { COURSE_CONFIG } from '../../data/config'
import type { User } from '../../types/user'

interface UserFormModalProps {
  user: User | null
  onClose: () => void
}

export default function UserFormModal({ user, onClose }: UserFormModalProps) {
  const { updateUser, addUser, getSpotsRemaining, users } = useAuth()
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [role, setRole] = useState<'admin' | 'student'>('student')
  const [error, setError] = useState('')

  const isEditing = user !== null
  const spots = getSpotsRemaining()

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAge(user.age?.toString() || '')
      setRole(user.role)
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!name.trim()) {
      setError('El nombre es requerido')
      return
    }

    if (!email.trim()) {
      setError('El email es requerido')
      return
    }

    // Check email uniqueness (only for new users or changed email)
    if (!isEditing || email !== user?.email) {
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        setError('El email ya está registrado')
        return
      }
    }

    if (!isEditing && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (isEditing && password && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (role === 'student') {
      const ageNum = parseInt(age)
      if (isNaN(ageNum) || ageNum < COURSE_CONFIG.minAge || ageNum > COURSE_CONFIG.maxAge) {
        setError(`La edad debe ser entre ${COURSE_CONFIG.minAge} y ${COURSE_CONFIG.maxAge} años`)
        return
      }

      // Check capacity for new students
      if (!isEditing && spots === 0) {
        setError('No hay cupos disponibles')
        return
      }
    }

    // Save user
    if (isEditing && user) {
      const updates: Partial<User> = {
        name: name.trim(),
      }

      if (email.toLowerCase().trim() !== user.email) {
        updates.email = email.toLowerCase().trim()
      }

      if (role !== user.role) {
        updates.role = role
      }

      if (age && role === 'student') {
        updates.age = parseInt(age)
      }

      if (password) {
        updates.password = password
      }

      const ok = await updateUser(user.id, updates)
      if (!ok) {
        setError('No se pudo actualizar el usuario')
        return
      }
    } else {
      const created = await addUser({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        age: role === 'student' ? parseInt(age) : undefined,
        role,
      })

      if (!created) {
        setError('No se pudo crear el usuario')
        return
      }
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="card p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-100">
            {isEditing ? 'Editar Usuario' : 'Crear Usuario'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-danger/10 border border-danger/40 text-danger px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="field-label">
              Nombre Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Nombre del usuario"
            />
          </div>

          <div>
            <label className="field-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="usuario@email.com"
            />
          </div>

          <div>
            <label className="field-label">
              Contraseña {isEditing && '(dejar vacío para mantener)'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder={isEditing ? '••••••••' : 'Mínimo 6 caracteres'}
            />
          </div>

          <div>
            <label className="field-label">
              Rol
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'student')}
              className="input"
            >
              <option value="student" className="bg-night-900">Estudiante</option>
              <option value="admin" className="bg-night-900">Administrador</option>
            </select>
          </div>

          {role === 'student' && (
            <div>
              <label className="field-label">
                Edad
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min={COURSE_CONFIG.minAge}
                max={COURSE_CONFIG.maxAge}
                className="input"
                placeholder={`${COURSE_CONFIG.minAge} - ${COURSE_CONFIG.maxAge} años`}
              />
              <p className="text-xs text-slate-500 mt-1">
                Edades permitidas: {COURSE_CONFIG.minAge} - {COURSE_CONFIG.maxAge} años
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="ghost-btn"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="neon-btn"
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
