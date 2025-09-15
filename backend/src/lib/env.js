import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    PORT : process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,

    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
    CLIENT_URL: process.env.CLIENT_URL,

    MONGO_URI: process.env.MONGO_URI,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET


};


