import db from "../connections/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IPageInfo, IPageResult } from "../utils/commons";

export enum GENRE {
  "RNB" = "rnb",
  "COUNTRY" = "country",
  "CLASSIC" = "classic",
  "ROCK" = "rock",
  "JAZZ" = "jazz",
}

export interface ISong extends RowDataPacket {
  artist_id: number;
  title: string;
  album_name: string;
  genre?: GENRE;
  created_at?: Date;
  updated_at?: Date;
}

const getTotalCount = () => {
  return db
    .promise()
    .query<IPageResult[]>("SELECT COUNT(*) AS total FROM song;");
};
const getTotalCountForArtist = (artist: string) => {
  return db
    .promise()
    .query<
      IPageResult[]
    >("SELECT COUNT(*) AS total FROM song WHERE artist_id = ?;", [artist]);
};

/* query song by id */
const findOneById = ({ id }: { id: string }) => {
  return db.promise().query<ISong[]>("SELECT * FROM song WHERE id = ?;", [id]);
};

/* query all song */
const findAll = (pI?: IPageInfo) => {
  return db
    .promise()
    .query<
      ISong[]
    >("SELECT id,album_name,genre,title,artist_id,created_at,updated_at FROM song LIMIT ? OFFSET ?;", [pI?.limit, pI?.offset]);
};

/* query all song */
const findAllByArtist = (artist: string, pI?: IPageInfo) => {
  return db
    .promise()
    .query<
      ISong[]
    >("SELECT id,album_name,genre,title,artist_id,created_at,updated_at FROM song WHERE artist_id = ? LIMIT ? OFFSET ?;", [artist, pI?.limit, pI?.offset]);
};

/* create a song */
const insertOne = ({ id, updated_at, ...props }: ISong) => {
  const data = { ...props, created_at: new Date() };
  return db.promise().query<ResultSetHeader>("INSERT INTO song SET ?;", data);
};

/* update a song */
const updateOne = (
  { id: i, created_at, email, ...props }: ISong,
  id: string,
) => {
  const data = { ...props, updated_at: new Date() };
  return db
    .promise()
    .query<ResultSetHeader>("UPDATE song SET ? WHERE id = ?;", [data, id]);
};

/* delete a song by id */
const deleteById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<ResultSetHeader>("DELETE FROM song WHERE id = ?;", [id]);
};

const songService = {
  findOneById,
  findAll,
  findAllByArtist,
  insertOne,
  updateOne,
  deleteById,
  getTotalCount,
  getTotalCountForArtist,
};

export default songService;
