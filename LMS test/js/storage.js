// Data persistence and state management module

// Save data to localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving to localStorage:', e);
        return false;
    }
}

// Load data from localStorage
function loadFromStorage(key, defaultValue) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return defaultValue;
    }
}

// Initialize data from localStorage or use defaults
function initializeData() {
    // Load users
    const savedUsers = loadFromStorage('allUsers', null);
    if (savedUsers) {
        allUsers.length = 0;
        allUsers.push(...savedUsers);
    }

    const savedSampleUsers = loadFromStorage('sampleUsers', null);
    if (savedSampleUsers) {
        sampleUsers.length = 0;
        sampleUsers.push(...savedSampleUsers);
    }

    // Load programs
    const savedPrograms = loadFromStorage('programs', null);
    if (savedPrograms) {
        programs.length = 0;
        programs.push(...savedPrograms);
    }

    // Load sessions
    const savedSessions = loadFromStorage('sessions', null);
    if (savedSessions) {
        sessions.length = 0;
        sessions.push(...savedSessions);
    }

    // Load teen progress
    const savedTeenProgress = loadFromStorage('teenProgress', null);
    if (savedTeenProgress) {
        Object.keys(savedTeenProgress).forEach(key => {
            teenProgress[key] = savedTeenProgress[key];
        });
    }

    // Load journal entries
    const savedJournals = loadFromStorage('journalEntries', null);
    if (savedJournals) {
        journalEntries.length = 0;
        journalEntries.push(...savedJournals);
    }

    // Load completed activities
    const savedCompletedActivities = loadFromStorage('completedActivities', null);
    if (savedCompletedActivities) {
        completedActivities.length = 0;
        completedActivities.push(...savedCompletedActivities);
    }
}

// Save all data
function saveAllData() {
    saveToStorage('allUsers', allUsers);
    saveToStorage('sampleUsers', sampleUsers);
    saveToStorage('programs', programs);
    saveToStorage('sessions', sessions);
    saveToStorage('teenProgress', teenProgress);
    saveToStorage('journalEntries', journalEntries);
    saveToStorage('completedActivities', completedActivities);
}

// Clear all data (reset to defaults)
function clearAllData() {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        localStorage.clear();
        location.reload();
    }
}

// Auto-save data whenever it changes
function enableAutoSave() {
    // Save data every time there's a change
    setInterval(() => {
        saveAllData();
    }, 5000); // Auto-save every 5 seconds
}
