import { user } from "@/lib/api";
import Users from "./users";

const UserPage = async (props) => {
  const sp = await props.searchParams;
  const users = await user.list(sp?.page);
  return <Users data={users.data} />;
};

export default UserPage;
