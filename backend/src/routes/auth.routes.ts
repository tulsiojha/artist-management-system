import express from "express";
import bcrypt from "bcrypt";
import userController from "../controllers/user.controller";
import { generateAccessToken } from "../utils/token-handler";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({ data: null, error: "Email and password are required." });
  }
  const result = await userController.findOneByEmail({ email });
  if (result.data) {
    const pswd = result.data.password;
    const pswdMatch = await bcrypt.compare(password, pswd);
    if (pswdMatch) {
      const accessToken = generateAccessToken(email);
      res.json({ data: { accessToken }, error: null });
    } else {
      res.json({ data: null, error: "Invalid email and password" });
    }
  } else {
    res.status(400).json({ data: null, error: "Invalid email and password" });
  }
});

authRouter.post("/register", async (req, res) => {
  const body = req.body;
  const { password } = body;
  if (!password) {
    res.json({ data: null, error: "Password are required." });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const result = await userController.insert({
    ...body,
    password: hashedPassword,
  });

  if (result.data) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

export default authRouter;
