import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.config.js";
import mailRoutes from "./routes/mailRoutes.js";

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/v1", mailRoutes);
app.get("/home", (req, res) => {
  res.send("hello fmmc");
});

app.listen(PORT, () => {
  console.log(`Server is up and running :`, PORT);
});
