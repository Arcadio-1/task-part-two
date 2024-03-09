import { Container } from "../../util/Container";
import { BackBtn } from "../../util/BackBtn";
import { Outlet } from "react-router";
import { Nav } from "./Nav";
import { AuthProvider } from "../context/AuthProvider";

const Layout = () => {
  return (
    <div>
      <BackBtn />
      <Container className="max-w-3xl">
        <AuthProvider>
          <Nav />
          <Outlet />
        </AuthProvider>
      </Container>
    </div>
  );
};

export default Layout;
