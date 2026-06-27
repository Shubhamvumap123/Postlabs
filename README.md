# Job Tracker SaaS

A production-ready full-stack Job Tracker application designed to help users manage and analyze their job search process. Built with a modern tech stack ensuring high performance, scalability, and an excellent developer experience.

## Features

- **User Authentication**: Secure signup, login, and logout functionality using JSON Web Tokens (JWT).
- **Protected Routes**: Dashboard and job management areas are secured and accessible only to authenticated users.
- **Job Management (CRUD)**:
  - Add new job applications.
  - Edit existing job details.
  - Delete outdated or incorrect entries.
  - View all applications in a clean, responsive table.
- **Status Tracking**: Categorize jobs by status (Applied, Interview, Offer, Rejected) for better organization.
- **Search & Filter**: Instantly search for specific companies/roles and filter the view by application status.
- **Analytics Dashboard**: Visual overview of application statuses using interactive charts (via Recharts).
- **Responsive UI**: A modern SaaS-style dashboard layout built with React, Tailwind CSS, and Lucide icons.
- **Dark Mode Support**: Built-in theming support via `next-themes`.

## Tech Stack

### Frontend
- **Framework**: React 19 + Vite (TypeScript)
- **Styling**: Tailwind CSS v4
- **State Management**: React Query (`@tanstack/react-query`) for API data, React Context for Auth
- **Routing**: React Router DOM v7
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Date Formatting**: date-fns

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT & bcryptjs for password hashing
- **Language**: TypeScript (compiled via tsc)

### Monorepo Tooling
- **Package Manager**: pnpm (Workspace configuration)
- **Development**: Concurrent client/server execution

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (v10+ recommended)
- A running instance of MongoDB (local or MongoDB Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   Run the following command at the root to install dependencies for both the client and server:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the `server/` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/job-tracker
   JWT_SECRET=your_super_secret_jwt_key
   ```

   *(Optional)* If you need to change the API URL for the frontend, create a `.env` file in the `client/` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the Application:**
   From the root directory, start both the frontend and backend concurrently:
   ```bash
   pnpm run dev
   ```
   - Frontend will run on `http://localhost:5173`
   - Backend will run on `http://localhost:5000`

## Suggested Improvements for Scalability & Clean Architecture

1. **Backend Architecture**:
   - Implement the Repository Pattern or Service Layer to decouple business logic from the Express controllers.
   - Use a validation library like `Zod` or `Joi` to validate incoming request payloads before they hit the database.
2. **Database**:
   - Add indexing to frequently queried MongoDB fields (e.g., `user`, `status`, `company`) to improve read performance as the dataset grows.
3. **Frontend**:
   - Implement pagination or infinite scrolling on the Jobs page to handle users with hundreds of applications.
   - Use React Hook Form with Zod for robust client-side form validation.
4. **Testing**:
   - Add unit and integration tests for the backend API using Jest and Supertest.
   - Expand Playwright E2E tests for critical user flows (e.g., Registration -> Adding a Job -> Viewing Analytics).

## Deployment Steps

This project is structured perfectly for deployment using Vercel (for the frontend) and Render (for the backend).

### Deploying the Backend (Render)

1. Create a new "Web Service" on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Set the **Root Directory** to `server`.
4. Build Command: `pnpm install && pnpm run build`
5. Start Command: `pnpm run start`
6. Add your Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `PORT`).
7. Deploy. Once live, copy the Render service URL.

### Deploying the Frontend (Vercel)

1. Create a new project on [Vercel](https://vercel.com/).
2. Import your GitHub repository.
3. Set the **Framework Preset** to Vite.
4. Set the **Root Directory** to `client`.
5. In the Environment Variables section, add:
   - `VITE_API_URL`: `<Your-Render-Backend-URL>/api`
6. Click **Deploy**.

## Screenshots

*(Placeholder: Add screenshots of the Login page, Dashboard Analytics, and the Jobs data table here)*
