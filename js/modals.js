// Modals and Forms Module - Handles all interactive popups and forms

// Global variable to track current modal
let currentModal = null;

// Create and show modal
function showModal(title, content, buttons = []) {
    // Remove existing modal if any
    closeModal();

    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal container
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: var(--card-bg);
        border-radius: 16px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease;
    `;

    // Modal header
    const header = document.createElement('div');
    header.style.cssText = `
        padding: 2rem;
        border-bottom: 1px solid var(--border);
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    header.innerHTML = `
        <h2 style="font-family: 'Crimson Pro', serif; font-size: 1.8rem; margin: 0; color: var(--primary);">${title}</h2>
        <button onclick="closeModal()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-light);">&times;</button>
    `;

    // Modal body
    const body = document.createElement('div');
    body.style.cssText = 'padding: 2rem;';
    body.innerHTML = content;

    // Modal footer with buttons
    if (buttons.length > 0) {
        const footer = document.createElement('div');
        footer.style.cssText = `
            padding: 1.5rem 2rem;
            border-top: 1px solid var(--border);
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
        `;
        
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = `btn ${btn.className || 'btn-outline'}`;
            button.textContent = btn.text;
            button.onclick = btn.onclick;
            footer.appendChild(button);
        });

        modal.appendChild(header);
        modal.appendChild(body);
        modal.appendChild(footer);
    } else {
        modal.appendChild(header);
        modal.appendChild(body);
    }

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    currentModal = overlay;

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

// Close modal
function closeModal() {
    if (currentModal) {
        currentModal.remove();
        currentModal = null;
    }
}

// Show success message
function showSuccess(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Show error message
function showError(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add user modal
function showAddUserModal() {
    const content = `
        <form id="addUserForm" onsubmit="handleAddUser(event)">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" name="name" required placeholder="Enter full name">
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" name="email" required placeholder="user@example.com">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required placeholder="Create password">
            </div>
            <div class="form-group">
                <label>Role</label>
                <select name="role" required>
                    <option value="">Select a role</option>
                    <option value="teen">Teen</option>
                    <option value="parent">Parent</option>
                    <option value="coach">Coach</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Administrator</option>
                </select>
            </div>
        </form>
    `;

    showModal('Add New User', content, [
        { text: 'Cancel', className: 'btn-outline', onclick: closeModal },
        { text: 'Add User', className: 'btn-primary', onclick: () => document.getElementById('addUserForm').requestSubmit() }
    ]);
}

// Handle add user form submission
function handleAddUser(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
        id: `user${Date.now()}`,
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role'),
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0]
    };

    // Add to users array (in real app, this would be an API call)
    allUsers.push(userData);
    sampleUsers.push(userData);

    closeModal();
    showSuccess(`User ${userData.name} added successfully!`);

    // Reload the current section if on admin users page
    if (currentUser && currentUser.role === 'admin') {
        const adminContent = document.getElementById('adminContent');
        if (adminContent) {
            loadAdminUsers(adminContent);
        }
    }
}

// Edit user modal
function showEditUserModal(user) {
    const content = `
        <form id="editUserForm" onsubmit="handleEditUser(event, '${user.id}')">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value="${user.name}" required>
            </div>
            <div class="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value="${user.email}" required>
            </div>
            <div class="form-group">
                <label>Role</label>
                <select name="role" required>
                    <option value="teen" ${user.role === 'teen' ? 'selected' : ''}>Teen</option>
                    <option value="parent" ${user.role === 'parent' ? 'selected' : ''}>Parent</option>
                    <option value="coach" ${user.role === 'coach' ? 'selected' : ''}>Coach</option>
                    <option value="staff" ${user.role === 'staff' ? 'selected' : ''}>Staff</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Administrator</option>
                </select>
            </div>
            <div class="form-group">
                <label>Status</label>
                <select name="status" required>
                    <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                </select>
            </div>
        </form>
    `;

    showModal('Edit User', content, [
        { text: 'Cancel', className: 'btn-outline', onclick: closeModal },
        { text: 'Save Changes', className: 'btn-primary', onclick: () => document.getElementById('editUserForm').requestSubmit() }
    ]);
}

// Handle edit user
function handleEditUser(event, userId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Find and update user
    const userIndex = allUsers.findIndex(u => u.id == userId);
    if (userIndex !== -1) {
        allUsers[userIndex].name = formData.get('name');
        allUsers[userIndex].email = formData.get('email');
        allUsers[userIndex].role = formData.get('role');
        allUsers[userIndex].status = formData.get('status');
    }

    // Also update in sampleUsers
    const sampleIndex = sampleUsers.findIndex(u => u.id == userId);
    if (sampleIndex !== -1) {
        sampleUsers[sampleIndex].name = formData.get('name');
        sampleUsers[sampleIndex].email = formData.get('email');
        sampleUsers[sampleIndex].role = formData.get('role');
    }

    closeModal();
    showSuccess('User updated successfully!');

    // Reload the current section if on admin users page
    if (currentUser && currentUser.role === 'admin') {
        const adminContent = document.getElementById('adminContent');
        if (adminContent) {
            loadAdminUsers(adminContent);
        }
    }
}

