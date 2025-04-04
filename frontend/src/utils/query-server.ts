import axios from "axios";
import { cookies } from "next/headers";

export const queryServer = async (url: string) => {
  const cookie = await cookies();
  const res = await axios(url, {
    headers: {
      Cookie: cookie.toString(),
    },
    withCredentials: true,
  });
  return res.data;
};
