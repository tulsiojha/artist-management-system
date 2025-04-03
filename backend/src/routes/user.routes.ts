import express from "express";
import userController from "../controllers/user.controller";
import { hasRole } from "../middlewares/has-role";
import { USER_ROLE } from "../services/user.service";

const userRouter = express.Router();

/* fetch all users */
userRouter.get("/", hasRole([USER_ROLE.SUPER_ADMIN]), userController.getAll);

/* fetch one user */
userRouter.get(
  "/:id",
  hasRole([USER_ROLE.SUPER_ADMIN]),
  userController.getById,
);

/* create a user */
userRouter.post("/", hasRole([USER_ROLE.SUPER_ADMIN]), userController.create);

/* update a user */
userRouter.post(
  "/:id",
  hasRole([USER_ROLE.SUPER_ADMIN]),
  userController.update,
);

/* delete a user */
userRouter.delete(
  "/:id",
  hasRole([USER_ROLE.SUPER_ADMIN]),
  userController.deleteById,
);

export default userRouter;
