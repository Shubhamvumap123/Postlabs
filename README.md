# Job Tracker SaaS

A production-ready full-stack job tracking application built with React, Node.js, Express, and MongoDB.

## Features
- **User Authentication**: Secure JWT-based login and registration.
- **Job Management**: Full CRUD operations for job applications.
- **Status Tracking**: Keep track of applications (Applied, Interview, Offer, Rejected).
- **Dashboard Analytics**: Visualize job application statistics with interactive charts.
- **Search & Filter**: Easily find jobs by status or search terms.
- **Responsive Design**: Modern UI built with TailwindCSS and Radix UI.

## Tech Stack
- **Frontend**: React (Vite), TailwindCSS, React Query, Recharts, Lucide Icons.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs.

## Setup Instructions

1. **Clone the repository**

2. **Backend Setup**
   ```bash
   cd server
   pnpm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Start the backend:
   ```bash
   pnpm run dev
   ```

3. **Frontend Setup**
   ```bash
   pnpm install
   ```
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the frontend:
   ```bash
   pnpm run dev
   ```

## Screenshots
![Dashboard Placeholder](screenshot-dashboard.png)
![Jobs List Placeholder](screenshot-jobs.png)

## Deployment (Suggested)
- **Frontend**: Deploy to Vercel by importing the repository and setting the build command to `pnpm run build` and the output directory to `dist`.
- **Backend**: Deploy to Render as a Web Service using Node.js. Set the environment variables in the Render dashboard.

## Architecture & Scalability Improvements
- **Pagination & Caching**: Implement cursor-based pagination for job listings and use Redis for caching frequently accessed data.
- **Microservices**: For very large scale, separate authentication and job tracking into distinct microservices.
- **Message Queues**: Use RabbitMQ or AWS SQS for asynchronous tasks like email notifications for upcoming interviews.
