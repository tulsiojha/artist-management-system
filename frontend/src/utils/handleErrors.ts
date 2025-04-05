import { AxiosError } from "axios";

const handleErrors = (err: any) => {
  if (err instanceof AxiosError) {
    return err.response?.data?.error || err.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Something went wrong";
};

export default handleErrors;
