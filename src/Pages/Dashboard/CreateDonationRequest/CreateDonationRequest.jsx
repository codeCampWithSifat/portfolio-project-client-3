import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const onSubmit = async (data) => {
    const donationInfo = {
      donorName: user?.displayName,
      donorEmail: user?.email,
      recipientName: data.recipientName,
      district: data.district,
      upazila: data.upazila,
      hospitalName: data.hospitalName,
      address: data.address,
      date: data.date,
      time: data.time,
      message: data.message,
      status: "pending",
    };
    const donationData = await axiosSecure.post(`/donations`, donationInfo);
    if (donationData.data.insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Donation Request Done By ${user?.displayName}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Donation Request</title>
      </Helmet>
      <div className="max-w-screen-md mx-auto">
        <div className="w-full px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex my-4">
              <div className="form-control w-full mr-4 ">
                <label className="label">
                  <span className="label-text font-semibold">
                    Recipient Name *
                  </span>
                </label>
                <input
                  {...register("recipientName", { required: true })}
                  className="input input-bordered"
                ></input>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">
                    Recipient District *
                  </span>
                </label>
                <select
                  type="text"
                  {...register("district", { required: true })}
                  placeholder="Type here"
                  className="select select-bordered"
                >
                  <option defaultValue="Pick One" disabled>
                    Pick One
                  </option>
                  <option value={"narayangonj"}>Narayangonj</option>
                  <option value={"gazipur"}>Gazipur</option>
                  <option value={"shrinagor"}>Shrinagor</option>
                  <option value={"lamonirhat"}>Lamonirhat</option>
                  <option value={"zindabazar"}>Zindabazar</option>
                  <option value={"doha"}>Doha</option>
                  <option value={"paharpur"}>Paharpur</option>
                  <option value={"paikgasa"}>Paikgasa</option>
                </select>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-full mr-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Recipient Upazila *
                  </span>
                </label>
                <select
                  type="text"
                  {...register("upazila", { required: true })}
                  placeholder="Type here"
                  className="select select-bordered"
                >
                  <option defaultValue="Pick One" disabled>
                    Select One
                  </option>
                  <option value={"narayangonj"}>Narayangonj</option>
                  <option value={"gazipur"}>Gazipur</option>
                  <option value={"shrinagor"}>Shrinagor</option>
                  <option value={"lamonirhat"}>Lamonirhat</option>
                  <option value={"zindabazar"}>Zindabazar</option>
                  <option value={"doha"}>Doha</option>
                  <option value={"paharpur"}>Paharpur</option>
                  <option value={"paikgasa"}>Paikgasa</option>
                </select>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">
                    Hospital Name *
                  </span>
                </label>
                <input
                  {...register("hospitalName", { required: true })}
                  className="input input-bordered"
                ></input>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-full mr-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Full Address *
                  </span>
                </label>
                <input
                  type="text"
                  {...register("address", { required: true })}
                  placeholder="Type here"
                  className="input input-bordered"
                ></input>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">
                    Donation Date *
                  </span>
                </label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  className="input input-bordered"
                ></input>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-full mr-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Donation Time *
                  </span>
                </label>
                <input
                  type="time"
                  {...register("time", { required: true })}
                  placeholder="Type here"
                  className="input input-bordered"
                ></input>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">Message *</span>
                </label>
                <input
                  type="text"
                  {...register("message", { required: true })}
                  className="input input-bordered"
                ></input>
              </div>
            </div>

            <button
              className="btn btn-sm mt-4 bg-indigo-600 text-white hover:bg-indigo-600 hover:text-black"
              type="submit"
            >
              Create Donation
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateDonationRequest;
