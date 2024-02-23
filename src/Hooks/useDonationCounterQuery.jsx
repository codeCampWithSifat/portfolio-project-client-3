import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useDonationCounterQuery = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: donationCounter = 0 } = useQuery({
    queryKey: ["donationCounter", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationCounter?email=${user.email}`);
      console.log(res);
      return res.data.count;
    },
  });
  return { donationCounter };
};

export default useDonationCounterQuery;
