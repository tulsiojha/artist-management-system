import db from "../connections/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IPageResult } from "../utils/commons";

enum GENDER {
  "MALE" = "m",
  "FEMALE" = "f",
  "OTHER" = "o",
}

export interface IArtist extends RowDataPacket {
  name: string;
  dob: Date;
  address: string;
  gender?: GENDER;
  first_release_year: string;
  no_of_albums_released?: number;
  created_at?: Date;
  updated_at?: Date;
}

const getTotalCount = () => {
  return db
    .promise()
    .query<IPageResult[]>("SELECT COUNT(*) AS total FROM artist;");
};

/* query artist by id */
const findOneById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<IArtist[]>("SELECT * FROM artist WHERE id = ?;", [id]);
};

/* query all artist */
const findAll = () => {
  return db
    .promise()
    .query<
      IArtist[]
    >("SELECT id,name,dob,address,gender,first_release_year,no_of_albums_released,created_at,updated_at FROM artist;");
};

/* create a artist */
const insertOne = ({ id, updated_at, ...props }: IArtist) => {
  const data = { ...props, created_at: new Date() };
  return db.promise().query<ResultSetHeader>("INSERT INTO artist SET ?;", data);
};

/* update a artist */
const updateOne = (
  { id: i, created_at, email, ...props }: IArtist,
  id: string,
) => {
  const data = { ...props, updated_at: new Date() };
  return db
    .promise()
    .query<ResultSetHeader>("UPDATE artist SET ? WHERE id = ?;", [data, id]);
};

/* delete a artist by id */
const deleteById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<ResultSetHeader>("DELETE FROM artist WHERE id = ?;", [id]);
};

const artistService = {
  findOneById,
  findAll,
  insertOne,
  updateOne,
  deleteById,
  getTotalCount,
};

export default artistService;
