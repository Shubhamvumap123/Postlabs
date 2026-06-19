# Job Tracker SaaS

A production-ready full stack Job Tracker application.

## Features

* **User Authentication**: Secure signup, login, and logout using JWT. Role-based access control.
* **Job Application Management**: CRUD operations to add, edit, delete, and view job applications.
* **Status Tracking**: Track applications across statuses like Applied, Interview, Offer, and Rejected.
* **Search & Filters**: Easily search and filter jobs by status, position, etc.
* **Dashboard Analytics**: Visual overview of your job search progress with charts.
* **Responsive SaaS UI**: Built with React, TailwindCSS, and shadcn/ui components.

## Tech Stack

* **Frontend**: React.js, Vite, TailwindCSS, React Router, React Query, Recharts
* **Backend**: Node.js, Express.js, TypeScript
* **Database**: MongoDB, Mongoose
* **Authentication**: JSON Web Tokens (JWT), bcryptjs

## Setup Instructions

### Prerequisites
* Node.js (v18 or higher)
* MongoDB database (local or Atlas)
* pnpm package manager

### Backend Setup
1. Navigate to the `server` directory: `cd server`
2. Install dependencies: `pnpm install`
3. Configure environment variables in `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the development server: `pnpm run dev`

### Frontend Setup
1. Navigate to the `client` directory: `cd client`
2. Install dependencies: `pnpm install`
3. Start the development server: `pnpm run dev`

### Deployment
* **Frontend**: Can be easily deployed to Vercel. Push to GitHub and connect to Vercel. Make sure to set the build command to `pnpm run build` and output directory to `dist`.
* **Backend**: Can be deployed to Render. Create a Web Service, connect your repo, set the build command to `pnpm install && pnpm run build`, and the start command to `node dist/index.js`. Don't forget to add environment variables.
* **Database**: MongoDB Atlas is recommended for production.

## Screenshots

*(Placeholders for screenshots)*
- [Dashboard View](#)
- [Add Job Modal](#)
- [Login Screen](#)
