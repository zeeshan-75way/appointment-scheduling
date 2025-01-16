import nodemailer from "nodemailer";

export const sendEmail = async ({
  email,
  subject,
  html,
  url,
}: {
  email: string;
  subject: string;
  html: string;
  url?: string;
}) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
