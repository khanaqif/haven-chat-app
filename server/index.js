/* import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";
import messagesRoutes from "./routes/MessagesRoute.js";
import { setupSocket } from "./socket.js";
import channelRoutes from "./routes/ChannelRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

const databaseURL = process.env.MONGO_URI;
app.use(
  cors({
    origin: process.env.ORIGIN.split(","),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL);
    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

setupSocket(server);
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
 */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import http from "http";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoutes from "./routes/ContactRoutes.js";
import messagesRoutes from "./routes/MessagesRoute.js";
import channelRoutes from "./routes/ChannelRoutes.js";
import { setupSocket } from "./socket.js"; // Import the setupSocket function

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;
const databaseURL = process.env.MONGO_URI;

app.use(
  cors({
    origin: process.env.ORIGIN.split(","),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/channel", channelRoutes);

/* Connect to MongoDB */
const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};
connectDB();

/* Test API route */
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

/* Setup Socket.IO */
setupSocket(server); // Attach socket.io to the server

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
