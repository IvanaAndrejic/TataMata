import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import UserBadge from "./UserBadge";

const MainLayout = () => {
  return (
    <>
      <UserBadge />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
