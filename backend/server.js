const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS Options
const corsOptions = {
  origin: [
    "https://smart-sensor.vercel.app",   // your current domain
    "http://localhost:5173",             // Vite local
    "http://localhost:3000"              // React local
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use("/api", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
