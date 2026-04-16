import nodemailer from "nodemailer";
console.log(process.env.SMTP_PASS);
console.log(process.env.SMTP_USER);
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
   secure: false,
  authMethod: "LOGIN", 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
export default transporter;