import express from "express";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

/* fetch all users */
userRouter.get("/", async (_, res) => {
  const result = await userController.findAll();
  if (result.data) {
    res.json(result);
  } else {
    res.status(404).json(result);
  }
});

/* fetch one user */
userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ data: null, error: "Id is required" });
  }
  const result = await userController.findOneById({ id });
  if (result.data) {
    const { password, ...rest } = result.data;
    res.json({ ...result, data: rest });
  } else {
    res.status(404).json(result);
  }
});

/* create a user */
userRouter.post("/", async (req, res) => {
  const body = req.body;
  const result = await userController.insert(body);
  if (result.data) {
    res.json(result);
  } else {
    res.status(404).json(result);
  }
});

/* update a user */
userRouter.post("/:id", async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ data: null, error: "Id is required" });
  }
  const result = await userController.update(body, id);
  if (result.data) {
    res.json(result);
  } else {
    res.status(404).json(result);
  }
});

/* delete a user */
userRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ data: null, error: "Id is required" });
  }
  const result = await userController.deleteById({ id });
  if (result.data) {
    res.json(result);
  } else {
    res.status(404).json(result);
  }
});

export default userRouter;
