import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import { connectDb } from "./src/lib/database.js";
import { ENV } from "./src/lib/env.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {app, server} from './src/lib/socket.js'

const PORT = ENV.PORT || 3500;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true
}))
app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);


app.get("/" , (req,res)=>{
    res.send("API is running...");
});

server.listen(PORT , ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDb();
})