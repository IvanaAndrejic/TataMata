import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import UserTag from "./UserTag";

const MainLayout = () => {
  return (
    <>
      <UserTag />
      <Header />
      <main style={{ paddingTop: "30px", paddingBottom: "60px", flex: 1 }}>
      <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
