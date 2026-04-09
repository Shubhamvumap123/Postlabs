# JobTracker SaaS Fullstack

A production-ready fullstack Job Tracker application.

## Features

- **User Authentication:** Secure JWT-based signup, login, and protected routes.
- **Job Management:** Full CRUD operations (Create, Read, Update, Delete) for job applications.
- **Status Tracking:** Track applications across stages (Applied, Interview, Offer, Rejected).
- **Dashboard Analytics:** Visual overview of application statuses.
- **Responsive UI:** Built with React, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Axios, React Router, Framer Motion
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, BcryptJS

## Folder Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # React Context (Auth)
│   │   ├── lib/         # Utilities and API config
│   │   └── pages/       # Application routes
├── server/          # Node.js/Express backend
│   ├── config/      # DB and config files
│   ├── controllers/ # Request handlers
│   ├── middleware/  # Express middlewares (Auth)
│   ├── models/      # Mongoose schemas
│   └── routes/      # API route definitions
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT Secret:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   node server.js
   ```

### Frontend Setup

1. Navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` (adjust `VITE_API_URL` if needed):
   ```bash
   cp .env.example .env
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Deployment

### Frontend (Vercel)

1. Connect your repository to Vercel.
2. Set the root directory to `client`.
3. Vercel will automatically detect the Vite preset.
4. Add the `VITE_API_URL` environment variable pointing to your deployed backend URL.
5. Deploy!

### Backend (Render / Heroku)

1. Create a new Web Service on Render.
2. Connect your repository and set the root directory to `server`.
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add environment variables: `MONGO_URI` and `JWT_SECRET`.
6. Deploy!

## Screenshots

*(Placeholder for Screenshots)*
- Dashboard Overview
- Add/Edit Job Modal
- Authentication Pages

## Architecture & Scalability Improvements

- **Pagination:** For users with many applications, implement server-side pagination for the `/api/jobs` endpoint to reduce load times and bandwidth usage.
- **Caching:** Integrate a caching layer (like Redis) or utilize `react-query` on the frontend more thoroughly to cache job analytics and lists, reducing database reads.
- **Input Validation:** Implement a schema validation library like `Joi` or `Zod` on the backend to thoroughly validate incoming request bodies before they reach the controller logic.
- **Rate Limiting:** Add a rate limiting middleware (like `express-rate-limit`) to authentication routes to protect against brute-force attacks.
- **Indexes:** Ensure MongoDB indexes are properly set up for commonly queried fields like `user`, `status`, and fields used in search (`company`, `position`).
