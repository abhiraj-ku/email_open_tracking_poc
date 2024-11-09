import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Db connected`);
  } catch (error) {
    console.error(`'Database connection error: `, error);
    process.exit(1);
  }
}
export default connectDB;
