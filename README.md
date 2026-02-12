# Connection Coaching - Learning Management System

A role-based Learning Management System designed specifically for connection coaching programs serving teens, parents, coaches, staff, and administrators.

## 🔐 Demo Credentials

To explore the system, use these sample login credentials:

| Role | Email | Password |
|------|-------|----------|
| **Administrator** | admin@connection.com | admin123 |
| **Staff Member** | staff@connection.com | staff123 |
| **Coach** | coach@connection.com | coach123 |
| **Parent** | parent@connection.com | parent123 |
| **Teen** | teen@connection.com | teen123 |

> **Note**: These are demo credentials for testing purposes. In a production environment, use secure passwords and proper authentication.

## Features

### Role-Based Access Control
The LMS provides five distinct user roles, each with customized dashboards and permissions:

#### 🔐 Admin
- **Full System Access** - Manage all users, programs, and settings
- User management (add, edit, remove users)
- Program creation and management
- System-wide reports and analytics
- Organization settings configuration
- Activity monitoring across all roles

#### 👔 Staff
- **Program Oversight** - Manage students and coordinate programs
- View all students and their progress
- Manage program schedules
- Access comprehensive reports
- Coordinate coach assignments
- Monitor program completion rates

#### 🎓 Coach
- **Student Coaching** - Direct work with assigned teens
- View assigned students' progress
- Schedule and conduct coaching sessions
- Add session notes and observations
- Access coaching resources and materials
- Track student engagement and growth

#### 👨‍👩‍👧 Parent
- **Teen Progress Monitoring** - Stay connected with your teen's journey
- View teen's overall progress and achievements
- See skills development tracking
- Access session schedules and history
- Message coaches
- Access parent resources and guides

#### 👦 Teen
- **Personal Growth Journey** - Engage with programs and activities
- Complete program activities and lessons
- Track personal progress and achievements
- Maintain private journal
- View coaching session schedule
- Earn badges and points for engagement

## Getting Started

### Quick Start
1. Open `index.html` in your web browser
2. Use one of the credentials above to login
3. Explore the role-specific dashboard

### Sample Login Workflow

**As an Administrator:**
- View system overview and statistics
- Add new users through the modal form
- Create coaching programs
- Access comprehensive reports
- Configure system settings

**As a Coach:**
- View your assigned students
- Schedule new coaching sessions
- Add session notes after meetings
- Track student progress
- Access coaching resources

**As a Parent:**
- Monitor your teen's progress
- View session history and notes
- Message your teen's coach
- Access parent resources

**As a Teen:**
- Complete program activities
- Write in your private journal
- Track your achievements and badges
- View upcoming sessions

## Project Structure

```
LMS test/
├── index.html                      # Main entry point
├── README.md                       # This file
├── FEATURES.md                     # Complete feature list
├── GETTING_STARTED.md              # Detailed getting started guide
├── QUICK_REFERENCE.md              # Role permissions matrix
├── ARCHITECTURE.md                 # System design diagrams
├── css/
│   ├── styles.css                  # Core styles and variables
│   ├── components.css              # UI components
│   └── responsive.css              # Mobile and tablet breakpoints
├── js/
│   ├── app.js                      # Application initialization
│   ├── auth.js                     # Authentication & authorization
│   ├── navigation.js               # Page routing and navigation
│   ├── modals.js                   # Modal system and forms
│   ├── data.js                     # Sample data
│   └── dashboards/
│       ├── admin.js                # Admin dashboard
│       ├── staff.js                # Staff dashboard
│       ├── coach.js                # Coach dashboard
│       ├── parent.js               # Parent dashboard
│       └── teen.js                 # Teen dashboard
```

## Key Features

### For Everyone:
- Secure login with role-based access
- Clean, modern interface
- Responsive design (works on all devices)
- Real-time progress tracking
- Interactive modals and forms
- Toast notifications for feedback

### Admin-Specific:
- Complete system control
- User management with add/edit modals
- Program creation and management
- Advanced analytics and reports
- System settings configuration

### Staff-Specific:
- Student coordination dashboard
- Program oversight tools
- Scheduling management
- Comprehensive reporting

### Coach-Specific:
- Direct student interaction interface
- Session scheduling with modal forms
- Session note documentation
- Student progress tracking
- Resource library access

