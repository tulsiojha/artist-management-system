import { IUser } from "@/utils/types";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<IUser | null>(null);

export const AuthProvider = ({
  children,
  user,
}: {
  children?: ReactNode;
  user: IUser;
}) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
