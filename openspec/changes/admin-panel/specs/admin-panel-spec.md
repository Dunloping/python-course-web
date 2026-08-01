# Specification: Admin Panel + User Registration

## Overview

Complete authentication and admin system for the Python Course platform, supporting self-registration for students and full admin control.

## Course Context

| Field | Value |
|-------|-------|
| **Course Name** | Python de Cero a tu Primer Proyecto |
| **Organizer** | Biblioteca Pública del Estado Zulia "María Calcaño" |
| **Start Date** | Saturday, August 1, 2026 |
| **Schedule** | Saturdays, 9:00 AM - 10:30 AM |
| **Duration** | 4 weeks |
| **Max Participants** | 7 |
| **Age Range** | 14-19 years |
| **Cost** | Free |

## Functional Requirements

### FR-1: User Registration

**Given** a new student wants to register
**When** they navigate to `/register`
**Then** they should see a form with:
- Name (required)
- Email (required, unique)
- Password (required, min 6 chars)
- Age (required, 14-19 only)

**Given** a student fills the registration form correctly
**When** they submit the form
**Then**:
- Account is created with role "student"
- They are redirected to `/login`
- Success message is shown

**Given** a student tries to register with an existing email
**When** they submit the form
**Then** an error "Email already registered" is shown

**Given** a student tries to register with age outside 14-19
**When** they submit the form
**Then** an error "Age must be between 14 and 19" is shown

**Given** the course has 7 participants (max)
**When** a new student tries to register
**Then** an error "Course is full" is shown

### FR-2: User Login

**Given** a registered user wants to login
**When** they navigate to `/login`
**Then** they should see a form with:
- Email (required)
- Password (required)

**Given** a user enters valid credentials
**When** they click "Login"
**Then**:
- They are logged in
- Redirected to `/dashboard` (student) or `/admin` (admin)

**Given** a user enters invalid credentials
**When** they click "Login"
**Then** an error "Invalid email or password" is shown

### FR-3: Admin Dashboard

**Given** an admin is logged in
**When** they navigate to `/admin`
**Then** they should see:
- Total users registered
- Spots remaining (7 - total)
- Course completion rate
- Average exercise score
- Recent activity

### FR-4: Admin User Management

**Given** an admin is on the users page
**When** they view the user list
**Then** they should see all users with:
- Name
- Email
- Role (Admin/Student)
- Age (for students)
- Registration date
- Last login
- Actions (Edit, Delete, Promote)

**Given** an admin wants to create a new user
**When** they click "Add User" and fill the form
**Then** a new user is created

**Given** an admin wants to promote a student to admin
**When** they click "Promote to Admin" and confirm
**Then** the user's role changes to "admin"

**Given** an admin wants to delete a user
**When** they confirm the deletion
**Then** the user is removed (cannot delete main admin)

### FR-5: Landing Page

**Given** a visitor goes to the homepage
**When** the page loads
**Then** they should see:
- Official curso.jpeg banner
- Course name and description
- Schedule: "Sábados, 9:00 - 10:30 AM"
- Start date: "1 de Agosto 2026"
- Spots: "7 cupos disponibles"
- Age: "Edades: 14-19 años"
- "Inscribirse" button (links to /register)
- "Ya tengo cuenta" link (links to /login)

### FR-6: Student Dashboard

**Given** a student is logged in
**When** they navigate to `/dashboard`
**Then** they should see:
- Welcome message with their name
- Current week progress
- Next lesson preview
- Link to profile

### FR-7: Student Profile

**Given** a student is on their profile page
**When** they view the page
**Then** they should see:
- Their name, email, age
- Account creation date
- Option to edit name
- Progress summary

## Non-Functional Requirements

### NFR-1: Security
- Passwords hashed with bcrypt (or simple hash for localStorage)
- Admin routes protected
- Main admin (jesusdanielav@gmail.com) cannot be deleted
- Session persists in localStorage

### NFR-2: Validation
- Email format validation
- Password min 6 chars
- Age must be 14-19
- Required fields enforced

### NFR-3: Capacity Control
- Maximum 7 participants
- Show spots remaining on landing page
- Block registration when full

### NFR-4: Usability
- Responsive design (mobile-first)
- Clear error messages in Spanish
- Loading states for async operations
- Confirmation dialogs for destructive actions

## Data Model

### User
```typescript
{
  id: string              // UUID
  name: string            // Display name
  email: string           // Unique email
  password: string        // Hashed password
  role: 'admin' | 'student'
  age?: number            // Required for students (14-19)
  createdAt: string       // ISO date
  lastLogin: string       // ISO date
  progress: {
    completedLessons: string[]
    exerciseResults: Record<string, { score: number; attempts: number }>
    currentWeek: number
  }
}
```

### Default Admin
```typescript
{
  id: "admin-main-001",
  name: "Jesús Alvarado",
  email: "jesusdanielav@gmail.com",
  password: "$2a$10$...",  // hashed "Admin123!"
  role: "admin",
  createdAt: "2026-07-31T00:00:00Z",
  lastLogin: "2026-07-31T00:00:00Z",
  progress: { ... }
}
```

## UI Components

### Landing Page
- Hero section with curso.jpeg background
- Course info cards
- CTA buttons (Inscribirse / Login)

### Login Page
- Email input
- Password input
- Login button
- Link to register

### Register Page
- Name input
- Email input
- Password input
- Age input (14-19)
- Register button
- Link to login

### Admin Dashboard
- Stats cards (4 cards)
- Capacity indicator (X/7 spots)
- Recent users table

### Admin Users Page
- Search bar
- Filter by role
- User table with actions
- Add User button

### Student Dashboard
- Welcome card
- Progress card
- Next lesson card

## Acceptance Criteria

- [ ] Landing page shows curso.jpeg banner
- [ ] Landing page shows correct course info
- [ ] Users can register with name, email, password, age
- [ ] Registration validates age 14-19
- [ ] Registration blocks when 7 spots full
- [ ] Users can login with email/password
- [ ] Admin redirected to /admin on login
- [ ] Student redirected to /dashboard on login
- [ ] Admin can view all users
- [ ] Admin can create new users
- [ ] Admin can promote students to admin
- [ ] Admin can delete users (not main admin)
- [ ] Students can view their progress
- [ ] Students can edit their profile
- [ ] All pages are responsive
- [ ] Error messages are clear and in Spanish
