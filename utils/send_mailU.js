import { from } from "form-data";
import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendMail = async (emails, trackingId) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: emails,
    subject: "Tracking dead pixel ",
    // send dead pixel to track
    html: `<p> Tracking ID: ${trackingId} </p>
    
      
    `,
  };
};
