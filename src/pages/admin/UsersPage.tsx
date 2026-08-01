import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import UserFormModal from '../../components/admin/UserFormModal'
import type { User } from '../../types/user'

export default function UsersPage() {
  const { users, deleteUser, promoteToAdmin, currentUser } = useAuth()
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'student'>('all')
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [promoteConfirm, setPromoteConfirm] = useState<string | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleDelete = async (id: string) => {
    await deleteUser(id)
    setDeleteConfirm(null)
  }

  const handlePromote = async (id: string) => {
    await promoteToAdmin(id)
    setPromoteConfirm(null)
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setShowModal(true)
  }

  const handleCreate = () => {
    setEditingUser(null)
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Gestión de Usuarios</h1>
          <p className="text-slate-400 mt-1">{users.length} usuarios registrados</p>
        </div>
        <button
          onClick={handleCreate}
          className="neon-btn"
        >
          + Crear Usuario
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as 'all' | 'admin' | 'student')}
              className="input"
            >
              <option value="all" className="bg-night-900">Todos los roles</option>
              <option value="admin" className="bg-night-900">Administradores</option>
              <option value="student" className="bg-night-900">Estudiantes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-night-600/50">
            <thead className="bg-night-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">
                  Edad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">
                  Registro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neon uppercase tracking-wider">
                  Último Inicio
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neon uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-night-800/50 divide-y divide-night-600/40">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-night-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-night-700 border border-night-600/50 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-neon">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-100">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full border ${
                      user.role === 'admin'
                        ? 'bg-ghost/10 text-ghost-soft border-ghost/30'
                        : 'bg-neon/10 text-neon border-neon/30'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : 'Estudiante'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {user.age ? `${user.age} años` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString('es-VE')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(user.lastLogin).toLocaleDateString('es-VE')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-neon hover:text-neon-soft px-2 py-1 transition-colors"
                      >
                        Editar
                      </button>
                      {user.id !== currentUser?.id && user.id !== 'admin-main-001' && (
                        <>
                          {user.role === 'student' && (
                            <button
                              onClick={() => setPromoteConfirm(user.id)}
                              className="text-ghost-soft hover:text-ghost px-2 py-1 transition-colors"
                            >
                              Promover
                            </button>
                          )}
                          <button
                            onClick={() => setDeleteConfirm(user.id)}
                            className="text-danger hover:text-red-400 px-2 py-1 transition-colors"
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No se encontraron usuarios</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="card p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Confirmar Eliminación</h3>
            <p className="text-slate-400 mb-6">
              ¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="ghost-btn"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-danger/20 text-danger border border-danger/40 rounded-lg hover:bg-danger/30 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promote Confirmation Modal */}
      {promoteConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="card p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Promover a Administrador</h3>
            <p className="text-slate-400 mb-6">
              ¿Estás seguro de que quieres promover este usuario a administrador? Tendrá acceso completo al panel de administración.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setPromoteConfirm(null)}
                className="ghost-btn"
              >
                Cancelar
              </button>
              <button
                onClick={() => handlePromote(promoteConfirm)}
                className="px-4 py-2 bg-ghost/20 text-ghost-soft border border-ghost/40 rounded-lg hover:bg-ghost/30 transition-colors"
              >
                Promover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Form Modal */}
      {showModal && (
        <UserFormModal
          user={editingUser}
          onClose={() => {
            setShowModal(false)
            setEditingUser(null)
          }}
        />
      )}
    </div>
  )
}
