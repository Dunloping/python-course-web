# Tasks: Admin Panel + User Registration

## Overview

Implement complete authentication and admin system for the Python Course platform.

**Total Tasks**: 15
**Estimated Effort**: Large
**Risk Level**: Low

## Course Context

| Field | Value |
|-------|-------|
| **Course** | Python de Cero a tu Primer Proyecto |
| **Organizer** | Biblioteca Pública del Estado Zulia María Calcaño |
| **Start** | Sábado 1 de agosto 2026 |
| **Schedule** | Sábados, 9:00 - 10:30 AM |
| **Duration** | 4 weeks |
| **Max Students** | 7 |
| **Age Range** | 14-19 years |
| **Main Admin** | jesusdanielav@gmail.com |

## Tasks

### Phase 1: Foundation (Tasks 1-4)

#### Task 1: Copy curso.jpeg and Create Types
**Priority**: High
**Effort**: Small
**Files**: `public/curso.jpeg`, `src/types/user.ts`, `src/data/config.ts`

**Description**:
Copy the official course banner and create type definitions.

**Acceptance Criteria**:
- [ ] curso.jpeg exists in public/
- [ ] User type is defined
- [ ] Course config is defined
- [ ] Hash function is implemented

---

#### Task 2: Create AuthContext
**Priority**: High
**Effort**: Medium
**Files**: `src/contexts/AuthContext.tsx`

**Description**:
Create authentication context with login, register, and user management.

**Acceptance Criteria**:
- [ ] login() validates credentials
- [ ] register() creates new users
- [ ] logout() clears session
- [ ] getUsers() returns all users
- [ ] updateUser/deleteUser work
- [ ] promoteToAdmin() changes role
- [ ] getSpotsRemaining() counts available spots
- [ ] Default admin is created on first load

---

#### Task 3: Create ProtectedRoute Component
**Priority**: High
**Effort**: Small
**Files**: `src/components/ProtectedRoute.tsx`

**Description**:
Create HOC that protects routes based on auth and role.

**Acceptance Criteria**:
- [ ] Redirects to /login if not authenticated
- [ ] Redirects to /dashboard if student tries admin route
- [ ] Renders children if authorized
- [ ] Works with React Router

---

#### Task 4: Update App.tsx with Routes
**Priority**: High
**Effort**: Medium
**Files**: `src/App.tsx`

**Description**:
Add all new routes to the router.

**Acceptance Criteria**:
- [ ] Public routes: /, /login, /register
- [ ] Student routes: /dashboard, /profile (protected)
- [ ] Admin routes: /admin, /admin/users (admin only)
- [ ] Redirects work correctly
- [ ] 404 page for unknown routes

---

### Phase 2: Public Pages (Tasks 5-7)

#### Task 5: Create Landing Page
**Priority**: High
**Effort**: Medium
**Files**: `src/pages/public/LandingPage.tsx`

**Description**:
Create landing page with curso.jpeg banner and course info.

**Acceptance Criteria**:
- [ ] Hero section with curso.jpeg background
- [ ] Course title and description
- [ ] Schedule: "Sábados, 9:00 - 10:30 AM"
- [ ] Start date: "1 de Agosto 2026"
- [ ] Capacity: "7 cupos disponibles" (dynamic)
- [ ] Age: "Edades: 14-19 años"
- [ ] "Inscribirse" button → /register
- [ ] "Ya tengo cuenta" link → /login
- [ ] Responsive design

---

#### Task 6: Create Login Page
**Priority**: High
**Effort**: Small
**Files**: `src/pages/public/LoginPage.tsx`

**Description**:
Create login form with email and password.

**Acceptance Criteria**:
- [ ] Email input (required)
- [ ] Password input (required)
- [ ] Login button
- [ ] Error message on invalid credentials
- [ ] Redirect to /dashboard (student) or /admin (admin)
- [ ] Link to register page
- [ ] Responsive design

---

#### Task 7: Create Register Page
**Priority**: High
**Effort**: Medium
**Files**: `src/pages/public/RegisterPage.tsx`

**Description**:
Create student registration form.

**Acceptance Criteria**:
- [ ] Name input (required)
- [ ] Email input (required, unique)
- [ ] Password input (required, min 6 chars)
- [ ] Age input (required, 14-19)
- [ ] Register button
- [ ] Validation errors:
  - "Email already registered"
  - "Age must be between 14 and 19"
  - "Course is full" (when 7 students)
- [ ] Success redirect to /login
- [ ] Link to login page
- [ ] Responsive design

---

### Phase 3: Student Pages (Tasks 8-9)

#### Task 8: Create Student Dashboard
**Priority**: Medium
**Effort**: Medium
**Files**: `src/pages/student/StudentDashboard.tsx`, `src/pages/student/StudentLayout.tsx`

**Description**:
Create student home page with progress overview.

**Acceptance Criteria**:
- [ ] Welcome message with user name
- [ ] Current week progress
- [ ] Completed lessons count
- [ ] Exercise scores summary
- [ ] Link to lessons
- [ ] Link to profile
- [ ] Responsive design

