# Design: Admin Panel + User Registration

## Technical Approach

Add complete authentication system with:
1. **AuthContext** for user management (localStorage-based)
2. **Public pages** (Landing, Login, Register)
3. **Student pages** (Dashboard, Profile)
4. **Admin pages** (Dashboard, Users, Content)
5. **Protected routes** with role-based access

## Architecture Decisions

### Decision: Password Hashing

**Choice**: Simple hash with btoa() for localStorage
**Alternatives**: bcrypt, argon2, no hashing
**Rationale**: 
- localStorage is already insecure (XSS can access it)
- No backend means no server-side hashing
- Simple hash is sufficient for this scale (7 users)
- Can upgrade to bcrypt when backend is added

### Decision: Session Management

**Choice**: localStorage with currentUser object
**Alternatives**: sessionStorage, cookies, JWT
**Rationale**:
- Persistent across browser sessions
- Simple to implement
- No expiration needed (course is 4 weeks)
- User stays logged in until they logout

### Decision: Route Structure

**Choice**: Three route groups with nested layouts
**Alternatives**: Flat routes, middleware-based
**Rationale**:
- Clear separation of concerns
- Easy to add new pages
- ProtectedRoute component handles auth check

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    AuthProvider                               │
│  localStorage: {                                             │
│    users: User[],           // All registered users          │
│    currentUser: User | null // Currently logged in           │
│  }                                                          │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ PUBLIC       │    │ STUDENT      │    │ ADMIN        │
│              │    │              │    │              │
│ /            │    │ /dashboard   │    │ /admin       │
│ /login       │    │ /profile     │    │ /admin/users │
│ /register    │    │ /lessons     │    │ /admin/stats │
│              │    │ /exercises   │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
     │                    │                    │
     │                    │                    │
     ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ No auth      │    │ Auth required│    │ Admin only   │
│ Redirect to  │    │ role=student │    │ role=admin   │
│ /login if    │    │ or admin     │    │              │
│ tries access │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `public/curso.jpeg` | Copy | Official course banner |
| `src/types/user.ts` | Create | User and auth types |
| `src/data/config.ts` | Create | Course configuration |
| `src/contexts/AuthContext.tsx` | Create | Auth context provider |
| `src/components/ProtectedRoute.tsx` | Create | Route guard component |
| `src/pages/public/LandingPage.tsx` | Create | Landing with curso.jpeg |
| `src/pages/public/LoginPage.tsx` | Create | Login form |
| `src/pages/public/RegisterPage.tsx` | Create | Registration form |
| `src/pages/student/StudentLayout.tsx` | Create | Student layout |
| `src/pages/student/StudentDashboard.tsx` | Create | Student home |
| `src/pages/student/ProfilePage.tsx` | Create | Student profile |
| `src/pages/admin/AdminLayout.tsx` | Create | Admin layout |
| `src/pages/admin/AdminDashboard.tsx` | Create | Admin analytics |
| `src/pages/admin/UsersPage.tsx` | Create | User management |
| `src/components/Layout.tsx` | Modify | Auth-aware header |
| `src/App.tsx` | Modify | Add all routes |

## Interfaces

```typescript
// User
interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'student'
  age?: number
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

// Course Config
interface CourseConfig {
  name: string
  organizer: string
  startDate: string
  schedule: string
  duration: number
  maxParticipants: number
  minAge: number
  maxAge: number
  isFree: boolean
}
```

## Default Data

### Main Admin
```typescript
const DEFAULT_ADMIN: User = {
  id: "admin-main-001",
  name: "Jesús Alvarado",
  email: "jesusdanielav@gmail.com",
  password: hashPassword("Admin123!"),
  role: "admin",
  createdAt: "2026-07-31T00:00:00Z",
  lastLogin: new Date().toISOString(),
  progress: {
    completedLessons: [],
    exerciseResults: {},
    currentWeek: 1
  }
}
```

### Course Configuration
```typescript
const COURSE_CONFIG: CourseConfig = {
  name: "Python de Cero a tu Primer Proyecto",
  organizer: "Biblioteca Pública del Estado Zulia María Calcaño",
  startDate: "2026-08-01",
  schedule: "Sábados, 9:00 - 10:30 AM",
  duration: 4,
  maxParticipants: 7,
  minAge: 14,
  maxAge: 19,
  isFree: true
}
```

## Testing Strategy

| Layer | What | How |
|-------|------|-----|
| Unit | Hash function, validation | Manual |
| Integration | Login, registration flow | Manual |
| E2E | Complete user journey | Manual |

## Migration / Rollout

1. Copy curso.jpeg to public/
2. Create types and config
3. Create AuthContext
4. Create ProtectedRoute
5. Create public pages (Landing, Login, Register)
6. Create student pages
7. Create admin pages
8. Update App.tsx with routes
9. Update Layout with auth-aware header
10. Deploy to Vercel

## Open Questions

- [ ] Should we add "Remember me" functionality?
- [ ] Should we show course countdown on landing page?
- [ ] Should we add email notifications for registration?
