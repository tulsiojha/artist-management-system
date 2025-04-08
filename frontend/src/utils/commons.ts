import classnames from "classnames";
import csvParser from "papaparse";
import { queryClient } from "./query-client";
import handleErrors from "./handleErrors";
import { toast as t } from "sonner";

export const cn = classnames;

export const toast = (message: string, type: "error" | "success") => {
  const options = { richColors: true, closeButton: true };
  switch (type) {
    case "error":
      return t.error(message, options);
    case "success":
      return t.success(message, options);
    default:
      return t.info(message, options);
  }
};

export const genre = [
  { label: "Rnb", value: "rnb" },
  { label: "Country", value: "country" },
  { label: "Classic", value: "classic" },
  { label: "Rock", value: "rock" },
  { label: "Jazz", value: "jazz" },
];

export const roles = [
  {
    label: "Super Admin",
    value: "super_admin",
  },
  {
    label: "Artist Manager",
    value: "artist_manager",
  },
  {
    label: "Artist",
    value: "artist",
  },
];

export const genders = [
  {
    label: "Male",
    value: "m",
  },
  {
    label: "Female",
    value: "f",
  },

  {
    label: "Other",
    value: "o",
  },
];

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

type ICSVData = Record<string, string | number | Date>;

export const importCSV = ({
  file,
  onParse,
}: {
  file: File;
  onParse: (data: ICSVData[]) => void;
}) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const content = e.target?.result as string;
    if (content) {
      csvParser.parse(content, {
        complete: (results) => {
          const header = results.data[0] as string[];
          const body = results.data.slice(1) as string[];

          const data = body.map((b) => {
            return header.reduce((prev, curr, i) => {
              const c = curr.trim();
              let v;
              const ob = b[i].trim();
              switch (c) {
                case "dob":
                  v = new Date(ob);
                  break;
                case "first_release_year":
                case "no_of_albums_released":
                case "user_id":
                  v = Number(ob);
                  break;
                default:
                  v = ob;
              }
              prev[c] = v;
              return prev;
            }, {} as ICSVData);
          });
          onParse(data);
        },
        skipEmptyLines: true,
      });
    }
  };
  reader.readAsText(file);
};

export const exportCSV = async () => {
  try {
    const res = await queryClient.get("/artist?limit=0");
    const artists = res.data.data.artists;
    const csvdata = csvParser.unparse(artists);
    console.log(csvdata);
    const csvData = new Blob([csvdata], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvURL;
    link.download = `artists.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    toast(handleErrors(err), "error");
  }
};
