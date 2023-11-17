import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_URI =  'mongodb://127.0.0.1:27017/KUventsJServer';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};


export default connectDB;
