# Job Tracker SaaS Dashboard

A production-ready full-stack Job Tracker application designed to help users efficiently manage their job search process.

![Dashboard Screenshot](./placeholder-dashboard.png)
*(Screenshot Placeholder - Add dashboard image here)*

## 🚀 Features

*   **Complete SaaS Dashboard UI**: Modern, responsive, and intuitive user interface built with React and Tailwind CSS.
*   **Secure Authentication**: Role-based access control with JWT authentication (Signup, Login, Logout).
*   **Comprehensive Job Management**: Full CRUD operations (Add, Edit, Delete) for job applications.
*   **Status Tracking**: Easily monitor application progress (Applied, Interview, Offer, Rejected).
*   **Search & Filter**: Quickly find specific applications using robust search and status filtering.
*   **Analytics Dashboard**: Visual representations of application statistics using dynamic charts (Recharts).
*   **Protected Routes**: Robust client-side and server-side route protection ensuring data privacy.

## 🛠 Tech Stack

**Frontend:**
*   React.js (with Vite)
*   Tailwind CSS (Styling)
*   Framer Motion (Animations)
*   Lucide-React (Icons)
*   Recharts (Data Visualization)
*   Axios (HTTP Client)

**Backend:**
*   Node.js
*   Express.js
*   MongoDB (Database)
*   Mongoose (ODM)
*   JSON Web Tokens (JWT Authentication)
*   Bcrypt.js (Password Hashing)

## ⚙️ Setup Instructions

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB instance (local or Atlas)
*   pnpm (or npm/yarn)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd postlabs
    ```

2.  **Install dependencies:**
    This project uses a unified root for simplicity in development. Install all necessary packages:
    ```bash
    pnpm install
    ```

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and configure the following variables:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/jobtracker
    JWT_SECRET=your_super_secret_key
    VITE_API_URL=http://localhost:5000/api
    ```

4.  **Run the application:**
    You will need two terminal windows to run both the frontend and backend simultaneously.

    *Terminal 1 (Backend):*
    ```bash
    node server/index.js
    ```

    *Terminal 2 (Frontend):*
    ```bash
    pnpm run dev
    ```

5.  **Access the app:**
    Open your browser and navigate to `http://localhost:5173`.

## 📚 Architecture & Deployment

For a detailed breakdown of the project structure, architectural decisions, and step-by-step deployment instructions for Vercel and Render, please refer to the [Architecture and Deployment Guide](ARCHITECTURE_AND_DEPLOYMENT.md).
