// // const express = require("express");
// // const cors = require("cors");
// // const dotenv = require("dotenv");
// // const connectDB = require("./config/db");

// // dotenv.config();

// // const app = express();

// // connectDB();

// // // Increase payload limit
// // app.use(cors());
// // app.use(express.json({ limit: "10mb" }));
// // app.use(express.urlencoded({ limit: "10mb", extended: true }));

// // app.get("/", (req, res) => {
// //   res.status(200).json({
// //     success: true,
// //     message: "Portfolio backend API is running",
// //   });
// // });

// // // Routes
// // app.use("/api/auth", require("./routes/authRoutes"));
// // app.use("/api/projects", require("./routes/projectRoutes"));
// // app.use("/api/skills", require("./routes/skillRoutes"));
// // app.use("/api/services", require("./routes/serviceRoutes"));
// // app.use("/api/messages", require("./routes/messageRoutes"));

// // // 404 handler
// // app.use((req, res) => {
// //   res.status(404).json({
// //     success: false,
// //     message: "Route not found",
// //   });
// // });

// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db.js");

// dotenv.config();

// const app = express();

// connectDB();

// app.use(
//   cors({
//     origin: "http://localhost:5173", // haddii frontend-kaagu Vite yahay
//     credentials: true,
//   })
// );

// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ limit: "10mb", extended: true }));

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Portfolio backend API is running",
//   });
// });

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));
// app.use("/api/skills", require("./routes/skillRoutes"));
// app.use("/api/services", require("./routes/serviceRoutes"));
// app.use("/api/messages", require("./routes/messageRoutes"));

// // 404
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();

// const app = express();

// connectDB();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Portfolio backend API is running",
//   });
// });

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));
// app.use("/api/skills", require("./routes/skillRoutes"));
// app.use("/api/services", require("./routes/serviceRoutes"));
// app.use("/api/messages", require("./routes/messageRoutes"));

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// payload limit kordhi
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio backend API is running",
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});