import express from "express";
const router = express.Router();
import {
  getMailStatus,
  sendMail,
  trackMail,
} from "../controllers/sendMailController.js";

router.post("/send", sendMail);

router.get("/track-mail/:id", trackMail);
router.get("/mailStatus/:id", getMailStatus);

export default router;
