/* eslint-disable react/no-unknown-property */
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BlogEdit = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const blogEdit = useLoaderData();
  const navigate = useNavigate();
  const { name, email, title, text, status, _id } = blogEdit;
  const imageBB_Upload_Key = import.meta.env.VITE_imageBB_Upload_Secret;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_Upload_Key}`;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
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
      name: data.name,
      email: data.email,
      title: data.title,
      image: res.data?.data?.display_url,
      text: data.text,
      status: data.status,
    };
    const response = await axiosSecure.patch(
      `/users/add-blog/${_id}`,
      blogInfo
    );
    if (response.data?.modifiedCount > 0) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: ` Edit A Blog Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/allBlogs");
    }
  };
  return (
    <>
      <Helmet>
        <title>Edit || Blog</title>
      </Helmet>
      <div className=" flex justify-center items-center">
        <div className="w-1/2  p-4 mt-28 mb-10">
          <h2 className="text-3xl text-center">Edit A Blog</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Name</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full "
                {...register("name", { required: true })}
                defaultValue={name}
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Email</span>
              </label>
              <input
                type="text"
                name="email"
                className="input input-bordered w-full "
                {...register("email", { required: true })}
                defaultValue={email}
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md"> Title</span>
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full "
                {...register("title", { required: true })}
                defaultValue={title}
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
                defaultValue={text}
              ></textarea>

              {errors.text && (
                <span className="text-red-800 mt-2">
                  Description Is Required
                </span>
              )}
            </div>
            <div className="form-control w-full">
              <div>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Select Status</span>
                  </div>
                  <select
                    type="text"
                    name="text"
                    {...register("status", { required: true })}
                    className="select select-bordered"
                    defaultValue={status}
                  >
                    <option select="true" disabled>
                      Select One
                    </option>
                    <option value={"published"}>Published</option>
                    <option value={"unPublished"}>UnPublished</option>
                  </select>
                </label>
              </div>
            </div>
            <input
              type="submit"
              className="input input-bordered w-40 bg-indigo-600 text-white my-4"
              value="Edit Blog"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogEdit;
