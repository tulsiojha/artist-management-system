import { toast } from "@/utils/commons";
import handleErrors from "@/utils/handleErrors";
import { queryClient } from "@/utils/query-client";

const user = {
  logout: async (onSuccess?: () => void) => {
    try {
      await queryClient.get("/auth/logout");
      toast("Successfully logged out.", "success");
      onSuccess?.();
    } catch (err) {
      toast(handleErrors(err), "success");
    }
  },
  register: async (data: Record<string, unknown>, onSuccess?: () => void) => {
    try {
      await queryClient.post("/auth/register", data);
      toast(
        "User register is successful. Please login to access dashboard.",
        "success",
      );
      onSuccess?.();
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
  login: async (data: Record<string, unknown>, onSuccess?: () => void) => {
    try {
      await queryClient.post("/auth/login", data);
      toast("Successfully logged in.", "success");
      onSuccess?.();
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
  create: async (data: Record<string, unknown>, onSuccess?: () => void) => {
    try {
      await queryClient.post("/user/", data);
      toast("User created successfully", "success");
      onSuccess?.();
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
  update: async (
    id: number,
    data: Record<string, unknown>,
    onSuccess?: () => void,
  ) => {
    try {
      await queryClient.post(`/user/${id}`, data);
      toast("User updated successfully", "success");
      onSuccess?.();
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
  delete: async (id: number, onSuccess?: () => void) => {
    try {
      const res = await queryClient.delete(`/user/${id}`);
      toast("Deleting user is successful", "success");
      onSuccess?.();
      return res;
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
  fetchUnlinkedUsers: async () => {
    return (await queryClient.get("/user/unlinked-user")).data;
  },
};

const artist = {
  create: async (data: Record<string, unknown>, onSuccess?: () => void) => {
    try {
      await queryClient.post("/artist/", data);
      toast("Artist created successfully", "success");
      onSuccess?.();
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
  createMany: async (data: Record<string, unknown>, onSuccess?: () => void) => {
    try {
      await queryClient.post("/artist/insert-many", data);
      toast("Bulk artist adding was successful.", "success");
      onSuccess?.();
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
  update: async (
    id: number,
    data: Record<string, unknown>,
    onSuccess?: () => void,
  ) => {
    try {
      await queryClient.post(`/artist/${id}`, data);
      toast("Artist updated successfully", "success");
      onSuccess?.();
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
  delete: async (id: number, onSuccess?: () => void) => {
    try {
      const res = await queryClient.delete(`/artist/${id}`);
      toast("Deleting artist is successful", "success");
      onSuccess?.();
      return res;
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
};

const song = {
  create: async (data: Record<string, unknown>, onSuccess?: () => void) => {
    try {
      await queryClient.post("/song", data);
      toast("Song created successfully", "success");
      onSuccess?.();
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
  update: async (
    id: number,
    data: Record<string, unknown>,
    onSuccess?: () => void,
  ) => {
    try {
      await queryClient.post(`/song/${String(id)}`, data);
      toast("Song update successfully", "success");
      onSuccess?.();
    } catch (err) {
      toast(handleErrors(err), "error");
    }
  },
  delete: async (id: number, onSuccess?: () => void) => {
    try {
      const res = await queryClient.delete(`/song/${id}`);
      toast("Deleting song is successful", "success");
      onSuccess?.();
      return res;
    } catch (err) {
      toast(handleErrors(err), "success");
    }
  },
};

export { user, artist, song };
