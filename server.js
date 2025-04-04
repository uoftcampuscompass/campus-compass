import express from "express";
import path from "path";
import mongoose from 'mongoose';
import logger from "morgan";
import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// app.use(logger('dev'));
// app.use(express.json());

// mongoose.connect(process.env.MongoDB).then(()=>{
//   console.log('Connected to MongoDB');
// }).catch((err)=>{
//   console.log(err);
// });

// app.listen(process.env.PORT || 3000, ()=>{
//   console.log('Server is running on port 3000!');
// });

// app.use('/api/user', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/todos', todoRoutes);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(express.json());

mongoose
  .connect(process.env.MongoDB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api", appVersionRoutes);

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