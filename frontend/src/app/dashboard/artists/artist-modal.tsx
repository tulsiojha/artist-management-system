"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import * as z from "zod";
import axios from "axios";
import { GENDER, IArtist, IUnlinkedUser } from "@/utils/types";
import Select from "@/components/select";
import FormModal from "@/components/form-modal";
import { toast } from "sonner";
import handleErrors from "@/utils/handleErrors";
import { formatDateToString } from "@/utils/commons";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const baseSchema = z.object({
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

type ISchema = z.infer<typeof baseSchema>;

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

const fetchUnlinkedUsers = async () => {
  return (
    await axios.get("/backend/user/unlinked-user", { withCredentials: true })
  ).data;
};

const ArtistModal = ({
  initialValues,
  open,
  openChange,
}: {
  initialValues?: IArtist;
  open?: boolean;
  openChange?: (open: boolean) => void;
}) => {
  const router = useRouter();
  const update = !!initialValues;

  const [unlinkedUsers, setUnlinkedUsers] = useState<IUnlinkedUser[]>([]);
  const [unlinkedUserLoading, setUnlinkedUsersLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setUnlinkedUsersLoading(true);
        const res = await fetchUnlinkedUsers();
        setUnlinkedUsers(res.data.users);
      } catch (err) {
        toast.error(handleErrors(err), { richColors: true });
      } finally {
        setUnlinkedUsersLoading(false);
      }
    })();
  }, [open]);

  const onSubmit = async (e: ISchema) => {
    try {
      const { dob, ...data } = e;
      const formattedDate = new Date(dob).toISOString().slice(0, 10);

      const payload = { ...data, dob: formattedDate };

      if (update) {
        await axios.post(`/backend/artist/${initialValues.id}`, payload);
        toast.success("Artist updated successfully", {
          richColors: true,
          closeButton: true,
        });
      } else {
        //@ts-ignore
        await axios.post("/backend/artist/", payload);
        toast.success("Artist created successfully", {
          richColors: true,
          closeButton: true,
        });
      }

      openChange?.(false);
      router.refresh();
    } catch (err) {
      toast.error(handleErrors(err), { richColors: true, closeButton: true });
    }
  };

  console.log(initialValues);

  return (
    <FormModal
      schema={baseSchema}
      onSubmit={onSubmit}
      initialValues={
        initialValues
          ? { ...initialValues, dob: new Date(initialValues.dob) }
          : {
              dob: undefined,
              gender: GENDER.MALE,
            }
      }
      open={open}
      openChange={openChange}
      header={update ? "Update artist" : "Add artist"}
      height={!update && unlinkedUsers.length === 0 ? 200 : ""}
    >
      {({ register, formState: { errors, isSubmitting }, control }) => {
        return !update && unlinkedUserLoading ? (
          "Loading..."
        ) : !update && unlinkedUsers.length === 0 ? (
          <div className="p-2 text-black/70 text-lg flex items-center h-full justify-center">
            Unlinked user artist not found.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto p-1">
              <TextInput
                label="Name"
                placeholder="Enter artist first name"
                error={errors.name?.message}
                {...register("name")}
              />
              <div className="flex flex-row items-start gap-2">
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Date of Birth"
                      type="date"
                      value={formatDateToString(field.value)}
                      onChange={(e) => field.onChange(e.target.valueAsDate)}
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
                label="Address"
                placeholder="Enter your address"
                error={errors.address?.message}
                {...register("address")}
              />
              <TextInput
                label="First release year"
                placeholder="Enter first release year"
                error={errors.first_release_year?.message}
                {...register("first_release_year", { valueAsNumber: true })}
              />
              <TextInput
                label="No of albums released"
                placeholder="Enter no of albums released"
                error={errors.no_of_albums_released?.message}
                {...register("no_of_albums_released", { valueAsNumber: true })}
              />
              {!update ? (
                <Select
                  label="User"
                  items={unlinkedUsers.map((uu) => ({
                    label: `${uu.first_name} ${uu.last_name}`,
                    value: uu.uid,
                  }))}
                  error={errors.user_id?.message}
                  {...register("user_id", { valueAsNumber: true })}
                />
              ) : null}
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

export default ArtistModal;
