"use client";
import DeleteModal from "@/components/delete-modal";
import List from "@/components/list";
import { formatDate } from "@/utils/commons";
import handleErrors from "@/utils/handleErrors";
import { ISong, ISongResponse, USER_ROLE } from "@/utils/types";
import axios from "axios";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ActionBar from "@/components/action-bar";
import Button from "@/components/button";
import useAuth from "@/hooks/use-auth";
import SongModal from "./song-modal";

const Songs = ({ data }: { data: ISongResponse["data"]; artist?: number }) => {
  const router = useRouter();
  const sp = useSearchParams();
  const page = sp.get("page");

  const user = useAuth();
  const isArtist = user?.role === USER_ROLE.ARTIST;

  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<ISong | undefined>();
  return (
    <div className="p-2 flex flex-col">
      <ActionBar
        title="Songs"
        action={
          isArtist ? (
            <Button
              onClick={() => {
                setSelectedSong(undefined);
                setDataModalOpen(true);
              }}
            >
              <Plus size={14} />
              Create song
            </Button>
          ) : null
        }
      />
      <List
        totalItems={data.pageInfo.total}
        onPageChanged={(p) => {
          router.push(`/dashboard/songs/?page=${p}`);
        }}
        page={Number(page || 1)}
        columns={[
          { id: "name", label: "Name", width: "200px" },
          { id: "album_name", label: "Album", width: "180px" },
          {
            id: "genre",
            label: "Genre",
            width: "180px",
          },
          { id: "created_at", label: "Created At", width: "180px" },
          ...(isArtist ? [{ id: "actions", label: "Actions" }] : []),
        ]}
        rows={data.songs.map((song) => ({
          id: song.id,
          columns: {
            name: { render: () => song.title },
            album_name: { render: () => song.album_name },
            genre: { render: () => song.genre },
            created_at: { render: () => formatDate(song.created_at) },
            ...(isArtist
              ? {
                  actions: {
                    render: () => (
                      <div className="flex flex-row items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedSong(song);
                            setDataModalOpen(true);
                          }}
                          className="cursor-pointer p-1.5 hover:bg-gray-200 rounded"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSong(song);
                            setDeleteModalOpen(true);
                          }}
                          className="cursor-pointer p-1.5 hover:bg-gray-200 rounded text-red-600"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    ),
                  },
                }
              : {}),
          },
        }))}
      />
      <SongModal
        initialValues={selectedSong}
        open={dataModalOpen}
        openChange={() => {
          setSelectedSong(undefined);
          setDataModalOpen(false);
        }}
      />
      <DeleteModal
        open={deleteModalOpen}
        openChange={() => {
          setSelectedSong(undefined);
          setDeleteModalOpen(false);
        }}
        resource="song"
        onSubmit={async () => {
          if (selectedSong) {
            try {
              const res = await axios.delete(
                `/backend/song/${selectedSong.id}`,
              );
              toast.success("Deleting song is successful", {
                richColors: true,
                closeButton: true,
              });
              setDeleteModalOpen(false);
              router.refresh();
              return res;
            } catch (err) {
              toast.error(handleErrors(err), {
                richColors: true,
                closeButton: true,
              });
            }
          }
        }}
      />
    </div>
  );
};

export default Songs;
