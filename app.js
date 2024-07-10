import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import authRoutes from "./services/auth/routes.js";
import notificationRoutes from "./services/notification/routes.js";
import swagger from "./services/swagger.js";

const app = express();
app.use(express.json());

mongoose
  .connect(config.mongodbUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

app.use("/auth", authRoutes);
app.use("/notify", notificationRoutes);

swagger(app);
app.listen(config.port, () => {
  console.log(`Server running at ${config.port}`);
});
