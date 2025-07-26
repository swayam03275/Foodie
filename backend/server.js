import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import authRouter from './routes/authRoute.js';
import paymentRoute from "./routes/paymentRoute.js";

import 'dotenv/config';
// app config
const app = express();
const port = 4000;


// middleware
app.use(express.json());
app.use(cors());

// db connection
await connectDB();

// api endpoints
app.use("/api/food",foodRouter);
app.use("/api/auth", authRouter);
app.use("/api/payment", paymentRoute);

app.get('/',(req,res)=>{
    res.send("api working");
});

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});