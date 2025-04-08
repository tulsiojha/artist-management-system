"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import * as z from "zod";
import { GENDER, IArtist, IUnlinkedUser } from "@/utils/types";
import Select from "@/components/select";
import FormModal from "@/components/form-modal";
import handleErrors from "@/utils/handleErrors";
import { formatDateToString, genders, toast } from "@/utils/commons";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { artistSchema } from "@/lib/schemas";
import { artist, user } from "@/lib/api-client";
import Datepicker from "@/components/date-picker";

type ISchema = z.infer<typeof artistSchema>;

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
        const res = await user.fetchUnlinkedUsers();
        setUnlinkedUsers(res.data.users);
      } catch (err) {
        toast(handleErrors(err), "error");
      } finally {
        setUnlinkedUsersLoading(false);
      }
    })();
  }, [open]);

  const onSubmit = async (e: ISchema) => {
    const { dob, ...data } = e;
    const formattedDate = new Date(dob).toISOString().slice(0, 10);
    const payload = { ...data, dob: formattedDate };

    if (update) {
      return artist.update(initialValues.id, payload, () => {
        openChange?.(false);
        router.refresh();
      });
    } else {
      return artist.create(payload, () => {
        openChange?.(false);
        router.refresh();
      });
    }
  };

  return (
    <FormModal
      schema={artistSchema}
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
