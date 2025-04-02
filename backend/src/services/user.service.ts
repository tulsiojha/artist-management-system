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

const findOneByID = ({ id }: { id: string }) => {
  return db.promise().query<IUser[]>("SELECT * FROM user WHERE id = ?;", [id]);
};

const findAll = () => {
  return db
    .promise()
    .query<
      IUser[]
    >("SELECT first_name,last_name,dob,email,address,phone,gender,created_at,updated_at FROM user;");
};

const insertOne = (props: IUser) => {
  const data = { ...props, created_at: new Date() };
  return db.promise().query<ResultSetHeader>("INSERT INTO user SET ?;", data);
};

const userService = {
  findOneByID,
  findAll,
  insertOne,
};

export default userService;
