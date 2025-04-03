import express from "express";
import songController from "../controllers/song.controller";

const songRouter = express.Router();

/* fetch all songs */
songRouter.get("/", songController.getAll);

/* fetch one song */
songRouter.get("/:id", songController.getById);

/* create a song */
songRouter.post("/", songController.create);

/* update a song */
songRouter.post("/:id", songController.update);

/* delete a song */
songRouter.delete("/:id", songController.deleteById);

export default songRouter;
