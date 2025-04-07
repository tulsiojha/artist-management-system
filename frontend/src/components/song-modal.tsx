"use client";
import Button from "@/components/button";
import TextInput from "@/components/input";
import * as z from "zod";
import { GENRE, ISong } from "@/utils/types";
import Select from "@/components/select";
import FormModal from "@/components/form-modal";
import { toast } from "sonner";
import handleErrors from "@/utils/handleErrors";
import { useRouter } from "next/navigation";
import { song } from "@/lib/api";
import useAuth from "@/hooks/use-auth";
import { queryClient } from "@/utils/query-client";

const baseSchema = z.object({
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

type ISchema = z.infer<typeof baseSchema>;

const genre = [
  { label: "Rnb", value: "rnb" },
  { label: "Country", value: "country" },
  { label: "Classic", value: "classic" },
  { label: "Rock", value: "rock" },
  { label: "Jazz", value: "jazz" },
];

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
    try {
      if (!user?.artist_id) {
        throw Error("Invalid artist");
      }
      const payload = { ...e, artist_id: user?.artist_id };

      if (update) {
        await queryClient.post(`/song/${String(initialValues.id)}`, payload);
      } else {
        await queryClient.post("/song", payload);
      }

      toast.success("Song created successfully", {
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
      schema={baseSchema}
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
