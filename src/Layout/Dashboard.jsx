import { Link, Outlet } from "react-router-dom";
import { FaUserSecret } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";
import { FaHome } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { FaUserGraduate } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { GrUserAdd } from "react-icons/gr";
import { ImBlog } from "react-icons/im";
import { PiUsersThreeFill } from "react-icons/pi";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
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
                <FaHome />
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/dashboardHome">
                <RxDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/info">
                <FaUserGraduate />
                User Info
              </Link>
            </li>

            <li>
              <Link to="/dashboard/profile">
                <FaUserPen />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/dashboard/createDonationRequest">
                <GrUserAdd />
                Create Donation Request
              </Link>
            </li>
            <li>
              <Link to="/dashboard/myDonationRequest">
                <FaUserSecret /> My Donation Request
              </Link>
            </li>
            <li>
              <Link to="/dashboard/contentManagement/add-blog">
                <ImBlog />
                Add Blog
              </Link>
            </li>

            {isAdmin && (
              <>
                <div className="divider divider-primary"></div>
                <li>
                  <Link to="/dashboard/allUsers">
                    <PiUsersThreeFill />
                    All Users
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/allBloodDonationRequest">
                    <GrUserAdd /> All Blood Donation Request
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/allBlogs">
                    <ImBlog /> All Blogs Request
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
