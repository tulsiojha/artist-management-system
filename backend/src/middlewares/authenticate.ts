import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import userService, { IUser } from "../services/user.service";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["accessToken"] as string;
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
      console.log(email);
      if (email) {
        const [data] = await userService.findOneByEmail({ email });
        if (data.length === 0) {
          res
            .status(403)
            .json({ data: null, error: "Access denied. Invalid access token" });
          return;
        }
        const { password, ...user } = data[0];
        req.user = user as IUser;
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
