import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">About</Link>
      </li>
      <li>
        <Link to="/">Causes</Link>
      </li>

      <li>
        <Link to="/blog">Blog</Link>
      </li>
      {user?.email && (
        <li className="text-black">
          <Link to="/dashboard">
            <summary className="text-white">Dashboard</summary>
          </Link>
        </li>
      )}
      {!user ? (
        <li>
          <Link to="/login">Login</Link>
        </li>
      ) : (
        <li>
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-primary mt-1 mx-1"
          >
            Log Out
          </button>
        </li>
      )}
      {user && (
        <li>
          <div className="avatar mx-1 lg:-mt-1">
            <div className="w-8 rounded-full ">
              <img src={user?.photoURL} />
            </div>
          </div>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-gray-600	 bg-opacity-40	 p-3 text-white fixed z-40">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu text-indigo-900 menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl lg:mx-20">
            <h3>Blood_Donation</h3>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex mr-20">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
