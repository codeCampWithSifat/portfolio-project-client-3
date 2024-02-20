import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const imageBB_Upload_Key = import.meta.env.VITE_imageBB_Upload_Secret;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_Upload_Key}`;
const UpdateProfileInfo = () => {
  const { bloodGroup, district, upazila, _id, name, email } = useLoaderData();
  //   console.log(userInformation);
  const axiosPublic = useAxiosPublic();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const onSubmit = async (data) => {
    // console.log(data);
    const formData = new FormData();
    const imageFile = { image: data.image[0] };
    formData.append("file", imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data?.success) {
      const updateUserInfo = {
        name: user.displayName,
        email: user.email,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        avatar: res.data?.data?.display_url,
      };

      const userResponse = await axiosPublic.patch(
        `/user/${_id}`,
        updateUserInfo
      );
      console.log(userResponse);
      if (userResponse.data.modifiedCount > 0) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: ` ${user.displayName} Updated  Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Update Info</title>
      </Helmet>
      <div className=" flex justify-center items-center">
        <div className="w-1/2 p-4 mt-28 mb-20">
          <h2 className="text-3xl text-center">Please Register </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="flex">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-md "> Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full "
                  defaultValue={name}
                  {...register("name")}
                  disabled
                />
              </div>
              <div className="form-control w-full ml-10">
                <label className="label">
                  <span className="label-text text-md"> Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full "
                  defaultValue={email}
                  {...register("email")}
                  disabled
                />
              </div>
            </div>

            <div className="flex">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-md">Select Your Image</span>
                </label>
                <input
                  type="file"
                  name="image"
                  className="file-input file-input-bordered file-input-primary w-full "
                  {...register("image", {
                    required: true,
                  })}
                />

                {errors.image && (
                  <span className="text-red-800 mt-2">Image Is Required</span>
                )}
              </div>

              <div className="form-control w-full ml-10">
                <div>
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">
                        Select Your Blood Group
                      </span>
                    </div>
                    <select
                      {...register("bloodGroup", { required: true })}
                      className="select select-bordered"
                      defaultValue={bloodGroup}
                    >
                      <option selected>Select One</option>
                      <option value={"A+"}>A+</option>
                      <option value={"A-"}>A-</option>
                      <option value={"B+"}>B+</option>
                      <option value={"B-"}>B-</option>
                      <option value={"AB+"}>AB+</option>
                      <option value={"AB-"}>AB-</option>
                      <option value={"O+"}>O+</option>
                      <option value={"O-"}>O-</option>
                    </select>
                  </label>
                </div>
                <div></div>
              </div>
            </div>

            <div className="flex mt-6">
              <div className="form-control w-full">
                <div>
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">Select Your Upazila</span>
                    </div>
                    <select
                      {...register("upazila", { required: true })}
                      className="select select-bordered"
                      defaultValue={upazila}
                    >
                      <option selected>Select One</option>
                      <option value={"narayangonj"}>Narayangonj</option>
                      <option value={"gazipur"}>Gazipur</option>
                      <option value={"shrinagor"}>Shrinagor</option>
                      <option value={"lamonirhat"}>Lamonirhat</option>
                      <option value={"zindabazar"}>Zindabazar</option>
                      <option value={"doha"}>Doha</option>
                      <option value={"paharpur"}>Paharpur</option>
                      <option value={"paikgasa"}>Paikgasa</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="form-control w-full ml-10">
                <div>
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">Select Your District</span>
                    </div>
                    <select
                      {...register("district", { required: true })}
                      className="select select-bordered"
                      defaultValue={district}
                    >
                      <option selected>Select One</option>
                      <option value={"narayangonj"}>Narayangonj</option>
                      <option value={"gazipur"}>Gazipur</option>
                      <option value={"shrinagor"}>Shrinagor</option>
                      <option value={"lamonirhat"}>Lamonirhat</option>
                      <option value={"zindabazar"}>Zindabazar</option>
                      <option value={"doha"}>Doha</option>
                      <option value={"paharpur"}>Paharpur</option>
                      <option value={"paikgasa"}>Paikgasa</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <input
              type="submit"
              className="input input-bordered w-1/5 bg-primary text-white my-4"
              value="Register"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfileInfo;
