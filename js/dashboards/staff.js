// Staff Dashboard Module

function loadStaffDashboard() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="container">
            <div class="dashboard">
                <aside class="sidebar">
                    <div class="sidebar-section">
                        <h4>Staff Menu</h4>
                        <ul class="sidebar-menu">
                            <li><a href="#" class="active" onclick="showStaffSection(event, 'overview')">📊 Overview</a></li>
                            <li><a href="#" onclick="showStaffSection(event, 'students')">👥 All Students</a></li>
                            <li><a href="#" onclick="showStaffSection(event, 'programs')">📚 Programs</a></li>
                            <li><a href="#" onclick="showStaffSection(event, 'schedules')">📅 Schedules</a></li>
                            <li><a href="#" onclick="showStaffSection(event, 'reports')">📈 Reports</a></li>
                        </ul>
                    </div>
                </aside>

                <main class="main-content" id="staffContent">
                    <!-- Content will be loaded here -->
                </main>
            </div>
        </div>
    `;

    showStaffSection(null, 'overview');
}

function showStaffSection(event, section) {
    if (event) {
        event.preventDefault();
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    const staffContent = document.getElementById('staffContent');
    
    switch(section) {
        case 'overview':
            loadStaffOverview(staffContent);
            break;
        case 'students':
            loadStaffStudents(staffContent);
            break;
        case 'programs':
            loadStaffPrograms(staffContent);
            break;
        case 'schedules':
            loadStaffSchedules(staffContent);
            break;
        case 'reports':
            loadStaffReports(staffContent);
            break;
    }
}

function loadStaffOverview(container) {
    container.innerHTML = `
        <h1 class="page-title">Staff Dashboard</h1>
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Active Students</h3>
                <div class="value">${reportsData.totalTeens}</div>
                <div class="change">+5 this month</div>
            </div>
            <div class="stat-card">
                <h3>Programs Running</h3>
                <div class="value">${reportsData.activePrograms}</div>
                <div class="change">All on track</div>
            </div>
            <div class="stat-card">
                <h3>This Week's Sessions</h3>
                <div class="value">38</div>
                <div class="change">12 completed</div>
            </div>
            <div class="stat-card">
                <h3>Completion Rate</h3>
                <div class="value">${reportsData.completionRate}%</div>
                <div class="change">Above target</div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Today's Schedule</h2>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Student</th>
                            <th>Coach</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2:00 PM</td>
                            <td>Alex Smith</td>
                            <td>Sarah Johnson</td>
                            <td>Individual Session</td>
                            <td><span class="badge badge-success">Scheduled</span></td>
                        </tr>
                        <tr>
                            <td>3:30 PM</td>
                            <td>Emma Davis</td>
                            <td>Sarah Johnson</td>
                            <td>Group Session</td>
                            <td><span class="badge badge-success">Scheduled</span></td>
                        </tr>
                        <tr>
                            <td>4:00 PM</td>
                            <td>Parent Meeting</td>
                            <td>Michael Chen</td>
                            <td>Parent Check-in</td>
                            <td><span class="badge badge-warning">Pending Confirmation</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function loadStaffStudents(container) {
    container.innerHTML = `
        <h1 class="page-title">Student Management</h1>
        <div style="margin-bottom: 1.5rem;">
            <button class="btn btn-primary" onclick="alert('Add student functionality')">+ Add New Student</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Assigned Coach</th>
                        <th>Program</th>
                        <th>Progress</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Alex Smith</td>
                        <td>Sarah Johnson</td>
                        <td>Foundation Building</td>
                        <td>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 65%"></div>
                            </div>
                        </td>
                        <td><span class="badge badge-success">Active</span></td>
                        <td><button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">View Details</button></td>
                    </tr>
                    <tr>
                        <td>Emma Davis</td>
                        <td>Sarah Johnson</td>
                        <td>Building Healthy Relationships</td>
                        <td>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 45%"></div>
                            </div>
                        </td>
                        <td><span class="badge badge-success">Active</span></td>
                        <td><button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">View Details</button></td>
                    </tr>
                    <tr>
                        <td>Noah Williams</td>
                        <td>Michael Chen</td>
                        <td>Digital Wellness</td>
                        <td>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 80%"></div>
                            </div>
                        </td>
                        <td><span class="badge badge-success">Active</span></td>
                        <td><button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">View Details</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

function loadStaffPrograms(container) {
    container.innerHTML = `
        <h1 class="page-title">Program Overview</h1>
        <div class="course-grid">
            ${programs.map(program => `
                <div class="course-card">
                    <div class="course-thumbnail">📚</div>
                    <div class="course-content">
                        <div class="course-meta">
                            <span>⏱️ ${program.duration}</span>
                            <span>📝 ${program.sessions} sessions</span>
                        </div>
                        <h3>${program.title}</h3>
                        <p>${program.description}</p>
                        <div style="margin-top: 1rem;">
                            <span class="badge badge-primary">${program.category}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function loadStaffSchedules(container) {
    container.innerHTML = `
        <h1 class="page-title">Session Schedules</h1>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Student</th>
                        <th>Coach</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${sessions.map(session => `
                        <tr>
                            <td>${session.date}</td>
                            <td>${session.time}</td>
                            <td>${session.teen}</td>
                            <td>${session.coach}</td>
                            <td>${session.type}</td>
                            <td><span class="badge badge-${session.status === 'completed' ? 'success' : 'warning'}">${session.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function loadStaffReports(container) {
    container.innerHTML = `
        <h1 class="page-title">Program Reports</h1>
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Sessions</h3>
                <div class="value">284</div>
                <div class="change">+18% this month</div>
            </div>
            <div class="stat-card">
                <h3>Avg Attendance</h3>
                <div class="value">92%</div>
                <div class="change">Excellent</div>
            </div>
            <div class="stat-card">
                <h3>Completion Rate</h3>
                <div class="value">${reportsData.completionRate}%</div>
                <div class="change">+5% vs last month</div>
            </div>
            <div class="stat-card">
                <h3>Satisfaction Score</h3>
                <div class="value">${reportsData.averageSatisfaction}</div>
                <div class="change">⭐⭐⭐⭐⭐</div>
            </div>
        </div>
    `;
}
