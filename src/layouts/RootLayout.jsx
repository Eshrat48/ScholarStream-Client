import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Shared/NavBar/Navbar.jsx";
import Footer from "../pages/Shared/Footer/Footer.jsx";
import { AuthProvider } from "../contexts/AuthContext.jsx";

const RootLayout = () => {
    return (
        <AuthProvider>
            <div>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </AuthProvider>
    );
}
export default RootLayout;