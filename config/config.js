import dotenv from "dotenv";

dotenv.config();
export default {
  port: process.env.PORT,
  si_port: process.env.SI_PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongodbUri: process.env.MONGODB_URI,
  rabbitmqUrl: process.env.RABBITMQ_URL,
};
