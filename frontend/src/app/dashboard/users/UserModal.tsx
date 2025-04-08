"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import * as z from "zod";
import { GENDER, IUser, USER_ROLE } from "@/utils/types";
import Select from "@/components/select";
import FormModal from "@/components/form-modal";
import { formatDateToString, genders, roles } from "@/utils/commons";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { userCreateSchema, userUpdateSchema } from "@/lib/schemas";
import { user } from "@/lib/api-client";
import Datepicker from "@/components/date-picker";

type ISchema<T extends boolean> = T extends true
  ? z.infer<typeof userUpdateSchema>
  : z.infer<typeof userCreateSchema>;

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
    const { dob, ...data } = e;
    const formattedDate = new Date(dob).toISOString().slice(0, 10);
    const payload = { ...data, dob: formattedDate };
    //@ts-ignore
    const { repassword: _, ...createPayload } = payload;

    if (update) {
      return user.update(initialValues.id, payload, () => {
        openChange?.(false);
        router.refresh();
      });
    } else {
      return user.create(createPayload, () => {
        openChange?.(false);
        router.refresh();
      });
    }
  };

  return (
    <FormModal
      schema={update ? userUpdateSchema : userCreateSchema}
      onSubmit={onSubmit}
      initialValues={
        initialValues
          ? { ...initialValues, dob: new Date(initialValues.dob) }
          : {
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
                    <Datepicker
                      label="Dob"
                      placeholder="Enter dob"
                      error={errors.dob?.message}
                      value={formatDateToString(field.value)}
                      onChange={(e) => field.onChange(e)}
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
