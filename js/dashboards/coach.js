// Coach Dashboard Module

function loadCoachDashboard() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="container">
            <div class="dashboard">
                <aside class="sidebar">
                    <div class="sidebar-section">
                        <h4>Coach Menu</h4>
                        <ul class="sidebar-menu">
                            <li><a href="#" class="active" onclick="showCoachSection(event, 'overview')">📊 My Dashboard</a></li>
                            <li><a href="#" onclick="showCoachSection(event, 'students')">👥 My Students</a></li>
                            <li><a href="#" onclick="showCoachSection(event, 'sessions')">📅 Sessions</a></li>
                            <li><a href="#" onclick="showCoachSection(event, 'notes')">📝 Session Notes</a></li>
                            <li><a href="#" onclick="showCoachSection(event, 'resources')">📚 Resources</a></li>
                        </ul>
                    </div>
                </aside>

                <main class="main-content" id="coachContent">
                    <!-- Content will be loaded here -->
                </main>
            </div>
        </div>
    `;

    showCoachSection(null, 'overview');
}

function showCoachSection(event, section) {
    if (event) {
        event.preventDefault();
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    const coachContent = document.getElementById('coachContent');
    
    switch(section) {
        case 'overview':
            loadCoachOverview(coachContent);
            break;
        case 'students':
            loadCoachStudents(coachContent);
            break;
        case 'sessions':
            loadCoachSessions(coachContent);
            break;
        case 'notes':
            loadCoachNotes(coachContent);
            break;
        case 'resources':
            loadCoachResources(coachContent);
            break;
    }
}

function loadCoachOverview(container) {
    container.innerHTML = `
        <h1 class="page-title">Welcome Back, ${currentUser.name}!</h1>
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Active Students</h3>
                <div class="value">8</div>
                <div class="change">2 new this month</div>
            </div>
            <div class="stat-card">
                <h3>This Week's Sessions</h3>
                <div class="value">12</div>
                <div class="change">3 today</div>
            </div>
            <div class="stat-card">
                <h3>Completed Sessions</h3>
                <div class="value">156</div>
                <div class="change">+24 this month</div>
            </div>
            <div class="stat-card">
                <h3>Your Rating</h3>
                <div class="value">4.9</div>
                <div class="change">⭐⭐⭐⭐⭐</div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Today's Sessions</h2>
            <div class="lesson-list">
                ${sessions.filter(s => s.status === 'scheduled').map(session => `
                    <div class="lesson-item">
                        <div class="lesson-icon">📅</div>
                        <div class="lesson-info">
                            <h4>${session.teen} - ${session.type}</h4>
                            <p>${session.time} • ${session.duration}</p>
                        </div>
                        <button class="btn btn-primary" style="padding: 0.5rem 1rem;" onclick="startSession(${session.id})">Start Session</button>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Recent Activity</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Activity</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Alex Smith</td>
                            <td>Completed "Active Listening Practice"</td>
                            <td>2 hours ago</td>
                            <td><span class="badge badge-success">Completed</span></td>
                        </tr>
                        <tr>
                            <td>Emma Davis</td>
                            <td>Started "Emotion Check-In"</td>
                            <td>5 hours ago</td>
                            <td><span class="badge badge-warning">In Progress</span></td>
                        </tr>
                        <tr>
                            <td>Noah Williams</td>
                            <td>Session Notes Added</td>
                            <td>1 day ago</td>
                            <td><span class="badge badge-success">Completed</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Start session
function startSession(sessionId) {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
        showSuccess(`Starting session with ${session.teen}`);
        // In a real app, this would open a video call or session interface
        setTimeout(() => {
            showSessionNotesModal(session);
        }, 1000);
    }
}

function loadCoachStudents(container) {
    container.innerHTML = `
        <h1 class="page-title">My Students</h1>
        <div class="course-grid">
            <div class="course-card" onclick="viewStudentProgress('Alex Smith')">
                <div class="course-thumbnail">👦</div>
                <div class="course-content">
                    <h3>Alex Smith</h3>
                    <p>Foundation Building Program</p>
                    <div class="course-meta" style="margin-top: 1rem;">
                        <span>🎯 65% Complete</span>
                        <span>📅 12 sessions</span>
                    </div>
                    <div class="course-footer" style="margin-top: 1rem;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 65%"></div>
                        </div>
                        <span class="progress-text">65%</span>
                    </div>
                    <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;">View Progress</button>
                </div>
            </div>
            <div class="course-card" onclick="viewStudentProgress('Emma Davis')">
                <div class="course-thumbnail">👧</div>
                <div class="course-content">
                    <h3>Emma Davis</h3>
                    <p>Building Healthy Relationships</p>
                    <div class="course-meta" style="margin-top: 1rem;">
                        <span>🎯 45% Complete</span>
                        <span>📅 8 sessions</span>
                    </div>
                    <div class="course-footer" style="margin-top: 1rem;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 45%"></div>
                        </div>
                        <span class="progress-text">45%</span>
                    </div>
                    <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;">View Progress</button>
                </div>
            </div>
            <div class="course-card" onclick="viewStudentProgress('Noah Williams')">
                <div class="course-thumbnail">👦</div>
                <div class="course-content">
                    <h3>Noah Williams</h3>
                    <p>Digital Wellness</p>
                    <div class="course-meta" style="margin-top: 1rem;">
                        <span>🎯 80% Complete</span>
                        <span>📅 15 sessions</span>
                    </div>
                    <div class="course-footer" style="margin-top: 1rem;">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 80%"></div>
                        </div>
                        <span class="progress-text">80%</span>
                    </div>
                    <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;">View Progress</button>
                </div>
            </div>
        </div>
    `;
}

// View student progress
function viewStudentProgress(studentName) {
    const progress = teenProgress.teen1; // In real app, would fetch specific student's data
    
    const content = `
        <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <strong>Overall Progress:</strong>
                <span>${progress.overallProgress}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress.overallProgress}%"></div>
            </div>
        </div>

        <div class="form-group">
            <label>Skills Development</label>
            ${progress.skillsProgress.map(skill => `
                <div style="margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>${skill.skill}</span>
                        <span>${skill.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${skill.progress}%"></div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="form-group">
            <label>Recent Achievements</label>
            <ul style="list-style: none; padding: 0;">
                ${progress.recentAchievements.map(achievement => `
                    <li style="padding: 0.5rem; border-bottom: 1px solid var(--border);">
                        🏆 ${achievement}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    showModal(`${studentName}'s Progress`, content, [
        { text: 'Close', className: 'btn-outline', onclick: closeModal }
    ]);
}

function loadCoachSessions(container) {
    container.innerHTML = `
        <h1 class="page-title">Session Schedule</h1>
        <div style="margin-bottom: 1.5rem;">
            <button class="btn btn-primary" onclick="showScheduleSessionModal()">+ Schedule Session</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Student</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${sessions.map(session => `
                        <tr>
                            <td>${session.date}</td>
                            <td>${session.time}</td>
                            <td>${session.teen}</td>
                            <td>${session.type}</td>
                            <td><span class="badge badge-${session.status === 'completed' ? 'success' : session.status === 'scheduled' ? 'warning' : 'primary'}">${session.status}</span></td>
                            <td>
                                ${session.status === 'scheduled' 
                                    ? `<button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick="startSession(${session.id})">Join</button>`
                                    : `<button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick='showSessionNotesModal(${JSON.stringify(session).replace(/'/g, "&apos;")})'>View Notes</button>`
                                }
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function loadCoachNotes(container) {
    container.innerHTML = `
        <h1 class="page-title">Session Notes</h1>
        <div class="lesson-list">
            ${sessions.filter(s => s.status === 'completed' && s.notes).map(session => `
                <div class="lesson-item" style="display: block; cursor: default;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <div>
                            <h4>${session.teen} - ${session.type}</h4>
                            <p style="color: var(--text-light); font-size: 0.85rem; margin: 0.25rem 0;">${session.date} at ${session.time}</p>
                        </div>
                        <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick='showSessionNotesModal(${JSON.stringify(session).replace(/'/g, "&apos;")})'>Edit</button>
                    </div>
                    <p style="color: var(--text); line-height: 1.6;">${session.notes}</p>
                </div>
            `).join('')}
            ${sessions.filter(s => s.status === 'completed' && s.notes).length === 0 
                ? '<p style="color: var(--text-light);">No session notes yet. Complete a session and add notes to see them here.</p>' 
                : ''}
        </div>
    `;
}

