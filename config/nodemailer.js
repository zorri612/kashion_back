import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   // tu correo
    pass: process.env.EMAIL_PASS,   // contraseña o app password
  },
});
