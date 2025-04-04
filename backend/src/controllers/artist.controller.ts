import { Request, Response } from "express";
import artistService from "../services/artist.service";
import { generatePagination, handleError } from "../utils/commons";
import { validateArtist } from "../utils/validation-schema";

const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    const [artist] = await artistService.findOneById({ id });
    if (artist.length) {
      res.json({ data: artist[0], error: null });
    } else {
      res
        .status(404)
        .json({ data: null, error: `No artist found with id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const [artists] = await artistService.findAll();
    const [page] = await artistService.getTotalCount();

    res.json({
      data: { artists, ...generatePagination(page) },
      error: null,
    });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    validateArtist(req.body);
    const [result] = await artistService.insertOne(req.body);
    if (result.affectedRows === 1) {
      const { password, ...rest } = req.body;
      res.json({ data: rest, error: null });
      return;
    }
    res.status(400).json({ data: null, error: "Unable to add artist" });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    validateArtist(req.body);
    const [result] = await artistService.updateOne(req.body, id);
    if (result.affectedRows === 1) {
      const { password, ...rest } = req.body;
      res.json({ data: rest, error: null });
      return;
    }
    res.status(400).json({ data: null, error: "Unable to update artist" });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    const [result] = await artistService.deleteById({ id });
    if (!result) {
      res.status(400).json({ data: null, error: "Unable to delete artist" });
      return;
    }
    res.json({ data: { id }, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const artistController = { getAll, getById, create, update, deleteById };

export default artistController;
