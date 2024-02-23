import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Blog from "../Pages/Blog/Blog";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Pages/Dashboard/Profile/Profile";
import Dashboard from "../Layout/Dashboard";
import DashboardInfo from "../Pages/Dashboard/DashboardInfo/DashboardInfo";
import UpdateProfileInfo from "../Pages/Dashboard/UpdateProfileInfo/UpdateProfileInfo";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import EditDonationRequest from "../Pages/Dashboard/EditDonationRequest/EditDonationRequest";
import MyDonationRequest from "../Pages/Dashboard/MyDonationRequest/MyDonationRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoutes from "./AdminRoutes";
import AllBloodDonationRequest from "../Pages/Dashboard/AllBloodDonationRequest/AllBloodDonationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "blog",
        element: (
          <PrivateRoute>
            <Blog />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "info",
        element: <DashboardInfo />,
        loader: () => fetch(`http://localhost:5000/countDonations`),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "updateProfileInfo/:id",
        element: <UpdateProfileInfo />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/user/${params.id}`),
      },
      {
        path: "createDonationRequest",
        element: <CreateDonationRequest />,
      },
      {
        path: "editDonationRequest/:id",
        element: <EditDonationRequest />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donations/${params.id}`),
      },
      {
        path: "myDonationRequest",
        element: <MyDonationRequest />,
        loader: () => fetch(`http://localhost:5000/countDonations`),
      },

      // Admin Routes
      {
        path: "allUsers",
        element: (
          <AdminRoutes>
            <AllUsers />
          </AdminRoutes>
        ),
        loader: () => fetch(`http://localhost:5000/totalUser`),
      },
      {
        path: "allBloodDonationRequest",
        element: (
          <AdminRoutes>
            <AllBloodDonationRequest />
          </AdminRoutes>
        ),
      },
    ],
  },
]);
