# TaskMasterApp - Full Stack Project Management Application

## Project Overview

TaskMaster is a full-stack project management and team collaboration application built using React, Node.js, Express, Supabase, and modern UI technologies.

The application enables organizations and teams to manage tasks, track project progress, organize schedules, manage team members, and monitor system activities through a centralized dashboard.

---
Live link of a project: 

---
https://peetlamahesh123.github.io/taskmasterapp/

---
## ScreenshotS  for Demo Output:
<img width="1923" height="876" alt="image" src="https://github.com/user-attachments/assets/f4c07c0d-6ad4-41da-a175-791bae8e20b7" />
<img width="1923" height="878" alt="image" src="https://github.com/user-attachments/assets/d529be07-638b-4f3d-9dfe-55abac9cbb62" />


---
# Technology Stack

## Frontend

* React.js
* React Router DOM
* Framer Motion
* Recharts
* Lucide React Icons
* CSS / Tailwind-based UI

## Backend

* Node.js
* Express.js
* REST APIs

## Database

* Supabase

## Authentication

* Login
* Registration
* Protected Routes
* Session Management

---

# Project Structure

## Frontend

frontend/

* App.jsx
* main.jsx
* pages/
* components/
* services/
* context/
* routes/

## Backend

backend/

* server.js
* app.js
* routes/
* controllers/
* middleware/
* config/

---

# Features Implemented

## Authentication Module

### User Registration

Implemented:

* Register page
* User account creation
* Backend registration API
* Database integration

### User Login

Implemented:

* Login page
* Authentication validation
* Protected dashboard access

### Protected Routes

Implemented:

* Route protection
* Session validation
* Unauthorized access prevention

---

# Dashboard Module

Implemented:

### Dashboard Statistics

* Total Tasks
* In Progress Tasks
* Review Tasks
* Completed Tasks

### Dashboard Cards

* Dynamic API integration
* Real-time data retrieval

### Analytics

Implemented:

* Task Analytics
* Progress Insights
* Priority Distribution

### Weekly Insights

Displays:

* Task completion percentage
* Weekly progress summary

### Priority Allocation

Displays:

* High Priority Tasks
* Medium Priority Tasks
* Low Priority Tasks

---

# Kanban Board Module

Implemented:

### Task Creation

Users can:

* Create tasks
* Add task details
* Assign priorities
* Set due dates

### Task Management

Users can:

* View tasks
* Update tasks
* Delete tasks

### Task Statuses

Implemented:

* Todo
* In Progress
* Review
* Completed

### Drag and Drop

Implemented for moving tasks between columns.

---

# Calendar Module

Implemented:

### Calendar View

* Monthly calendar
* Month navigation

### Event Management

Users can:

* Create events
* Edit events
* Delete events

### Event Display

Implemented:

* Upcoming Events List
* Event Date Highlighting
* Event Search

### Calendar Features

* Previous Month
* Next Month
* Event Indicators
* Event Synchronization

---

# Team Directory Module

Implemented:

### Team Member Management

Users can:

* Add members
* Edit members
* Delete members

### Member Information

Stored:

* Name
* Email
* Designation
* Status

### Search

Search by:

* Name
* Email
* Designation

### Team Statistics

Displays:

* Total Members
* Online Members

---

# Settings Module

Implemented:

### Theme Management

Users can:

* Change theme color
* Save preferences

### User Preferences

Implemented:

* Notification Settings
* Activity Preferences

### Theme Context

Implemented using React Context API.

---

# Profile Module

Implemented:

### User Profile

Users can:

* View profile
* Update profile information

---

# Notification Module

Implemented:

### Notification Services

Supports:

* Task Notifications
* Team Notifications
* Event Notifications

---

# Admin Terminal Module

Implemented:

### Admin Dashboard

Displays:

* System Statistics
* Activity Logs
* Monitoring Information

### Log Management

Supports:

* Activity Tracking
* Search Functionality

---

# Backend APIs

Implemented APIs:

## Authentication

* Register User
* Login User

## Dashboard

* Dashboard Statistics

## Tasks

* Create Task
* Get Tasks
* Update Task
* Delete Task
* Update Task Status

## Calendar

* Create Event
* Get Events
* Update Event
* Delete Event

## Team

* Create Member
* Get Members
* Update Member
* Delete Member

## Settings

* Get Settings
* Update Settings

## Profile

* Get Profile
* Update Profile

## Notifications

* Get Notifications

---

# Database Tables

## users

Stores:

* User Information
* Authentication Data

## tasks

Stores:

* Task Information
* Status
* Priority
* Due Date

## calendar_events

Stores:

* Event Information
* Schedule Data

## team_members

Stores:

* Team Member Information

## settings

Stores:

* User Preferences

## notifications

Stores:

* Notification Records

---

# Security Features

Implemented:

* Protected Routes
* Authentication Middleware
* Environment Variables
* Supabase Integration

---

# Future Enhancements

Planned:

* Email Notifications
* Real-Time Updates
* Role-Based Access Control
* Activity History
* File Uploads
* Team Chat
* Report Generation
* Export Features
* Advanced Analytics

---

# Installation

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
npm run dev
```

---

# Environment Variables

Create:

backend/.env

Required Variables:

SUPABASE_URL=

SUPABASE_KEY=

JWT_SECRET=

PORT=

---
# Contributors

**Peetla Mahesh** – Backend Developer

* Backend Development
* API Development
* Database Integration
* Authentication & Authorization
* Server-Side Logic

**Rimsha Riaz** – Frontend Developer

* Frontend Development
* UI/UX Implementation
* React Components
* Dashboard and User Interfaces

**Project:** TaskMaster – Full Stack Project Management Application


Technologies:
React.js, Node.js, Express.js, Supabase
Project Name:
TaskMaster

Type:
Full Stack Project Management Application

Frontend:
React.js

Backend:
Node.js + Express.js

Database:
Supabase
