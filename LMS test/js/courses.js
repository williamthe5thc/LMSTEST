// Courses module
let currentCourse = null;

// Render course grid
function renderCourseGrid(containerId, coursesToRender) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = coursesToRender.map(course => `
        <div class="course-card" onclick="viewCourse(${course.id})">
            <div class="course-thumbnail">📚</div>
            <div class="course-content">
                <div class="course-meta">
                    <span>⏱️ ${course.duration}</span>
                    <span>👥 ${course.students} students</span>
                </div>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-footer">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                    <span class="progress-text">${course.progress}%</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Load courses page
function loadCoursesPage() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="container">
            <h1 class="page-title">All Courses</h1>
            <div class="course-grid" id="allCourses"></div>
        </div>
    `;
    
    renderCourseGrid('allCourses', courses);
}

// View course detail
function viewCourse(courseId) {
    currentCourse = courses.find(c => c.id === courseId);
    loadCourseDetailPage();
}

// Load course detail page
function loadCourseDetailPage() {
    if (!currentCourse) return;

    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="course-header">
            <div class="container">
                <h1>${currentCourse.title}</h1>
                <p>${currentCourse.description}</p>
            </div>
        </div>
        <div class="container">
            <div class="course-tabs">
                <button class="tab active" onclick="showCourseTab('lessons')">Lessons</button>
                <button class="tab" onclick="showCourseTab('assignments')">Assignments</button>
                <button class="tab" onclick="showCourseTab('discussions')">Discussions</button>
                <button class="tab" onclick="showCourseTab('resources')">Resources</button>
            </div>

            <div id="lessonsTab">
                <div class="lesson-list" id="lessonList"></div>
            </div>

            <div id="assignmentsTab" class="hidden">
                <div class="lesson-list">
                    <h2>Course Assignments</h2>
                    <p style="color: var(--text-light); margin: 1rem 0;">Complete these assignments to demonstrate your understanding.</p>
                </div>
            </div>

            <div id="discussionsTab" class="hidden">
                <div class="lesson-list">
                    <h2>Course Discussions</h2>
                    <p style="color: var(--text-light); margin: 1rem 0;">Connect with other students and instructors.</p>
                </div>
            </div>

            <div id="resourcesTab" class="hidden">
                <div class="lesson-list">
                    <h2>Course Resources</h2>
                    <p style="color: var(--text-light); margin: 1rem 0;">Download course materials and additional resources.</p>
                </div>
            </div>
        </div>
    `;

    // Render lessons
    renderLessons();
}

// Render lessons
function renderLessons() {
    const lessonList = document.getElementById('lessonList');
    if (!lessonList || !currentCourse.lessons.length) {
        lessonList.innerHTML = '<p style="color: var(--text-light);">No lessons available yet.</p>';
        return;
    }

    lessonList.innerHTML = currentCourse.lessons.map(lesson => `
        <div class="lesson-item">
            <div class="lesson-icon">
                ${lesson.status === 'completed' ? '✓' : lesson.status === 'in-progress' ? '▶' : '🔒'}
            </div>
            <div class="lesson-info">
                <h4>${lesson.title}</h4>
                <p>${lesson.duration}</p>
            </div>
            <span class="lesson-status status-${lesson.status}">
                ${lesson.status === 'completed' ? 'Completed' : lesson.status === 'in-progress' ? 'In Progress' : 'Locked'}
            </span>
        </div>
    `).join('');
}

// Show course tab
function showCourseTab(tabName) {
    const tabs = ['lessonsTab', 'assignmentsTab', 'discussionsTab', 'resourcesTab'];
    
    tabs.forEach(tab => {
        const elem = document.getElementById(tab);
        if (elem) elem.classList.add('hidden');
    });

    const targetTab = document.getElementById(tabName + 'Tab');
    if (targetTab) targetTab.classList.remove('hidden');

    // Update active tab
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
}
