import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
const app = express();
const PORT = process.env.PORT || 3500;

dotenv.config();
app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);


app.get("/" , (req,res)=>{
    res.send("API is running...");
});

app.listen(PORT , ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})