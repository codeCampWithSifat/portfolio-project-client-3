import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingButton from "../../../Components/LoadingButton";

const MyDonation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/paymentAmountDonationDone?email=${user.email}`
      );
      console.log(res);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingButton />;
  }
  return (
    <div className="max-w-screen-lg mx-auto mt-20">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-indigo-600 text-center text-white font-bold text-xl">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Transaction Id</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.name}</td>
                <td>{payment.email}</td>
                <td>{payment.transactionId}</td>
                <td>${payment.price}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonation;
