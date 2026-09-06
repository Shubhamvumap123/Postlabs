# Full Stack Job Tracker Application

A production-ready full-stack SaaS application for tracking job applications, managing statuses, and viewing analytics. Built with a modern React frontend and a robust Node.js/Express backend.

## 🚀 Features

- **User Authentication:** Secure signup, login, and logout using JSON Web Tokens (JWT).
- **Job Management:** Complete CRUD operations (Create, Read, Update, Delete) for job applications.
- **Status Tracking:** Track applications across stages (Applied, Interview, Offer, Rejected).
- **Search & Filter:** Easily find specific applications by company, position, or status.
- **Analytics Dashboard:** Visual insights into your application success rate using Recharts.
- **Protected Routes:** Ensure sensitive data and routes are only accessible to authenticated users.
- **Responsive UI:** A beautiful, dark-mode focused UI built with Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**
- React.js / Next.js (Vite)
- TypeScript
- Tailwind CSS
- Recharts (Analytics)
- React Router DOM
- Axios (HTTP Client)
- Sonner (Toast notifications)

**Backend:**
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)
- JWT (Authentication)
- bcryptjs (Password Hashing)

## 📸 Screenshots

*(Placeholders for screenshots)*
- [Dashboard View](https://placehold.co/800x400?text=Dashboard+Analytics)
- [Job List](https://placehold.co/800x400?text=Job+List+View)
- [Add/Edit Job Modal](https://placehold.co/800x400?text=Add+Job+Modal)

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local instance or MongoDB Atlas)

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd postlabs
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies:**
   Navigate to the `server/` directory (if applicable) or ensure the root `package.json` includes the backend dependencies, and run:
   ```bash
   npm install
   ```
   *(Note: In this specific setup, dependencies are shared in the root `package.json`)*

4. **Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/jobtracker
   JWT_SECRET=your_super_secret_jwt_key
   ```

5. **Run the Backend Server:**
   You can start the backend server by running:
   ```bash
   node server/index.js
   ```

6. **Run the Frontend Development Server:**
   In a separate terminal, start the Vite development server:
   ```bash
   npm run dev
   ```

7. **Access the Application:**
   Open your browser and navigate to `http://localhost:5173`. The backend runs on `http://localhost:5000` and is proxied by Vite.

## 🚀 Deployment Steps

### Deploying the Backend (Render)

1. Create a new Web Service on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Configure the settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
4. Add your Environment Variables (`MONGODB_URI` pointing to MongoDB Atlas, `JWT_SECRET`, etc.).
5. Deploy the service and note the deployed URL.

### Deploying the Frontend (Vercel)

1. Import your project into [Vercel](https://vercel.com/).
2. Ensure the Framework Preset is set to Vite.
3. **Important:** Since the frontend and backend are deployed separately in production, you need to configure Axios base URL or environment variables for the production backend API URL instead of relying on the Vite proxy.
   - Example: Create a `.env.production` file:
     ```env
     VITE_API_URL=https://your-render-backend-url.onrender.com
     ```
   - Update Axios setup (e.g., in `src/main.tsx` or `src/App.tsx`):
     ```javascript
     axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';
     ```
4. Deploy the frontend application.

## 🏛️ Architecture & Scalability Improvements

- **Separation of Concerns:** Keep controllers, models, and routes strictly separated.
- **Validation:** Implement stricter request validation using libraries like Joi or Zod before hitting controllers.
- **Error Handling:** Create a centralized error handling middleware to standardize API error responses.
- **Pagination:** Implement pagination for the `/api/jobs` endpoint to handle users with thousands of applications efficiently.
- **State Management:** For larger applications, consider moving from Context API to Redux Toolkit or Zustand for more robust global state management.
