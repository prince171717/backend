import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import productRoutes from "./routes/products.js";
import errorHandler from "./middlewares/errorHandler.js";
import { connectDB } from "./utils/db.js";


dotenv.config();


const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/products", productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async() => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log("Error in startServer");
  }
};

startServer();
