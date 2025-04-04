import express from "express";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import { IUser } from "./services/user.service";
import { authenticate } from "./middlewares/authenticate";
import artistRouter from "./routes/artist.routes";
import songRouter from "./routes/song.routes";
import config from "./utils/config";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}

const port = config.PORT || 4000;

const app = express();

app.use(express.json());

app.use("/user", authenticate, userRouter);
app.use("/artist", authenticate, artistRouter);
app.use("/song", authenticate, songRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server successfully started at port: ${port}`);
});
