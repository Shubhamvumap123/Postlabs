# Job Tracker Upgrade Guide
## Step-by-Step Implementation
1. **Frontend**: The React application has been updated to track Job Applications instead of abstract tasks.
2. **Backend**: An Express.js backend has been scaffolded in the `server/` folder.
3. **Database**: Mongoose models are provided for Users and Jobs.
4. **Authentication**: JWT is set up in the middleware.

## Deployment Steps
### Vercel (Frontend)
1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set the build command to `npm run build` and output directory to `dist`.

### Render (Backend)
1. Create a new Web Service in Render pointing to the repository.
2. Set the Root Directory to `server`.
3. Set the build command to `npm install` and start command to `npm start`.
4. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`).
