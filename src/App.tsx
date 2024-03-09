import { Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import PartOne from "./pages/partOne/PartOne";
import Layout from "./components/partTwo/ui/Layout";
import Login from "./pages/partTwo/login/Login";
import Signup from "./pages/partTwo/signup/Signup";
import PartTwo from "./pages/partTwo/PartTwo";
function App() {
  return (
    <>
      <main className="pb-14 md:pb-2 pt-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partOne" element={<PartOne />} />
          <Route path="/partTwo" element={<Layout />}>
            <Route element={<PartTwo />} index />
            <Route element={<Login />} path="login" />
            <Route element={<Signup />} path="signup" />
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
