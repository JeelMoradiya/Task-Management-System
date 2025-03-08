"# Task-Management-System" 

A modern, user-friendly task management system built with React, Material-UI (MUI), and Axios, designed to help users organize tasks efficiently. This application includes user authentication (login/signup) and a dashboard to create, edit, delete, and filter tasks.

"# Features" 

User Authentication: Secure login and signup functionality with JWT-based authentication.
Task Management: Create, edit, delete, and view tasks with status filtering (All, To Do, In Progress, Completed).
Responsive Design: Built with Material-UI for a professional and responsive UI across devices.
API Integration: Communicates with a backend API for task and user data persistence.

"# Tech Stack" 

Frontend: React, TypeScript, Material-UI (MUI), React Router, Axios
Backend: Assumes a RESTful API (e.g., Node.js/Express) running at http://localhost:5001 (not included in this repo)
Styling: MUI's component library and sx prop for styling
Routing: React Router DOM for navigation

"# Installation" 
bash
```
Clone the repository: git clone https://github.com/yourusername/task-management-system.git
Navigate to the project directory: cd frontend
Install dependencies: npm install
Start the development project : npm run dev

Navigate to the project directory: cd backend
Install dependencies: npm install
Start the development server: npm run dev
The application will be available at http://localhost:5001.
```

"# Set Up the Backend" 

This frontend assumes a backend API is running at http://localhost:5001. You need to set up a compatible server with the following endpoints:
POST /api/auth/register - Register a new user
POST /api/auth/login - Login and return a JWT token
GET /api/auth/me - Fetch authenticated user's details
GET /api/tasks - Fetch all tasks
POST /api/tasks - Create a new task
PUT /api/tasks/:id - Update a task
DELETE /api/tasks/:id - Delete a task
Example backend: Use a Node.js/Express server with MongoDB or any database of your choice.

"# Dependencies" 

@mui/material: Material-UI components
@mui/icons-material: MUI icons
@emotion/react & @emotion/styled: Emotion for MUI styling
axios: HTTP client for API requests
react-router-dom: Routing library
react: Core React library

bash
```
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-router-dom 
```

"# Usage" 

Landing Page: Access the app at the root URL (/). Click "Get Started" to sign up or "Sign In" to log in.
Sign Up: Navigate to /signup, enter a username and password, and submit to create an account.
Login: Go to /login, enter your credentials, and log in to access the dashboard.
Dashboard:
View tasks in a grid layout, filtered by status (All, To Do, In Progress, Completed).
Add a new task using the "Add Task" button.
Edit or delete existing tasks via icons on each task card.
Logout from the navbar dropdown.