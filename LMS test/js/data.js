// Sample data for the Connection Coaching LMS

// User roles and their permissions
const userRoles = {
    admin: {
        name: 'Administrator',
        permissions: ['view_all', 'manage_users', 'manage_courses', 'view_reports', 'manage_settings']
    },
    staff: {
        name: 'Staff Member',
        permissions: ['view_courses', 'manage_courses', 'view_students', 'view_reports']
    },
    coach: {
        name: 'Coach',
        permissions: ['view_assigned_students', 'manage_sessions', 'view_progress', 'add_notes']
    },
    parent: {
        name: 'Parent',
        permissions: ['view_teen_progress', 'view_sessions', 'message_coach', 'view_resources']
    },
    teen: {
        name: 'Teen',
        permissions: ['view_sessions', 'complete_activities', 'message_coach', 'view_progress']
    }
};

// Sample users (in real app, this would be in a secure backend)
let sampleUsers = [
    { email: 'admin@connection.com', password: 'admin123', role: 'admin', name: 'Admin User', id: 'user1', status: 'active', joinDate: '2024-12-01' },
    { email: 'staff@connection.com', password: 'staff123', role: 'staff', name: 'Staff Member', id: 'user2', status: 'active', joinDate: '2024-12-01' },
    { email: 'coach@connection.com', password: 'coach123', role: 'coach', name: 'Sarah Johnson', id: 'user3', status: 'active', joinDate: '2025-01-15' },
    { email: 'parent@connection.com', password: 'parent123', role: 'parent', name: 'John Smith', linkedTeen: 'teen1', id: 'user4', status: 'active', joinDate: '2025-02-01' },
    { email: 'teen@connection.com', password: 'teen123', role: 'teen', name: 'Alex Smith', id: 'teen1', status: 'active', joinDate: '2025-02-01' }
];

