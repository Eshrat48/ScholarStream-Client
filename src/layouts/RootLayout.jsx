import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/NavBar/Navbar.jsx";
import Footer from "../pages/Shared/Footer/Footer.jsx";

const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}
export default RootLayout;