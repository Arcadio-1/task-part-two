import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  SignupFormSchema,
  UserListSchema,
  UserSchema,
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
import PasswordPower from "../../../components/partTwo/PasswordPower";
import { Button } from "../../../components/ui/button";
import { Navigate } from "react-router";
import useAuth from "../../../components/partTwo/hooks/useAuth";
import { admin } from "../../../components/partTwo/context/AuthProvider";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { auth, setAuth } = useAuth();
  const signupform = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const pass = signupform.watch("password");
  const onSubmit = (values: z.infer<typeof SignupFormSchema>) => {
    const user = UserSchema.safeParse(values);
    if (!user.success) {
      setErrorMessage("wrong data input");
      return;
    }
    let usersList: z.infer<typeof UserListSchema> = JSON.parse(
      sessionStorage.getItem("users") || "[]"
    );
    const validateUseList = UserListSchema.safeParse(usersList);
    if (!validateUseList.success) {
      usersList = [admin];
    }
    sessionStorage.setItem("users", JSON.stringify([...usersList, user.data]));
    sessionStorage.setItem("token", "1");
    setAuth(true);
    signupform.reset();
  };

  if (auth) {
    return <Navigate to={"/partTwo"} />;
  }
  return (
    <Form {...signupform}>
      <form
        className="flex flex-col gap-4"
        onSubmit={signupform.handleSubmit(onSubmit)}
      >
        <FormField
          control={signupform.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel className="text-md">username</FormLabel>
              <span className="text-lg text-g1_5">*</span>
              <FormControl>
                <Input
                  autoComplete="username"
                  id="username"
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
          control={signupform.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel className="text-md">email</FormLabel>
              <span className="text-lg text-g1_5">*</span>
              <FormControl>
                <Input
                  autoComplete="email"
                  id="email"
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
          control={signupform.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel className="text-md">password</FormLabel>
              <span className="text-lg text-g1_5">*</span>
              <div className="relative">
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
                    // type="hidden"
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
              <PasswordPower password={pass} />
            </FormItem>
          )}
        />
        <FormField
          control={signupform.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel className="text-md">confirm password</FormLabel>
              <span className="text-lg text-g1_5">*</span>
              <div className="relative">
                <FormControl>
                  <Input
                    autoComplete="new-password"
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
              signupform.reset();
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
            signup
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

export default Signup;
