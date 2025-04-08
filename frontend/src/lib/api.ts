import { PAGINATION_LIMIT } from "@/utils/constants";
import { queryServer } from "@/utils/query-server";
import {
  IArtistResponse,
  ISongResponse,
  IUnlinkedUserResponse,
  IUser,
  IUserResponse,
} from "@/utils/types";
import { redirect } from "next/navigation";

export const baseUrl = process.env.BACKEND_URL;

export const currentUser = async () => {
  try {
    const res = await queryServer(`${baseUrl}/auth/currentuser`);
    console.log(res);
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

/* song apis */
const song = {
  list: async (page = 1, limit = PAGINATION_LIMIT) => {
    return (await queryServer(
      `${baseUrl}/song?limit=${limit}&page=${page}`,
    )) as ISongResponse;
  },
  listByArtist: async (id?: number, page = 1, limit = PAGINATION_LIMIT) => {
    return (await queryServer(
      `${baseUrl}/song/getAllByArtist/${id}?limit=${limit}&page=${page}`,
    )) as ISongResponse;
  },
  one: async (id: string) => {
    return await queryServer(`${baseUrl}/song/${id}`);
  },
};

export { user, artist, song };
