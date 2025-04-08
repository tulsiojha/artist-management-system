import { user } from "@/lib/api";
import Users from "./users";

const UserPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const page = Number((await searchParams).page) || 0;
  const users = await user.list(page);
  return <Users data={users.data} />;
};

export default UserPage;
