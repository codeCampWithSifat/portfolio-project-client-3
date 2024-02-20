import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data = {} } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="card w-1/2 mx-auto bg-base-100 shadow-xl mt-10">
        <div className="card-body justify-center">
          <figure className="-ml-32">
            <img src={data.avatar} className="w-1/2" />
          </figure>
        </div>
        <div className="card-body justify-center ml-8">
          <h2 className="card-title justify-start"> Name : {data.name}</h2>
          <p className="text-left">Email : {data.email}</p>
          <p className="text-left">BloodGroup : {data.bloodGroup}</p>
          <p className="text-left">District : {data.district}</p>
          <p className="text-left">Upazila : {data?.upazila}</p>
          <p className="text-left">Status : {data.status}</p>
          <p className="text-left">Role : {data.role}</p>
          <div className="card-actions justify-end">
            <Link to={`/dashboard/updateProfileInfo/${data._id}`}>
              <button className="btn btn-primary btn-sm">Update Info</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
