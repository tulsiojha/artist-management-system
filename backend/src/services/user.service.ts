import db from "../connections/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

enum GENDER {
  "MALE" = "m",
  "FEMALE" = "f",
  "OTHER" = "o",
}

export interface IUser extends RowDataPacket {
  first_name: string;
  last_name: string;
  dob: Date;
  email: string;
  password: string;
  address: string;
  phone: string;
  gender: GENDER;
  created_at?: Date;
  updated_at?: Date;
}

/* query user by id */
const findOneById = ({ id }: { id: string }) => {
  return db.promise().query<IUser[]>("SELECT * FROM user WHERE id = ?;", [id]);
};

/* query all user */
const findAll = () => {
  return db
    .promise()
    .query<
      IUser[]
    >("SELECT id,first_name,last_name,dob,email,address,phone,gender,created_at,updated_at FROM user;");
};

/* create a user */
const insertOne = ({ id, updated_at, ...props }: IUser) => {
  const data = { ...props, created_at: new Date() };
  return db.promise().query<ResultSetHeader>("INSERT INTO user SET ?;", data);
};

/* update a user */
const updateOne = (
  { id: i, created_at, email, ...props }: IUser,
  id: string,
) => {
  const data = { ...props, updated_at: new Date() };
  return db
    .promise()
    .query<ResultSetHeader>("UPDATE user SET ? WHERE id = ?;", [data, id]);
};

/* delete a user by id */
const deleteById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<ResultSetHeader>("DELETE FROM user WHERE id = ?;", [id]);
};

const userService = {
  findOneById,
  findAll,
  insertOne,
  updateOne,
  deleteById,
};

export default userService;
