import React from "react";
import { Link } from "react-router-dom";

export const BackBtn = () => {
  return (
    <Link
      className="text-cyan-500 py-2 px-6 rounded-lg bg-gray-800 block text-center"
      to={"/"}
    >
      Root
    </Link>
  );
};
