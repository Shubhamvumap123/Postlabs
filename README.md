# JobTracker Pro - Full Stack SaaS Dashboard

A production-ready Job Tracker application with a modern React frontend and a Node.js/Express backend.

## 🚀 Features

- **User Authentication:** Secure JWT-based signup, login, and logout.
- **Job Management:** Complete CRUD operations (Add, Edit, Delete) for job applications.
- **Status Tracking:** Track applications through stages (Applied, Interview, Offer, Rejected).
- **Search & Filter:** Easily find jobs by company name or filter by application status.
- **Analytics Dashboard:** Visual charts (using Recharts) to analyze your application success rate.
- **Responsive UI:** Modern, accessible interface built with Tailwind CSS.

## 💻 Tech Stack

**Frontend:**
- React.js 19 + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Query (TanStack Query)
- Recharts (for Analytics)
- Lucide React (Icons)
- Sonner (Toast notifications)

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs (Password hashing)
- TypeScript

## 📸 Screenshots

*(Add screenshots here)*
- `[Dashboard Screenshot Placeholder]`
- `[Jobs List Screenshot Placeholder]`
- `[Add Job Screenshot Placeholder]`

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- pnpm (v10+)
- MongoDB (local or Atlas URI)

### Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file in the `server` root and add your MongoDB connection string and JWT secret:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/jobtracker
   JWT_SECRET=your_super_secret_key
   ```
4. Start the backend development server:
   ```bash
   pnpm run dev
   ```

### Frontend Setup
1. Open another terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Create a `.env` file in the `client` root (if your API URL differs from default):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   pnpm run dev
   ```

## 🚀 Deployment Guide

### Backend Deployment (Render)
1. Push your code to a GitHub repository.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your repository.
4. Set the Root Directory to `server`.
5. Build Command: `pnpm install && pnpm build`
6. Start Command: `pnpm start` (which runs `node dist/index.js`)
7. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`).

### Frontend Deployment (Vercel)
1. Go to [Vercel](https://vercel.com) and import your GitHub repository.
2. Set the Framework Preset to **Vite**.
3. Set the Root Directory to `client`.
4. Build Command: `pnpm run build`
5. Output Directory: `dist`
6. Add Environment Variable: `VITE_API_URL=https://your-render-backend-url.onrender.com/api`
7. Deploy!
