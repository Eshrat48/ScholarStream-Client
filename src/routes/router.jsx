import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Home from "../pages/Home/Home/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Error from "../pages/Error.jsx";
import AllScholarships from "../pages/AllScholarships.jsx";
import ScholarshipDetails from "../pages/ScholarshipDetails.jsx";
import Checkout from "../pages/Checkout.jsx";
import PaymentSuccess from "../pages/PaymentSuccess.jsx";
import PaymentFailed from "../pages/PaymentFailed.jsx";
import MyProfile from "../pages/Dashboard/MyProfile.jsx";
import MyApplications from "../pages/Dashboard/MyApplications.jsx";
import MyReviews from "../pages/Dashboard/MyReviews.jsx";
import AddScholarship from "../pages/Dashboard/AddScholarship.jsx";
import ManageScholarships from "../pages/Dashboard/ManageScholarships.jsx";
import ManageUsers from "../pages/Dashboard/ManageUsers.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import { AuthProvider } from "../contexts/AuthContext.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "scholarships",
        Component: AllScholarships
      },
      {
        path: "scholarships/:id",
        Component: ScholarshipDetails
      },
      {
        path: "checkout/:scholarshipId",
        Component: Checkout
      },
      {
        path: "payment-success",
        Component: PaymentSuccess
      },
      {
        path: "payment-failed",
        Component: PaymentFailed
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "register",
        Component: Register
      },
      {
        path: "*",
        Component: Error
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "my-profile",
        Component: MyProfile
      },
      {
        path: "my-applications",
        Component: MyApplications
      },
      {
        path: "my-reviews",
        Component: MyReviews
      },
      {
        path: "add-scholarship",
        Component: AddScholarship
      },
      {
        path: "manage-scholarships",
        Component: ManageScholarships
      },
      {
        path: "manage-users",
        Component: ManageUsers
      },
    ],
  },
]);