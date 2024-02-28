// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const usePaymentDonation = () => {
//   const axiosSecure = useAxiosSecure();
//   const { user } = useAuth();

//   const { data: amounts = [], isLoading } = useQuery({
//     queryKey: ["payments", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/payments/${user.email}`);
//       console.log(res);
//       res.data;
//     },
//   });

//   return [amounts, isLoading];
// };

// export default usePaymentDonation;
