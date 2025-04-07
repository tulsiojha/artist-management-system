import { PAGINATION_LIMIT } from "@/utils/constants";
import { queryServer } from "@/utils/query-server";
import {
  IArtistResponse,
  IUnlinkedUserResponse,
  IUser,
  IUserResponse,
} from "@/utils/types";
import { redirect } from "next/navigation";

export const baseUrl = "http://localhost:8000";

export const currentUser = async () => {
  try {
    const res = await queryServer(`${baseUrl}/auth/currentuser`);
    if (!res || res?.error) {
      return null;
    }
    if (res.data) {
      return res.data.user as IUser;
    }
    return null;
  } catch {
    return null;
  }
};

export const ensureLoggedIn = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
};

/* user apis */
const user = {
  list: async (page = 1, limit = PAGINATION_LIMIT) => {
    return (await queryServer(
      `${baseUrl}/user?limit=${limit}&page=${page}`,
    )) as IUserResponse;
  },
  one: async (id: string) => {
    return await queryServer(`${baseUrl}/user/${id}`);
  },
  unlinkedUsers: async () => {
    return (await queryServer(
      `${baseUrl}/user/unlinked-users`,
    )) as IUnlinkedUserResponse;
  },
};

/* artist apis */
const artist = {
  list: async (page = 1, limit = PAGINATION_LIMIT) => {
    return (await queryServer(
      `${baseUrl}/artist?limit=${limit}&page=${page}`,
    )) as IArtistResponse;
  },
  one: async (id: string) => {
    return await queryServer(`${baseUrl}/artist/${id}`);
  },
};

export { user, artist };
