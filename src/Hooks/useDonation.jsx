import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDonation = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: donations = [],
    isLoading: donatinoLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user?.email}`);
      return res.data;
    },
  });

  return [donations, donatinoLoading, refetch];
};

export default useDonation;
