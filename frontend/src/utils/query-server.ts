import axios from "axios";
import { cookies } from "next/headers";

export const baseUrl = process.env.BACKEND_URL;

export const queryServer = async (url: string) => {
  const cookie = await cookies();
  const res = await axios(url, {
    headers: {
      Cookie: cookie.toString(),
    },
    withCredentials: true,
    baseURL: baseUrl,
  });
  return res.data;
};
