import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import userController from "../controllers/user.controller";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")?.[1];
  if (!token) {
    res
      .status(401)
      .json({ data: null, error: "Access denied. No access token found." });
    return;
  }
  jwt.verify(token, config.JWT_TOKEN_SECRET as string, async (err, data) => {
    if (err) {
      res
        .status(403)
        .json({ data: null, error: "Access denied. Invalid access token" });
      return;
    }
    if (data) {
      const email = (data as jwt.JwtPayload).email;
      if (email) {
        const { data, error } = await userController.findOneByEmail({ email });
        if (error) {
          res
            .status(403)
            .json({ data: null, error: "Access denied. Invalid access token" });
          return;
        }
        req.user = data;
      } else {
        res
          .status(403)
          .json({ data: null, error: "Access denied. Invalid access token" });
        return;
      }
    }
    next();
  });
};
