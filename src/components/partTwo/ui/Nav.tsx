import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Button } from "../../ui/button";

export const Nav: React.FC = () => {
  const { setAuth, auth } = useAuth();
  return (
    <nav className="flex justify-between items-center capitalize border-b-2 pb-2 border-opacity-50 border-b-white">
      <Link to={"/partTwo"}>Home</Link>

      {auth ? (
        <ul>
          <li>
            <Button
              onClick={() => {
                setAuth(false);
                sessionStorage.removeItem("token");
              }}
            >
              logout
            </Button>
          </li>
        </ul>
      ) : (
        <ul className="flex items-center gap-4">
          <li>
            <Link to={"/partTwo/login"}>login</Link>
          </li>
          <li>
            <Link to={"/partTwo/signup"}>signup</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
