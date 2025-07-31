import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();// Load .env file

console.log('Connecting to MongoDB...', process.env.MONGO_URI);

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('cannot connect to database');
    console.error('Error', error);
    process.exit(1);
  }
};
