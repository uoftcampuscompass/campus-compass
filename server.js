import express from "express";
import path from "path";
import mongoose from 'mongoose';
import logger from "morgan";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MongoDB).then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
app.use("/api/auth", authRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Backend working!' });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the frontend
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}!`);
});
