import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import skillRoutes from './routes/skillRoutes.js';
import rateLimiter from "./middleware/rateLimiter.js";

// Load env variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Custom Logging Middleware
app.use((req, res, next) => {
   console.log(`Incoming Request: ${req.method} ${req.url}`);
   next();
});

// Routes
app.use('/api/skills', skillRoutes); 

// Health Check
app.get('/', (req, res) => {
    res.status(200).send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 5002;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`); 
 
    });
}).catch((err) => {
    console.error("Failed to connect to DB:", err.message);
});