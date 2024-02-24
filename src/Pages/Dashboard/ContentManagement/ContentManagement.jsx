import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const imageBB_Upload_Key = import.meta.env.VITE_imageBB_Upload_Secret;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_Upload_Key}`;
const ContentManagement = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const onSubmit = async (data) => {
    const formData = new FormData();
    const imageFile = { image: data.image[0] };
    formData.append("file", imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // send data to the server
    const blogInfo = {
      name: user.displayName,
      email: user.email,
      title: data.title,
      image: res.data?.data?.display_url,
      text: data.text,
      status: "unPublished",
    };
    const response = await axiosSecure.post("/users/add-blog", blogInfo);
    if (response.data?.insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user.displayName} Add A Blog Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Add || Blog</title>
      </Helmet>
      <div className=" flex justify-center items-center">
        <div className="w-3/4	 p-4 mt-28 mb-10">
          <h2 className="text-3xl text-center">Add A Blog</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md"> Title</span>
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full "
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-800 mt-2">Title is required</span>
              )}
            </div>
            <div className="form-control w-full my-2">
              <label className="label">
                <span className="label-text text-md"></span>
              </label>
              <input
                type="file"
                name="image"
                className="file-input file-input-bordered w-full"
                {...register("image", {
                  required: true,
                })}
              />
              {errors.image && (
                <span className="text-red-800 mt-2">
                  Thumbnail Image Is Required
                </span>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Content</span>
              </label>

              <textarea
                type="text"
                name="text"
                {...register("text", {
                  required: true,
                })}
                className="textarea textarea-bordered w-full"
                placeholder="Bio"
              ></textarea>

              {errors.text && (
                <span className="text-red-800 mt-2">
                  Description Is Required
                </span>
              )}
            </div>
            <input
              type="submit"
              className="input input-bordered w-40 bg-indigo-600 text-white my-4"
              value="Add Blog"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ContentManagement;
