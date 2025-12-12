import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected successfully to database ${conn.connection.name}`);
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

