import { queryServer } from "@/utils/query-server";
import { redirect } from "next/navigation";

export const baseUrl = "http://localhost:8000";

export const currentUser = async () => {
  try {
    const res = await queryServer(`${baseUrl}/auth/currentuser`);
    if (!res || res?.error) {
      return null;
    }
    if (res.data) {
      return res.data.user;
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
  list: async () => {
    return await queryServer(`${baseUrl}/user`);
  },
  one: async (id: string) => {
    return await queryServer(`${baseUrl}/user/${id}`);
  },
};

/* artist apis */
const artist = {
  list: async () => {
    return await queryServer(`${baseUrl}/artist`);
  },
  one: async (id: string) => {
    return await queryServer(`${baseUrl}/artist/${id}`);
  },
};

export { user, artist };
