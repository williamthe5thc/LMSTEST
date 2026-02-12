# System Architecture - Connection Coaching LMS

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      User Opens LMS                          │
│                     (index.html)                             │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
              ┌─────────────────────┐
              │   Check localStorage │
              │   for saved user     │
              └──────────┬───────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
         User                      No User
        Found                      Found
            │                         │
            ▼                         ▼
   ┌────────────────┐       ┌─────────────────┐
   │ Redirect to    │       │ Show Login Page │
   │ Role Dashboard │       └─────────────────┘
   └────────────────┘                │
                                     │
                          ┌──────────┴──────────┐
                          │  User Enters Email  │
                          │  and Password       │
                          └──────────┬──────────┘
                                     │
                          ┌──────────▼──────────┐
                          │ Validate Against    │
                          │ sampleUsers in      │
                          │ data.js             │
                          └──────────┬──────────┘
                                     │
                    ┌────────────────┴────────────────┐
                    │                                 │
                 Valid                            Invalid
                    │                                 │
                    ▼                                 ▼
         ┌──────────────────┐              ┌─────────────────┐
         │ Store in         │              │ Show Error      │
         │ localStorage     │              │ Message         │
         └────────┬─────────┘              └─────────────────┘
                  │
                  ▼
         ┌──────────────────┐
         │ Load Role-Based  │
         │ Dashboard        │
         └──────────────────┘
```

## Role-Based Dashboard Routing

```
┌──────────────────────────────────────────────────────────────┐
│                    User Authenticated                         │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────┐
              │  Check User Role  │
              └──────────┬────────┘
                         │
          ┌──────────────┼──────────────┬───────────┬──────────┐
          │              │              │           │          │
          ▼              ▼              ▼           ▼          ▼
     ┌────────┐    ┌────────┐    ┌────────┐  ┌────────┐  ┌────────┐
     │ Admin  │    │ Staff  │    │ Coach  │  │ Parent │  │ Teen   │
     └────┬───┘    └────┬───┘    └────┬───┘  └────┬───┘  └────┬───┘
          │             │             │           │           │
          ▼             ▼             ▼           ▼           ▼
   ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌──────────┐ ┌──────────┐
   │admin.js   │ │staff.js   │ │coach.js   │ │parent.js │ │teen.js   │
   │Dashboard  │ │Dashboard  │ │Dashboard  │ │Dashboard │ │Dashboard │
   └───────────┘ └───────────┘ └───────────┘ └──────────┘ └──────────┘
```

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Browser                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                      index.html                             │ │
│  └───────────────────────────┬────────────────────────────────┘ │
│                              │                                   │
│  ┌───────────────────────────┼────────────────────────────────┐ │
│  │                  JavaScript Modules                         │ │
│  │                                                              │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │ │
│  │  │ auth.js  │  │  data.js │  │  nav.js  │  │  app.js  │   │ │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │ │
│  │       │             │             │             │          │ │
│  │       └─────────────┼─────────────┼─────────────┘          │ │
│  │                     │             │                        │ │
│  │  ┌──────────────────┴─────────────┴──────────────────┐    │ │
│  │  │            Dashboard Modules                       │    │ │
│  │  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │    │ │
│  │  │  │admin.js│ │staff.js│ │coach.js│ │parent  │ ...  │    │ │
│  │  │  └────────┘ └────────┘ └────────┘ └────────┘      │    │ │
│  │  └───────────────────────────────────────────────────┘    │ │
│  │                                                              │ │
│  └──────────────────────────┬───────────────────────────────── │ │
│                             │                                   │
│  ┌──────────────────────────┼───────────────────────────────┐ │
│  │                   CSS Styling                             │ │
│  │  ┌─────────┐  ┌──────────────┐  ┌──────────────┐        │ │
│  │  │styles   │  │components    │  │responsive    │        │ │
│  │  │.css     │  │.css          │  │.css          │        │ │
│  │  └─────────┘  └──────────────┘  └──────────────┘        │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    localStorage                            │ │
│  │  ┌─────────────────────────────────────┐                  │ │
│  │  │  { user: { name, email, role } }    │                  │ │
│  │  └─────────────────────────────────────┘                  │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Permission System

```
┌──────────────────────────────────────────────────────────────┐
│                    User Action Request                        │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │ Check if user exists │
            │ (requireAuth())      │
            └──────────┬───────────┘
                       │
          ┌────────────┴───────────┐
          │                        │
       No User                  User Exists
          │                        │
          ▼                        ▼
   ┌─────────────┐      ┌──────────────────┐
   │ Redirect to │      │ Check user role  │
   │ Login       │      │ (requireRole())  │
   └─────────────┘      └────────┬─────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
              Role Allowed              Role Not Allowed
                    │                         │
                    ▼                         ▼
         ┌──────────────────┐      ┌─────────────────┐
         │ Check specific   │      │ Show error      │
         │ permission       │      │ Redirect to     │
         │ (hasPermission())│      │ their dashboard │
         └────────┬─────────┘      └─────────────────┘
                  │
     ┌────────────┴────────────┐
     │                         │
  Has Permission        No Permission
     │                         │
     ▼                         ▼
