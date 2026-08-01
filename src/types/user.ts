export interface ExerciseResult {
  score: number
  attempts: number
  completed: boolean
}

export interface UserProgress {
  completedLessons: string[]
  exerciseResults: Record<string, ExerciseResult>
  currentWeek: number
  lastAccessed: string
}

export interface User {
  id: string
  name: string
  email: string
  password?: string
  role: 'admin' | 'student'
  age?: number
  createdAt: string
  lastLogin: string
  progress?: UserProgress
}

export interface RegisterData {
  name: string
  email: string
  password: string
  age: number
}

export interface AuthResult {
  success: boolean
  error?: string
}

export interface CourseConfig {
  name: string
  shortName: string
  organizer: string
  startDate: string
  schedule: string
  duration: number
  maxParticipants: number
  minAge: number
  maxAge: number
  isFree: boolean
  location: string
}