// Create program modal
function showCreateProgramModal() {
    const content = `
        <form id="createProgramForm" onsubmit="handleCreateProgram(event)">
            <div class="form-group">
                <label>Program Title</label>
                <input type="text" name="title" required placeholder="Enter program title">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description" rows="3" required placeholder="Describe the program"></textarea>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" name="duration" required placeholder="e.g., 8 weeks">
            </div>
            <div class="form-group">
                <label>Number of Sessions</label>
                <input type="number" name="sessions" required placeholder="16">
            </div>
            <div class="form-group">
                <label>Category</label>
                <select name="category" required>
                    <option value="">Select a category</option>
                    <option value="Core Program">Core Program</option>
                    <option value="Relationship Skills">Relationship Skills</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Personal Development">Personal Development</option>
                </select>
            </div>
        </form>
    `;

    showModal('Create New Program', content, [
        { text: 'Cancel', className: 'btn-outline', onclick: closeModal },
        { text: 'Create Program', className: 'btn-primary', onclick: () => document.getElementById('createProgramForm').requestSubmit() }
    ]);
}

// Handle create program
function handleCreateProgram(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const newProgram = {
        id: programs.length + 1,
        title: formData.get('title'),
        description: formData.get('description'),
        duration: formData.get('duration'),
        sessions: parseInt(formData.get('sessions')),
        category: formData.get('category'),
        activities: []
    };

    programs.push(newProgram);

    closeModal();
    showSuccess(`Program "${newProgram.title}" created successfully!`);

    // Reload programs view
    if (currentUser && (currentUser.role === 'admin' || currentUser.role === 'staff')) {
        const content = currentUser.role === 'admin' 
            ? document.getElementById('adminContent')
            : document.getElementById('staffContent');
        if (content) {
            if (currentUser.role === 'admin') {
                loadAdminPrograms(content);
            } else {
                loadStaffPrograms(content);
            }
        }
    }
}

// Schedule session modal
function showScheduleSessionModal() {
    const content = `
        <form id="scheduleSessionForm" onsubmit="handleScheduleSession(event)">
            <div class="form-group">
                <label>Student</label>
                <select name="student" required>
                    <option value="">Select a student</option>
                    <option value="Alex Smith">Alex Smith</option>
                    <option value="Emma Davis">Emma Davis</option>
                    <option value="Noah Williams">Noah Williams</option>
                </select>
            </div>
            <div class="form-group">
                <label>Session Type</label>
                <select name="type" required>
                    <option value="">Select type</option>
                    <option value="Individual">Individual Session</option>
                    <option value="Group">Group Session</option>
                    <option value="Parent Check-in">Parent Check-in</option>
                </select>
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="date" name="date" required>
            </div>
            <div class="form-group">
                <label>Time</label>
                <input type="time" name="time" required>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <select name="duration" required>
                    <option value="30 min">30 minutes</option>
                    <option value="45 min">45 minutes</option>
                    <option value="60 min" selected>60 minutes</option>
                    <option value="90 min">90 minutes</option>
                </select>
            </div>
        </form>
    `;

    showModal('Schedule Session', content, [
        { text: 'Cancel', className: 'btn-outline', onclick: closeModal },
        { text: 'Schedule', className: 'btn-primary', onclick: () => document.getElementById('scheduleSessionForm').requestSubmit() }
    ]);
}

// Handle schedule session
function handleScheduleSession(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    const timeValue = formData.get('time');
    const [hours, minutes] = timeValue.split(':');
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    const displayHours = parseInt(hours) % 12 || 12;
    const displayTime = `${displayHours}:${minutes} ${ampm}`;

    const newSession = {
        id: sessions.length + 1,
        date: formData.get('date'),
        time: displayTime,
        duration: formData.get('duration'),
        coach: currentUser.name,
        teen: formData.get('student'),
        type: formData.get('type'),
        status: 'scheduled',
        notes: ''
    };

    sessions.unshift(newSession);

    closeModal();
    showSuccess('Session scheduled successfully!');

    // Reload sessions view
    if (currentUser && currentUser.role === 'coach') {
        const coachContent = document.getElementById('coachContent');
        if (coachContent) {
            loadCoachSessions(coachContent);
        }
    }
}

// View session notes modal
function showSessionNotesModal(session) {
    const isCoach = currentUser && currentUser.role === 'coach';
    const content = `
        <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>Date:</strong>
                <span>${session.date}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>Student:</strong>
                <span>${session.teen}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>Duration:</strong>
                <span>${session.duration}</span>
            </div>
        </div>
        
        ${isCoach ? `
            <form id="sessionNotesForm" onsubmit="handleSaveSessionNotes(event, ${session.id})">
                <div class="form-group">
                    <label>Session Notes</label>
                    <textarea name="notes" rows="6" placeholder="Document observations, progress, and recommendations...">${session.notes || ''}</textarea>
                </div>
            </form>
        ` : `
            <div class="form-group">
                <label>Session Notes</label>
                <div style="padding: 1rem; background: var(--bg); border-radius: 8px; min-height: 100px;">
                    ${session.notes || '<em style="color: var(--text-light);">No notes available for this session yet.</em>'}
                </div>
            </div>
        `}
    `;

    showModal('Session Notes', content, isCoach ? [
        { text: 'Close', className: 'btn-outline', onclick: closeModal },
        { text: 'Save Notes', className: 'btn-primary', onclick: () => document.getElementById('sessionNotesForm').requestSubmit() }
    ] : [
        { text: 'Close', className: 'btn-outline', onclick: closeModal }
    ]);
}

// Handle save session notes
function handleSaveSessionNotes(event, sessionId) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const notes = formData.get('notes');

    // Find and update session
    const sessionIndex = sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex !== -1) {
        sessions[sessionIndex].notes = notes;
    }

    closeModal();
    showSuccess('Session notes saved successfully!');

    // Reload view if needed
    if (currentUser && currentUser.role === 'coach') {
        const coachContent = document.getElementById('coachContent');
        if (coachContent) {
            loadCoachNotes(coachContent);
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
