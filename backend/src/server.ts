import express from "express";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import { IUser } from "./services/user.service";
import { authenticate } from "./middlewares/authenticate";
import artistRouter from "./routes/artist.routes";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}

const app = express();

app.use(express.json());

app.use("/user", authenticate, userRouter);
app.use("/artist", authenticate, artistRouter);
app.use("/auth", authRouter);

app.listen(8000, () => {
  console.log("server started successfully");
});
