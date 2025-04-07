import { Request, Response } from "express";
import songService from "../services/song.service";
import { generatePagination, getPageInfo, handleError } from "../utils/commons";
import { validateSong } from "../utils/validation-schema";

const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    const [song] = await songService.findOneById({ id });
    if (song.length) {
      res.json({ data: song[0], error: null });
    } else {
      res
        .status(404)
        .json({ data: null, error: `No song found with id ${id}` });
    }
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const [songs] = await songService.findAll(getPageInfo(req));
    const [page] = await songService.getTotalCount();

    res.json({ data: { songs, ...generatePagination(page) }, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const getAllByArtist = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ data: null, error: "Id is required" });
      return;
    }
    const [songs] = await songService.findAllByArtist(id, getPageInfo(req));
    const [page] = await songService.getTotalCountForArtist(id);

    res.json({ data: { songs, ...generatePagination(page) }, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    validateSong(req.body);
    const [result] = await songService.insertOne(req.body);
    if (result.affectedRows === 1) {
      const { password, ...rest } = req.body;
      res.json({ data: rest, error: null });
      return;
    }
    res.status(400).json({ data: null, error: "Unable to add song" });
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
    validateSong(req.body);
    const [result] = await songService.updateOne(req.body, id);
    if (result.affectedRows === 1) {
      const { password, ...rest } = req.body;
      res.json({ data: rest, error: null });
      return;
    }
    res.status(400).json({ data: null, error: "Unable to update song" });
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
    const [result] = await songService.deleteById({ id });
    if (!result) {
      res.status(400).json({ data: null, error: "Unable to delete song" });
      return;
    }
    res.json({ data: { id }, error: null });
  } catch (err) {
    res.status(500).json({ data: null, error: handleError(err) });
  }
};

const songController = {
  getAll,
  getAllByArtist,
  getById,
  create,
  update,
  deleteById,
};

export default songController;
