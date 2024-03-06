import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link className="text-red-400" to={"/partOne"}>
        part one
      </Link>
      <Link className="text-yellow-500" to={"/partTwo"}>
        part two
      </Link>
    </div>
  );
};

export default Home;
