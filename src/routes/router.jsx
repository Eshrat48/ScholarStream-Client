import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../pages/Home/Home/Home.jsx";

// Placeholder for AllScholarships page - will be created later
const AllScholarships = () => <div className="container mx-auto py-20"><h1 className="text-3xl font-bold">All Scholarships</h1><p className="text-gray-600 mt-4">Coming Soon - Search and filter functionality will be implemented with server integration</p></div>;

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "all-scholarships",
        Component: AllScholarships
      },
    ],
  },
]);