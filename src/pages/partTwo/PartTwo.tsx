import React from "react";
import useAuth from "../../components/partTwo/hooks/useAuth";
import { cn } from "../../lib/utils";

const PartTwo = () => {
  const { auth } = useAuth();
  return (
    <div
      className={cn(`flex justify-center py-4 capitalize`, {
        "bg-lime-700": auth,
        "bg-rose-900": !auth,
      })}
    >
      {auth ? (
        <span className="">you are logged in</span>
      ) : (
        <span className="">you are not logged in</span>
      )}
    </div>
  );
};

export default PartTwo;
