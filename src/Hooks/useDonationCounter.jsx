import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDonationCounter = () => {
  const axiosSecure = useAxiosSecure();
  const { data: countDonation = 0 } = useQuery({
    queryKey: ["countDonation"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/donationCount`);
      return res.data.count;
    },
  });
  return { countDonation };
};

export default useDonationCounter;