### Parent-Specific:
- Teen monitoring dashboard
- Session history viewing
- Coach communication via messaging
- Resource access and guidance

### Teen-Specific:
- Activity completion system
- Personal journal (completely private)
- Achievement and badge system
- Points and streak tracking
- Skills development visualization

## Program Features

### Connection Coaching Programs
- **Foundation Building** - Core connection skills and emotional awareness
- **Building Healthy Relationships** - Creating positive relationships
- **Digital Wellness** - Healthy technology use
- **Identity & Self-Worth** - Personal values and self-development

### Activity Types
- Video lessons
- Interactive activities
- Journaling prompts
- Skill-building exercises
- Progress tracking

### Engagement Features
- Points system for completed activities
- Achievement badges
- Streak tracking
- Progress visualization
- Skills development tracking

## Security & Privacy

### Authentication
- Role-based access control
- Secure login system
- Session persistence using localStorage
- Protected routes for each user type
- Permission checking on all actions

### Privacy Features
- Teen journals are completely private
- Session notes visible only to authorized users
- Parent access limited to their linked teen
- Coach access limited to assigned students

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - No external dependencies
- **localStorage** - Client-side data persistence

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Customization

### Adding New Users
Edit `js/data.js` and add to the `sampleUsers` array:
```javascript
{
    email: 'user@example.com',
    password: 'password',
    role: 'teen', // or 'parent', 'coach', 'staff', 'admin'
    name: 'User Name'
}
```

### Adding New Programs
Edit `js/data.js` and add to the `programs` array:
```javascript
{
    id: 5,
    title: "Your Program Name",
    description: "Program description",
    duration: "X weeks",
    sessions: X,
    category: "Category",
    activities: []
}
```

### Modifying Permissions
Edit role permissions in `js/data.js`:
```javascript
const userRoles = {
    rolename: {
        name: 'Display Name',
        permissions: ['permission1', 'permission2']
    }
}
```

### Styling Changes
- Core colors and variables: `css/styles.css`
- Component styling: `css/components.css`
- Mobile responsiveness: `css/responsive.css`

## Interactive Features

All interactive elements now have full functionality:

- ✅ **Modal Forms**: Add users, create programs, schedule sessions
- ✅ **Session Notes**: View and edit coaching session notes
- ✅ **Messaging**: Parents can message coaches
- ✅ **Progress Tracking**: Real-time updates to progress bars
- ✅ **Notifications**: Success and error toast messages
- ✅ **Data Updates**: Changes reflect immediately in the UI

No more placeholder alerts - everything works!

## Documentation

- **FEATURES.md** - Complete list of all implemented features
- **GETTING_STARTED.md** - Step-by-step guide for first-time users
- **QUICK_REFERENCE.md** - Role permissions and access matrix
- **ARCHITECTURE.md** - Technical system design and data flow

## Future Enhancements

### Planned Features
- Backend API integration
- Real-time messaging system
- Video conferencing for sessions
- File upload for activities
- Advanced reporting and analytics
- Email notifications
- Mobile app version
- Calendar integration
- Multi-language support

### Technical Improvements
- Database integration
- RESTful API
- User authentication with JWT
- Real-time updates with WebSockets
- Progressive Web App (PWA) capabilities

## Development Notes

### Data Flow
1. User logs in → `auth.js` validates credentials
2. Role determined → Redirect to appropriate dashboard
3. Dashboard loads → Role-specific module renders content
4. Navigation → Protected routes check permissions
5. Actions → Modals and forms handle user interactions
6. Updates → Data changes reflect in UI immediately

### Adding New Features
1. Add data structures to `js/data.js`
2. Create UI components in appropriate dashboard file
3. Add modal/form in `js/modals.js` if needed
4. Update permissions if needed in `auth.js`
5. Add styling to relevant CSS file

## Support

This is a demonstration LMS built for connection coaching programs. For customization or production deployment, consider:
- Implementing a secure backend
- Adding proper database integration
- Setting up user authentication with OAuth
- Adding backup and recovery systems
- Implementing proper logging and monitoring

## License

This is a demonstration project for educational purposes.

---

**Connection Coaching LMS** - Empowering teens through meaningful connections and personal growth.
