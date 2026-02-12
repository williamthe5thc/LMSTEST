// Dashboard module

// Load dashboard page
function loadDashboardPage() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="container">
            <div class="dashboard">
                <aside class="sidebar">
                    <div class="sidebar-section">
                        <h4>Menu</h4>
                        <ul class="sidebar-menu">
                            <li><a href="#" class="active" onclick="showDashboardSection(event, 'overview')">📊 Overview</a></li>
                            <li><a href="#" onclick="showDashboardSection(event, 'my-courses')">📚 My Courses</a></li>
                            <li><a href="#" onclick="showDashboardSection(event, 'progress')">📈 Progress</a></li>
                            <li><a href="#" onclick="showDashboardSection(event, 'assignments')">📝 Assignments</a></li>
                            <li><a href="#" onclick="showDashboardSection(event, 'grades')">🎯 Grades</a></li>
                        </ul>
                    </div>
                    <div class="sidebar-section ${currentUser && currentUser.role === 'instructor' ? '' : 'hidden'}" id="instructorMenu">
                        <h4>Instructor</h4>
                        <ul class="sidebar-menu">
                            <li><a href="#" onclick="showDashboardSection(event, 'create-course')">➕ Create Course</a></li>
                            <li><a href="#" onclick="showDashboardSection(event, 'my-students')">👥 My Students</a></li>
                            <li><a href="#" onclick="showDashboardSection(event, 'analytics')">📊 Analytics</a></li>
                        </ul>
                    </div>
                </aside>

                <main class="main-content" id="dashboardContent">
                    <!-- Content will be loaded here -->
                </main>
            </div>
        </div>
    `;

    // Load default section
    showDashboardSection(null, 'overview');
}

// Show dashboard section
function showDashboardSection(event, section) {
    if (event) {
        event.preventDefault();
        
        // Update active menu item
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
        });
        event.target.classList.add('active');
    }

    const dashboardContent = document.getElementById('dashboardContent');
    
    switch(section) {
        case 'overview':
            loadOverviewSection(dashboardContent);
            break;
        case 'my-courses':
            loadMyCoursesSection(dashboardContent);
            break;
        case 'progress':
            loadProgressSection(dashboardContent);
            break;
        case 'assignments':
            loadAssignmentsSection(dashboardContent);
            break;
        case 'grades':
            loadGradesSection(dashboardContent);
            break;
        case 'create-course':
            loadCreateCourseSection(dashboardContent);
            break;
        case 'my-students':
            loadMyStudentsSection(dashboardContent);
            break;
        case 'analytics':
            loadAnalyticsSection(dashboardContent);
            break;
    }
}

// Load overview section
function loadOverviewSection(container) {
    container.innerHTML = `
        <h1 class="page-title">Dashboard Overview</h1>
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Enrolled Courses</h3>
                <div class="value">6</div>
                <div class="change">+2 this month</div>
            </div>
            <div class="stat-card">
                <h3>Completed</h3>
                <div class="value">12</div>
                <div class="change">+3 this month</div>
            </div>
            <div class="stat-card">
                <h3>Certificates</h3>
                <div class="value">8</div>
                <div class="change">+1 this week</div>
            </div>
            <div class="stat-card">
                <h3>Study Hours</h3>
                <div class="value">124</div>
                <div class="change">+15 this week</div>
            </div>
        </div>

        <div class="section">
            <h2 class="section-title">Continue Learning</h2>
            <div class="course-grid" id="enrolledCourses"></div>
        </div>
    `;

    renderCourseGrid('enrolledCourses', courses.filter(c => c.progress > 0));
}

// Load my courses section
function loadMyCoursesSection(container) {
    container.innerHTML = `
        <h1 class="page-title">My Courses</h1>
        <div class="course-grid" id="allMyCourses"></div>
    `;

    renderCourseGrid('allMyCourses', courses.filter(c => c.progress > 0));
}

// Load progress section
function loadProgressSection(container) {
    container.innerHTML = `
        <h1 class="page-title">Learning Progress</h1>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Progress</th>
                        <th>Completed Lessons</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${courses.filter(c => c.progress > 0).map(course => `
                        <tr>
                            <td>${course.title}</td>
                            <td>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                                </div>
                            </td>
                            <td>${course.lessons.filter(l => l.status === 'completed').length}/${course.lessons.length}</td>
                            <td><span class="badge ${course.progress === 100 ? 'badge-success' : 'badge-warning'}">${course.progress === 100 ? 'Completed' : 'In Progress'}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Load assignments section
function loadAssignmentsSection(container) {
    container.innerHTML = `
        <h1 class="page-title">Assignments</h1>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Assignment</th>
                        <th>Course</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${assignments.map(assignment => `
                        <tr>
                            <td>${assignment.title}</td>
                            <td>${assignment.course}</td>
                            <td>${assignment.dueDate}</td>
                            <td><span class="badge ${assignment.status === 'submitted' ? 'badge-success' : 'badge-warning'}">${assignment.status === 'submitted' ? 'Submitted' : 'Pending'}</span></td>
                            <td><button class="btn ${assignment.status === 'submitted' ? 'btn-outline' : 'btn-primary'}" style="padding: 0.5rem 1rem; font-size: 0.9rem;">${assignment.status === 'submitted' ? 'View' : 'Submit'}</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Load grades section
function loadGradesSection(container) {
    container.innerHTML = `
        <h1 class="page-title">Grades</h1>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Assignments</th>
                        <th>Quizzes</th>
                        <th>Final Exam</th>
                        <th>Overall</th>
                    </tr>
                </thead>
                <tbody>
                    ${grades.map(grade => `
                        <tr>
                            <td>${grade.course}</td>
                            <td>${grade.assignments}</td>
                            <td>${grade.quizzes}</td>
                            <td>${grade.finalExam}</td>
                            <td><span class="badge badge-success">${grade.overall}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Load create course section (instructor)
function loadCreateCourseSection(container) {
    container.innerHTML = `
        <h1 class="page-title">Create New Course</h1>
        <div class="lesson-list">
            <form>
                <div class="form-group">
                    <label>Course Title</label>
                    <input type="text" placeholder="Enter course title" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea rows="4" placeholder="Enter course description" required></textarea>
                </div>
                <div class="form-group">
                    <label>Duration</label>
                    <input type="text" placeholder="e.g., 8 weeks" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select required>
                        <option value="">Select a category</option>
                        <option>Programming</option>
                        <option>Data Science</option>
                        <option>Design</option>
                        <option>Business</option>
                        <option>Marketing</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary">Create Course</button>
            </form>
        </div>
    `;
}

// Load my students section (instructor)
function loadMyStudentsSection(container) {
    container.innerHTML = `
        <h1 class="page-title">My Students</h1>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Course</th>
                        <th>Progress</th>
                        <th>Last Active</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Smith</td>
                        <td>JavaScript Fundamentals</td>
                        <td>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 75%"></div>
                            </div>
                        </td>
                        <td>2 hours ago</td>
                    </tr>
                    <tr>
                        <td>Sarah Williams</td>
                        <td>JavaScript Fundamentals</td>
                        <td>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 90%"></div>
                            </div>
                        </td>
                        <td>1 day ago</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// Load analytics section (instructor)
function loadAnalyticsSection(container) {
    container.innerHTML = `
        <h1 class="page-title">Course Analytics</h1>
        <div class="stats-grid">
            <div class="stat-card">
                <h3>Total Students</h3>
                <div class="value">1,234</div>
                <div class="change">+45 this week</div>
            </div>
            <div class="stat-card">
                <h3>Completion Rate</h3>
                <div class="value">87%</div>
                <div class="change">+5% this month</div>
            </div>
            <div class="stat-card">
                <h3>Average Rating</h3>
                <div class="value">4.8</div>
                <div class="change">⭐⭐⭐⭐⭐</div>
            </div>
            <div class="stat-card">
                <h3>Revenue</h3>
                <div class="value">$12.4k</div>
                <div class="change">+23% this month</div>
            </div>
        </div>
    `;
}
