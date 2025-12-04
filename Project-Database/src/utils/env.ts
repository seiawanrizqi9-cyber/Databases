import dotenv from "dotenv";

dotenv.config();

export default {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 5000,
    MODE_ENV: process.env.NODE_ENV
} as const