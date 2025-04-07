import axios from "axios";

const axiosContext = axios.create({
  baseURL: "/backend/",
  withCredentials: true,
});

export const queryClient = axiosContext;
