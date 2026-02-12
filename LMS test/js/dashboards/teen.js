// Teen Dashboard Module

function loadTeenDashboard() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="container">
            <div class="dashboard">
                <aside class="sidebar">
                    <div class="sidebar-section">
                        <h4>My Space</h4>
                        <ul class="sidebar-menu">
                            <li><a href="#" class="active" onclick="showTeenSection(event, 'overview')">🏠 Home</a></li>
                            <li><a href="#" onclick="showTeenSection(event, 'programs')">📚 My Programs</a></li>
                            <li><a href="#" onclick="showTeenSection(event, 'activities')">✨ Activities</a></li>
                            <li><a href="#" onclick="showTeenSection(event, 'journal')">📝 Journal</a></li>
                            <li><a href="#" onclick="showTeenSection(event, 'sessions')">📅 Sessions</a></li>
                            <li><a href="#" onclick="showTeenSection(event, 'achievements')">🏆 Achievements</a></li>
                        </ul>
                    </div>
                </aside>

                <main class="main-content" id="teenContent">
                    <!-- Content will be loaded here -->
                </main>
            </div>
        </div>
    `;

    showTeenSection(null, 'overview');
}

function showTeenSection(event, section) {
    if (event) {
        event.preventDefault();
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    const teenContent = document.getElementById('teenContent');
    
    switch(section) {
        case 'overview':
            loadTeenOverview(teenContent);
            break;
        case 'programs':
            loadTeenPrograms(teenContent);
            break;
        case 'activities':
            loadTeenActivities(teenContent);
            break;
        case 'journal':
            loadTeenJournal(teenContent);
            break;
        case 'sessions':
            loadTeenSessions(teenContent);
            break;
        case 'achievements':
            loadTeenAchievements(teenContent);
            break;
    }
}

// Get teen's actual progress data
function getTeenProgress() {
    if (!currentUser || !teenProgress[currentUser.id]) {
        // Initialize progress for new teen
        teenProgress[currentUser.id] = {
            name: currentUser.name,
            overallProgress: 0,
            programsEnrolled: 0,
            sessionsCompleted: 0,
            activitiesCompleted: 0,
            recentAchievements: [],
            skillsProgress: [
                { skill: "Emotional Awareness", progress: 0 },
                { skill: "Communication", progress: 0 },
                { skill: "Self-Regulation", progress: 0 },
                { skill: "Empathy", progress: 0 }
            ]
        };
        saveAllData();
    }
    return teenProgress[currentUser.id];
}

// Get teen's enrolled programs
function getTeenPrograms() {
    // Get programs where teen has started activities
    const completedActivities = getCompletedActivitiesForTeen();
    const enrolledProgramIds = [...new Set(completedActivities.map(a => a.programId))];
    return programs.filter(p => enrolledProgramIds.includes(p.id));
}

// Get completed activities for current teen
function getCompletedActivitiesForTeen() {
    if (!currentUser) return [];
    return completedActivities.filter(a => a.teenId === currentUser.id);
}

// Get sessions for current teen
function getTeenSessions() {
    if (!currentUser) return [];
    return sessions.filter(s => s.teen === currentUser.name);
}

function loadTeenOverview(container) {
    const progress = getTeenProgress();
    const upcomingSessions = getTeenSessions().filter(s => s.status === 'scheduled');
    
    container.innerHTML = `
        <h1 class="page-title">Hey ${currentUser.name}! 👋</h1>
        
        <div class="course-header" style="margin-bottom: 2rem;">
            <h1 style="font-size: 2rem;">Your Growth Journey</h1>
            <p>You're doing amazing! Keep up the great work 🌟</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <h3>Overall Progress</h3>
                <div class="value">${progress.overallProgress}%</div>
                <div class="change">Keep going! 💪</div>
            </div>
            <div class="stat-card">
                <h3>Activities Completed</h3>
                <div class="value">${progress.activitiesCompleted}</div>
                <div class="change">+${Math.min(3, progress.activitiesCompleted)} this week</div>
            </div>
            <div class="stat-card">
                <h3>Programs Enrolled</h3>
                <div class="value">${progress.programsEnrolled}</div>
                <div class="change">${progress.programsEnrolled > 0 ? 'Active' : 'Get started!'}</div>
            </div>
            <div class="stat-card">
                <h3>Sessions Completed</h3>
                <div class="value">${progress.sessionsCompleted}</div>
                <div class="change">Great work!</div>
            </div>
        </div>

        ${upcomingSessions.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Upcoming Sessions</h2>
                <div class="lesson-list">
                    ${upcomingSessions.slice(0, 2).map(session => `
                        <div class="lesson-item">
                            <div class="lesson-icon">📅</div>
                            <div class="lesson-info">
                                <h4>${session.type} with ${session.coach}</h4>
                                <p>${session.date} at ${session.time} • ${session.duration}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}

        <div class="section">
            <h2 class="section-title">Your Skills 🎯</h2>
            <div class="lesson-list">
                ${progress.skillsProgress.map(skill => `
                    <div class="lesson-item" style="display: block;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                            <h4>${skill.skill}</h4>
                            <span class="progress-text">${skill.progress}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${skill.progress}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Browse Programs</h2>
            <div style="margin-bottom: 1rem;">
                <button class="btn btn-primary" onclick="showTeenSection(null, 'programs')">View All Programs</button>
            </div>
        </div>
    `;
}

function loadTeenPrograms(container) {
    const enrolledPrograms = getTeenPrograms();
    const availablePrograms = programs.filter(p => !enrolledPrograms.find(ep => ep.id === p.id));

    container.innerHTML = `
        <h1 class="page-title">My Programs</h1>
        
        ${enrolledPrograms.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Currently Enrolled</h2>
                <div class="course-grid">
                    ${enrolledPrograms.map(program => {
                        const completed = getCompletedActivitiesForTeen().filter(a => a.programId === program.id);
                        const totalActivities = program.activities.length;
                        const progressPercent = totalActivities > 0 ? Math.round((completed.length / totalActivities) * 100) : 0;
                        
                        return `
                            <div class="course-card" onclick="viewTeenProgram(${program.id})">
                                <div class="course-thumbnail">📚</div>
                                <div class="course-content">
                                    <div class="course-meta">
                                        <span>⏱️ ${program.duration}</span>
                                        <span>📝 ${program.sessions} sessions</span>
                                    </div>
                                    <h3>${program.title}</h3>
                                    <p>${program.description}</p>
                                    <div class="course-footer" style="margin-top: 1rem;">
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${progressPercent}%"></div>
                                        </div>
                                        <span class="progress-text">${progressPercent}%</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        ` : ''}

        <div class="section">
            <h2 class="section-title">${enrolledPrograms.length > 0 ? 'More Programs' : 'Available Programs'}</h2>
            <div class="course-grid">
                ${availablePrograms.map(program => `
                    <div class="course-card" onclick="viewTeenProgram(${program.id})">
                        <div class="course-thumbnail">📚</div>
                        <div class="course-content">
                            <div class="course-meta">
                                <span>⏱️ ${program.duration}</span>
                                <span>📝 ${program.sessions} sessions</span>
                            </div>
                            <h3>${program.title}</h3>
                            <p>${program.description}</p>
                            <button class="btn btn-outline" style="margin-top: 1rem; width: 100%;">View Details</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function viewTeenProgram(programId) {
    const program = programs.find(p => p.id === programId);
    const teenContent = document.getElementById('teenContent');
    const completedForThisProgram = getCompletedActivitiesForTeen().filter(a => a.programId === programId);
    
    teenContent.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <button class="btn btn-outline" onclick="loadTeenPrograms(document.getElementById('teenContent'))">← Back to Programs</button>
        </div>
        
        <div class="course-header">
            <h1>${program.title}</h1>
            <p>${program.description}</p>
        </div>

        <div class="section">
            <div class="lesson-list">
                <h2 style="margin-bottom: 1.5rem;">Program Overview</h2>
                <div style="white-space: pre-line; line-height: 1.8; color: var(--text);">
                    ${program.content || 'Program content coming soon...'}
                </div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Activities & Lessons</h2>
            <div class="lesson-list">
                ${program.activities.length > 0 ? program.activities.map((activity, index) => {
                    const isCompleted = completedForThisProgram.find(a => a.activityId === activity.id);
                    const isLocked = activity.status === 'locked' && index > 0 && !completedForThisProgram.find(a => a.activityId === program.activities[index - 1].id);
                    
                    return `
                        <div class="lesson-item" onclick="${!isLocked ? `startActivity(${program.id}, '${activity.id}')` : ''}">
                            <div class="lesson-icon">
                                ${isCompleted ? '✓' : isLocked ? '🔒' : '▶'}
                            </div>
                            <div class="lesson-info">
                                <h4>${activity.title}</h4>
                                <p>${activity.type} • ${activity.duration}</p>
                            </div>
                            <span class="lesson-status status-${isCompleted ? 'completed' : isLocked ? 'locked' : 'in-progress'}">
                                ${isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Start'}
                            </span>
                        </div>
                    `;
                }).join('') : '<p style="color: var(--text-light);">No activities available yet.</p>'}
            </div>
        </div>

        ${program.assessment && program.assessment.questions.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Program Assessment</h2>
                <div class="lesson-list">
                    <p style="margin-bottom: 1rem;">Complete all activities to unlock the assessment.</p>
                    <button class="btn btn-primary" onclick="startAssessment(${program.id})" ${completedForThisProgram.length < program.activities.length ? 'disabled' : ''}>
                        Take Assessment
                    </button>
                </div>
            </div>
        ` : ''}
    `;
}

// Start an activity
function startActivity(programId, activityId) {
    const program = programs.find(p => p.id === programId);
    const activity = program.activities.find(a => a.id === activityId);
    
    if (!activity) return;

    const content = `
        <div class="lesson-list">
            <h2 style="margin-bottom: 1rem;">${activity.title}</h2>
            <div style="margin-bottom: 1.5rem;">
                <span class="badge badge-primary">${activity.type}</span>
                <span class="badge badge-warning">${activity.duration}</span>
            </div>
            
            <div style="white-space: pre-line; line-height: 1.8; margin-bottom: 2rem;">
                ${activity.content || 'Activity content...'}
            </div>

            ${activity.instructions ? `
                <div style="background: var(--bg); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <strong>Instructions:</strong>
                    <p style="margin-top: 0.5rem;">${activity.instructions}</p>
                </div>
            ` : ''}

            ${activity.type === 'journaling' && activity.prompts ? `
                <div class="form-group">
                    <label>Reflection Prompts:</label>
                    <ul style="margin-top: 0.5rem;">
                        ${activity.prompts.map(prompt => `<li>${prompt}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <form id="completeActivityForm" onsubmit="handleCompleteActivity(event, ${programId}, '${activityId}')">
                <div class="form-group">
                    <label>Your Notes (Optional)</label>
                    <textarea name="notes" rows="4" placeholder="Add any notes or reflections about this activity..."></textarea>
                </div>
            </form>
        </div>
    `;

    showModal(activity.title, content, [
        { text: 'Close', className: 'btn-outline', onclick: closeModal },
        { text: 'Mark as Complete', className: 'btn-primary', onclick: () => document.getElementById('completeActivityForm').requestSubmit() }
    ]);
}

// Handle activity completion
function handleCompleteActivity(event, programId, activityId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Check if already completed
    const existing = completedActivities.find(a => 
        a.teenId === currentUser.id && 
        a.programId === programId && 
        a.activityId === activityId
    );
    
    if (!existing) {
        completedActivities.push({
            teenId: currentUser.id,
            programId: programId,
            activityId: activityId,
            completedDate: new Date().toISOString(),
            notes: formData.get('notes') || ''
        });

        // Update teen progress
        const progress = getTeenProgress();
        progress.activitiesCompleted = getCompletedActivitiesForTeen().length;
        progress.programsEnrolled = getTeenPrograms().length;
        
        // Update overall progress
        const totalActivities = programs.reduce((sum, p) => sum + p.activities.length, 0);
        progress.overallProgress = totalActivities > 0 
            ? Math.round((progress.activitiesCompleted / totalActivities) * 100) 
            : 0;

        saveAllData();
    }

    closeModal();
    showSuccess('Activity completed! Great work! 🎉');
    
    // Reload the program view
    setTimeout(() => {
        viewTeenProgram(programId);
    }, 500);
}

function loadTeenActivities(container) {
    container.innerHTML = `
        <h1 class="page-title">Daily Activities ✨</h1>
        <div class="course-grid">
            ${activities.map(activity => `
                <div class="course-card" onclick="completeQuickActivity(${activity.id})">
                    <div class="course-thumbnail">✨</div>
                    <div class="course-content">
                        <h3>${activity.title}</h3>
                        <p>${activity.description}</p>
                        <div style="margin: 1rem 0;">
                            <span class="badge badge-primary">${activity.category}</span>
                            <span class="badge badge-warning">${activity.points} points</span>
                        </div>
                        <button class="btn btn-primary" style="width: 100%;">Start Activity</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Complete a quick daily activity
function completeQuickActivity(activityId) {
    const activity = activities.find(a => a.id === activityId);
    if (!activity) return;

    const progress = getTeenProgress();
    progress.activitiesCompleted++;
    saveAllData();

    showSuccess(`${activity.title} completed! +${activity.points} points earned! 🌟`);
    
    // Update the view
    setTimeout(() => {
        loadTeenActivities(document.getElementById('teenContent'));
    }, 1000);
}

function loadTeenJournal(container) {
    const randomPrompt = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    const teenJournals = journalEntries.filter(j => j.teenId === currentUser.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = `
        <h1 class="page-title">My Journal 📝</h1>
        
        <div class="lesson-list" style="margin-bottom: 2rem;">
            <div style="padding: 2rem; background: linear-gradient(135deg, var(--accent), var(--accent-light)); color: white; border-radius: 12px;">
                <h3 style="color: white; margin-bottom: 1rem;">Today's Prompt</h3>
                <p style="font-size: 1.2rem; opacity: 0.95;">${randomPrompt}</p>
            </div>
        </div>

        <div class="lesson-list">
            <form onsubmit="handleSaveJournalEntry(event)">
                <div class="form-group">
                    <label>Write your thoughts...</label>
                    <textarea id="journalEntry" rows="8" placeholder="Express yourself freely here. Your journal is private and only you can see it." required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Save Entry</button>
            </form>
        </div>

        ${teenJournals.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Recent Entries</h2>
                <div class="lesson-list">
                    ${teenJournals.slice(0, 5).map(entry => `
                        <div class="lesson-item" style="display: block; cursor: pointer;" onclick="viewJournalEntry('${entry.id}')">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <h4>${new Date(entry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h4>
                                <span style="color: var(--text-light); font-size: 0.9rem;">${getTimeAgo(entry.date)}</span>
                            </div>
                            <p style="color: var(--text-light); margin-top: 0.5rem;">${entry.content.substring(0, 150)}${entry.content.length > 150 ? '...' : ''}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
}

// Save journal entry
function handleSaveJournalEntry(event) {
    event.preventDefault();
    const content = document.getElementById('journalEntry').value;
    
    journalEntries.push({
        id: `journal${Date.now()}`,
        teenId: currentUser.id,
        date: new Date().toISOString(),
        content: content
    });

    saveAllData();
    showSuccess('Journal entry saved! 📝');
    
    // Clear form and reload
    document.getElementById('journalEntry').value = '';
    setTimeout(() => {
        loadTeenJournal(document.getElementById('teenContent'));
    }, 500);
}

// View full journal entry
function viewJournalEntry(entryId) {
    const entry = journalEntries.find(j => j.id === entryId);
    if (!entry) return;

    const content = `
        <div style="margin-bottom: 1rem;">
            <strong>Date:</strong> ${new Date(entry.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}
        </div>
        <div style="white-space: pre-line; line-height: 1.8;">
            ${entry.content}
        </div>
    `;

    showModal('Journal Entry', content, [
        { text: 'Close', className: 'btn-outline', onclick: closeModal }
    ]);
}

// Get time ago helper
function getTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
}

function loadTeenSessions(container) {
    const teenSessions = getTeenSessions();
    const upcoming = teenSessions.filter(s => s.status === 'scheduled');
    const completed = teenSessions.filter(s => s.status === 'completed');
    
    container.innerHTML = `
        <h1 class="page-title">My Sessions 📅</h1>
        
        ${upcoming.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Upcoming</h2>
                <div class="lesson-list">
                    ${upcoming.map(session => `
                        <div class="lesson-item">
                            <div class="lesson-icon">📅</div>
                            <div class="lesson-info">
                                <h4>${session.type} with ${session.coach}</h4>
                                <p>${session.date} at ${session.time} • ${session.duration}</p>
                            </div>
                            <span class="badge badge-warning">Scheduled</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '<p style="color: var(--text-light); margin: 2rem 0;">No upcoming sessions scheduled.</p>'}

        ${completed.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Past Sessions</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Coach</th>
                                <th>Type</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${completed.map(session => `
                                <tr>
                                    <td>${session.date}</td>
                                    <td>${session.coach}</td>
                                    <td>${session.type}</td>
                                    <td>${session.duration}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        ` : ''}
    `;
}

function loadTeenAchievements(container) {
    const progress = getTeenProgress();
    
    container.innerHTML = `
        <h1 class="page-title">My Achievements 🏆</h1>
        
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Points</h3>
                <div class="value">${progress.activitiesCompleted * 10}</div>
                <div class="change">🌟 Keep it up!</div>
            </div>
            <div class="stat-card">
                <h3>Activities Done</h3>
                <div class="value">${progress.activitiesCompleted}</div>
                <div class="change">Amazing!</div>
            </div>
            <div class="stat-card">
                <h3>Programs Enrolled</h3>
                <div class="value">${progress.programsEnrolled}</div>
                <div class="change">Great start!</div>
            </div>
            <div class="stat-card">
                <h3>Sessions Attended</h3>
                <div class="value">${progress.sessionsCompleted}</div>
                <div class="change">Excellent!</div>
            </div>
        </div>

        ${progress.recentAchievements.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Recent Achievements</h2>
                <div class="lesson-list">
                    ${progress.recentAchievements.map(achievement => `
                        <div class="lesson-item">
                            <div class="lesson-icon">🏆</div>
                            <div class="lesson-info">
                                <h4>${achievement}</h4>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}

        <div class="section">
            <h2 class="section-title">Skills Progress</h2>
            <div class="lesson-list">
                ${progress.skillsProgress.map(skill => `
                    <div class="lesson-item" style="display: block;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                            <h4>${skill.skill}</h4>
                            <span class="progress-text">${skill.progress}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${skill.progress}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Start assessment
function startAssessment(programId) {
    const program = programs.find(p => p.id === programId);
    if (!program || !program.assessment) return;

    showSuccess('Assessment feature coming soon! 🎯');
    // TODO: Implement assessment taking interface
}