---

#### Task 9: Create Student Profile Page
**Priority**: Medium
**Effort**: Small
**Files**: `src/pages/student/ProfilePage.tsx`

**Description**:
Create student profile page with edit capabilities.

**Acceptance Criteria**:
- [ ] Display name, email, age
- [ ] Account creation date
- [ ] Last login date
- [ ] Edit name functionality
- [ ] Progress summary
- [ ] Responsive design

---

### Phase 4: Admin Pages (Tasks 10-13)

#### Task 10: Create Admin Layout
**Priority**: High
**Effort**: Medium
**Files**: `src/pages/admin/AdminLayout.tsx`, `src/components/admin/AdminSidebar.tsx`

**Description**:
Create admin layout with sidebar navigation.

**Acceptance Criteria**:
- [ ] Sidebar with navigation links
- [ ] Dashboard, Users, Content links
- [ ] User info and logout in header
- [ ] Responsive (sidebar collapses on mobile)
- [ ] Active state for current page

---

#### Task 11: Create Admin Dashboard
**Priority**: Medium
**Effort**: Medium
**Files**: `src/pages/admin/AdminDashboard.tsx`

**Description**:
Create admin analytics dashboard.

**Acceptance Criteria**:
- [ ] Total users registered
- [ ] Spots remaining (7 - total)
- [ ] Students vs admins count
- [ ] Course completion rate
- [ ] Average exercise score
- [ ] Recent registrations list
- [ ] Capacity progress bar
- [ ] Responsive grid

---

#### Task 12: Create Users Page
**Priority**: Medium
**Effort**: Large
**Files**: `src/pages/admin/UsersPage.tsx`

**Description**:
Create user management page with CRUD operations.

**Acceptance Criteria**:
- [ ] User table with columns: Name, Email, Role, Age, Registered, Actions
- [ ] Search by name/email
- [ ] Filter by role (All/Admin/Student)
- [ ] Add User button → modal/form
- [ ] Edit user → modal/form
- [ ] Delete user with confirmation
- [ ] Promote to admin with confirmation
- [ ] Cannot delete main admin
- [ ] Responsive table

---

#### Task 13: Create User Form Modal
**Priority**: Medium
**Effort**: Medium
**Files**: `src/components/admin/UserFormModal.tsx`

**Description**:
Create modal form for creating/editing users.

**Acceptance Criteria**:
- [ ] Name input (required)
- [ ] Email input (required, unique)
- [ ] Password input (required for new, optional for edit)
- [ ] Age input (required for students)
- [ ] Role select (Admin/Student)
- [ ] Form validation
- [ ] Save/Cancel buttons
- [ ] Responsive design

---

### Phase 5: Integration (Tasks 14-15)

#### Task 14: Update Layout with Auth
**Priority**: High
**Effort**: Medium
**Files**: `src/components/Layout.tsx`

**Description**:
Update main layout to be auth-aware.

**Acceptance Criteria**:
- [ ] Show user name when logged in
- [ ] Show "Admin" link for admins
- [ ] Show "Dashboard" link for students
- [ ] Show "Login" and "Register" for guests
- [ ] Logout button for logged-in users
- [ ] Responsive header

---

#### Task 15: Test and Deploy
**Priority**: High
**Effort**: Medium
**Files**: None (testing and deployment)

**Description**:
Test all functionality and deploy to Vercel.

**Acceptance Criteria**:
- [ ] Landing page shows curso.jpeg
- [ ] Registration works with validation
- [ ] Login works for admin and students
- [ ] Admin can view/manage users
- [ ] Admin can promote/delete users
- [ ] Students can view progress
- [ ] All pages are responsive
- [ ] Deployed to Vercel
- [ ] All routes work correctly

---

## Dependencies

```
Task 1 → Task 2 → Task 3 → Task 4
                                  ↓
Task 5 → Task 6 → Task 7 ────────→ Task 14
                                  ↓
Task 8 → Task 9 ─────────────────→ Task 15
                                  ↓
Task 10 → Task 11 → Task 12 → Task 13
```

## Testing Checklist

- [ ] Landing page displays curso.jpeg
- [ ] Landing page shows correct course info
- [ ] User can register with valid data
- [ ] Registration rejects age < 14 or > 19
- [ ] Registration rejects duplicate email
- [ ] Registration shows "course full" when 7 users
- [ ] User can login with correct credentials
- [ ] Login shows error for wrong credentials
- [ ] Admin redirected to /admin
- [ ] Student redirected to /dashboard
- [ ] Admin can view all users
- [ ] Admin can create new users
- [ ] Admin can edit users
- [ ] Admin can delete users (not main admin)
- [ ] Admin can promote students
- [ ] Students can view their progress
- [ ] Students can edit their profile
- [ ] All pages responsive on mobile
- [ ] Logout works correctly
- [ ] Session persists on page reload
