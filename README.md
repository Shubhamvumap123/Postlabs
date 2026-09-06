# Job Tracker SaaS Dashboard

A full-stack, production-ready SaaS Job Tracker application.

## Features
- **User Authentication:** Secure JWT-based login and signup.
- **Job Tracking:** Add, edit, and delete job applications.
- **Status Management:** Track applications through stages (Applied, Interview, Offer, Rejected).
- **Responsive Dashboard:** Modern UI built with TailwindCSS and Framer Motion.
- **Role-based Access:** (Prepared for RBAC) Protected routes and API endpoints.

## Tech Stack
- **Frontend:** React.js (Vite), TailwindCSS, Framer Motion, Lucide-React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- pnpm
- MongoDB URI

### Backend Setup
1. `cd server`
2. `pnpm install`
3. Create a `.env` file in `server/` with `MONGO_URI` and `JWT_SECRET`.
4. Start the server: `node server.js` (Runs on port 5000)

### Frontend Setup
1. `cd client`
2. `pnpm install`
3. Start the dev server: `pnpm run dev`

## Screenshots
![Dashboard](placeholder-dashboard.png)
![Login](placeholder-login.png)
