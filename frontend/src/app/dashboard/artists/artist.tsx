"use client";
import List from "@/components/list";
import { formatDate } from "@/utils/commons";
import { IArtistResponse } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";

const Artists = ({ data }: IArtistResponse) => {
  const router = useRouter();
  const sp = useSearchParams();
  const page = sp.get("page");
  return (
    <div className="p-2">
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
          { id: "created_at", label: "Created At" },
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
          },
        }))}
      />
    </div>
  );
};

export default Artists;
