import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transport = createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendEMail = async (emails, trackingId) => {
  const trackingUrl = `${process.env.BASE_URL}/v1/track-mail/${trackingId}`;
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: emails,
    subject: "Tracking dead pixel",
    html: `<p> Tracking ID: ${trackingId} </p>
    <img src="${trackingUrl}" alt="dead url" style="display: none;" />`,
  };

  try {
    // Verify connection configuration
    await transport.verify();

    // Send mail
    const info = await transport.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    throw new Error("Failed to send email: " + error.message);
  }
};
