# Architecture and Deployment Guide

## Architecture Overview

This project is a full-stack Job Tracker application built with the MERN/PERN stack principles, modified for our specific technology choices:

*   **Frontend**: React (with Vite) + Tailwind CSS + Framer Motion. Provides a highly interactive, responsive, and modern user interface.
*   **Backend**: Node.js + Express.js. Serves RESTful APIs for client consumption.
*   **Database**: MongoDB (via Mongoose). A NoSQL database well-suited for flexible schema designs like job application tracking.
*   **Authentication**: JSON Web Tokens (JWT) for stateless, secure user authentication.

### Project Structure

```text
/
├── server/                 # Backend Node.js/Express application
│   ├── controllers/        # Request handling logic (authController, jobController)
│   ├── middleware/         # Express middleware (auth.js for protecting routes)
│   ├── models/             # Mongoose schemas (User.js, Job.js)
│   ├── routes/             # API route definitions (authRoutes, jobRoutes)
│   └── index.js            # Entry point for the Express server
├── src/                    # Frontend React application
│   ├── components/         # Reusable UI components (JobDashboard, ui/)
│   ├── lib/                # Utilities and API clients (api.ts using Axios)
│   ├── pages/              # Route components (Dashboard, Login, Signup)
│   ├── App.tsx             # Main application component & Router
│   └── main.tsx            # Entry point for React
└── README.md               # Project documentation
```

### Key Components

*   **Authentication Flow**: Users register/login via the React frontend. The backend validates credentials against MongoDB (using bcrypt for password hashing) and issues a JWT. The frontend stores this JWT (in `localStorage`) and attaches it to the `Authorization` header for subsequent requests using an Axios interceptor (`src/lib/api.ts`).
*   **Protected Routes (Frontend)**: The React Router uses a `PrivateRoute` wrapper in `App.tsx` to ensure only authenticated users can access the dashboard.
*   **Protected Routes (Backend)**: Express routes in `jobRoutes.js` utilize the `protect` middleware to verify the JWT and inject the authenticated user's ID into the request object, ensuring users can only access their own data.
*   **Job Management**: The `JobDashboard` component provides a comprehensive interface for CRUD operations on job applications, complete with status filtering, search, and a Recharts-powered analytics chart.

---

## Step-by-Step Implementation Guide

The transformation from a static frontend template to a full-stack application involved the following steps:

1.  **Backend Setup**:
    *   Created the `server/` directory structure.
    *   Installed necessary dependencies (`express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `dotenv`).
    *   Implemented Mongoose models for `User` and `Job`.
    *   Created controllers and routes for authentication (`/api/auth/register`, `/api/auth/login`).
    *   Created controllers and routes for job management (`/api/jobs` - GET, POST, PUT, DELETE).
    *   Implemented JWT verification middleware.
    *   Set up the Express server (`index.js`) and connected to MongoDB.
2.  **Frontend Enhancements**:
    *   Added `axios` for API requests and `recharts` for the dashboard chart.
    *   Configured an Axios instance (`src/lib/api.ts`) to automatically attach the JWT to request headers.
    *   Created `Login.tsx` and `Signup.tsx` pages.
    *   Updated `App.tsx` to include the new routes and a `PrivateRoute` wrapper.
    *   Replaced the placeholder task dashboard with a comprehensive `JobDashboard.tsx` that integrates with the backend API for real-time CRUD operations.
    *   Updated the main `Dashboard.tsx` page to render the new `JobDashboard`.

---

## Deployment Steps

To deploy this application to production, we recommend separating the frontend and backend deployments.

### 1. Deploying the Backend (Node.js/Express) to Render

Render is an excellent, developer-friendly platform for hosting Node.js applications.

1.  **Prerequisites**: Push your codebase to a GitHub repository.
2.  **Create a Web Service**:
    *   Log into [Render](https://render.com/).
    *   Click "New" -> "Web Service".
    *   Connect your GitHub repository.
3.  **Configure the Service**:
    *   **Name**: `jobtracker-api` (or similar)
    *   **Environment**: `Node`
    *   **Build Command**: `pnpm install` (or `npm install` depending on your lockfile)
    *   **Start Command**: `node server/index.js`
4.  **Environment Variables**:
    *   Navigate to the "Environment" tab for your new service.
    *   Add the following variables:
        *   `NODE_ENV`: `production`
        *   `MONGO_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas).
        *   `JWT_SECRET`: A strong, randomly generated string for signing tokens.
        *   `PORT`: `5000` (Render will automatically map this).
5.  **Deploy**: Render will automatically build and deploy your service. Note the provided URL (e.g., `https://jobtracker-api.onrender.com`).

### 2. Deploying the Frontend (React/Vite) to Vercel

Vercel provides a seamless experience for deploying frontend frameworks.

1.  **Create a Project**:
    *   Log into [Vercel](https://vercel.com/).
    *   Click "Add New" -> "Project".
    *   Import your GitHub repository.
2.  **Configure the Project**:
    *   **Framework Preset**: Vite (Vercel usually detects this automatically).
    *   **Build Command**: `pnpm run build`
    *   **Output Directory**: `dist`
3.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Add the following variable to connect the frontend to your deployed backend:
        *   `VITE_API_URL`: The URL of your deployed Render service + `/api` (e.g., `https://jobtracker-api.onrender.com/api`).
4.  **Deploy**: Click "Deploy". Vercel will build and host your frontend, providing a public URL.

---

## Suggestions for Scalability and Clean Architecture

As the application grows, consider implementing the following improvements:

### Clean Architecture

1.  **Service Layer**: Currently, business logic is mixed within the controllers. Extract business rules into a dedicated Service layer (e.g., `JobService.js`). Controllers should only handle HTTP request/response formatting, while Services handle the core logic.
2.  **Repository Pattern**: For complex database queries, introduce a Repository pattern to abstract Mongoose specific calls away from the Service layer, making the application more database-agnostic.
3.  **Input Validation**: Implement robust input validation using a library like `Joi` or `Zod` in middleware before requests reach the controllers to ensure data integrity.

### Scalability

1.  **Caching**: Implement caching mechanisms (like Redis) for frequently accessed, read-heavy endpoints (e.g., fetching the user's dashboard statistics) to reduce database load.
2.  **Database Indexing**: Ensure appropriate indexes are created on the MongoDB collections (e.g., indexing `user` and `status` fields on the `Jobs` collection) to optimize query performance as the dataset grows.
3.  **Microservices Readiness**: The current monolithic backend structure (`server/`) is fine for a small application. However, ensuring clean separation of concerns (User module vs. Job module) now will make it easier to split into microservices later if horizontal scaling demands it.
4.  **Pagination**: Currently, the `/api/jobs` endpoint returns all jobs for a user. Implement pagination on the backend and frontend to handle users with hundreds of applications efficiently.
