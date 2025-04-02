import userService, { IUser } from "../services/user.service";
import { handleError } from "../utils/commons";

const findOneById = async ({ id }: { id: string }) => {
  try {
    const [user] = await userService.findOneByID({ id: id });
    if (user.length) {
      return { data: user[0], error: null };
    } else {
      return { data: null, error: `Now user found with id ${id}` };
    }
  } catch (err) {
    return { data: null, error: handleError(err) };
  }
};

const findAll = async () => {
  try {
    const [users] = await userService.findAll();
    return { data: users, error: null };
  } catch (err) {
    return { data: null, error: handleError(err) };
  }
};

const insert = async ({ password, ...rest }: IUser) => {
  try {
    const [result] = await userService.insertOne({ password, ...rest });
    if (result.affectedRows === 1) {
      return { data: rest, error: null };
    }
    return { data: null, error: "Unable to add user" };
  } catch (err) {
    return { data: null, error: handleError(err) };
  }
};

const userController = {
  findOneById,
  findAll,
  insert,
};

export default userController;
