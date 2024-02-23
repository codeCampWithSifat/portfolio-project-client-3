import { Link, Outlet } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
          {/* <DashboardUser /> */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-indigo-600 text-white">
            {/* Sidebar content here */}
            <li>
              <Link to="/">
                <FaUserSecret /> Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FaUserSecret /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/info">
                <FaUserSecret /> User Info
              </Link>
            </li>

            <li>
              <Link to="/dashboard/profile">
                <FaUserSecret /> Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/createDonationRequest">
                <FaUserSecret /> Create Donation Request
              </Link>
            </li>
            <li>
              <Link to="/dashboard/myDonationRequest">
                <FaUserSecret /> My Donation Request
              </Link>
            </li>
            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/allUsers">
                    <FaUserSecret /> All Users
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/allBloodDonationRequest">
                    <FaUserSecret /> All Blood Donation Request
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
