import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User, RegisterData, AuthResult } from '../types/user'
import { COURSE_CONFIG } from '../data/config'
import { api, ApiError } from '../lib/api'

interface AuthContextType {
  currentUser: User | null
  users: User[]
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<AuthResult>
  register: (data: RegisterData) => Promise<AuthResult>
  addUser: (data: { name: string; email: string; password: string; age?: number; role?: 'admin' | 'student' }) => Promise<boolean>
  logout: () => void
  updateUser: (id: string, data: Partial<User>) => Promise<boolean>
  deleteUser: (id: string) => Promise<boolean>
  promoteToAdmin: (id: string) => Promise<boolean>
  getSpotsRemaining: () => number
  getUserById: (id: string) => User | undefined
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

function toErrorMessage(err: unknown): string {
  return err instanceof ApiError ? err.message : 'Error de conexión con el servidor'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [spotsRemaining, setSpotsRemaining] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshCapacity = useCallback(async () => {
    try {
      const { spotsRemaining: spots } = await api.get<{ spotsRemaining: number }>('/capacity')
      setSpotsRemaining(spots)
    } catch {
      // Se mantiene el valor actual
    }
  }, [])

  const refreshUsers = useCallback(async () => {
    try {
      const { users: list } = await api.get<{ users: User[] }>('/users')
      setUsers(list)
      await refreshCapacity()
    } catch {
      // No admin o error de red: se mantiene la lista actual
    }
  }, [refreshCapacity])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { user } = await api.get<{ user: User }>('/me')
        if (cancelled) return
        setCurrentUser(user)
        if (user.role === 'admin') await refreshUsers()
      } catch {
        if (!cancelled) setCurrentUser(null)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
          await refreshCapacity()
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [refreshUsers, refreshCapacity])

  const isAuthenticated = currentUser !== null
  const isAdmin = currentUser?.role === 'admin'

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { user } = await api.post<{ user: User }>('/login', { email, password })
      setCurrentUser(user)
      if (user.role === 'admin') await refreshUsers()
      return { success: true }
    } catch (err) {
      return { success: false, error: toErrorMessage(err) }
    }
  }

  const register = async (data: RegisterData): Promise<AuthResult> => {
    try {
      await api.post<{ user: User }>('/register', data)
      return { success: true }
    } catch (err) {
      return { success: false, error: toErrorMessage(err) }
    }
  }

  const addUser = async (data: { name: string; email: string; password: string; age?: number; role?: 'admin' | 'student' }): Promise<boolean> => {
    try {
      await api.post<{ user: User }>('/users', data)
      await refreshUsers()
      return true
    } catch {
      return false
    }
  }

  const logout = () => {
    api.post('/logout', {}).catch(() => {})
    setCurrentUser(null)
    setUsers([])
  }

  const updateUser = async (id: string, data: Partial<User>): Promise<boolean> => {
    try {
      const { user } = await api.patch<{ user: User }>(`/users?id=${encodeURIComponent(id)}`, data)
      setUsers((prev) => prev.map((u) => (u.id === id ? user : u)))
      if (currentUser?.id === id) {
        setCurrentUser((prev) => (prev ? { ...prev, ...user } : prev))
      }
      return true
    } catch {
      return false
    }
  }

  const deleteUser = async (id: string): Promise<boolean> => {
    if (id === 'admin-main-001') return false

    try {
      await api.del(`/users?id=${encodeURIComponent(id)}`)
      setUsers((prev) => prev.filter((u) => u.id !== id))
      if (currentUser?.id === id) {
        setCurrentUser(null)
      }
      return true
    } catch {
      return false
    }
  }

  const promoteToAdmin = async (id: string): Promise<boolean> => {
    if (id === 'admin-main-001') return false

    try {
      const { user } = await api.patch<{ user: User }>(`/users?id=${encodeURIComponent(id)}`, { role: 'admin' })
      setUsers((prev) => prev.map((u) => (u.id === id ? user : u)))
      return true
    } catch {
      return false
    }
  }

  const getSpotsRemaining = (): number => {
    if (spotsRemaining !== null) return spotsRemaining
    const studentCount = users.filter((u) => u.role === 'student').length
    return Math.max(0, COURSE_CONFIG.maxParticipants - studentCount)
  }

  const getUserById = (id: string): User | undefined => {
    return users.find((u) => u.id === id)
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      isAuthenticated,
      isAdmin,
      isLoading,
      login,
      register,
      addUser,
      logout,
      updateUser,
      deleteUser,
      promoteToAdmin,
      getSpotsRemaining,
      getUserById,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
