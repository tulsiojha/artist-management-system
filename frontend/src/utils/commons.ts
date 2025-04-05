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
