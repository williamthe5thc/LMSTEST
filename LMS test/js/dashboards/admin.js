// Admin Dashboard Module - Updated with Real Data

function loadAdminDashboard() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="container">
            <div class="dashboard">
                <aside class="sidebar">
                    <div class="sidebar-section">
                        <h4>Admin Menu</h4>
                        <ul class="sidebar-menu">
                            <li><a href="#" class="active" onclick="showAdminSection(event, 'overview')">📊 Overview</a></li>
                            <li><a href="#" onclick="showAdminSection(event, 'users')">👥 User Management</a></li>
                            <li><a href="#" onclick="showAdminSection(event, 'programs')">📚 Programs</a></li>
                            <li><a href="#" onclick="showAdminSection(event, 'reports')">📈 Reports</a></li>
                            <li><a href="#" onclick="showAdminSection(event, 'settings')">⚙️ Settings</a></li>
                        </ul>
                    </div>
                </aside>

                <main class="main-content" id="adminContent">
                    <!-- Content will be loaded here -->
                </main>
            </div>
        </div>
    `;

    showAdminSection(null, 'overview');
}

function showAdminSection(event, section) {
    if (event) {
        event.preventDefault();
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    const adminContent = document.getElementById('adminContent');
    
    switch(section) {
        case 'overview':
            loadAdminOverview(adminContent);
            break;
        case 'users':
            loadAdminUsers(adminContent);
            break;
        case 'programs':
            loadAdminPrograms(adminContent);
            break;
        case 'reports':
            loadAdminReports(adminContent);
            break;
        case 'settings':
            loadAdminSettings(adminContent);
            break;
    }
}

function loadAdminOverview(container) {
    // Calculate real stats
    const totalUsers = allUsers.length;
    const totalTeens = allUsers.filter(u => u.role === 'teen').length;
    const totalPrograms = programs.length;
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.status === 'completed').length;
    const totalActivities = programs.reduce((sum, p) => sum + p.activities.length, 0);
    const completedActivitiesCount = completedActivities.length;
    const completionRate = totalActivities > 0 ? Math.round((completedActivitiesCount / totalActivities) * 100) : 0;
    
    // Get recent actual activity
    const recentUsers = allUsers.slice(-3).reverse();
    
    container.innerHTML = `
        <h1 class="page-title">Admin Dashboard</h1>
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Users</h3>
                <div class="value">${totalUsers}</div>
                <div class="change">${totalUsers} in system</div>
            </div>
            <div class="stat-card">
                <h3>Active Teens</h3>
                <div class="value">${totalTeens}</div>
                <div class="change">${totalTeens} enrolled</div>
            </div>
            <div class="stat-card">
                <h3>Total Programs</h3>
                <div class="value">${totalPrograms}</div>
                <div class="change">${totalPrograms} available</div>
            </div>
            <div class="stat-card">
                <h3>Completion Rate</h3>
                <div class="value">${completionRate}%</div>
                <div class="change">${completedActivitiesCount}/${totalActivities} activities</div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Recent Users Added</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Join Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${recentUsers.length > 0 ? recentUsers.map(user => `
                            <tr>
                                <td>${user.name}</td>
                                <td>${user.email}</td>
                                <td><span class="badge badge-${user.role === 'admin' ? 'warning' : 'primary'}">${user.role}</span></td>
                                <td>${user.joinDate}</td>
                            </tr>
                        `).join('') : '<tr><td colspan="4" style="text-align: center; color: var(--text-light);">No recent users</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">System Stats</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Total Sessions</h3>
                    <div class="value">${totalSessions}</div>
                    <div class="change">${completedSessions} completed</div>
                </div>
                <div class="stat-card">
                    <h3>Journal Entries</h3>
                    <div class="value">${journalEntries.length}</div>
                    <div class="change">Total written</div>
                </div>
                <div class="stat-card">
                    <h3>Coaches</h3>
                    <div class="value">${allUsers.filter(u => u.role === 'coach').length}</div>
                    <div class="change">Active coaches</div>
                </div>
                <div class="stat-card">
                    <h3>Parents</h3>
                    <div class="value">${allUsers.filter(u => u.role === 'parent').length}</div>
                    <div class="change">Engaged parents</div>
                </div>
            </div>
        </div>
    `;
}

function loadAdminUsers(container) {
    container.innerHTML = `
        <h1 class="page-title">User Management</h1>
        <div style="margin-bottom: 1.5rem;">
            <button class="btn btn-primary" onclick="showAddUserModal()">+ Add New User</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Join Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${allUsers.map(user => `
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td><span class="badge badge-${user.role === 'admin' ? 'warning' : 'primary'}">${user.role}</span></td>
                            <td><span class="badge badge-success">${user.status}</span></td>
                            <td>${user.joinDate}</td>
                            <td>
                                <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick='showEditUserModal(${JSON.stringify(user).replace(/'/g, "&apos;")})'>Edit</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function loadAdminPrograms(container) {
    container.innerHTML = `
        <h1 class="page-title">Program Management</h1>
        <div style="margin-bottom: 1.5rem;">
            <button class="btn btn-primary" onclick="showCreateProgramModal()">+ Create New Program</button>
        </div>
        <div class="course-grid">
            ${programs.map(program => `
                <div class="course-card">
                    <div class="course-thumbnail">📚</div>
                    <div class="course-content">
                        <div class="course-meta">
                            <span>⏱️ ${program.duration}</span>
                            <span>📝 ${program.sessions} sessions</span>
                            <span>✨ ${program.activities.length} activities</span>
                        </div>
                        <h3>${program.title}</h3>
                        <p>${program.description}</p>
                        <div style="margin-top: 1rem;">
                            <span class="badge badge-primary">${program.category}</span>
                        </div>
                        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                            <button class="btn btn-outline" style="flex: 1;" onclick="viewProgramDetails(${program.id})">View</button>
                            <button class="btn btn-primary" style="flex: 1;" onclick="editProgram(${program.id})">Edit</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// View program details (read-only)
function viewProgramDetails(programId) {
    const program = programs.find(p => p.id === programId);
    if (!program) return;

    const content = `
        <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>Duration:</strong>
                <span>${program.duration}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>Sessions:</strong>
                <span>${program.sessions}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>Category:</strong>
                <span class="badge badge-primary">${program.category}</span>
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <div style="padding: 1rem; background: var(--bg); border-radius: 8px;">
                ${program.description}
            </div>
        </div>
        ${program.content ? `
            <div class="form-group">
                <label>Program Content</label>
                <div style="padding: 1rem; background: var(--bg); border-radius: 8px; max-height: 300px; overflow-y: auto; white-space: pre-line;">
                    ${program.content}
                </div>
            </div>
        ` : ''}
        <div class="form-group">
            <label>Activities (${program.activities.length})</label>
            ${program.activities.length > 0 ? `
                <ul style="list-style: none; padding: 0;">
                    ${program.activities.map(activity => `
                        <li style="padding: 0.5rem; border-bottom: 1px solid var(--border);">
                            <strong>${activity.title}</strong> 
                            <span style="color: var(--text-light); font-size: 0.9rem;">(${activity.type} • ${activity.duration})</span>
                        </li>
                    `).join('')}
                </ul>
            ` : '<p style="color: var(--text-light);">No activities added yet.</p>'}
        </div>
    `;

    showModal(program.title, content, [
        { text: 'Close', className: 'btn-outline', onclick: closeModal },
        { text: 'Edit Program', className: 'btn-primary', onclick: () => { closeModal(); editProgram(programId); } }
    ]);
}

// Edit program - comprehensive editor
function editProgram(programId) {
    const program = programs.find(p => p.id === programId);
    if (!program) return;

    const content = `
        <form id="editProgramForm" onsubmit="handleSaveProgramEdit(event, ${programId})">
            <div class="form-group">
                <label>Program Title</label>
                <input type="text" name="title" value="${program.title}" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description" rows="3" required>${program.description}</textarea>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" name="duration" value="${program.duration}" required>
            </div>
            <div class="form-group">
                <label>Number of Sessions</label>
                <input type="number" name="sessions" value="${program.sessions}" required>
            </div>
            <div class="form-group">
                <label>Category</label>
                <select name="category" required>
                    <option value="Core Program" ${program.category === 'Core Program' ? 'selected' : ''}>Core Program</option>
                    <option value="Relationship Skills" ${program.category === 'Relationship Skills' ? 'selected' : ''}>Relationship Skills</option>
                    <option value="Wellness" ${program.category === 'Wellness' ? 'selected' : ''}>Wellness</option>
                    <option value="Personal Development" ${program.category === 'Personal Development' ? 'selected' : ''}>Personal Development</option>
                </select>
            </div>
            <div class="form-group">
                <label>Program Content (Markdown supported)</label>
                <textarea name="content" rows="10" placeholder="# Program Overview
Write your full program content here...

## What You'll Learn
- Item 1
- Item 2

## Weekly Breakdown
Week 1: ...
">${program.content || ''}</textarea>
            </div>
        </form>
    `;

    showModal(`Edit: ${program.title}`, content, [
        { text: 'Cancel', className: 'btn-outline', onclick: closeModal },
        { text: 'Manage Activities', className: 'btn-outline', onclick: () => { closeModal(); manageActivities(programId); } },
        { text: 'Save Changes', className: 'btn-primary', onclick: () => document.getElementById('editProgramForm').requestSubmit() }
    ]);
}

// Save program edits
function handleSaveProgramEdit(event, programId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const programIndex = programs.findIndex(p => p.id === programId);
    if (programIndex !== -1) {
        programs[programIndex].title = formData.get('title');
        programs[programIndex].description = formData.get('description');
        programs[programIndex].duration = formData.get('duration');
        programs[programIndex].sessions = parseInt(formData.get('sessions'));
        programs[programIndex].category = formData.get('category');
        programs[programIndex].content = formData.get('content');
    }

    saveAllData();
    closeModal();
    showSuccess('Program updated successfully!');
    loadAdminPrograms(document.getElementById('adminContent'));
}

// Manage activities for a program
function manageActivities(programId) {
    const program = programs.find(p => p.id === programId);
    if (!program) return;

    const content = `
        <div style="margin-bottom: 1.5rem;">
            <button class="btn btn-primary" onclick="addActivity(${programId})">+ Add Activity</button>
        </div>
        <div class="lesson-list">
            ${program.activities.length > 0 ? program.activities.map((activity, index) => `
                <div class="lesson-item" style="display: block;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                        <div>
                            <h4>${activity.title}</h4>
                            <p style="color: var(--text-light); margin: 0.25rem 0;">${activity.type} • ${activity.duration}</p>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;" onclick="editActivity(${programId}, ${index})">Edit</button>
                            <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem; color: var(--accent);" onclick="deleteActivity(${programId}, ${index})">Delete</button>
                        </div>
                    </div>
                    ${activity.content ? `
                        <p style="color: var(--text); font-size: 0.9rem; margin-top: 0.5rem;">${activity.content.substring(0, 100)}${activity.content.length > 100 ? '...' : ''}</p>
                    ` : ''}
                </div>
            `).join('') : '<p style="color: var(--text-light);">No activities yet. Click "Add Activity" to create one.</p>'}
        </div>
    `;

    showModal(`Activities: ${program.title}`, content, [
        { text: 'Back to Program', className: 'btn-outline', onclick: () => { closeModal(); editProgram(programId); } },
        { text: 'Done', className: 'btn-primary', onclick: closeModal }
    ]);
}

// Add new activity
function addActivity(programId) {
    const content = `
        <form id="addActivityForm" onsubmit="handleAddActivity(event, ${programId})">
            <div class="form-group">
                <label>Activity Title</label>
                <input type="text" name="title" required placeholder="e.g., Understanding Emotions">
            </div>
            <div class="form-group">
                <label>Type</label>
                <select name="type" required>
                    <option value="video">Video</option>
                    <option value="activity">Interactive Activity</option>
                    <option value="journaling">Journaling</option>
                    <option value="reading">Reading</option>
                </select>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" name="duration" required placeholder="e.g., 45 min">
            </div>
            <div class="form-group">
                <label>Content/Instructions</label>
                <textarea name="content" rows="6" placeholder="Describe what the teen will do in this activity..."></textarea>
            </div>
            <div class="form-group">
                <label>Additional Instructions (optional)</label>
                <textarea name="instructions" rows="3" placeholder="Step-by-step instructions..."></textarea>
            </div>
        </form>
    `;

    showModal('Add Activity', content, [
        { text: 'Cancel', className: 'btn-outline', onclick: () => { closeModal(); manageActivities(programId); } },
        { text: 'Add Activity', className: 'btn-primary', onclick: () => document.getElementById('addActivityForm').requestSubmit() }
    ]);
}

// Handle add activity
function handleAddActivity(event, programId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const programIndex = programs.findIndex(p => p.id === programId);
    if (programIndex !== -1) {
        const newActivity = {
            id: `act${Date.now()}`,
            title: formData.get('title'),
            type: formData.get('type'),
            duration: formData.get('duration'),
            content: formData.get('content') || '',
            instructions: formData.get('instructions') || '',
            status: programs[programIndex].activities.length === 0 ? 'available' : 'locked'
        };
        
        programs[programIndex].activities.push(newActivity);
    }

    saveAllData();
    closeModal();
    showSuccess('Activity added successfully!');
    manageActivities(programId);
}

// Edit activity
function editActivity(programId, activityIndex) {
    const program = programs.find(p => p.id === programId);
    if (!program || !program.activities[activityIndex]) return;
    
    const activity = program.activities[activityIndex];
    
    const content = `
        <form id="editActivityForm" onsubmit="handleEditActivity(event, ${programId}, ${activityIndex})">
            <div class="form-group">
                <label>Activity Title</label>
                <input type="text" name="title" value="${activity.title}" required>
            </div>
            <div class="form-group">
                <label>Type</label>
                <select name="type" required>
                    <option value="video" ${activity.type === 'video' ? 'selected' : ''}>Video</option>
                    <option value="activity" ${activity.type === 'activity' ? 'selected' : ''}>Interactive Activity</option>
                    <option value="journaling" ${activity.type === 'journaling' ? 'selected' : ''}>Journaling</option>
                    <option value="reading" ${activity.type === 'reading' ? 'selected' : ''}>Reading</option>
                </select>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" name="duration" value="${activity.duration}" required>
            </div>
            <div class="form-group">
                <label>Content/Instructions</label>
                <textarea name="content" rows="6">${activity.content || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Additional Instructions</label>
                <textarea name="instructions" rows="3">${activity.instructions || ''}</textarea>
            </div>
        </form>
    `;

    showModal('Edit Activity', content, [
        { text: 'Cancel', className: 'btn-outline', onclick: () => { closeModal(); manageActivities(programId); } },
        { text: 'Save Changes', className: 'btn-primary', onclick: () => document.getElementById('editActivityForm').requestSubmit() }
    ]);
}

// Handle edit activity
function handleEditActivity(event, programId, activityIndex) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const programIndex = programs.findIndex(p => p.id === programId);
    if (programIndex !== -1 && programs[programIndex].activities[activityIndex]) {
        programs[programIndex].activities[activityIndex].title = formData.get('title');
        programs[programIndex].activities[activityIndex].type = formData.get('type');
        programs[programIndex].activities[activityIndex].duration = formData.get('duration');
        programs[programIndex].activities[activityIndex].content = formData.get('content');
        programs[programIndex].activities[activityIndex].instructions = formData.get('instructions');
    }

    saveAllData();
    closeModal();
    showSuccess('Activity updated successfully!');
    manageActivities(programId);
}

// Delete activity
function deleteActivity(programId, activityIndex) {
    if (!confirm('Are you sure you want to delete this activity?')) return;
    
    const programIndex = programs.findIndex(p => p.id === programId);
    if (programIndex !== -1) {
        programs[programIndex].activities.splice(activityIndex, 1);
    }

    saveAllData();
    showSuccess('Activity deleted successfully!');
    manageActivities(programId);
}

function loadAdminReports(container) {
    // Calculate real stats
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter(s => s.status === 'completed').length;
    const totalActivities = programs.reduce((sum, p) => sum + p.activities.length, 0);
    const completedActivitiesCount = completedActivities.length;
    const completionRate = totalActivities > 0 ? Math.round((completedActivitiesCount / totalActivities) * 100) : 0;
    
    container.innerHTML = `
        <h1 class="page-title">Reports & Analytics</h1>
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Sessions</h3>
                <div class="value">${totalSessions}</div>
                <div class="change">${completedSessions} completed</div>
            </div>
            <div class="stat-card">
                <h3>Activity Completion</h3>
                <div class="value">${completionRate}%</div>
                <div class="change">${completedActivitiesCount}/${totalActivities} done</div>
            </div>
            <div class="stat-card">
                <h3>Programs</h3>
                <div class="value">${programs.length}</div>
                <div class="change">Total programs</div>
            </div>
            <div class="stat-card">
                <h3>Journal Entries</h3>
                <div class="value">${journalEntries.length}</div>
                <div class="change">Written by teens</div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Program Activity</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Program</th>
                            <th>Activities</th>
                            <th>Completions</th>
                            <th>Completion Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${programs.map(program => {
                            const programCompletions = completedActivities.filter(a => a.programId === program.id).length;
                            const programTotal = program.activities.length;
                            const programRate = programTotal > 0 ? Math.round((programCompletions / programTotal) * 100) : 0;
                            
                            return `
                                <tr>
                                    <td>${program.title}</td>
                                    <td>${programTotal}</td>
                                    <td>${programCompletions}</td>
                                    <td>${programRate}%</td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function loadAdminSettings(container) {
    container.innerHTML = `
        <h1 class="page-title">System Settings</h1>
        <div class="lesson-list">
            <h2 style="margin-bottom: 1.5rem;">General Settings</h2>
            <form onsubmit="handleSaveSettings(event)">
                <div class="form-group">
                    <label>Organization Name</label>
                    <input type="text" value="Connection Coaching" required>
                </div>
                <div class="form-group">
                    <label>Support Email</label>
                    <input type="email" value="support@connection.com" required>
                </div>
                <div class="form-group">
                    <label>Session Duration (default)</label>
                    <select>
                        <option>30 minutes</option>
                        <option>45 minutes</option>
                        <option selected>60 minutes</option>
                        <option>90 minutes</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Timezone</label>
                    <select>
                        <option>Eastern Time (ET)</option>
                        <option>Central Time (CT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Pacific Time (PT)</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Save Settings</button>
            </form>
            
            <h2 style="margin: 2rem 0 1.5rem;">Data Management</h2>
            <div style="background: var(--bg); padding: 1.5rem; border-radius: 8px;">
                <p style="margin-bottom: 1rem;">Total data stored: ${allUsers.length} users, ${programs.length} programs, ${completedActivities.length} completed activities, ${journalEntries.length} journal entries</p>
                <button class="btn btn-outline" onclick="if(confirm('This will reset ALL data to defaults. Are you sure?')) { localStorage.clear(); location.reload(); }">Reset All Data</button>
            </div>
        </div>
    `;
}

// Handle save settings
function handleSaveSettings(event) {
    event.preventDefault();
    saveAllData();
    showSuccess('Settings saved successfully!');
}
