# Deployment and Scaling Guide

## Deployment Steps

### Backend (Render)
1. Push the repository to GitHub.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your repository.
4. Set the Root Directory to `server`.
5. Build Command: `pnpm install` (Make sure pnpm is configured on Render).
6. Start Command: `node server.js`.
7. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`).
8. Deploy.

### Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and create a new project.
2. Import the GitHub repository.
3. Set the Framework Preset to Vite.
4. Set the Root Directory to `client`.
5. Build Command: `pnpm run build`.
6. Output Directory: `dist`.
7. Deploy.
*Note: Update the frontend fetch calls (e.g., in `AuthContext.tsx`, `Login.tsx`, `TaskDashboard.tsx`) to use your Render backend URL instead of `http://localhost:5000`.*

## Scalability and Clean Architecture Improvements
- **Controller-Service-Repository Pattern:** Move business logic out of controllers into services for better testability.
- **Pagination and Search:** Implement server-side pagination for the `/api/jobs` endpoint to handle users with thousands of applications.
- **Rate Limiting:** Add `express-rate-limit` to auth endpoints to prevent brute-force attacks.
- **State Management:** Migrate from simple Context API to Redux Toolkit or React Query for robust client-side caching and state sync if the app grows.
- **Validation:** Use Joi or Zod middleware to strictly validate incoming request payloads.
