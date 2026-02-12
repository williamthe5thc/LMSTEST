// Parent Dashboard Module

function loadParentDashboard() {
    const appContent = document.getElementById('app-content');
    
    appContent.innerHTML = `
        <div class="container">
            <div class="dashboard">
                <aside class="sidebar">
                    <div class="sidebar-section">
                        <h4>Parent Portal</h4>
                        <ul class="sidebar-menu">
                            <li><a href="#" class="active" onclick="showParentSection(event, 'overview')">📊 Overview</a></li>
                            <li><a href="#" onclick="showParentSection(event, 'progress')">📈 Teen's Progress</a></li>
                            <li><a href="#" onclick="showParentSection(event, 'sessions')">📅 Sessions</a></li>
                            <li><a href="#" onclick="showParentSection(event, 'messages')">💬 Messages</a></li>
                            <li><a href="#" onclick="showParentSection(event, 'resources')">📚 Resources</a></li>
                        </ul>
                    </div>
                </aside>

                <main class="main-content" id="parentContent">
                    <!-- Content will be loaded here -->
                </main>
            </div>
        </div>
    `;

    showParentSection(null, 'overview');
}

function showParentSection(event, section) {
    if (event) {
        event.preventDefault();
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    const parentContent = document.getElementById('parentContent');
    
    switch(section) {
        case 'overview':
            loadParentOverview(parentContent);
            break;
        case 'progress':
            loadParentProgress(parentContent);
            break;
        case 'sessions':
            loadParentSessions(parentContent);
            break;
        case 'messages':
            loadParentMessages(parentContent);
            break;
        case 'resources':
            loadParentResources(parentContent);
            break;
    }
}

// Get linked teen's data
function getLinkedTeen() {
    if (!currentUser || !currentUser.linkedTeen) {
        return null;
    }
    return teenProgress[currentUser.linkedTeen] || null;
}

// Get linked teen's sessions
function getLinkedTeenSessions() {
    if (!currentUser || !currentUser.linkedTeen) return [];
    
    const teenData = getLinkedTeen();
    if (!teenData) return [];
    
    return sessions.filter(s => s.teen === teenData.name);
}

function loadParentOverview(container) {
    const linkedTeen = getLinkedTeen();
    
    if (!linkedTeen) {
        container.innerHTML = `
            <h1 class="page-title">Welcome, ${currentUser.name}!</h1>
            <div class="lesson-list">
                <p style="color: var(--text-light);">No teen linked to your account. Please contact your administrator.</p>
            </div>
        `;
        return;
    }

    const upcomingSessions = getLinkedTeenSessions().filter(s => s.status === 'scheduled');
    
    container.innerHTML = `
        <h1 class="page-title">Welcome, ${currentUser.name}!</h1>
        <div class="course-header" style="margin-bottom: 2rem;">
            <h1 style="font-size: 2rem;">${linkedTeen.name}'s Journey</h1>
            <p>Track your teen's progress and stay connected with their growth</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <h3>Overall Progress</h3>
                <div class="value">${linkedTeen.overallProgress}%</div>
                <div class="change">On track</div>
            </div>
            <div class="stat-card">
                <h3>Programs Enrolled</h3>
                <div class="value">${linkedTeen.programsEnrolled}</div>
                <div class="change">Active participation</div>
            </div>
            <div class="stat-card">
                <h3>Sessions Completed</h3>
                <div class="value">${linkedTeen.sessionsCompleted}</div>
                <div class="change">Great attendance</div>
            </div>
            <div class="stat-card">
                <h3>Activities Done</h3>
                <div class="value">${linkedTeen.activitiesCompleted}</div>
                <div class="change">Highly engaged</div>
            </div>
        </div>

        ${linkedTeen.recentAchievements && linkedTeen.recentAchievements.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Recent Achievements 🎉</h2>
                <div class="lesson-list">
                    ${linkedTeen.recentAchievements.map(achievement => `
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

        ${upcomingSessions.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Upcoming Sessions</h2>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Coach</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${upcomingSessions.map(session => `
                                <tr>
                                    <td>${session.date}</td>
                                    <td>${session.time}</td>
                                    <td>${session.coach}</td>
                                    <td>${session.type}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        ` : ''}
    `;
}

function loadParentProgress(container) {
    const linkedTeen = getLinkedTeen();
    
    if (!linkedTeen) {
        container.innerHTML = '<p style="color: var(--text-light);">No teen data available.</p>';
        return;
    }
    
    // Get teen's enrolled programs
    const teenCompletedActivities = completedActivities.filter(a => a.teenId === currentUser.linkedTeen);
    const enrolledProgramIds = [...new Set(teenCompletedActivities.map(a => a.programId))];
    const enrolledPrograms = programs.filter(p => enrolledProgramIds.includes(p.id));
    
    container.innerHTML = `
        <h1 class="page-title">${linkedTeen.name}'s Progress</h1>
        
        <div class="section">
            <h2 class="section-title">Skills Development</h2>
            <div class="lesson-list">
                ${linkedTeen.skillsProgress.map(skill => `
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

        ${enrolledPrograms.length > 0 ? `
            <div class="section">
                <h2 class="section-title">Program Progress</h2>
                <div class="course-grid">
                    ${enrolledPrograms.map(program => {
                        const completed = teenCompletedActivities.filter(a => a.programId === program.id);
                        const totalActivities = program.activities.length;
                        const progressPercent = totalActivities > 0 ? Math.round((completed.length / totalActivities) * 100) : 0;
                        
                        return `
                            <div class="course-card">
                                <div class="course-thumbnail">📚</div>
                                <div class="course-content">
                                    <h3>${program.title}</h3>
                                    <p>${program.description}</p>
                                    <div class="course-meta" style="margin-top: 1rem;">
                                        <span>⏱️ ${program.duration}</span>
                                        <span>📝 ${completed.length}/${totalActivities} activities</span>
                                    </div>
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
        ` : '<p style="color: var(--text-light); margin: 2rem 0;">Not enrolled in any programs yet.</p>'}
    `;
}

function loadParentSessions(container) {
    const teenSessions = getLinkedTeenSessions();
    
    container.innerHTML = `
        <h1 class="page-title">Session History</h1>
        ${teenSessions.length > 0 ? `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Coach</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${teenSessions.map(session => `
                            <tr>
                                <td>${session.date}</td>
                                <td>${session.time}</td>
                                <td>${session.coach}</td>
                                <td>${session.type}</td>
                                <td><span class="badge badge-${session.status === 'completed' ? 'success' : 'warning'}">${session.status}</span></td>
                                <td>
                                    ${session.notes 
                                        ? `<button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick='showSessionNotesModal(${JSON.stringify(session).replace(/'/g, "&apos;")})'>View</button>`
                                        : '<span style="color: var(--text-light);">-</span>'
                                    }
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        ` : '<p style="color: var(--text-light); margin: 2rem 0;">No sessions recorded yet.</p>'}
    `;
}

function loadParentMessages(container) {
    container.innerHTML = `
        <h1 class="page-title">Messages</h1>
        <div style="margin-bottom: 1.5rem;">
            <button class="btn btn-primary" onclick="sendMessageToCoach()">+ New Message</button>
        </div>
        <div class="lesson-list">
            <div class="lesson-item" style="display: block;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.75rem;">
                    <div>
                        <h4>Coach (Sample Message)</h4>
                        <p style="color: var(--text-light); font-size: 0.85rem; margin: 0.25rem 0;">Sample message</p>
                    </div>
                    <span class="badge badge-primary">Unread</span>
                </div>
                <p style="color: var(--text);">Hi ${currentUser.name}, messaging feature is being developed. You can send messages to coaches soon!</p>
                <button class="btn btn-outline" style="margin-top: 0.75rem; padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick="replyToMessage()">Reply</button>
            </div>
        </div>
    `;
}

// Send message to coach
function sendMessageToCoach() {
    const content = `
        <form id="messageForm" onsubmit="handleSendMessage(event)">
            <div class="form-group">
                <label>To: Coach</label>
                <select name="coach" required>
                    <option value="">Select a coach</option>
                    ${[...new Set(sessions.map(s => s.coach))].map(coach => `
                        <option value="${coach}">${coach}</option>
                    `).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Subject</label>
                <input type="text" name="subject" required placeholder="Enter message subject">
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea name="message" rows="6" required placeholder="Type your message..."></textarea>
            </div>
        </form>
    `;

    showModal('New Message to Coach', content, [
        { text: 'Cancel', className: 'btn-outline', onclick: closeModal },
        { text: 'Send Message', className: 'btn-primary', onclick: () => document.getElementById('messageForm').requestSubmit() }
    ]);
}

// Reply to message
function replyToMessage() {
    const content = `
        <form id="replyForm" onsubmit="handleSendReply(event)">
            <div class="form-group">
                <label>Reply to: Coach</label>
            </div>
            <div class="form-group">
                <label>Your Reply</label>
                <textarea name="reply" rows="6" required placeholder="Type your reply..."></textarea>
            </div>
        </form>
    `;

    showModal('Reply to Message', content, [
        { text: 'Cancel', className: 'btn-outline', onclick: closeModal },
        { text: 'Send Reply', className: 'btn-primary', onclick: () => document.getElementById('replyForm').requestSubmit() }
    ]);
}

// Handle send message
function handleSendMessage(event) {
    event.preventDefault();
    closeModal();
    showSuccess('Message sent successfully!');
}

// Handle send reply
function handleSendReply(event) {
    event.preventDefault();
    closeModal();
    showSuccess('Reply sent successfully!');
}

function loadParentResources(container) {
    container.innerHTML = `
        <h1 class="page-title">Parent Resources</h1>
        <div class="course-grid">
            ${parentResources.map(resource => `
                <div class="course-card" onclick="showSuccess('Opening ${resource.title}...')">
                    <div class="course-thumbnail">${resource.type === 'Video' ? '🎥' : resource.type === 'Article' ? '📖' : '📄'}</div>
                    <div class="course-content">
                        <h3>${resource.title}</h3>
                        <div class="course-meta" style="margin-top: 1rem;">
                            <span>📚 ${resource.type}</span>
                            <span>⏱️ ${resource.duration}</span>
                        </div>
                        <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;">Access Resource</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}
