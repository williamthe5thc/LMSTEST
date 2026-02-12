// Authentication module for Connection Coaching LMS
let currentUser = null;

// Check for saved user on load
function checkAuth() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        // Redirect to appropriate dashboard
        redirectToDashboard();
    } else {
        // Show login page if no user is authenticated
        showPage('login');
    }
}

// Login function with role-based authentication
function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Find user in sample users (in production, this would be a backend API call)
    const user = sampleUsers.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = {
            name: user.name,
            email: user.email,
            role: user.role,
            id: user.id,
            linkedTeen: user.linkedTeen
        };

        localStorage.setItem('user', JSON.stringify(currentUser));
        redirectToDashboard();
    } else {
        // Show error message
        showLoginError('Invalid email or password. Please try again.');
    }
}

// Show login error
function showLoginError(message) {
    // Remove any existing error messages
    const existingError = document.getElementById('loginError');
    if (existingError) {
        existingError.remove();
    }

    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.id = 'loginError';
    errorDiv.style.cssText = 'background: #fee; border: 1px solid #fcc; color: #c33; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;';
    errorDiv.textContent = message;

    // Insert before the form
    const form = document.querySelector('.auth-form form');
    form.parentNode.insertBefore(errorDiv, form);
}

// Redirect to appropriate dashboard based on role
function redirectToDashboard() {
    if (!currentUser) {
        showPage('login');
        return;
    }

    switch(currentUser.role) {
        case 'admin':
            showPage('admin-dashboard');
            break;
        case 'staff':
            showPage('staff-dashboard');
            break;
        case 'coach':
            showPage('coach-dashboard');
            break;
        case 'parent':
            showPage('parent-dashboard');
            break;
        case 'teen':
            showPage('teen-dashboard');
            break;
        default:
            showPage('login');
    }
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('user');
    showPage('login');
}

// Check if user has permission
function hasPermission(permission) {
    if (!currentUser) return false;
    const rolePermissions = userRoles[currentUser.role]?.permissions || [];
    return rolePermissions.includes(permission);
}

// Get user's role display name
function getRoleName() {
    if (!currentUser) return '';
    return userRoles[currentUser.role]?.name || currentUser.role;
}

// Protect routes - ensure user is authenticated
function requireAuth() {
    if (!currentUser) {
        showPage('login');
        return false;
    }
    return true;
}

// Require specific role
function requireRole(allowedRoles) {
    if (!currentUser) {
        showPage('login');
        return false;
    }
    if (!allowedRoles.includes(currentUser.role)) {
        alert('You do not have permission to access this page.');
        redirectToDashboard();
        return false;
    }
    return true;
}
