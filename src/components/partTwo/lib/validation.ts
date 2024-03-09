import { z } from "zod";
export const EmailScheme = z.string().email("Invalid email format").trim();

export const PasswordScham = z
  .string()
  .trim()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,32}$/,
    {
      message: "Invalid Password",
    }
  );

const usernameSchema = z
  .string()
  .trim()
  .min(2, "Username must be at least 2 characters long")
  .max(20, "Username cannot be longer than 20 characters")
  .regex(
    /^[a-zA-Z][a-zA-Z0-9]*$/,
    "Username can only contain letters and numbers"
  );

export const LoginFormSchema = z.object({
  username: z.string().trim().min(1, { message: "Enter Username" }),
  password: z.string().trim().min(1, { message: "Enter Password" }),
});

export const SignupFormSchema = z
  .object({
    username: usernameSchema.refine(
      (value) => {
        try {
          const users: z.infer<typeof UserListSchema> = JSON.parse(
            sessionStorage.getItem("users") || "[]"
          );
          const index = users.findIndex((user) => user.username === value);
          if (index === -1) {
            return true;
          } else {
            return false;
          }
        } catch (error) {
          return true;
        }
      },
      { message: "this username is taken" }
    ),
    email: EmailScheme,
    password: PasswordScham,
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const UserSchema = z.object({
  username: z.string().trim().min(4, { message: "unvalid username" }),
  email: z.string().trim().email({ message: "unvalid email" }),
  password: z.string().trim().min(4, { message: "unvalid password" }),
});

export const UserListSchema = z.array(UserSchema);
