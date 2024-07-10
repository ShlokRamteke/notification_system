import express from "express";
import http from "http";
import { Server } from "socket.io";
import amqp from "amqplib";
import config from "../config/config.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let channel;
const connectQueue = async () => {
  const connection = await amqp.connect(config.rabbitmqUrl);
  channel = await connection.createChannel();
  await channel.assertQueue("notifications");
};

connectQueue();

mongoose
  .connect(config.mongodbUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

io.on("connection", async (socket) => {
  console.log("New client connected");
  const token = socket.handshake.query.token;

  try {
    console.log(token);
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.userId);
    console.log(" in authentication of user");
    if (user) {
      user.connected = true;
      await user.save();
      socket.userId = user._id;
      console.log("User authenticated:", user.username);
    }

    channel.consume("notifications", async (msg) => {
      console.log("In consuming notification");
      if (msg !== null) {
        const notification = JSON.parse(msg.content.toString());

        const user = await User.findById(notification.userId);
        console.log(user);
        if (user && user.connected) {
          io.to(socket.id).emit("notification", notification);
        }
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("Authentication error:", error.message);
    socket.disconnect();
  }
});

io.on("disconnect", async () => {
  if (socket.userId) {
    const user = await User.findById(socket.userId);
    if (user) {
      user.connected = false;
      await user.save();
      console.log("User disconnected:", user.username);
    }
  }
});

server.listen(config.si_port, () => {
  console.log(`Real-time server running on port ${config.si_port}`);
});
