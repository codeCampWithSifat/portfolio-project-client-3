import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const EditDonationRequest = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    recipientName,
    district,
    upazila,
    hospitalName,
    address,
    date,
    time,
    message,
    status,
    _id,
  } = useLoaderData();

  const onSubmit = async (data) => {
    const donatorInfo = {
      recipientName: data.recipientName,
      district: data.district,
      upazila: data.upazila,
      hospitalName: data.hospitalName,
      address: data.address,
      date: data.date,
      time: data.time,
      message: data.message,
      status: data.status,
    };
    const res = await axiosSecure.patch(`/donations/${_id}`, donatorInfo);
    if (res.data.modifiedCount) {
      reset();
      navigate("/dashboard/info");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Info Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <>
        <Helmet>
          <title>Edit || Donation</title>
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
                    defaultValue={recipientName}
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
                    defaultValue={district}
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
                    defaultValue={upazila}
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
                    defaultValue={hospitalName}
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
                    defaultValue={address}
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
                    defaultValue={date}
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
                    defaultValue={time}
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
                    defaultValue={message}
                  ></input>
                </div>
              </div>

              <div className="flex my-4">
                <div className="form-control w-full mr-4">
                  <label className="label">
                    <span className="label-text font-semibold">Status *</span>
                  </label>
                  <select
                    type="text"
                    {...register("status", { required: true })}
                    placeholder="Type here"
                    className="select select-bordered"
                    defaultValue={status}
                  >
                    <option defaultValue="Pick One" disabled>
                      Select One
                    </option>
                    <option value={"inprogress"}>Inprogress</option>
                    <option value={"done"}>Done</option>
                    <option value={"cancel"}>Cancel</option>
                  </select>
                </div>
                <div className="form-control w-full "></div>
              </div>

              <button
                className="btn btn-sm mt-4 bg-indigo-600 text-white hover:bg-indigo-600 hover:text-black"
                type="submit"
              >
                Edit Donation
              </button>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default EditDonationRequest;
