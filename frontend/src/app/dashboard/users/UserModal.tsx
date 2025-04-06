"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import * as z from "zod";
import axios from "axios";
import { GENDER, IUser, USER_ROLE } from "@/utils/types";
import Select from "@/components/select";
import FormModal from "@/components/form-modal";
import { toast } from "sonner";
import handleErrors from "@/utils/handleErrors";
import { formatDateToString } from "@/utils/commons";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

const baseSchema = {
  first_name: z.string().min(2, "must be atleast 2 characters"),
  last_name: z.string().min(2, "must be atleast 2 characters"),
  email: z.string().email("invalid email"),
  phone: z.string().min(2, "must be atleast 2 characters"),
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
  address: z.string().min(2, "must be atleast 2 characters"),
};

const updateUserSchema = z.object(baseSchema);

const createUserSchema = z
  .object({
    ...baseSchema,
    password: z.string().min(6, "at least 6 characters are required"),
    repassword: z.string().min(6, "at least 6 characters are required"),
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

type ISchema<T extends boolean> = T extends true
  ? z.infer<typeof updateUserSchema>
  : z.infer<typeof createUserSchema>;

const roles = [
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

const genders = [
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

const UserModal = ({
  initialValues,
  open,
  openChange,
}: {
  initialValues?: IUser;
  open?: boolean;
  openChange?: (open: boolean) => void;
}) => {
  const router = useRouter();
  const update = !!initialValues;

  const onSubmit = async (e: ISchema<typeof update>) => {
    try {
      const { dob, ...data } = e;
      const formattedDate = new Date(dob).toISOString().slice(0, 10);

      const payload = { ...data, dob: formattedDate };

      if (update) {
        await axios.post(`/backend/user/${initialValues.id}`, payload);
      } else {
        //@ts-ignore
        const { repassword, ...createPayload } = payload;
        await axios.post("/backend/user/", createPayload);
      }

      toast.success("User created successfully", {
        richColors: true,
        closeButton: true,
      });
      openChange?.(false);
      router.refresh();
    } catch (err) {
      toast.error(handleErrors(err), { richColors: true, closeButton: true });
    }
  };

  return (
    <FormModal
      schema={update ? updateUserSchema : createUserSchema}
      onSubmit={onSubmit}
      initialValues={
        initialValues || {
          dob: undefined,
          role: USER_ROLE.SUPER_ADMIN,
          gender: GENDER.MALE,
        }
      }
      open={open}
      openChange={openChange}
      header={update ? "Update user" : "Add user"}
    >
      {({ register, formState: { errors, isSubmitting }, control }) => {
        return (
          <>
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto p-1">
              <div className="flex flex-row items-start gap-2">
                <TextInput
                  label="First name"
                  placeholder="Enter your first name"
                  error={errors.first_name?.message}
                  {...register("first_name")}
                />
                <TextInput
                  label="Last name"
                  placeholder="Enter your last name"
                  error={errors.last_name?.message}
                  {...register("last_name")}
                />
              </div>
              <div className="flex flex-row items-start gap-2">
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Date of Birth"
                      type="date"
                      value={formatDateToString(field.value)}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                      error={errors.dob?.message}
                    />
                  )}
                />
                <Select
                  label="Gender"
                  items={genders}
                  {...register("gender")}
                />
              </div>
              <TextInput
                label="Phone"
                placeholder="Enter your phone"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <TextInput
                label="Address"
                placeholder="Enter your address"
                error={errors.address?.message}
                {...register("address")}
              />
              <Select label="Role" items={roles} {...register("role")} />
              <TextInput
                label="Email"
                placeholder="Enter your email address"
                type="email"
                error={errors.email?.message}
                {...register("email")}
              />
              {update ? null : (
                <>
                  <TextInput
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    //@ts-ignore
                    error={errors.password?.message}
                    {...register("password")}
                  />
                  <TextInput
                    label="Confirm password"
                    placeholder="Enter confirm password"
                    type="password"
                    //@ts-ignore
                    error={errors.repassword?.message}
                    {...register("repassword")}
                  />
                </>
              )}
            </div>
            <div className=" border-t-1 border-gray-200 -mx-4 pt-4 px-4 flex flex-row justify-end gap-2">
              <Button variant="primary" type="submit" loading={isSubmitting}>
                {update ? "Update" : "Create"}
              </Button>
              <Button
                variant="secondary"
                type="reset"
                onClick={() => {
                  openChange?.(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        );
      }}
    </FormModal>
  );
};

export default UserModal;
