"use client";
import DeleteModal from "@/components/delete-modal";
import List from "@/components/list";
import { formatDate } from "@/utils/commons";
import handleErrors from "@/utils/handleErrors";
import { IArtist, IArtistResponse, USER_ROLE } from "@/utils/types";
import axios from "axios";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ArtistModal from "./artist-modal";
import ActionBar from "@/components/action-bar";
import Button from "@/components/button";
import useAuth from "@/hooks/use-auth";

const Artists = ({ data }: IArtistResponse) => {
  const router = useRouter();
  const sp = useSearchParams();
  const page = sp.get("page");

  const user = useAuth();
  const isArtistManager = user?.role === USER_ROLE.ARTIST_MANAGER;

  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<IArtist | undefined>();
  return (
    <div className="p-2">
      <ActionBar
        title="Artists"
        action={
          isArtistManager ? (
            <Button
              onClick={() => {
                setSelectedArtist(undefined);
                setDataModalOpen(true);
              }}
            >
              <Plus size={14} />
              Create artist
            </Button>
          ) : null
        }
      />
      <List
        totalItems={data.pageInfo.total}
        onPageChanged={(p) => {
          router.push(`/dashboard/users/?page=${p}`);
        }}
        page={Number(page || 1)}
        columns={[
          { id: "name", label: "Full name", width: "200px" },
          { id: "gender", label: "Gender", width: "180px" },
          {
            id: "first_release_year",
            label: "First release year",
            width: "180px",
          },
          {
            id: "no_of_albums_released",
            label: "No of albums",
            width: "180px",
          },
          { id: "created_at", label: "Created At", width: "180px" },
          ...(isArtistManager ? [{ id: "actions", label: "Actions" }] : []),
        ]}
        rows={data.artists.map((art) => ({
          id: art.id,
          columns: {
            name: { render: () => art.name },
            gender: { render: () => art.gender },
            first_release_year: { render: () => art.first_release_year },
            no_of_albums_released: {
              render: () => art.no_of_albums_released || "-",
            },
            created_at: { render: () => formatDate(art.created_at) },
            ...(isArtistManager
              ? {
                  actions: {
                    render: () => (
                      <div className="flex flex-row items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedArtist(art);
                            setDataModalOpen(true);
                          }}
                          className="cursor-pointer p-1.5 hover:bg-gray-200 rounded"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedArtist(art);
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
      <ArtistModal
        initialValues={selectedArtist}
        open={dataModalOpen}
        openChange={() => {
          setSelectedArtist(undefined);
          setDataModalOpen(false);
        }}
      />
      <DeleteModal
        open={deleteModalOpen}
        openChange={() => {
          setSelectedArtist(undefined);
          setDeleteModalOpen(false);
        }}
        resource="artist"
        onSubmit={async () => {
          if (selectedArtist) {
            try {
              const res = await axios.delete(
                `/backend/artist/${selectedArtist.id}`,
              );
              toast.success("Deleting artist is successful", {
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

export default Artists;
