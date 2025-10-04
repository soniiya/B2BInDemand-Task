import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const URI = process.env.MONGO_URI;

export const connectDB = async (): Promise<void> => {
  if(!URI) process.exit(1)
  try {
    await mongoose.connect(URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
}