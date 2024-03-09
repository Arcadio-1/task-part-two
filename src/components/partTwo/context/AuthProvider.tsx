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
    // console.log("run");
    const token = sessionStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    // console.log("XXXXXXXXXX");
    let usersList: z.infer<typeof UserListSchema> = JSON.parse(
      sessionStorage.getItem("users") || "[]"
    );
    const validateUseList = UserListSchema.safeParse(usersList);
    // console.log(validateUseList);
    if (validateUseList.success) {
      // console.log("TTTTTTTTT");
      const hasAdmin = validateUseList.data.findIndex(
        (user) => user.username === "admin"
      );
      // console.log(hasAdmin);
      if (hasAdmin === -1) {
        // console.log("QQQQQQQQ");
        sessionStorage.setItem(
          "users",
          JSON.stringify([admin, ...validateUseList.data])
        );
      }
    } else {
      // console.log("RRRRRRR");
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
