# Full Stack Job Tracker Application

A production-ready full stack SaaS dashboard application for tracking job applications.

## Features
- **Frontend**: Built with React, Vite, and Tailwind CSS.
- **Backend**: Node.js and Express.js RESTful API.
- **Database**: MongoDB for scalable data storage.
- **Authentication**: Secure JWT-based authentication (Login, Register).
- **Job Tracking**: Add, edit, delete, and view job applications.
- **Dashboard**: Track job application metrics dynamically.
- **Clean Architecture**: Structured correctly with client and server separated.

## Tech Stack
- Frontend: React 19, Tailwind CSS, Framer Motion, Lucide React
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Auth: JWT, bcryptjs

## Setup Instructions

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd postlabs
   ```

2. Install dependencies for the workspace:
   ```sh
   pnpm install
   ```

3. Setup environment variables:
   - Create a `.env` file in the `server` directory:
     ```
     PORT=5000
     MONGODB_URI=mongodb://localhost:27017/job-tracker
     JWT_SECRET=your_jwt_secret_key_here
     ```

4. Run the development environment:
   - To start both frontend and backend (you can use concurrently or simply run in separate terminals):
   - Terminal 1 (Backend):
     ```sh
     cd server
     pnpm run dev
     ```
   - Terminal 2 (Frontend):
     ```sh
     cd client
     pnpm run dev
     ```

## Deployment

### Backend (Render)
1. Push your code to GitHub.
2. Go to [Render](https://render.com) and create a new Web Service.
3. Select your repository and set the Root Directory to `server`.
4. Build command: `pnpm install && pnpm run build`
5. Start command: `pnpm run start`
6. Add the `.env` variables to the Environment Variables section.

### Frontend (Vercel)
1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and import your repository.
3. Set the Framework Preset to Vite.
4. Set the Root Directory to `client`.
5. Add any required frontend environment variables (like `VITE_API_URL` if you extract it to env).
6. Deploy!

## Screenshots
*(Add screenshot placeholders here)*
