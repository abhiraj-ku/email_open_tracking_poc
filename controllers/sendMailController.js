import { v4 as uuid } from "uuid";
import Track from "../models/track.models";

const sendMail = async (req, res) => {
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

    // send email
  } catch (err) {}
};

const trackMail = async () => {
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
  } catch (err) {}
};
