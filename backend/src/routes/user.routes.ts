import express from "express";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

/* fetch all users */
userRouter.get("/", userController.getAll);

/* fetch one user */
userRouter.get("/:id", userController.getById);

/* create a user */
userRouter.post("/", userController.create);

/* update a user */
userRouter.post("/:id", userController.update);

/* delete a user */
userRouter.delete("/:id", userController.deleteById);

export default userRouter;
