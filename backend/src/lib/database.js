import mongoose from 'mongoose'

export const connectDb = async ()=>{
    try {
        const databaseConnect= await mongoose.connect(process.env.MONGO_URI);
        console.log("Database successfully connected :", databaseConnect.connection.host);
    } catch (error) {
        console.log("error in connecting database :", error);
        process.exit(1);
    }
}