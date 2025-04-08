import db from "../connections/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IPageInfo, IPageResult } from "../utils/commons";

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
  user_id: string;
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
const findAll = (pI?: IPageInfo) => {
  return db
    .promise()
    .query<
      IArtist[]
    >("SELECT id, name, dob, address, gender, first_release_year, no_of_albums_released, user_id, created_at, updated_at FROM artist LIMIT ? OFFSET ?;", [pI?.limit, pI?.offset]);
};

/* create a artist */
const insertOne = (props: IArtist) => {
  const {
    name,
    gender,
    dob,
    address,
    first_release_year,
    no_of_albums_released,
    user_id,
  } = props;
  return db
    .promise()
    .query<ResultSetHeader>(
      "INSERT INTO artist (name, gender, dob, address, first_release_year, no_of_albums_released, user_id) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [
        name,
        gender,
        dob,
        address,
        first_release_year,
        no_of_albums_released,
        user_id,
      ],
    );
};

/* update a artist */
const updateOne = (props: IArtist, id: string) => {
  const {
    name,
    gender,
    dob,
    address,
    first_release_year,
    no_of_albums_released,
  } = props;
  return db
    .promise()
    .query<ResultSetHeader>(
      "UPDATE artist SET name = ?, gender = ?, dob = ?, address = ?, first_release_year = ?, no_of_albums_released = ?, updated_at = ? WHERE id = ?;",
      [
        name,
        gender,
        dob,
        address,
        first_release_year,
        no_of_albums_released,
        new Date(),
        id,
      ],
    );
};

/* delete a artist by id */
const deleteById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<ResultSetHeader>("DELETE FROM artist WHERE id = ?;", [id]);
};

/* create a artist */
const insertMany = (props: IArtist[]) => {
  const values = props.map((v) => [
    v.name,
    v.gender,
    v.dob,
    v.address,
    v.first_release_year,
    v.no_of_albums_released,
    v.user_id,
  ]);

  return db
    .promise()
    .query<ResultSetHeader>(
      "INSERT INTO artist (name, gender, dob, address, first_release_year, no_of_albums_released, user_id) VALUES ?;",
      [values],
    );
};

const artistService = {
  findOneById,
  findAll,
  insertOne,
  updateOne,
  deleteById,
  getTotalCount,
  insertMany,
};

export default artistService;
