# Job Tracker SaaS

A production-ready full-stack Job Tracker application to help users manage their job applications.

## Features
- **User Authentication**: Secure signup, login, and logout using JWT and bcrypt.
- **Job Management**: CRUD operations to Add, Edit, Delete, and View job applications.
- **Status Tracking**: Keep track of job statuses (Applied, Interview, Offer, Rejected).
- **Search & Filter**: Easily find jobs by company, position, or status.
- **Analytics Dashboard**: Visual charts displaying application status breakdown.
- **Responsive UI**: Built with React, TailwindCSS, and Recharts for a modern SaaS feel.

## Tech Stack
- **Frontend**: React.js / Vite / TailwindCSS / Recharts
- **Backend**: Node.js / Express.js / MongoDB / Mongoose
- **Authentication**: JWT

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- `pnpm` package manager

### Backend Setup
1. Navigate to the server directory:
   `cd server`
2. Install dependencies:
   `pnpm install`
3. Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/jobtracker
   JWT_SECRET=your_super_secret_key
   ```
4. Start the backend server:
   `npm start` or `node server.js`

### Frontend Setup
1. Navigate to the client directory:
   `cd client`
2. Install dependencies:
   `pnpm install`
3. Start the Vite development server:
   `pnpm dev`

### Deployment (Suggested)
- **Frontend (Vercel)**: Import the GitHub repository into Vercel, set the Root Directory to `client`, and configure Build Command as `pnpm build`.
- **Backend (Render)**: Create a new Web Service on Render, connect the repo, set Root Directory to `server`, Build Command to `pnpm install`, and Start Command to `npm start`. Add required Environment Variables (`MONGODB_URI`, `JWT_SECRET`).

## Screenshots
![Dashboard Placeholder](https://via.placeholder.com/800x400?text=Dashboard+Screenshot)
