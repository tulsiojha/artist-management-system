import userService, { IUser } from "../services/user.service";
import { handleError } from "../utils/commons";

const findOneById = async ({ id }: { id: string }) => {
  try {
    const [user] = await userService.findOneById({ id: id });
    if (user.length) {
      return { data: user[0], error: null };
    } else {
      return { data: null, error: `No user found with id ${id}` };
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

const update = async ({ password, ...rest }: IUser, id: string) => {
  try {
    const [result] = await userService.updateOne({ password, ...rest }, id);
    if (result.affectedRows === 1) {
      return { data: rest, error: null };
    }
    return { data: null, error: "Unable to update user" };
  } catch (err) {
    return { data: null, error: handleError(err) };
  }
};

const deleteById = async ({ id }: { id: string }) => {
  try {
    const [result] = await userService.deleteById({ id });
    if (!result) {
      return { data: null, error: "Unable to delete user" };
    }
    return { data: id, error: null };
  } catch (err) {
    return { data: null, error: handleError(err) };
  }
};

const userController = {
  findOneById,
  deleteById,
  findAll,
  insert,
  update,
};

export default userController;
