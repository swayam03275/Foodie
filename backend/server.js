import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

import 'dotenv/config';
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
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

app.get('/',(req,res)=>{
    res.send("api working");
});

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});