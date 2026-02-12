// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data from localStorage
    initializeData();
    
    // Enable auto-save
    enableAutoSave();
    
    // Check authentication status
    checkAuth();
    
    // Initialize the application
    init();
});

// Initialize application
function init() {
    // Load the home page by default (auth.js will redirect if needed)
    // No action needed here as checkAuth handles it
}

// Add keyboard shortcut for data management (Admin only)
document.addEventListener('keydown', function(e) {
    // Ctrl+Shift+R to reset all data (admin only)
    if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        if (currentUser && currentUser.role === 'admin') {
            clearAllData();
        }
    }
});
