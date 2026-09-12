# DevFlow AI 🚀

**DevFlow AI** is a full-stack AI-powered developer productivity and
project management platform designed to help developers organize
projects, manage development tasks, and use AI to break requirements
into actionable work.

## ✨ Features

-   🔐 User authentication
-   📊 Developer dashboard
-   📁 Project management
-   ✅ Task management
-   🏷️ Task status and priority management
-   🤖 AI-assisted requirement analysis
-   🧩 AI-generated actionable development tasks
-   🔄 REST API communication between frontend and backend
-   🗄️ PostgreSQL database
-   🔗 Prisma ORM
-   📱 Responsive user interface
-   🛡️ Protected API routes and authorization

## 🏗️ Architecture

``` text
                    DevFlow AI
                        │
          ┌─────────────┴─────────────┐
          │                           │
       Frontend                    Backend
          │                           │
     Next.js + React             Express + Node.js
          │                           │
          │                        TypeScript
          │                           │
          └─────────────┬─────────────┘
                        │
                     REST API
                        │
                     Prisma
                        │
                   PostgreSQL
                        │
                     AI API
```

## 🛠️ Tech Stack

### Frontend

-   Next.js
-   React
-   TypeScript / JavaScript
-   Tailwind CSS
-   REST API integration

### Backend

-   Node.js
-   Express.js
-   TypeScript
-   REST APIs
-   Authentication & authorization
-   Prisma ORM

### Database

-   PostgreSQL
-   Prisma



### Tools

-   Git
-   GitHub
-   VS Code
-   npm

## 📂 Project Structure

The project is organized into separate frontend and backend
applications.

> Folder names may vary depending on the final implementation.

## 🔄 How It Works

1.  A user registers or logs into DevFlow AI.
2.  The user accesses the dashboard.
3.  The user creates a project.
4.  Development tasks are created and assigned to the project.
5.  Tasks can be updated using different statuses and priorities.
6.  The user can provide a development requirement to the AI.
7.  The AI analyzes the requirement and generates actionable tasks.
8.  The developer tracks progress through the dashboard.

## 🤖 AI Workflow

A typical AI-assisted workflow looks like:

``` text
Development Requirement
          ↓
       AI Analysis
          ↓
   Break Into Tasks
          ↓
 Review / Modify Tasks
          ↓
 Add Tasks To Project
          ↓
     Track Progress
```

For example:

**Requirement:**

> Implement authentication for an e-commerce application.

The AI can suggest:

``` text
1. Create User database model
2. Create registration API
3. Implement password hashing
4. Create login API
5. Implement authentication middleware
6. Protect private routes
7. Create frontend login form
8. Test authentication flow
```

## 🔐 Authentication

DevFlow AI uses authentication to protect user-specific resources.

The authentication flow is:

``` text
Register
   ↓
Login
   ↓
Validate Credentials
   ↓
Generate Authentication Token
   ↓
Access Protected Resources
```

Protected APIs verify the authenticated user before allowing access to
projects, tasks, and other private resources.

## 🗄️ Database

PostgreSQL is used as the primary database and Prisma is used as the
ORM.


> Update the endpoint names above to match the final routes implemented
> in the project.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

-   Node.js
-   npm
-   PostgreSQL
-   Git

### 1. Clone the repository

``` bash
git clone <your-repository-url>
cd devflow-ai
```

### 2. Install frontend dependencies

``` bash
cd frontend
npm install
```

### 3. Install backend dependencies

Open another terminal:

``` bash
cd backend
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the backend directory.

Example:

``` env
PORT=5000
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/devflow_ai"

JWT_SECRET="your_jwt_secret"

AI_API_KEY="your_ai_api_key"
```

Never commit real API keys, passwords, JWT secrets, or other sensitive
credentials to GitHub.

### 5. Set up Prisma

From the backend directory:

``` bash
npx prisma generate
npx prisma migrate dev
```

### 6. Start the backend

``` bash
npm run dev
```

### 7. Start the frontend

From the frontend directory:

``` bash
npm run dev
```

Open the application in your browser at the frontend URL shown by
Next.js.

## 🔒 Security

The project follows common security practices including:

-   Password hashing
-   Protected routes
-   Authentication middleware
-   Environment variables for secrets
-   Input validation
-   User-level authorization


## 📈 Future Improvements

Possible future enhancements include:

-   Real-time collaboration
-   Team workspaces
-   Role-based access control
-   GitHub integration
-   Pull request tracking
-   AI code review
-   AI-generated project roadmaps
-   Notifications
-   Activity logs
-   Advanced analytics
-   Deployment integration
-   Automated testing assistance

## 🎯 Project Goals

DevFlow AI was built to demonstrate practical full-stack development
skills, including:

-   Modern frontend development with Next.js
-   Backend development with Express and Node.js
-   TypeScript
-   REST API design
-   PostgreSQL database design
-   Prisma ORM
-   Authentication and authorization
-   AI API integration
-   Full-stack application architecture
-   Git and GitHub workflow

## 👨‍💻 Author

**Akash More**

Built as a full-stack developer portfolio project.

## 📄 Link
  https://devflow-ai-git-main-akash-more.vercel.app
  

