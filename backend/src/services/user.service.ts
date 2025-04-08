import db from "../connections/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IPageInfo, IPageResult } from "../utils/commons";

export enum GENDER {
  "MALE" = "m",
  "FEMALE" = "f",
  "OTHER" = "o",
}

export enum USER_ROLE {
  "SUPER_ADMIN" = "super_admin",
  "ARTIST_MANAGER" = "artist_manager",
  "ARTIST" = "artist",
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
  role: USER_ROLE;
  created_at?: Date;
  updated_at?: Date;
}

const getTotalCount = () => {
  return db
    .promise()
    .query<IPageResult[]>("SELECT COUNT(*) AS total FROM user;");
};

const getRole = (id: string) => {
  return db
    .promise()
    .query<IUser[]>("SELECT role FROM user WHERE id = ? ;", [id]);
};

const checkIfArtistExist = (id: string) => {
  return db
    .promise()
    .query<
      IUser[]
    >("SELECT u.role AS role, a.id AS artist_id FROM user u LEFT JOIN artist a ON u.id = a.user_id  WHERE u.id = ?;", [id]);
};

/* query user by id */
const findOneById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<
      IUser[]
    >("SELECT u.*, a.id AS artist_id FROM user u LEFT JOIN artist a ON u.id = a.user_id  WHERE u.id = ?;", [id]);
};

/* query all user */
const findAll = (pI?: IPageInfo) => {
  return db
    .promise()
    .query<
      IUser[]
    >("SELECT id, first_name, last_name, dob, email, address, phone, gender, role, created_at, updated_at FROM user LIMIT ? OFFSET ?;", [pI?.limit, pI?.offset]);
};

/* query all user */
const findArtistUsers = () => {
  return db
    .promise()
    .query<
      IUser[]
    >("SELECT user.id as uid,user.first_name,user.last_name FROM user LEFT JOIN artist ON user.id = artist.user_id WHERE user.role ='artist' and artist.user_id IS NULL;");
};

/* query user by email */
const findOneByEmail = ({ email }: { email: string }) => {
  return db
    .promise()
    .query<
      IUser[]
    >("SELECT u.*, a.id AS artist_id FROM user u LEFT JOIN artist a ON u.id = a.user_id  WHERE u.email = ?;", [email]);
};

/* create a user */
const insertOne = (props: IUser) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    dob,
    gender,
    address,
    role,
  } = props;
  return db
    .promise()
    .query<ResultSetHeader>(
      "INSERT INTO user (first_name, last_name, email, password, phone, dob, gender, address, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        first_name,
        last_name,
        email,
        password,
        phone,
        dob,
        gender,
        address,
        role,
      ],
    );
};

/* update a user */
const updateOne = (props: IUser, id: string) => {
  const { first_name, last_name, phone, dob, gender, address, role } = props;
  return db
    .promise()
    .query<ResultSetHeader>(
      "UPDATE user SET first_name = ?, last_name = ?, phone = ?, dob = ?, gender = ?, address = ?, role = ? WHERE id = ?",
      [first_name, last_name, phone, dob, gender, address, role, id],
    );
};

/* delete a user by id */
const deleteById = ({ id }: { id: string }) => {
  return db
    .promise()
    .query<ResultSetHeader>("DELETE FROM user WHERE id = ?;", [id]);
};

const userService = {
  findOneById,
  findOneByEmail,
  findAll,
  insertOne,
  updateOne,
  deleteById,
  getTotalCount,
  findArtistUsers,
  getRole,
  checkIfArtistExist,
};

export default userService;
