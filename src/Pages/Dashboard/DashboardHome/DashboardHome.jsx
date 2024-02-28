import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingButton from "../../../Components/LoadingButton";
import { GiPayMoney } from "react-icons/gi";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const axiosPublic = useAxiosPublic();
  const { data: userStats = [], isLoading } = useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/usersState`);
      // console.log(res);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingButton />;
  }
  return (
    <>
      <div className="h-[400px] flex justify-center items-center">
        <Helmet>
          <title>Dashboard || Home</title>
        </Helmet>
        <div className="stats shadow text-center">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              ></svg>
            </div>
            <div className="stat-title text-indigo-600 font-bold">
              Total Donation Request
            </div>
            <div className="stat-value text-indigo-600 ">
              {userStats.donations}
            </div>
          </div>

          <div className="stat text-center">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              ></svg>
            </div>
            <div className="stat-title text-indigo-600 font-bold">
              Total Users
            </div>
            <div className="stat-value text-indigo-600">{userStats.users}</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              ></svg>
            </div>
            <div className="stat-title text-indigo-600 font-bold">
              Total Funding
            </div>
            <div className="stat-value text-indigo-600">
              {userStats.revenue}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <Link to="/dashboard/payAmountDonation">
          <button className="btn text-white  hover:bg-indigo-600 hover:text-black bg-indigo-600">
            Pay Donation <GiPayMoney />
          </button>
        </Link>
      </div>
    </>
  );
};

export default DashboardHome;

//
