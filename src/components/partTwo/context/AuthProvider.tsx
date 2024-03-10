import { ReactNode, createContext, useEffect, useState } from "react";
import { z } from "zod";
import { UserListSchema, UserSchema } from "../lib/validation";

interface IAuthContext {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  auth: boolean;
}

const AuthContext = createContext<IAuthContext>({
  auth: false,
  setAuth: (): boolean => false,
});

export const admin: z.infer<typeof UserSchema> = {
  username: "admin",
  password: "admin",
  email: "admin@admin.admin",
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    let usersList: z.infer<typeof UserListSchema> = JSON.parse(
      sessionStorage.getItem("users") || "[]"
    );
    const validateUseList = UserListSchema.safeParse(usersList);
    if (validateUseList.success) {
      const hasAdmin = validateUseList.data.findIndex(
        (user) => user.username === "admin"
      );
      if (hasAdmin === -1) {
        sessionStorage.setItem(
          "users",
          JSON.stringify([admin, ...validateUseList.data])
        );
      }
    } else {
      sessionStorage.setItem("users", JSON.stringify([admin]));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
