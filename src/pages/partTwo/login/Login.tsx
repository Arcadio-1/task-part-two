import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  LoginFormSchema,
  UserListSchema,
} from "../../../components/partTwo/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import HideIcon from "../../../components/partTwo/ui/HideIcon";
import ShowIcon from "../../../components/partTwo/ui/ShowIcon";
import { Button } from "../../../components/ui/button";
import useAuth from "../../../components/partTwo/hooks/useAuth";
import { Navigate } from "react-router";
import { admin } from "../../../components/partTwo/context/AuthProvider";

const Login: React.FC = () => {
  const { setAuth, auth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const loginForm = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    setErrorMessage("");
    const usersList: z.infer<typeof UserListSchema> = JSON.parse(
      sessionStorage.getItem("users") || "[]"
    );
    const validateUseList = UserListSchema.safeParse(usersList);
    if (!validateUseList.success) {
      sessionStorage.setItem("users", JSON.stringify([admin]));
      setErrorMessage("something went wrong try again");
      return;
    }
    const user = validateUseList.data.find(
      (user) => user.username === values.username
    );
    if (!user) {
      loginForm.setError("username", { message: "user not found" });
      return;
    }
    if (user.password !== values.password) {
      loginForm.setError("password", { message: "Password incorrect" });
      return;
    }

    sessionStorage.setItem("token", "1");
    setAuth(true);
  };

  if (auth) {
    return <Navigate to={"/partTwo"} />;
  }

  return (
    <Form {...loginForm}>
      <form
        className="flex flex-col gap-4"
        onSubmit={loginForm.handleSubmit(onSubmit)}
      >
        <FormField
          control={loginForm.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel className="text-md">username</FormLabel>
              <span className="text-lg text-g1_5">*</span>
              <FormControl>
                <Input
                  //   autoComplete="username"
                  //   id="username"
                  type="text"
                  className="rounded-[4px] border border-transparent text-xl bg-gray-600"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel className="text-md">password</FormLabel>
              <span className="text-lg text-g1_5">*</span>
              <div className="relative">
                <FormControl>
                  <Input
                    // autoComplete="password"
                    type={showPassword ? "text" : "password"}
                    className="rounded-[4px] border border-transparent text-xl bg-gray-600"
                    {...field}
                  />
                </FormControl>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => {
                      return !prev;
                    });
                  }}
                  className="absolute right-2 top-2"
                >
                  {showPassword ? <HideIcon /> : <ShowIcon />}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end mt-2">
          <Button
            onClick={() => {
              loginForm.reset();
            }}
            className="grow md:grow-0 rounded-lg bg-cyan-700 px-6 py-2 text-lg text-light_1 hover:scale-[1.01] hover:bg-cyan-600"
            type="reset"
          >
            cancel
          </Button>
          <Button
            className="grow md:grow-0 rounded-lg bg-lime-700 px-6 py-2 text-lg text-light_1 hover:scale-[1.01] hover:bg-lime-600"
            type="submit"
          >
            Login
          </Button>
        </div>
        {errorMessage && (
          <div className="bg-red-700 w-full px-2 py-1 bg-opacity-45 text-center">
            <span className="text-slate-200 capitalize">{errorMessage}</span>
          </div>
        )}
      </form>
    </Form>
  );
};

export default Login;
