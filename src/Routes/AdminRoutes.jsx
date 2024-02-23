import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";
import LoadingButton from "../Components/LoadingButton";

const AdminRoutes = ({ children }) => {
  const [isAdmin, adminLoading] = useAdmin();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (adminLoading || loading) {
    return <LoadingButton />;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoutes;
