// Navigation module for Connection Coaching LMS
let currentPage = 'login';

// Show specific page
function showPage(pageName) {
    currentPage = pageName;

    // Get content container
    const appContent = document.getElementById('app-content');
    const navbar = document.getElementById('mainNav');
    
    // Show/hide navbar based on authentication
    if (currentUser && pageName !== 'login') {
        navbar.classList.remove('hidden');
        updateNavbar();
    } else {
        navbar.classList.add('hidden');
    }
    
    // Load the appropriate page content
    switch(pageName) {
        case 'login':
            loadLoginPage();
            break;
        case 'admin-dashboard':
            if (requireRole(['admin'])) loadAdminDashboard();
            break;
        case 'staff-dashboard':
            if (requireRole(['staff', 'admin'])) loadStaffDashboard();
            break;
        case 'coach-dashboard':
            if (requireRole(['coach', 'admin'])) loadCoachDashboard();
            break;
        case 'parent-dashboard':
            if (requireRole(['parent', 'admin'])) loadParentDashboard();
            break;
        case 'teen-dashboard':
            if (requireRole(['teen', 'admin'])) loadTeenDashboard();
            break;
        default:
            loadLoginPage();
    }
}

// Update navbar with user info
function updateNavbar() {
    const userName = document.getElementById('userName');
    const userRole = document.getElementById('userRole');
    
    if (currentUser) {
        userName.textContent = currentUser.name;
        userRole.textContent = getRoleName();
    }
}

// Load login page
function loadLoginPage() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="auth-page">
            <div class="auth-container">
                <div class="auth-visual">
                    <h2>Connection Coaching</h2>
                    <p>Empowering teens through meaningful connections and personal growth.</p>
                    <div style="margin-top: 2rem; font-size: 0.9rem; opacity: 0.8;">
                        <p style="margin-bottom: 0.5rem;"><strong>Welcome!</strong></p>
                        <p style="margin: 0.25rem 0;">Sign in with your credentials to access your personalized dashboard.</p>
                        <p style="margin: 0.25rem 0; margin-top: 1rem;">New to Connection Coaching? Contact your administrator for access.</p>
                    </div>
                </div>
                <div class="auth-form">
                    <h3>Sign In</h3>
                    <p>Access your Connection Coaching portal</p>
                    <form onsubmit="login(event)">
                        <div class="form-group">
                            <label for="loginEmail">Email Address</label>
                            <input type="email" id="loginEmail" required placeholder="your@email.com" autocomplete="email">
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">Password</label>
                            <input type="password" id="loginPassword" required placeholder="Enter your password" autocomplete="current-password">
                        </div>
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Sign In</button>
                        <div class="form-footer">
                            <a href="#" onclick="alert('Contact your administrator to reset your password.'); return false;">Forgot password?</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}
