import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import 'dotenv/config';
import favoritesRoute from './routes/favoriteRoute.js';
import userRoute from './routes/userRoutes.js'

// app config
const app = express();
const port = 4000;


// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter);
app.use('/api/favorites', favoritesRoute);
app.use('/api/users', userRoute);

app.get('/',(req,res)=>{
    res.send("api working");
});

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});