# Job Tracker Application

A full stack, production-ready SaaS application for tracking job applications.

## Features

- **User Authentication:** Secure JWT-based signup, login, and logout.
- **Job Tracking:** Add, edit, and delete job applications.
- **Status Pipeline:** Track applications across multiple stages (Applied, Interview, Offer, Rejected).
- **Search & Filter:** Easily find jobs and filter by status.
- **Analytics Dashboard:** Visualize application progress using charts.

## Tech Stack

- **Frontend:** React.js / Vite, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)
- pnpm package manager

### 1. Clone & Install Dependencies

\`\`\`bash
git clone <repository-url>
cd job-tracker

# Install Client Dependencies
cd client
pnpm install

# Install Server Dependencies
cd ../server
pnpm install
\`\`\`

### 2. Environment Variables

Create \`.env\` file in the \`server\` directory:

\`\`\`env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
\`\`\`

### 3. Run the Application

\`\`\`bash
# Run Server (from /server)
npm run start:dev

# Run Client (from /client)
pnpm run start:dev
\`\`\`

## Screenshots

*(Placeholders for screenshots)*
- Dashboard View
- Job Board View
- Analytics Charts View

## Deployment

**Frontend (Vercel):**
Connect the \`client/\` folder to Vercel and build using standard Vite/React settings.

**Backend (Render):**
Deploy the \`server/\` directory as a Node.js web service on Render, adding the required environment variables.
