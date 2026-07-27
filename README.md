# Job Tracker SaaS

A full-stack Job Tracker application built with React, Node.js, Express, and MongoDB.

## Features
- 🔐 JWT Authentication (Login/Register)
- 📊 Analytics Dashboard with Recharts
- 📝 CRUD Operations for Job Applications
- 🔍 Search and filter jobs
- 🛡️ Protected routes
- 🌓 Dark mode support

## Tech Stack
- Frontend: React (Vite), TypeScript, TailwindCSS, Framer Motion, Recharts
- Backend: Node.js, Express.js
- Database: MongoDB
- Auth: JSON Web Tokens (JWT)

## Setup Instructions

### Backend (Server)
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` (or set `MONGO_URI` and `JWT_SECRET`).
4. Start the server: `npm run dev` (runs on port 5000)

### Frontend (Client)
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `pnpm install`
3. Start the dev server: `pnpm run dev` (proxies `/api` to localhost:5000)

## Deployment
- Frontend: Deploy the `client` folder to Vercel. Ensure build command is `pnpm run build` and output directory is `dist`.
- Backend: Deploy the `server` folder to Render or Heroku. Add environment variables for `MONGO_URI` and `JWT_SECRET`.
