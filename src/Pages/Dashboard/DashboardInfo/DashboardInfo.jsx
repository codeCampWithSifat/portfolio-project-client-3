import useAuth from "../../../Hooks/useAuth";

const DashboardInfo = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-screen-md mx-auto mt-10">
      <div>
        <h2 className="text-center text-indigo-600 font-bold text-3xl">
          {" "}
          Welcome {user.displayName} On Your Dashboard
        </h2>
      </div>
    </div>
  );
};

export default DashboardInfo;
