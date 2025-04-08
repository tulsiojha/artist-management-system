import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
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

const corsOptions = {
  origin: ["http://localhost:3000", "https://ams.ojhabikash.com.np"], // Replace with your Next.js frontend URL
  credentials: true,
};

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json());

app.use("/user", authenticate, userRouter);
app.use("/artist", authenticate, artistRouter);
app.use("/song", authenticate, songRouter);
app.use("/auth", authRouter);
app.get("/healthy", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Server successfully started at port: ${port}`);
});
