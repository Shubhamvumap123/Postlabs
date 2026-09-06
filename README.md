# Job Tracker SaaS

A production-ready full stack Job Tracker application. Manage your job search process efficiently with authentication, job tracking, and analytics.

## Features

- **User Authentication:** Secure signup, login, and logout using JWT.
- **Job Tracking:** Add, edit, delete, and view your job applications.
- **Status Management:** Track applications through stages (Applied, Interview, Offer, Rejected).
- **Dashboard Analytics:** Visual overview of your job search progress.
- **Search & Filter:** Easily find specific job applications.
- **Responsive Design:** Beautiful, mobile-friendly SaaS UI using Tailwind CSS.

## Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- React Router
- TanStack Query
- Lucide React

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing

## Project Structure

```
├── client/          # Frontend React application (in root folder)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Route components
│   │   ├── lib/         # API integration
│   │   └── ...
├── server/          # Backend Express application
│   ├── controllers/ # Request handlers
│   ├── models/      # Mongoose schemas
│   ├── routes/      # Express routes
│   ├── middleware/  # Custom middleware (auth)
│   └── server.js    # Entry point
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- pnpm (recommended) or npm

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
   *(Note: For local testing, if MONGODB_URI is not provided, the server uses an in-memory MongoDB instance).*

4. Start the backend development server:
   ```bash
   pnpm dev
   ```

### Frontend Setup

1. From the project root, install dependencies:
   ```bash
   pnpm install
   ```

2. Start the frontend development server:
   ```bash
   pnpm dev
   ```

## Deployment Steps

### Backend (Render / Heroku)
1. Push your code to a GitHub repository.
2. Create a new Web Service on Render.
3. Set the Root Directory to `server/`.
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`
6. Add Environment Variables (`MONGODB_URI`, `JWT_SECRET`, etc.).

### Frontend (Vercel / Netlify)
1. Import your GitHub repository to Vercel.
2. Set the Framework Preset to Vite.
3. The Build Command should be `npm run build` or `pnpm run build`.
4. Add environment variables (e.g., `VITE_API_URL` pointing to your deployed backend url).

## Screenshots

*(Placeholder for screenshots - Add images of the dashboard, job list, and authentication pages here)*
