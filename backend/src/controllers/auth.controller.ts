import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userService from "../services/user.service";
import { generateAccessToken } from "../utils/token-handler";
import { handleError } from "../utils/commons";
import { validateLogin, validateUser } from "../utils/validation-schema";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    validateLogin(req.body);
    const [user] = await userService.findOneByEmail({ email });
    if (user.length) {
      const pswd = user[0].password;
      const pswdMatch = await bcrypt.compare(password, pswd);
      if (pswdMatch) {
        const accessToken = generateAccessToken(email);
        res.json({ data: { accessToken }, error: null });
        return;
      } else {
        res.json({ data: null, error: "Invalid email and password" });
        return;
      }
    } else {
      res.status(400).json({ data: null, error: "Invalid email and password" });
      return;
    }
  } catch (err) {
    res.status(400).json({ data: null, error: handleError(err) });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    validateUser(req.body);
    const { password } = body;
    if (!password) {
      res.json({ data: null, error: "Password is required." });
      return;
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const [result] = await userService.insertOne({
      ...body,
      password: hashedPassword,
    });

    if (result.affectedRows === 1) {
      const { password, ...rest } = req.body;
      res.json({ data: rest, error: null });
      return;
    }
    res.status(400).json({ data: null, error: "Unable to register user" });
    return;
  } catch (err) {
    res.status(400).json({ data: null, error: handleError(err) });
  }
};

const authController = {
  login,
  register,
};

export default authController;
