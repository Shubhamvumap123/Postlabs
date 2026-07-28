# Job Tracker SaaS

A production-ready full stack Job Tracker application.

## Features
- User authentication (Signup/Login/Logout) via JWT.
- CRUD operations for job applications.
- Job status tracking.
- Search and filter jobs.
- Dashboard with analytics charts.
- Role-based access control.

## Tech Stack
- **Frontend**: React.js, TailwindCSS, Recharts, Axios.
- **Backend**: Node.js, Express.js, MongoDB, JWT.

## Setup Instructions
### Backend
1. `cd server`
2. `npm install`
3. Create `.env` file with `MONGO_URI` and `JWT_SECRET`.
4. `npm run dev` or `node server.js`

### Frontend
1. `npm install` (in root directory)
2. `npm run dev`

## Deployment Steps
- **Frontend (Vercel)**: Connect repository, set framework to Vite, and set root directory (if applicable, else root).
- **Backend (Render)**: Create Web Service, connect repo, set root directory to `server`, build command `npm install`, start command `node server.js`. Add environment variables.

## Screenshots
![Dashboard Placeholder](https://via.placeholder.com/800x450?text=Dashboard+Analytics)
![Job List Placeholder](https://via.placeholder.com/800x450?text=Job+Applications+List)
