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

export const currentUser = async () => {
  try {
    const res = await queryServer("/auth/currentuser");
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
      `/user?limit=${limit}&page=${page}`,
    )) as IUserResponse;
  },
  one: async (id: string) => {
    return await queryServer(`/user/${id}`);
  },
  unlinkedUsers: async () => {
    return (await queryServer(`/user/unlinked-users`)) as IUnlinkedUserResponse;
  },
};

/* artist apis */
const artist = {
  list: async (page = 1, limit = PAGINATION_LIMIT) => {
    return (await queryServer(
      `/artist?limit=${limit}&page=${page}`,
    )) as IArtistResponse;
  },
  one: async (id: string) => {
    return await queryServer(`/artist/${id}`);
  },
};

/* song apis */
const song = {
  list: async (page = 1, limit = PAGINATION_LIMIT) => {
    return (await queryServer(
      `/song?limit=${limit}&page=${page}`,
    )) as ISongResponse;
  },
  listByArtist: async (id?: number, page = 1, limit = PAGINATION_LIMIT) => {
    return (await queryServer(
      `/song/getAllByArtist/${id}?limit=${limit}&page=${page}`,
    )) as ISongResponse;
  },
  one: async (id: string) => {
    return await queryServer(`/song/${id}`);
  },
};

export { user, artist, song };
