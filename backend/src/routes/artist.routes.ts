import express from "express";
import artistController from "../controllers/artist.controller";

const artistRouter = express.Router();

/* fetch all artist */
artistRouter.get("/", artistController.getAll);

/* fetch one artist */
artistRouter.get("/:id", artistController.getById);

/* create a artist */
artistRouter.post("/", artistController.create);

/* update a artist */
artistRouter.post("/:id", artistController.update);

/* delete a artist */
artistRouter.delete("/:id", artistController.deleteById);

export default artistRouter;
