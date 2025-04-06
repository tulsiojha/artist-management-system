import classnames from "classnames";
export const cn = classnames;

export const formatDate = (date?: string | Date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

export const formatDateToString = (d: Date | string) => {
  try {
    if (!d) {
      return "";
    }
    const date = new Date(d);
    return date.toISOString().slice(0, 10);
  } catch {
    return "";
  }
};
