import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import UserTag from "./UserTag";

const MainLayout = () => {
  return (
    <>
      <UserTag />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
