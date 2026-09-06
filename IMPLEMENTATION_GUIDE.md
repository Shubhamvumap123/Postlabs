# Implementation Guide

## Step-by-Step Implementation
1. Scaffold directories (`client` and `server`).
2. Move Vite React app to `client/`.
3. Initialize Express in `server/`.
4. Connect MongoDB in `server/index.js`.
5. Create `User` and `Job` models in `server/models/`.
6. Implement JWT auth routes in `server/routes/auth.js`.
7. Implement Job CRUD in `server/routes/jobs.js`.
8. Protect job routes with a middleware verifying JWT.
9. On frontend, use Context/Redux for state and build dashboard UI.

## Scalability & Clean Architecture
- Use a repository pattern in controllers.
- Add index to MongoDB queries.
- Modularize routes and use dedicated error handler middleware.
- Load balancing and containerization (Docker) for backend.

## Deployment Steps (Vercel + Render)
1. **Frontend (Vercel)**: Connect repo to Vercel, set root directory to `client/`, use standard Vite build.
2. **Backend (Render)**: Deploy as Web Service, set root directory to `server/`, set `MONGO_URI` env var.
