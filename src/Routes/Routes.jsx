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
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement";
import AllBlogs from "../Pages/Dashboard/AllBlogs/AllBlogs";
import BlogEdit from "../Pages/Dashboard/AllBlogs/BlogEdit";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import PayAmountDonation from "../Pages/Dashboard/PayAmountDonation/PayAmountDonation";
import PaymentHistory from "../Pages/Dashboard/PayAmountDonation/PaymentHistory";
import MyDonation from "../Pages/Dashboard/MyDonation/MyDonation";

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
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: (
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        ),
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
        loader: () =>
          fetch(`https://portfolio-project-server-3.vercel.app/countDonations`),
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "updateProfileInfo/:id",
        element: <UpdateProfileInfo />,
        loader: ({ params }) =>
          fetch(
            `https://portfolio-project-server-3.vercel.app/user/${params.id}`
          ),
      },
      {
        path: "createDonationRequest",
        element: <CreateDonationRequest />,
      },
      {
        path: "editDonationRequest/:id",
        element: <EditDonationRequest />,
        loader: ({ params }) =>
          fetch(
            `https://portfolio-project-server-3.vercel.app/donations/${params.id}`
          ),
      },
      {
        path: "myDonationRequest",
        element: <MyDonationRequest />,
        loader: () =>
          fetch(`https://portfolio-project-server-3.vercel.app/countDonations`),
      },

      // Admin Routes
      {
        path: "allUsers",
        element: (
          <AdminRoutes>
            <AllUsers />
          </AdminRoutes>
        ),
        loader: () =>
          fetch(`https://portfolio-project-server-3.vercel.app/totalUser`),
      },
      {
        path: "allBloodDonationRequest",
        element: (
          <AdminRoutes>
            <AllBloodDonationRequest />
          </AdminRoutes>
        ),
      },

      {
        path: "contentManagement/add-blog",
        element: (
          <PrivateRoute>
            <ContentManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "allBlogs",
        element: (
          <AdminRoutes>
            <AllBlogs />
          </AdminRoutes>
        ),
      },
      {
        path: "blog/:id",
        element: (
          <AdminRoutes>
            <BlogEdit />
          </AdminRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://portfolio-project-server-3.vercel.app/users/add-blog/${params.id}`
          ),
      },
      {
        path: "dashboardHome",
        element: <DashboardHome />,
      },
      {
        path: "payAmountDonation",
        element: <PayAmountDonation />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "myDonation",
        element: (
          <PrivateRoute>
            <MyDonation />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
