import { NextFunction, Request, Response } from "express";
import { USER_ROLE } from "../services/user.service";

export const hasRole = (roles: USER_ROLE[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      res
        .status(401)
        .json({ data: null, error: "Access denied: Invalid user." });
      return;
    } else {
      const hasRole = roles.includes(user.role);
      if (!hasRole) {
        res
          .status(401)
          .json({ data: null, error: "Access denied: Invalid role." });
        return;
      }
    }
    next();
  };
};
