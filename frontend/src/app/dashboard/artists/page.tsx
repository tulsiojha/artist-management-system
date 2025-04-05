import List from "@/components/list";
import { artist } from "@/lib/api";

const Page = async () => {
  const artists = await artist.list();
  return (
    <div className="p-2">
      <List
        columns={[
          { id: "name", label: "Full name", width: "200px" },
          { id: "email", label: "Email", width: "300px" },
          { id: "role", label: "Role", width: "180px" },
          { id: "gender", label: "Gender", width: "180px" },
          { id: "created_at", label: "Created At" },
        ]}
        rows={artists.data.artists.map((art) => ({
          id: art.id,
          columns: {
            name: { render: () => `${art.first_name} ${art.last_name}` },
            email: { render: () => art.email },
            role: { render: () => art.role },
            gender: { render: () => art.gender },
            created_at: { render: () => art.created_at },
          },
        }))}
      />
    </div>
  );
};

export default Page;
