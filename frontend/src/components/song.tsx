"use client";
import DeleteModal from "@/components/delete-modal";
import List from "@/components/list";
import { formatDate, getParams } from "@/utils/commons";
import { ISong, ISongResponse, USER_ROLE } from "@/utils/types";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ActionBar from "@/components/action-bar";
import Button from "@/components/button";
import useAuth from "@/hooks/use-auth";
import SongModal from "./song-modal";
import { song } from "@/lib/api-client";
import ItemAction from "./item-action";
import { PAGINATION_LIMIT } from "@/utils/constants";

const Songs = ({ data }: { data: ISongResponse["data"]; artist?: number }) => {
  const router = useRouter();
  const sp = useSearchParams();
  const [page, limit] = [sp.get("page"), sp.get("limit")];

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
        page={Number(page || 1)}
        onPageChanged={(p) => {
          router.push(getParams("page", p, sp));
        }}
        perPage={Number(limit) || PAGINATION_LIMIT}
        onLimitChanged={(e) => {
          router.push(getParams("limit", e, sp));
        }}
        columns={[
          { id: "name", label: "Name", className: "w-[150px] md:w-[200px]" },
          {
            id: "album_name",
            label: "Album",
            className: "w-[110px] md:w-[180px]",
          },
          {
            id: "genre",
            label: "Genre",
            width: "180px",
          },
          {
            id: "created_at",
            label: "Created At",
            className: "w-[100px] md:w-[180px]",
          },
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
                      <ItemAction
                        deleteProps={{
                          onClick: () => {
                            setSelectedSong(song);
                            setDeleteModalOpen(true);
                          },
                        }}
                        editProps={{
                          onClick: () => {
                            setSelectedSong(song);
                            setDataModalOpen(true);
                          },
                        }}
                      />
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
            return song.delete(selectedSong.id, () => {
              setDeleteModalOpen(false);
              router.refresh();
            });
          }
        }}
      />
    </div>
  );
};

export default Songs;
