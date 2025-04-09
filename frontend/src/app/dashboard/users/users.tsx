"use client";
import ActionBar from "@/components/action-bar";
import Button from "@/components/button";
import List from "@/components/list";
import { formatDate, genders, getParams, roles } from "@/utils/commons";
import { IUser, IUserResponse } from "@/utils/types";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import UserModal from "./UserModal";
import DeleteModal from "@/components/delete-modal";
import { user } from "@/lib/api-client";
import ItemAction from "@/components/item-action";
import { PAGINATION_LIMIT } from "@/utils/constants";
import useAuth from "@/hooks/use-auth";

const Users = ({ data }: IUserResponse) => {
  const router = useRouter();
  const authUser = useAuth();
  const sp = useSearchParams();
  const [page, limit] = [sp.get("page"), sp.get("limit")];

  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();

  return (
    <div className="p-2 flex flex-col overflow-hidden">
      <ActionBar
        title="Users"
        action={
          <Button
            onClick={() => {
              setSelectedUser(undefined);
              setDataModalOpen(true);
            }}
          >
            <Plus size={14} />
            Create user
          </Button>
        }
      />
      <List
        totalItems={data.pageInfo.total}
        page={Number(page) || 1}
        onPageChanged={(p) => {
          router.push(getParams("page", p, sp));
        }}
        perPage={Number(limit) || PAGINATION_LIMIT}
        onLimitChanged={(e) => {
          router.push(getParams("limit", e, sp));
        }}
        columns={[
          { id: "id", label: "User Id", width: "80px" },
          { id: "name", label: "Full name", width: "200px" },
          { id: "email", label: "Email", width: "280px" },
          { id: "role", label: "Role", width: "150px" },
          { id: "gender", label: "Gender", width: "180px" },
          { id: "created_at", label: "Created At", width: "180px" },
          { id: "actions", label: "Actions", width: "70px" },
        ]}
        rows={data.users.map((user) => ({
          id: user.id,
          columns: {
            id: { render: () => user.id },
            name: { render: () => `${user.first_name} ${user.last_name}` },
            email: { render: () => user.email },
            role: {
              render: () => roles.find((f) => f.value === user.role)?.label,
            },
            gender: {
              render: () => genders.find((f) => f.value === user.gender)?.label,
            },
            created_at: { render: () => formatDate(user.created_at) },
            actions: {
              render: () => (
                <ItemAction
                  deleteProps={{
                    disabled: user.id === authUser?.id,
                    onClick: () => {
                      setSelectedUser(user);
                      setDeleteModalOpen(true);
                    },
                  }}
                  editProps={{
                    onClick: () => {
                      setSelectedUser(user);
                      setDataModalOpen(true);
                    },
                  }}
                />
              ),
            },
          },
        }))}
      />
      <UserModal
        open={dataModalOpen}
        openChange={(o) => {
          setSelectedUser(undefined);
          setDataModalOpen(o);
        }}
        initialValues={selectedUser}
      />
      <DeleteModal
        open={deleteModalOpen}
        openChange={() => {
          setSelectedUser(undefined);
          setDeleteModalOpen(false);
        }}
        resource="user"
        onSubmit={async () => {
          if (selectedUser) {
            return user.delete(selectedUser.id, () => {
              setDeleteModalOpen(false);
              router.refresh();
            });
          }
        }}
      />
    </div>
  );
};

export default Users;
