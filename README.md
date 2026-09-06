# Full Stack Job Tracker SaaS

A production-ready Job Tracking application built with the MERN stack (MongoDB, Express, React, Node.js) + TailwindCSS.

## Features

- **User Authentication:** Secure signup, login, and logout using JWT.
- **Job Application Tracking:** Full CRUD operations for job applications.
- **Status Management:** Track applications through stages (Applied, Interview, Offer, Rejected).
- **Search & Filter:** Easily find jobs by company or position, and filter by status.
- **Analytics Dashboard:** Visual representation of application statuses using Recharts.
- **Protected Routes:** Ensure only authenticated users can access their dashboard.
- **Responsive UI:** Modern, accessible interface built with Tailwind CSS, Framer Motion, and Radix UI.

## Tech Stack

- **Frontend:** React 19, React Router v7, Tailwind CSS, Recharts, Framer Motion, Axios, Vite.
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Bcryptjs.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB instance (local or MongoDB Atlas)
- pnpm

### Backend Setup
1. Navigate to the `server/` directory: `cd server`
2. Install dependencies: `pnpm install`
3. Create a `.env` file in the `server` root and add:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the server: `pnpm exec ts-node src/index.ts` (or build and run `dist/index.js`).

### Frontend Setup
1. Navigate to the `client/` directory: `cd client`
2. Install dependencies: `pnpm install`
3. Create a `.env` file in the `client` root and add:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the dev server: `pnpm dev`

## Deployment Guidelines

### Deploying the Backend (Render)
1. Push your code to GitHub.
2. Go to Render.com and create a new **Web Service**.
3. Connect your repository and set the Root Directory to `server`.
4. Set the Build Command to `pnpm install && pnpm run build` (ensure you add a build script in `package.json` like `"build": "tsc"`).
5. Set the Start Command to `node dist/index.js`.
6. Add your Environment Variables (`MONGO_URI`, `JWT_SECRET`).

### Deploying the Frontend (Vercel)
1. Go to Vercel.com and create a new Project.
2. Import your repository and set the Root Directory to `client`.
3. Vercel should auto-detect the Vite framework.
4. Add the `VITE_API_URL` environment variable pointing to your deployed Render backend URL.
5. Deploy!

## Screenshots
*(Add screenshot placeholders here)*
- [Dashboard View](#)
- [Login/Register View](#)
- [Analytics View](#)
