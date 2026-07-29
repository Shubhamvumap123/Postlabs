# Job Tracker SaaS

A production-ready full stack job application tracking dashboard.

## Features
- **User Authentication:** Secure JWT-based signup, login, and logout.
- **Job Management:** Add, edit, delete, and view job applications.
- **Status Tracking:** Organize applications by status (Applied, Interview, Offer, Rejected).
- **Search & Filter:** Easily find jobs by company, position, or status.
- **Analytics:** Visual charts showing the distribution of application statuses.
- **Responsive UI:** Dark-themed, modern interface built with Tailwind CSS.

## Tech Stack
- **Frontend:** React.js (Vite), TailwindCSS, Recharts, Framer Motion, Lucide React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT, bcryptjs

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- pnpm
- MongoDB instance (local or Atlas)

### Installation
1. Clone the repository and install dependencies:
   ```bash
   pnpm install
   ```

2. Configure environment variables:
   Create a `.env` file in the `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

   Create a `.env` file in the `client/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. Start the development servers:
   ```bash
   # Starts both frontend and backend concurrently
   pnpm run dev
   ```

## Architecture & Scalability Improvements
- **Monorepo Structure:** Uses a pnpm workspace to cleanly separate `client` and `server` while sharing tooling.
- **Centralized API Client:** Frontend uses a configured Axios instance with interceptors for automatic token injection and easier base URL management.
- **Separation of Concerns:** Backend follows MVC pattern with distinct `routes`, `controllers`, and `models`.
- **Future Scalability:**
  - Implement Redis for caching frequent queries (e.g., dashboard analytics).
  - Add rate limiting and helmet middleware for security.
  - Implement pagination for the jobs list as the user data grows.

## Deployment Steps

### Backend (Render)
1. Push your code to GitHub.
2. Log in to Render and create a new "Web Service".
3. Connect your repository.
4. Set the Root Directory to `server`.
5. Set the Build Command to `pnpm install` (or `npm install`).
6. Set the Start Command to `npm start`.
7. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`).

### Frontend (Vercel)
1. Log in to Vercel and "Add New Project".
2. Connect your repository.
3. Set the Root Directory to `client`.
4. The build settings should auto-detect Vite (`pnpm run build`).
5. Add Environment Variables (`VITE_API_URL` pointing to your deployed Render backend).
6. Deploy!

## Screenshots
![Dashboard Placeholder](https://via.placeholder.com/800x450.png?text=Dashboard+Analytics+and+Job+List)
![Modal Placeholder](https://via.placeholder.com/800x450.png?text=Add/Edit+Job+Modal)