// Connection coaching programs
let programs = [
    {
        id: 1,
        title: "Foundation Building",
        description: "Building core connection skills and emotional awareness for teens.",
        duration: "8 weeks",
        sessions: 16,
        category: "Core Program",
        content: `
# Welcome to Foundation Building

## Program Overview
This 8-week program focuses on developing core connection skills and emotional awareness. You'll learn to understand your emotions, communicate effectively, and build meaningful connections with others.

## What You'll Learn
- Emotional intelligence and self-awareness
- Active listening techniques
- Self-regulation strategies
- Empathy development
- Communication fundamentals

## Program Goals
By the end of this program, you will be able to:
1. Identify and name your emotions accurately
2. Understand the connection between thoughts, feelings, and behaviors
3. Practice active listening in conversations
4. Regulate your emotional responses effectively
5. Show empathy towards others' experiences

## Weekly Breakdown
**Weeks 1-2:** Understanding Emotions
**Weeks 3-4:** Active Listening and Communication
**Weeks 5-6:** Self-Reflection and Awareness
**Weeks 7-8:** Building Connection Skills
        `,
        activities: [
            { 
                id: 'act1', 
                title: "Understanding Emotions", 
                duration: "45 min", 
                type: "video", 
                status: "completed",
                content: "Learn to identify and understand different emotions and how they affect your thoughts and behaviors.",
                videoUrl: "#"
            },
            { 
                id: 'act2',
                title: "Active Listening Practice", 
                duration: "30 min", 
                type: "activity", 
                status: "in-progress",
                content: "Practice active listening techniques with guided exercises and real-world scenarios.",
                instructions: "Complete the listening exercises and reflect on your experience."
            },
            { 
                id: 'act3',
                title: "Self-Reflection Journal", 
                duration: "20 min", 
                type: "journaling", 
                status: "locked",
                content: "Regular journaling to track your emotional patterns and growth throughout the program.",
                prompts: ["What emotions did you experience today?", "How did you handle difficult feelings?"]
            },
            { 
                id: 'act4',
                title: "Communication Basics", 
                duration: "60 min", 
                type: "video", 
                status: "locked",
                content: "Learn the fundamentals of effective communication including verbal and non-verbal cues.",
                videoUrl: "#"
            }
        ],
        assessment: {
            questions: [
                {
                    id: 'q1',
                    question: "What are the four main categories of emotions?",
                    type: "multiple-choice",
                    options: ["Happy, Sad, Angry, Scared", "Joy, Fear, Anger, Sadness", "Excited, Worried, Mad, Down", "Good, Bad, Neutral, Mixed"],
                    correctAnswer: 1,
                    points: 10
                },
                {
                    id: 'q2',
                    question: "Describe a time when you successfully used active listening this week.",
                    type: "short-answer",
                    points: 20
                },
                {
                    id: 'q3',
                    question: "What is one strategy you learned for managing difficult emotions?",
                    type: "short-answer",
                    points: 15
                },
                {
                    id: 'q4',
                    question: "True or False: Empathy means feeling sorry for someone.",
                    type: "true-false",
                    correctAnswer: false,
                    points: 5
                }
            ],
            passingScore: 70
        }
    },
    {
        id: 2,
        title: "Building Healthy Relationships",
        description: "Learning to create and maintain positive relationships with peers and family.",
        duration: "6 weeks",
        sessions: 12,
        category: "Relationship Skills",
        content: `
# Building Healthy Relationships

## Program Overview
This 6-week program teaches you how to create and maintain positive, healthy relationships with friends, family, and peers.

## What You'll Learn
- Friendship foundations
- Healthy boundaries
- Conflict resolution
- Trust building
- Communication in relationships

## Program Goals
By completion, you will:
1. Understand the characteristics of healthy relationships
2. Set and maintain appropriate boundaries
3. Resolve conflicts constructively
4. Build trust with others
5. Communicate effectively in relationships
        `,
        activities: [
            { 
                id: 'act5',
                title: "Friendship Foundations", 
                duration: "45 min", 
                type: "video", 
                status: "completed",
                content: "Explore what makes a good friend and how to be one yourself."
            },
            { 
                id: 'act6',
                title: "Boundary Setting", 
                duration: "40 min", 
                type: "activity", 
                status: "locked",
                content: "Learn to identify and communicate your personal boundaries effectively."
            },
            { 
                id: 'act7',
                title: "Conflict Resolution", 
                duration: "50 min", 
                type: "video", 
                status: "locked",
                content: "Master techniques for resolving disagreements in healthy ways."
            }
        ],
        assessment: {
            questions: [
                {
                    id: 'q5',
                    question: "What is a healthy boundary in relationships?",
                    type: "short-answer",
                    points: 15
                },
                {
                    id: 'q6',
                    question: "Name three characteristics of a healthy friendship.",
                    type: "short-answer",
                    points: 15
                },
                {
                    id: 'q7',
                    question: "In conflict resolution, it's best to:",
                    type: "multiple-choice",
                    options: ["Win the argument", "Find a solution together", "Avoid the person", "Let them win"],
                    correctAnswer: 1,
                    points: 10
                }
            ],
            passingScore: 70
        }
    },
    {
        id: 3,
        title: "Digital Wellness",
        description: "Navigating technology and social media in healthy ways.",
        duration: "4 weeks",
        sessions: 8,
        category: "Wellness",
        content: `
# Digital Wellness

## Program Overview
A 4-week program focused on developing healthy relationships with technology and social media.

## What You'll Learn
- Healthy screen time habits
- Social media awareness
- Digital communication skills
- Online safety
- Balance and boundaries with technology
        `,
        activities: [],
        assessment: {
            questions: [
                {
                    id: 'q8',
                    question: "What are signs of unhealthy social media use?",
                    type: "short-answer",
                    points: 20
                }
            ],
            passingScore: 70
        }
    },
    {
        id: 4,
        title: "Identity & Self-Worth",
        description: "Developing a strong sense of self and personal values.",
        duration: "10 weeks",
        sessions: 20,
        category: "Personal Development",
        content: `
# Identity & Self-Worth

## Program Overview
A comprehensive 10-week journey to discover and develop your authentic self, build confidence, and establish personal values.

## What You'll Learn
- Self-discovery and identity
- Building self-esteem
- Personal values clarification
- Goal setting
- Self-compassion
        `,
        activities: [],
        assessment: {
            questions: [
                {
                    id: 'q9',
                    question: "What are three of your core personal values?",
                    type: "short-answer",
                    points: 15
                }
            ],
            passingScore: 70
        }
    }
];

