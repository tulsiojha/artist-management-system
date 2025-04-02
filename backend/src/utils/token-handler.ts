import jwt from "jsonwebtoken";
import config from "./config";

export const generateAccessToken = (email: string) => {
  if (!config.JWT_TOKEN_SECRET) {
    throw Error("Something went wrong generating access token.");
  }
  return jwt.sign({ email }, config.JWT_TOKEN_SECRET, { expiresIn: "1 day" });
};
