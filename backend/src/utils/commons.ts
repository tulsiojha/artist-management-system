export const handleError = (e: unknown) => {
  if (e instanceof Error) {
    return e.message;
  } else {
    return "Something went wrong";
  }
};
