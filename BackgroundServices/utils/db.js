import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Database is connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    setTimeout(dbConnection, 5000);
  }
};

export default dbConnection;
