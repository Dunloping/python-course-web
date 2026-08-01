import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ProgressProvider, useProgress } from './contexts/ProgressContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'
import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import StudentDashboard from './pages/student/StudentDashboard'
import ProfilePage from './pages/student/ProfilePage'
import WeekPage from './pages/WeekPage'
import LessonPage from './pages/LessonPage'
import ExercisePage from './pages/ExercisePage'
import DashboardPage from './pages/DashboardPage'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import UsersPage from './pages/admin/UsersPage'

function PublicRoutes() {
  const { isAuthenticated, currentUser } = useAuth()
  
  if (isAuthenticated) {
    return <Navigate to={currentUser?.role === 'admin' ? '/admin' : '/student'} replace />
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function StudentRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/week/:weekNumber" element={<WeekPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/exercise/:exerciseId" element={<ExercisePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/student" replace />} />
      </Routes>
    </Layout>
  )
}

function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  )
}

function AppRoutes() {
  const { isAuthenticated, currentUser, isLoading: authLoading } = useAuth()
  const { isLoading: progressLoading } = useProgress()

  if (authLoading || progressLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <PublicRoutes />
  }

  if (currentUser?.role === 'admin') {
    return (
      <Routes>
        <Route path="/admin/*" element={
          <ProtectedRoute requireAdmin>
            <AdminRoutes />
          </ProtectedRoute>
        } />
        <Route path="/student/*" element={
          <ProtectedRoute>
            <StudentRoutes />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/student/*" element={
        <ProtectedRoute>
          <StudentRoutes />
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/student" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProgressProvider>
          <AppRoutes />
        </ProgressProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
