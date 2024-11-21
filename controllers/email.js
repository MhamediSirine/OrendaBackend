import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "zonegaming514@gmail.com",
    pass: "rszb gxfp chpn mwqc",
  },
});

export async function sendEmail(email, subject, text) {
  const emailData = {
    from: "zonegaming514@gmail.com",
    to: email,
    subject,
    text,
  };

  await transporter.sendMail(emailData);

}
