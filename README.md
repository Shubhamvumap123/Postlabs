# Full Stack Job Tracker SaaS

A production-ready Full Stack Job Tracker application built to help users manage their job applications effectively.

## Features

- **User Authentication:** Secure signup, login, and logout using JWT.
- **Job Application Management:** Full CRUD (Create, Read, Update, Delete) operations for job applications.
- **Job Status Tracking:** Track applications through different stages (Applied, Interview, Offer, Rejected).
- **Search & Filtering:** View all job applications with status color-coding.
- **Analytics Dashboard:** Visualize application statuses using a Pie Chart (powered by Recharts).
- **Protected Routes:** Ensure user data privacy and security.

## Tech Stack

- **Frontend:** React.js (v19), Vite, TailwindCSS, Recharts, Axios, Lucide React
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT), bcryptjs

## Folder Structure

```
├── client/
│   ├── src/
│   │   ├── components/  # React components (e.g., JobDashboard)
│   │   ├── pages/       # Route pages (Login, Signup, Dashboard)
│   │   ├── lib/         # AuthContext and utils
│   │   └── ...
├── server/
│   ├── src/
│   │   ├── controllers/ # Route logic (auth, jobs)
│   │   ├── middleware/  # JWT authentication middleware
│   │   ├── models/      # Mongoose schemas (User, Job)
│   │   ├── routes/      # Express routes
│   │   └── index.ts     # Entry point
└── package.json         # Workspace configuration (concurrently)
```

## Setup Instructions

1. **Prerequisites:** Ensure you have Node.js and `pnpm` installed. You will also need a MongoDB database (local or MongoDB Atlas).
2. **Install Dependencies:**
   From the root directory, run:
   ```bash
   pnpm run install:all
   ```
3. **Environment Variables:**
   Create a `.env` file in the `server/` directory and add:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. **Run the Application:**
   From the root directory, start both client and server concurrently:
   ```bash
   pnpm run dev
   ```
   - Client runs on `http://localhost:5173`
   - Server runs on `http://localhost:5000`

## Scalability & Clean Architecture Suggestions

- **Pagination & Caching:** Implement pagination for the jobs API and integrate React Query for efficient frontend caching.
- **Microservices:** As the application grows, consider splitting the backend into microservices (e.g., Auth Service, Job Service).
- **Global Error Handling:** Implement a centralized error-handling middleware in Express.
- **Validation:** Use a schema validation library like `Zod` or `Joi` for API payload validation.

## Deployment Steps

### Frontend (Vercel)
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Set the Root Directory to `client`.
4. Configure Build Command: `pnpm run build` and Output Directory: `dist`.
5. Deploy!

### Backend (Render)
1. Push your code to GitHub.
2. Create a new Web Service on Render.
3. Set the Root Directory to `server`.
4. Configure Build Command: `pnpm install && pnpm run build`
5. Configure Start Command: `node dist/index.js`
6. Add necessary Environment Variables (`MONGODB_URI`, `JWT_SECRET`).
7. Deploy!
