import express from "express";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";
import { connectDb } from "./src/lib/database.js";
import { ENV } from "./src/lib/env.js";

const app = express();
const PORT = ENV.PORT || 3500;

app.use(express.json());
app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);


app.get("/" , (req,res)=>{
    res.send("API is running...");
});

app.listen(PORT , ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDb();
})