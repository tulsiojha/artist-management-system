"use client";
import DeleteModal from "@/components/delete-modal";
import List from "@/components/list";
import { exportCSV, formatDate, genders } from "@/utils/commons";
import { IArtist, IArtistResponse, USER_ROLE } from "@/utils/types";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ArtistModal from "./artist-modal";
import ActionBar from "@/components/action-bar";
import Button from "@/components/button";
import useAuth from "@/hooks/use-auth";
import CSVModal from "@/components/csv-modal";
import SettingMenu from "@/components/setting-menu";
import { artist } from "@/lib/api-client";
import ItemAction from "@/components/item-action";

const Artists = ({ data }: IArtistResponse) => {
  const router = useRouter();
  const sp = useSearchParams();
  const page = sp.get("page");

  const user = useAuth();
  const isArtistManager = user?.role === USER_ROLE.ARTIST_MANAGER;

  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [csvModalOpen, setCSVModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<IArtist | undefined>();
  return (
    <div className="p-2 flex flex-col">
      <ActionBar
        title="Artists"
        action={
          isArtistManager ? (
            <div className="flex flex-row items-center gap-2">
              <SettingMenu
                handleImport={() => {
                  setCSVModalOpen(true);
                }}
                handleExport={exportCSV}
              />
              <Button
                onClick={() => {
                  setSelectedArtist(undefined);
                  setDataModalOpen(true);
                }}
              >
                <Plus size={14} />
                Create artist
              </Button>
            </div>
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
          {
            id: "name",
            label: "Full name",
            className: "w-[150px] md:w-[200px]",
          },
          {
            id: "gender",
            label: "Gender",
            className: "w-[80px] md:w-[200px]",
          },
          {
            id: "first_release_year",
            label: "First release year",
            className: "w-[180px] md:w-[200px]",
          },
          {
            id: "no_of_albums_released",
            label: "No of albums",
            width: "180px",
          },
          {
            id: "created_at",
            label: "Created At",
            className: "w-[100px] md:w-[200px]",
          },
          ...(isArtistManager ? [{ id: "actions", label: "Actions" }] : []),
        ]}
        rows={data.artists.map((art) => ({
          id: art.id,
          onClick: () => {
            router.push(`/dashboard/artists/${art.id}`);
          },
          columns: {
            name: { render: () => art.name },
            gender: {
              render: () => genders.find((f) => f.value === art.gender)?.label,
            },
            first_release_year: { render: () => art.first_release_year },
            no_of_albums_released: {
              render: () => art.no_of_albums_released || "-",
            },
            created_at: { render: () => formatDate(art.created_at) },
            ...(isArtistManager
              ? {
                  actions: {
                    render: () => (
                      <ItemAction
                        onDelete={(e) => {
                          e.stopPropagation();
                          setSelectedArtist(art);
                          setDeleteModalOpen(true);
                        }}
                        onEdit={(e) => {
                          e.stopPropagation();
                          setSelectedArtist(art);
                          setDataModalOpen(true);
                        }}
                      />
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
      <CSVModal open={csvModalOpen} openChange={() => setCSVModalOpen(false)} />
      <DeleteModal
        open={deleteModalOpen}
        openChange={() => {
          setSelectedArtist(undefined);
          setDeleteModalOpen(false);
        }}
        resource="artist"
        onSubmit={async () => {
          if (selectedArtist) {
            return artist.delete(selectedArtist.id, () => {
              setDeleteModalOpen(false);
              router.refresh();
            });
          }
        }}
      />
    </div>
  );
};

export default Artists;
