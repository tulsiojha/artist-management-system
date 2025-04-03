import express from "express";
import artistController from "../controllers/artist.controller";
import { hasRole } from "../middlewares/has-role";
import { USER_ROLE } from "../services/user.service";

const artistRouter = express.Router();

/* fetch all artist */
artistRouter.get(
  "/",
  hasRole([USER_ROLE.SUPER_ADMIN, USER_ROLE.ARTIST_MANAGER]),
  artistController.getAll,
);

/* fetch one artist */
artistRouter.get(
  "/:id",
  hasRole([USER_ROLE.ARTIST_MANAGER]),
  artistController.getById,
);

/* create a artist */
artistRouter.post(
  "/",
  hasRole([USER_ROLE.ARTIST_MANAGER]),
  artistController.create,
);

/* update a artist */
artistRouter.post(
  "/:id",
  hasRole([USER_ROLE.ARTIST_MANAGER]),
  artistController.update,
);

/* delete a artist */
artistRouter.delete(
  "/:id",
  hasRole([USER_ROLE.ARTIST_MANAGER]),
  artistController.deleteById,
);

export default artistRouter;
