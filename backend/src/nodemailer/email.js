import { ENV } from '../lib/env.js';
import { createWelcomeEmailTemplate } from './emailTemplates.js';
import  transporter from './nodemailer.js';

export const sendWelcomeEmail = async (email, name, clientUrl) => {
    try {
         const mailOptions = {
        from: {
        name: "Chatify",
        address: ENV.SENDER_EMAIL,
      },
        to: email,
        subject: "Welcome to chat app",
        html: createWelcomeEmailTemplate(name, clientUrl)
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + response.messageId);
    } catch (error) {
         console.error("Error sending welcome email: ", error);
    }
}