// Coaching sessions
let sessions = [
    {
        id: 1,
        date: "2026-02-15",
        time: "3:00 PM",
        duration: "60 min",
        coach: "Sarah Johnson",
        teen: "Alex Smith",
        type: "Individual",
        status: "scheduled",
        notes: ""
    },
    {
        id: 2,
        date: "2026-02-10",
        time: "2:00 PM",
        duration: "60 min",
        coach: "Sarah Johnson",
        teen: "Alex Smith",
        type: "Individual",
        status: "completed",
        notes: "Great progress on communication skills. Continue practicing active listening."
    },
    {
        id: 3,
        date: "2026-02-08",
        time: "4:00 PM",
        duration: "45 min",
        coach: "Sarah Johnson",
        teen: "Alex Smith",
        type: "Parent Check-in",
        status: "completed",
        notes: "Discussed progress with parents. They're seeing positive changes at home."
    }
];

// Teen progress data
const teenProgress = {
    teen1: {
        name: "Alex Smith",
        overallProgress: 65,
        programsEnrolled: 2,
        sessionsCompleted: 12,
        activitiesCompleted: 24,
        recentAchievements: [
            "Completed Foundation Building Module 1",
            "Earned Active Listener Badge",
            "5 consecutive weeks of engagement"
        ],
        skillsProgress: [
            { skill: "Emotional Awareness", progress: 80 },
            { skill: "Communication", progress: 70 },
            { skill: "Self-Regulation", progress: 60 },
            { skill: "Empathy", progress: 75 }
        ]
    }
};

// Coach's assigned teens
const coachAssignments = {
    coach1: ['teen1', 'teen2', 'teen3']
};

// Parent resources
const parentResources = [
    {
        title: "Supporting Your Teen's Emotional Growth",
        type: "Article",
        duration: "10 min read"
    },
    {
        title: "Understanding Teen Development",
        type: "Video",
        duration: "25 min"
    },
    {
        title: "Family Communication Toolkit",
        type: "PDF Guide",
        duration: "Download"
    }
];

// Staff reports data
const reportsData = {
    totalTeens: 45,
    activePrograms: 8,
    completionRate: 78,
    averageSatisfaction: 4.7,
    monthlyEngagement: [
        { month: "Jan", sessions: 124, completion: 85 },
        { month: "Feb", sessions: 142, completion: 88 }
    ]
};

// Admin user management
let allUsers = [
    { id: 'user1', name: "Admin User", email: "admin@connection.com", role: "admin", status: "active", joinDate: "2024-12-01" },
    { id: 'user2', name: "Staff Member", email: "staff@connection.com", role: "staff", status: "active", joinDate: "2024-12-01" },
    { id: 'user3', name: "Sarah Johnson", email: "coach@connection.com", role: "coach", status: "active", joinDate: "2025-01-15" },
    { id: 'user4', name: "John Smith", email: "parent@connection.com", role: "parent", status: "active", joinDate: "2025-02-01" },
    { id: 'user5', name: "Alex Smith", email: "teen@connection.com", role: "teen", status: "active", joinDate: "2025-02-01" }
];

// Journaling prompts for teens
const journalPrompts = [
    "What made you feel proud today?",
    "Describe a time when you showed empathy to someone.",
    "What is one thing you learned about yourself this week?",
    "How did you handle a difficult emotion today?",
    "What connection did you make with someone today?"
];

// Activities for teens
const activities = [
    {
        id: 1,
        title: "Emotion Check-In",
        description: "Identify and label your emotions throughout the day",
        points: 10,
        category: "Emotional Awareness"
    },
    {
        id: 2,
        title: "Gratitude Practice",
        description: "Write three things you're grateful for",
        points: 10,
        category: "Positive Mindset"
    },
    {
        id: 3,
        title: "Active Listening Exercise",
        description: "Practice active listening with a family member",
        points: 15,
        category: "Communication"
    }
];

// Journal entries (will be saved to localStorage)
let journalEntries = [];

// Completed activities (will be saved to localStorage)
let completedActivities = [];

// Assessment submissions
let assessmentSubmissions = [];
