import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import UserBadge from "./UserBadge";

const MainLayout = () => {


    return (

        <>
            <UserBadge></UserBadge>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}

export default MainLayout;