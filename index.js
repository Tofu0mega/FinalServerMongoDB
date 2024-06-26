// Import dependencies
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';

// Import configuration files and middleware
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';

import router from "./routes.js"
import { verifyToken } from './middleware/tokens.js';

// Load environment variables
dotenv.config();

// Configure cloudinary
cloudinary.config({
    cloud_name:"dtauaal8p",
    api_key:"117669798764489",
    api_secret: "dPUyjkKlrR0vZejDTvCfxHTRmNY",
});
/*Replace this with the given info module present in .env file as snippet IMP DO NOT PUSH WHILE THE SNIPPET IS IN CODE*/ 
/*

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
*/

// Connect to the database
connectDB();

// Create the Express app
const app = express();


// Add middleware
const allowedOrigins = ['http://127.0.0.1:5173', 'https://eventhive.vercel.app'];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);// Enable CORS
app.use(bodyParser.json({ limit: '30mb', extended: true })); // Parse JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(compression()); // Compress responses
app.use(morgan('combined')); // Log HTTP requests

// Add session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Set session secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Use secure cookies
}));

// Add cookie middleware
app.use(cookieParser());

// Add passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("",verifyToken,router)

// Default routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Error handling middleware
app.use(errorHandler); // Handle errors
app.use(notFoundHandler); // Handle 404 errors

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
