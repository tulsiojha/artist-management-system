import express from "express";
import songController from "../controllers/song.controller";
import { hasRole } from "../middlewares/has-role";
import { USER_ROLE } from "../services/user.service";

const songRouter = express.Router();

/* fetch all songs */
songRouter.get(
  "/",
  hasRole([USER_ROLE.SUPER_ADMIN, USER_ROLE.ARTIST_MANAGER, USER_ROLE.ARTIST]),
  songController.getAll,
);

/* fetch one song */
songRouter.get("/:id", hasRole([USER_ROLE.ARTIST]), songController.getById);

/* create a song */
songRouter.post("/", hasRole([USER_ROLE.ARTIST]), songController.create);

/* update a song */
songRouter.post("/:id", hasRole([USER_ROLE.ARTIST]), songController.update);

/* delete a song */
songRouter.delete(
  "/:id",
  hasRole([USER_ROLE.ARTIST]),
  songController.deleteById,
);

export default songRouter;
