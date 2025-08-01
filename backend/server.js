import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoute from "./routes/paymentRoute.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import authRoutes from './routes/authRoute.js';
import firebaseUserRoutes from './routes/firebaseUserRoutes.js';

import "dotenv/config";
// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
await connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoute);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/firebase", firebaseUserRoutes); // Firebase authentication routes

app.get("/", (req, res) => {
  res.send("Foodie API is working! 🍕 Firebase Authentication is now integrated.");
});

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
  console.log(`📱 Firebase Authentication is available at /api/firebase`);
});
