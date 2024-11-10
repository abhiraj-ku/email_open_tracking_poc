import { v4 as uuid } from "uuid";
import Track from "../models/track.models.js";
import { sendEMail } from "../utils/send_mailU.js";

// Path resolution in ES6
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = path.join(__dirname, "../assets/cool.jpg");

export const sendMail = async (req, res) => {
  const { emails, password } = req.body;
  if (!emails || !password) {
    return res.json({ message: "One field is missing" });
  }

  if (password != process.env.PASSWORD) {
    return res.json({ message: "Wrong password" });
  }

  // Tracking id to send in each emails
  const trackingId = uuid();
  try {
    await Track.create({ trackingId });

    // send mail
    await sendEMail(emails, trackingId);

    return res.json({ message: "Email sent success", trackingId });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Failed to send email " });
  }
};

export const trackMail = async (req, res) => {
  const { id } = req.params.id;
  const userIP = req.ip;

  if (!id) {
    return res.json({ message: "Tracking id is required" });
  }

  try {
    const track = await Track.findOne({ trackingId: id });
    if (!track) {
      return res.json({ message: "Tracking id not found" });
    }

    // if id is there check for unique ips that opened it
    if (!track.userIPs.includes(userIP)) {
      track.userIPs.push(userIP);
      track.opens++;

      await track.save();
    }
    return res.sendFile(imagePath);
  } catch (err) {
    console.log(err);
    return res.json({ message: "Failed to track image" });
  }
};

export const getMailStatus = async (req, res) => {
  const { id } = req.params.id;
  if (!id) {
    return res.json({ message: "Tracking id is missing" });
  }
  try {
    const track = await Track.findOne({ trackingId: id });
    if (!track) {
      return res.json({ message: "Tracking id not found" });
    }
    return res.json({ message: "Email status sent", data: track });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Failed to get email status" });
  }
};
