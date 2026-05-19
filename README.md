# Job Tracker Full-Stack Application

A production-ready full-stack Job Tracker SaaS application that allows users to manage and track their job applications.

## Features

* **User Authentication:** Secure JWT-based signup, login, and logout.
* **Job Application Management:** Full CRUD (Create, Read, Update, Delete) operations for job applications.
* **Status Tracking:** Track applications through stages: Applied, Interview, Offer, and Rejected.
* **Search & Filter:** Easily find jobs by company, role, or current status.
* **Dashboard Analytics:** Visual summary of your job search progress.
* **Responsive UI:** Modern, dark-mode SaaS interface built with Tailwind CSS.
* **Protected Routes:** Frontend and backend security ensuring data privacy.

## Tech Stack

* **Frontend:** React.js (Vite), TypeScript, Tailwind CSS, Framer Motion, Lucide-React, React Router DOM.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB, Mongoose.
* **Authentication:** JSON Web Tokens (JWT), bcryptjs for password hashing.

## Screenshots

*(Placeholders for screenshots)*
* `[Screenshot 1: Landing Page]`
* `[Screenshot 2: User Dashboard and Analytics]`
* `[Screenshot 3: Add/Edit Job Modal]`

## Setup Instructions

### Prerequisites
* Node.js (v18+)
* pnpm (Package Manager)
* MongoDB database (Local or Atlas)

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Backend Setup
```bash
cd server
pnpm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-tracker
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
pnpm start
# Server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal window in the root directory:
```bash
pnpm install
```

Start the frontend development server:
```bash
pnpm dev
# App will run on http://localhost:5173
```

## Architecture & Scalability Suggestions

* **State Management:** Currently using React Context. As the app grows, consider Redux Toolkit or Zustand for complex client-state, and React Query for server-state caching and synchronization.
* **Database Indexing:** Add indexes on frequently queried MongoDB fields like `user`, `status`, and `company` to improve read performance.
* **Rate Limiting:** Implement rate limiting on the backend (e.g., `express-rate-limit`) to protect against brute-force attacks on authentication routes.
* **Microservices:** If features expand (e.g., adding a web scraper or email notifications), consider breaking the monolithic Express backend into microservices.

## Deployment Steps

### Frontend Deployment (Vercel)
1. Push your code to a GitHub repository.
2. Log in to Vercel and click "Add New Project".
3. Import your repository.
4. Set the Framework Preset to `Vite`.
5. Ensure the Root Directory is set to `./` (the root).
6. Click "Deploy".

### Backend Deployment (Render)
1. Log in to Render and click "New Web Service".
2. Connect your GitHub repository.
3. Set the Root Directory to `server`.
4. Set the Build Command to `pnpm install`.
5. Set the Start Command to `node index.js`.
6. Add Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`).
7. Click "Create Web Service".

*Note: After deploying the backend, update the frontend API calls in `src/pages/Dashboard.tsx` and `src/pages/Login.tsx`/`Register.tsx` to point to the Render backend URL instead of `http://localhost:5000`.*
