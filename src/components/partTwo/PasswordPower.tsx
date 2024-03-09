import usePasswordControler from "./hooks/usePasswordControler";
import { cn } from "../../lib/utils";

interface Props {
  password: string;
}
const PasswordPower = ({ password }: Props) => {
  const {
    numberControl,
    lengthControl,
    specialCharacterControl,
    lowercaseLetterControl,
    UppercaseLetterControl,
    status,
  } = usePasswordControler(password);

  return (
    <div className="flex flex-col gap-4 pt-2">
      <div className=" grid w-full grid-cols-4 gap-x-2">
        <span
          className={cn("h-2 w-full rounded-full bg-gray-300", {
            "bg-red-600": status === "weak",
            "bg-orange-400": status === "okay",
            "bg-lime-300": status === "good",
            "bg-lime-600": status === "strong",
          })}
        ></span>
        <span
          className={cn("h-2 w-full rounded-full bg-gray-300", {
            "bg-orange-400": status === "okay",
            "bg-lime-300": status === "good",
            "bg-lime-600": status === "strong",
          })}
        ></span>
        <span
          className={cn("h-2 w-full rounded-full bg-gray-300", {
            "bg-lime-300": status === "good",
            "bg-lime-600": status === "strong",
          })}
        ></span>
        <span
          className={cn("h-2 w-full rounded-full bg-gray-300", {
            "bg-lime-600": status === "strong",
          })}
        ></span>
      </div>
      {status !== "strong" && (
        <div className="px-4">
          <ul className="list-disc">
            <li
              className={`${
                numberControl ? "text-green-700" : "text-gray-400"
              }`}
            >
              <span className="text-lg text-dark_5">At least one number</span>
            </li>
            <li
              className={`${
                lengthControl ? "text-green-700" : "text-gray-400"
              }`}
            >
              <span className="text-lg text-dark_5">At least 8 characters</span>
            </li>
            <li
              className={`${
                specialCharacterControl ? "text-green-700" : "text-gray-400"
              }`}
            >
              <span className="text-lg text-dark_5">
                At least one special character
              </span>
            </li>
            <li
              className={`${
                UppercaseLetterControl ? "text-green-700" : "text-gray-400"
              }`}
            >
              <span className="text-lg text-dark_5">
                At least one capital letter
              </span>
            </li>
            <li
              className={`${
                lowercaseLetterControl ? "text-green-700" : "text-gray-400"
              }`}
            >
              <span className="text-lg text-dark_5">
                At least one lower case letter
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordPower;
