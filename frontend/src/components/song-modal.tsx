"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import * as z from "zod";
import { GENRE, ISong } from "@/utils/types";
import Select from "@/components/select";
import FormModal from "@/components/form-modal";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { songSchema } from "@/lib/schemas";
import { genre, toast } from "@/utils/commons";
import { song } from "@/lib/api-client";

type ISchema = z.infer<typeof songSchema>;

const SongModal = ({
  initialValues,
  open,
  openChange,
}: {
  initialValues?: ISong;
  open?: boolean;
  openChange?: (open: boolean) => void;
}) => {
  const router = useRouter();
  const update = !!initialValues;

  const user = useAuth();

  const onSubmit = async (e: ISchema) => {
    if (!user?.artist_id) {
      toast("You are not added to artist list", "error");
      return;
    }
    const payload = { ...e, artist_id: user?.artist_id };
    if (update) {
      return song.update(initialValues.id, payload, () => {
        openChange?.(false);
        router.refresh();
      });
    } else {
      return song.create(payload, () => {
        openChange?.(false);
        router.refresh();
      });
    }
  };

  return (
    <FormModal
      schema={songSchema}
      onSubmit={onSubmit}
      initialValues={
        initialValues
          ? initialValues
          : {
              genre: GENRE.CLASSIC,
            }
      }
      open={open}
      openChange={openChange}
      header={update ? "Update song" : "Add song"}
    >
      {({ register, formState: { errors, isSubmitting } }) => {
        return (
          <>
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto p-1">
              <TextInput
                label="Title"
                placeholder="Enter song title"
                error={errors.title?.message}
                {...register("title")}
              />
              <TextInput
                label="Album"
                placeholder="Enter album name"
                error={errors.album_name?.message}
                {...register("album_name")}
              />
              <Select label="Genre" items={genre} {...register("genre")} />
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

export default SongModal;
