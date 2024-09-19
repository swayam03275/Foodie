import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://foodel:5MsJRgYb0l4SPXKs@cluster0.4kvai.mongodb.net/Food-Delivery').then(()=>{
        console.log('db connected')
    })
}