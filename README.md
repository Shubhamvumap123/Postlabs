# JobTracker SaaS

A production-ready full-stack Job Tracker application built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication:** Secure JWT-based signup, login, and protected routes.
- **Job Management:** Full CRUD capabilities for tracking job applications.
- **Analytics Dashboard:** Visualize application status and metrics using Recharts.
- **Search & Filtering:** Easily locate specific applications.
- **Modern UI:** Built with TailwindCSS and Radix UI components for a polished SaaS look.
- **Dark Mode:** Built-in theme toggling.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, TailwindCSS, Recharts, Axios, React Router v7.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs.
- **State Management:** React Context API for Auth.

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- pnpm package manager

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd <repo-name>
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/jobtracker
   JWT_SECRET=your_super_secret_jwt_key
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the Development Server:**
   This project uses `concurrently` to run both the Vite frontend and Node.js backend simultaneously.
   ```bash
   pnpm dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

## Screenshots

*(Placeholder for dashboard screenshot)*
![Dashboard Screenshot](#)

*(Placeholder for job list screenshot)*
![Jobs List Screenshot](#)

## Deployment Steps

This application is designed to be split for deployment, or served together. For a standard modern deployment:

### Backend (Render)
1. Push your code to GitHub.
2. Create a new "Web Service" on [Render](https://render.com).
3. Connect your repository.
4. Set the Build Command to `pnpm install` and Start Command to `node server/index.js`.
5. Add your `.env` variables (`MONGO_URI`, `JWT_SECRET`, etc.).

### Frontend (Vercel)
1. Create a new Project on [Vercel](https://vercel.com).
2. Connect your repository.
3. Vercel should auto-detect the Vite configuration.
4. Add the `VITE_API_URL` environment variable pointing to your Render backend URL.
5. Deploy!
