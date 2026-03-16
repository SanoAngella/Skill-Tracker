import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const connectDB = async () => {
    console.log("Checking IRI:", process.env.MONGO_URI);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch (error){
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // exit when there is failure
    }
}