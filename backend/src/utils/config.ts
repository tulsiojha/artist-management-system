import dotenv from "dotenv";

dotenv.config();

const config = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  PORT: process.env.PORT,
};

export default config;
