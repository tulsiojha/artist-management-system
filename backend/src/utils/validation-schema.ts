import { z } from "zod";
import { GENDER, IUser, USER_ROLE } from "../services/user.service";
import { GENRE, ISong } from "../services/song.service";
import { IArtist } from "../services/artist.service";

export const validateUser = (data: IUser, update = false) => {
  const schema = z.object({
    first_name: z.string({
      invalid_type_error: "invalid first_name",
      required_error: "first_name is required",
    }),
    last_name: z.string({
      invalid_type_error: "invalid last_name",
      required_error: "last_name is required",
    }),
    email: z
      .string({
        required_error: "email is required",
      })
      .email("invalid email"),
    phone: z.string({
      invalid_type_error: "invalid phone",
      required_error: "phone is required",
    }),
    dob: z.string({
      invalid_type_error: "invalid dob",
      required_error: "dob is required",
    }),
    gender: z.nativeEnum(GENDER, {
      errorMap: (issue) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "gender is required" };
          case "invalid_enum_value":
            return { message: "invalid gender" };
          default:
            return { message: issue.message ?? "" };
        }
      },
    }),
    address: z.string({
      invalid_type_error: "invalid address",
      required_error: "address is required",
    }),
    role: z.nativeEnum(USER_ROLE, {
      errorMap: (issue) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "role is required" };
          case "invalid_enum_value":
            return { message: "invalid role" };
          default:
            return { message: issue.message ?? "" };
        }
      },
    }),
  });
  if (!update) {
    schema.extend({
      password: z
        .string({
          invalid_type_error: "invalid password",
          required_error: "password is required",
        })
        .min(6, "at least 6 characters are required"),
    });
  }
  return schema.parse(data);
};

export const validateArtist = (data: IArtist) => {
  const schema = z.object({
    name: z.string({
      invalid_type_error: "invalid name",
      required_error: "name is required",
    }),
    dob: z.string({
      invalid_type_error: "invalid dob",
      required_error: "dob is required",
    }),
    gender: z.nativeEnum(GENDER, {
      errorMap: (issue) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "gender is required" };
          case "invalid_enum_value":
            return { message: "invalid gender" };
          default:
            return { message: issue.message ?? "" };
        }
      },
    }),
    address: z.string().min(2, "must be atleast 2 characters"),
    first_release_year: z
      .number()
      .min(1900, { message: "Year must be 1900 or later" })
      .max(new Date().getFullYear(), {
        message: "Year cannot be in the future",
      }),
    no_of_albums_released: z
      .number({
        invalid_type_error: "invalid no_of_albums_released",
      })
      .optional()
      .nullable()
      .nullish(),
  });
  return schema.parse(data);
};

export const validateSong = (data: ISong) => {
  const schema = z.object({
    title: z.string(),
    artist_id: z.number(),
    album_name: z.string(),
    genre: z.nativeEnum(GENRE, {
      errorMap: (issue) => {
        switch (issue.code) {
          case "invalid_type":
            return { message: "genre is required" };
          case "invalid_enum_value":
            return { message: "invalid genre" };
          default:
            return { message: issue.message ?? "" };
        }
      },
    }),
  });
  return schema.parse(data);
};

export const validateLogin = (data: { email: string; password: string }) => {
  const schema = z.object({
    email: z
      .string({ required_error: "email is required" })
      .email("invalid email"),
    password: z
      .string({
        invalid_type_error: "invalid password",
        required_error: "password is required",
      })
      .min(6, "at least 6 characters are required"),
  });
  return schema.parse(data);
};
