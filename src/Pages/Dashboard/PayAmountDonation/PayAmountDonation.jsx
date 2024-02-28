import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PayAmountDonation = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const amount = Number(data.amount);
    const amountInfo = {
      userAmount: amount,
      name: user.displayName,
      email: user.email,
    };
    const res = await axiosSecure.post(`/users/payAmountDonation`, amountInfo);
    if (res.data?.insertedId) {
      toast(`Thanks ${user.displayName} For Your Donation`);
      navigate("/dashboard/paymentHistory");
    }
  };
  return (
    <div>
      <>
        <Helmet>
          <title>Pay</title>
        </Helmet>
        <div className=" flex justify-center items-center">
          <div className="w-96 p-4 mt-28 mb-10">
            <h2 className="text-3xl text-center">
              How Much Money You Have To Pay
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-md">Your Amount</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  className="input input-bordered w-full "
                  {...register("amount", { required: true, min: 5 })}
                />
                {errors.amount && (
                  <span className="text-red-800 mt-2">
                    Amount is required Minimum 5
                  </span>
                )}
              </div>

              <input
                type="submit"
                className="input input-bordered w-1/4 bg-indigo-600 text-white my-4"
                value="Pay"
              />
            </form>
          </div>
        </div>
      </>
      <ToastContainer />
    </div>
  );
};

export default PayAmountDonation;