function loadCoachResources(container) {
    container.innerHTML = `
        <h1 class="page-title">Coaching Resources</h1>
        <div class="course-grid">
            <div class="course-card" onclick="showSuccess('Resource opened!')">
                <div class="course-thumbnail">📖</div>
                <div class="course-content">
                    <h3>Teen Development Guide</h3>
                    <p>Comprehensive guide to adolescent psychology and development stages.</p>
                    <div class="course-meta" style="margin-top: 1rem;">
                        <span>📄 PDF</span>
                        <span>⏱️ 45 min read</span>
                    </div>
                </div>
            </div>
            <div class="course-card" onclick="showSuccess('Video loading...')">
                <div class="course-thumbnail">🎥</div>
                <div class="course-content">
                    <h3>Effective Coaching Techniques</h3>
                    <p>Video training on evidence-based coaching methods for teens.</p>
                    <div class="course-meta" style="margin-top: 1rem;">
                        <span>🎥 Video</span>
                        <span>⏱️ 60 min</span>
                    </div>
                </div>
            </div>
            <div class="course-card" onclick="showSuccess('Templates downloaded!')">
                <div class="course-thumbnail">✏️</div>
                <div class="course-content">
                    <h3>Activity Templates</h3>
                    <p>Ready-to-use worksheets and activities for coaching sessions.</p>
                    <div class="course-meta" style="margin-top: 1rem;">
                        <span>📝 Templates</span>
                        <span>⏱️ Download</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}
