# Proposal: Admin Panel + User Registration

## Intent

Add authentication and admin capabilities to the Python Course platform:
1. **Main Admin** (jesusdanielav@gmail.com) with full control
2. **Self-registration** for students (course has 7 spots)
3. **Admin panel** to manage users, view progress, create more admins
4. **Course banner** using the official curso.jpeg image

## Context

| Dato | Valor |
|------|-------|
| **Curso** | Python de Cero a tu Primer Proyecto |
| **Organiza** | Biblioteca Pública del Estado Zulia "María Calcaño" |
| **Inicio** | Sábado 1 de agosto 2026 |
| **Horario** | 9:00 a.m. a 10:30 a.m. |
| **Duración** | 4 sábados |
| **Cupos** | 7 participantes máximo |
| **Edades** | 14 a 19 años |
| **Costo** | Gratuito |

## Scope

### In Scope

#### 1. Authentication System
- **Login** for existing users (admin + students)
- **Registration** for new students (self-service)
- **Roles**: Admin (full access), Student (own progress only)
- **Main Admin**: jesusdanielav@gmail.com (hardcoded, can't be deleted)

#### 2. Admin Panel (`/admin/*`)
- **Dashboard**: Total users, active users, completion rates, spots remaining (7 max)
- **User Management**: List, create, edit, delete users, promote to admin
- **Content Management**: View/edit lessons and exercises
- **Course Info**: View registration stats, capacity

#### 3. Student Features
- **Profile page**: View own progress, edit name
- **Registration**: Self-service signup with name, email, password, age
- **Login**: Email + password

#### 4. Landing Page Update
- **Hero banner**: Use curso.jpeg as main image
- **Course info**: Dates, schedule, capacity, age range
- **CTA**: "Inscribirse" button (links to registration)

### Out of Scope
- Payment processing (course is free)
- Email verification
- Password reset
- Multi-language support

## Architecture Decision: Authentication

**Choice**: localStorage-based auth with role system
**Rationale**: 
- No backend needed (keeps current architecture)
- 7 users max (localStorage is sufficient)
- Simple to implement and maintain
- Can upgrade to backend later if needed

### Default Admin Account
```
Email: jesusdanielav@gmail.com
Password: Admin123!
Role: admin
```

### User Registration Flow
```
1. User clicks "Inscribirse" on landing page
2. Fills form: Name, Email, Password, Age (14-19)
3. System checks:
   - Is email already registered? → Error
   - Are there spots available? (max 7) → Error if full
   - Is age between 14-19? → Error if not
4. Account created with role "student"
5. Redirect to login
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    AuthContext                                │
│  localStorage: {                                             │
│    users: User[],                                           │
│    currentUser: User | null                                 │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Public       │    │ Student      │    │ Admin        │
│ - Landing    │    │ - Dashboard  │    │ - Dashboard  │
│ - Login      │    │ - Lessons    │    │ - Users      │
│ - Register   │    │ - Exercises  │    │ - Content    │
│              │    │ - Profile    │    │ - Settings   │
└──────────────┘    └──────────────┘    └──────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `public/curso.jpeg` | Create | Official course banner |
| `src/contexts/AuthContext.tsx` | Create | Auth context with login/register/admin |
| `src/types/user.ts` | Create | User type definitions |
| `src/data/users.ts` | Create | Default admin user |
| `src/pages/public/LandingPage.tsx` | Create | Landing with curso.jpeg banner |
| `src/pages/public/LoginPage.tsx` | Create | Login form |
| `src/pages/public/RegisterPage.tsx` | Create | Student registration form |
| `src/pages/student/StudentDashboard.tsx` | Create | Student home |
| `src/pages/student/ProfilePage.tsx` | Create | Student profile |
| `src/pages/admin/AdminLayout.tsx` | Create | Admin layout wrapper |
| `src/pages/admin/AdminDashboard.tsx` | Create | Admin analytics |
| `src/pages/admin/UsersPage.tsx` | Create | User management |
| `src/components/ProtectedRoute.tsx` | Create | Route guard |
| `src/components/Layout.tsx` | Modify | Add auth-aware header |
| `src/App.tsx` | Modify | Add all new routes |

## Interfaces

```typescript
// User
interface User {
  id: string
  name: string
  email: string
  password: string  // hashed with bcrypt
  role: 'admin' | 'student'
  age?: number      // required for students (14-19)
  createdAt: string
  lastLogin: string
  progress: UserProgress
}

// Auth Context
interface AuthContextType {
  currentUser: User | null
  users: User[]
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => AuthResult
  register: (data: RegisterData) => AuthResult
  logout: () => void
  updateUser: (id: string, data: Partial<User>) => boolean
  deleteUser: (id: string) => boolean
  promoteToAdmin: (id: string) => boolean
  getSpotsRemaining: () => number
}

// Registration Data
interface RegisterData {
  name: string
  email: string
  password: string
  age: number
}

// Auth Result
interface AuthResult {
  success: boolean
  error?: string
}
```

## Course Configuration

```typescript
const COURSE_CONFIG = {
  name: "Python de Cero a tu Primer Proyecto",
  organizer: "Biblioteca Pública del Estado Zulia María Calcaño",
  startDate: "2026-08-01",  // Sábado 1 de agosto
  schedule: "Sábados, 9:00 - 10:30 AM",
  duration: 4,              // 4 semanas
  maxParticipants: 7,
  minAge: 14,
  maxAge: 19,
  isFree: true,
}
```

## Testing Strategy

| Layer | What | How |
|-------|------|-----|
| Unit | Auth logic, age validation | Manual |
| Integration | Registration flow, login | Manual |
| E2E | Full user journey | Manual |

## Migration / Rollout

1. Copy curso.jpeg to public/
2. Create AuthContext and types
3. Create public pages (Landing, Login, Register)
4. Create student pages
5. Create admin pages
6. Update App.tsx with routes
7. Update Layout with auth-aware header
8. Deploy to Vercel

## Open Questions

- [ ] Should we hash passwords with bcrypt or keep simple for localStorage?
- [ ] Should we add email validation during registration?
- [ ] Should we show "course full" message when 7 spots are taken?
