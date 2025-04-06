"use client";
import ActionBar from "@/components/action-bar";
import Button from "@/components/button";
import List from "@/components/list";
import { formatDate } from "@/utils/commons";
import { IUser, IUserResponse } from "@/utils/types";
import { Pencil, Plus, Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import UserModal from "./UserModal";
import DeleteModal from "@/components/delete-modal";
import axios from "axios";
import { toast } from "sonner";
import handleErrors from "@/utils/handleErrors";

const Users = ({ data }: IUserResponse) => {
  const router = useRouter();
  const sp = useSearchParams();
  const page = sp.get("page");

  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>();

  return (
    <div className="p-2">
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
        onPageChanged={(p) => {
          router.push(`/dashboard/users/?page=${p}`);
        }}
        page={Number(page || 1)}
        columns={[
          { id: "name", label: "Full name", width: "200px" },
          { id: "email", label: "Email", width: "300px" },
          { id: "role", label: "Role", width: "180px" },
          { id: "gender", label: "Gender", width: "180px" },
          { id: "created_at", label: "Created At", width: "180px" },
          { id: "actions", label: "Actions" },
        ]}
        rows={data.users.map((user) => ({
          id: user.id,
          columns: {
            name: { render: () => `${user.first_name} ${user.last_name}` },
            email: { render: () => user.email },
            role: { render: () => user.role },
            gender: { render: () => user.gender },
            created_at: { render: () => formatDate(user.created_at) },
            actions: {
              render: () => (
                <div className="flex flex-row items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setDataModalOpen(true);
                    }}
                    className="cursor-pointer p-1.5 hover:bg-gray-200 rounded"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setDeleteModalOpen(true);
                    }}
                    className="cursor-pointer p-1.5 hover:bg-gray-200 rounded text-red-600"
                  >
                    <Trash size={14} />
                  </button>
                </div>
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
            try {
              const res = await axios.delete(
                `/backend/user/${selectedUser.id}`,
              );
              toast.success("Deleting user is successful", {
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

export default Users;
