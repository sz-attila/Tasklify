import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is not defined");
}

mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
