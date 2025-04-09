import { GENDER, GENRE, USER_ROLE } from "@/utils/types";
import * as z from "zod";

// user schemas
const userBaseSchema = {
  first_name: z.string().min(2, "must be atleast 2 characters"),
  last_name: z.string().min(2, "must be atleast 2 characters"),
  email: z.string().email("invalid email"),
  phone: z.string().min(2, "must be atleast 2 characters"),
  dob: z.date().max(new Date()),
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
};

const passwordSchema = {
  password: z.string().min(6, "at least 6 characters are required"),
  repassword: z.string().min(6, "at least 6 characters are required"),
};

const roleSchema = {
  role: z.nativeEnum(USER_ROLE, {
    errorMap: (issue) => {
      switch (issue.code) {
        case "invalid_type":
          return { message: "role is required" };
        case "invalid_enum_value":
          return { message: "role gender" };
        default:
          return { message: issue.message ?? "" };
      }
    },
  }),
};

export const registerSchema = z
  .object({
    ...userBaseSchema,
    ...passwordSchema,
  })
  .superRefine(({ password, repassword }, ctx) => {
    if (repassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password did not match",
        path: ["repassword"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userUpdateSchema = z.object({
  ...userBaseSchema,
  ...roleSchema,
});

export const userCreateSchema = z
  .object({
    ...userBaseSchema,
    ...roleSchema,
    ...passwordSchema,
  })
  .superRefine(({ password, repassword }, ctx) => {
    if (repassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Password did not match",
        path: ["repassword"],
      });
    }
  });

// artist schemas

export const artistSchema = z.object({
  name: z.string().min(2, "must be atleast 2 characters"),
  dob: z.date(),
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
    .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
  no_of_albums_released: z.number().optional().nullable().nullish(),
  user_id: z.number(),
});

// song schemas

export const songSchema = z.object({
  title: z.string().min(2, "must be atleast 2 characters"),
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
