import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
// import connectDB from "./config/db.config";

const PORT = process.env.PORT;
const app = express();

// connectDB();

app.use(express.json());
app.use(cors());

app.get("/home", (req, res) => {
  res.send("hello fmmc");
});

app.listen(PORT, () => {
  console.log(`Server is up and running :`, PORT);
});