┌──────────┐           ┌─────────────┐
│ Execute  │           │ Show error  │
│ Action   │           │ or hide UI  │
└──────────┘           └─────────────┘
```

## File Relationships

```
index.html
    │
    ├── CSS Files
    │   ├── styles.css (variables, base styles)
    │   ├── components.css (buttons, cards, forms)
    │   └── responsive.css (mobile breakpoints)
    │
    └── JavaScript Files
        ├── data.js (sample data - loaded first)
        │   ├── programs[]
        │   ├── sessions[]
        │   ├── userRoles{}
        │   └── sampleUsers[]
        │
        ├── auth.js (authentication)
        │   ├── checkAuth()
        │   ├── login()
        │   ├── logout()
        │   ├── hasPermission()
        │   └── requireRole()
        │
        ├── navigation.js (routing)
        │   ├── showPage()
        │   ├── loadLoginPage()
        │   └── updateNavbar()
        │
        ├── dashboards/ (role-specific)
        │   ├── admin.js
        │   │   ├── loadAdminDashboard()
        │   │   ├── showAdminSection()
        │   │   └── loadAdminOverview()
        │   │
        │   ├── staff.js
        │   │   ├── loadStaffDashboard()
        │   │   └── showStaffSection()
        │   │
        │   ├── coach.js
        │   │   ├── loadCoachDashboard()
        │   │   └── showCoachSection()
        │   │
        │   ├── parent.js
        │   │   ├── loadParentDashboard()
        │   │   └── showParentSection()
        │   │
        │   └── teen.js
        │       ├── loadTeenDashboard()
        │       └── showTeenSection()
        │
        └── app.js (initialization)
            ├── DOMContentLoaded listener
            └── init()
```

## Component Hierarchy

```
Navigation Bar (Always visible when authenticated)
    │
    ├── Logo (click → redirect to role dashboard)
    ├── User Info (name + role)
    └── Logout Button

Role Dashboard
    │
    ├── Sidebar Menu
    │   ├── Section Links (role-specific)
    │   └── Active State Indicator
    │
    └── Main Content Area
        │
        ├── Page Title
        │
        ├── Stats Cards (optional)
        │   ├── Stat Card 1
        │   ├── Stat Card 2
        │   └── Stat Card n...
        │
        ├── Sections
        │   ├── Course/Program Grid
        │   ├── Tables (sessions, students, etc.)
        │   ├── Forms (create, edit)
        │   └── Lesson Lists (activities)
        │
        └── Action Buttons
```

## State Management

```
Application State
    │
    ├── currentUser (global variable)
    │   ├── name
    │   ├── email
    │   ├── role
    │   └── linkedTeen (if parent)
    │
    ├── currentPage (global variable)
    │   └── Tracks which page is displayed
    │
    └── localStorage
        └── user object (persisted)
            ├── name
            ├── email
            └── role
```

## Event Flow Example: Login

```
1. User enters credentials
       │
       ▼
2. Form submit event
       │
       ▼
3. login(event) in auth.js
       │
       ├── Validate credentials against sampleUsers
       │
       ├── Create currentUser object
       │
       ├── Save to localStorage
       │
       └── Call redirectToDashboard()
              │
              ▼
4. redirectToDashboard() in auth.js
       │
       ├── Check currentUser.role
       │
       └── Call showPage('role-dashboard')
              │
              ▼
5. showPage() in navigation.js
       │
       ├── Hide navbar
       │
       └── Load appropriate dashboard
              │
              ▼
6. loadRoleDashboard() in dashboards/role.js
       │
       ├── Create sidebar
       │
       ├── Create content area
       │
       └── Load default section
```

---

This architecture is designed to be:
- **Modular** - Each role has its own file
- **Maintainable** - Clear separation of concerns
- **Scalable** - Easy to add new roles or features
- **Secure** - Permission checking at every level
- **User-friendly** - Role-specific interfaces
