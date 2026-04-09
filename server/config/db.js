const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // If running in development without a real URI, mock it to avoid crashing the build
    if (process.env.NODE_ENV !== 'production' && !process.env.MONGO_URI) {
      console.log('MongoDB connection skipped (no URI provided in dev mode)');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
