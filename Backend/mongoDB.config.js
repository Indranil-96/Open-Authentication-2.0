import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
    const DBURI = process.env.MONGO_URI;


    mongoose.connect(DBURI).then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log("An error occured while connecting DB", err));
}