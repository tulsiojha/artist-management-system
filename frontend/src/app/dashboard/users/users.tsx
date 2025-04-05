"use client";
import List from "@/components/list";
import { formatDate } from "@/utils/commons";
import { IUserResponse } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";

const Users = ({ data }: IUserResponse) => {
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
          { id: "email", label: "Email", width: "300px" },
          { id: "role", label: "Role", width: "180px" },
          { id: "gender", label: "Gender", width: "180px" },
          { id: "created_at", label: "Created At" },
        ]}
        rows={data.users.map((user) => ({
          id: user.id,
          columns: {
            name: { render: () => `${user.first_name} ${user.last_name}` },
            email: { render: () => user.email },
            role: { render: () => user.role },
            gender: { render: () => user.gender },
            created_at: { render: () => formatDate(user.created_at) },
          },
        }))}
      />
    </div>
  );
};

export default Users;
