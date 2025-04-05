import List from "@/components/list";
import { user } from "@/lib/api";

const UserPage = async () => {
  const users = await user.list();
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
        rows={users.data.users.map((user) => ({
          id: user.id,
          columns: {
            name: { render: () => `${user.first_name} ${user.last_name}` },
            email: { render: () => user.email },
            role: { render: () => user.role },
            gender: { render: () => user.gender },
            created_at: { render: () => user.created_at },
          },
        }))}
      />
    </div>
  );
};

export default UserPage;
