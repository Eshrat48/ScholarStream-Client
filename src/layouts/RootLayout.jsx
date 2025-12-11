import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/NavBar/Navbar.jsx";
import Footer from "../pages/Shared/Footer/Footer.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import { AuthProvider } from "../contexts/AuthContext.jsx";

const RootLayout = () => {
    return (
        <AuthProvider>
            <ScrollToTop />
            <div>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </AuthProvider>
    );
}
export default RootLayout;