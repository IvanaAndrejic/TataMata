import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import UserTag from "./UserTag";

const MainLayout = () => {

  const isHome = window.location.pathname === '/';  // Detekcija da li je Home stranica

  return (
    <>
      <UserTag />
      <Header />
      <main style={{ paddingTop: isHome ? "0" : "20px", paddingBottom: "20px", flex: 1 }}> 

      <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
