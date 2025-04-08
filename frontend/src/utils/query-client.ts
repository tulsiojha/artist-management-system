import axios from "axios";

const axiosContext = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

export const queryClient = axiosContext;
