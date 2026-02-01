import nodemailer from "nodemailer";
export function createTransporter() {

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'localhost',
        port: process.env.SMTP_PORT || 1025,
        secure: process.env.SMTP_PORT == 465,
        auth: process.env.EMAIL_USER
            ? {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
            : undefined,
    });
}