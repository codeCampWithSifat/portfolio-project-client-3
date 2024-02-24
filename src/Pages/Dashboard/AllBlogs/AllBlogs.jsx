import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingButton from "../../../Components/LoadingButton";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const AllBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: blogs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/add-blog`);
      //   console.log(res);
      return res.data;
    },
  });

  const publishedBlogs = blogs.filter((blog) => blog.status === "published");
  const unPublishedBlogs = blogs.filter(
    (blog) => blog.status === "unPublished"
  );
  if (isLoading) {
    return <LoadingButton />;
  }

  const handlePublished = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: `Admin ${user.displayName} Published The Blog `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/add-blog/published/${id}`);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Yes",
            text: `This Blog Right Now Published`,
            icon: "success",
          });
        }
      }
    });
  };

  const handleUnPublished = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Admin ${user.displayName} UnPublished The Blog `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(
          `/users/add-blog/unPublished/${id}`
        );
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Yes",
            text: `This Blog Right Now Published`,
            icon: "success",
          });
        }
      }
    });
  };

  const handleDeleteBlog = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: `Admin ${user.displayName} Delete The Blog `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/add-blog/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Yes",
            text: `Delete The Blog Successfully`,
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-10">
      <div className="text-center">
        <Tabs>
          <TabList>
            <Tab>Published Blog</Tab>
            <Tab>UnPublished Blog</Tab>
          </TabList>

          <TabPanel>
            <div className="overflow-x-auto mt-10">
              <table className="table">
                {/* head */}
                <thead className="bg-indigo-600 text-center font-semibold text-white text-xl">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th> Change Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {publishedBlogs.map((blog, index) => (
                    <tr key={blog._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="w-16 rounded-full">
                            <img
                              src={blog.image}
                              alt="Tailwind-CSS-Avatar-component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>{blog.name}</td>
                      <td>{blog.email}</td>
                      <td>{blog.title}</td>
                      <td>{blog.status}</td>
                      {blog.status === "published" ? (
                        <td>
                          <button
                            className="btn btn-sm btn-info text-white"
                            onClick={() => handleUnPublished(blog._id)}
                          >
                            UnPublished
                          </button>
                        </td>
                      ) : (
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handlePublished(blog._id)}
                          >
                            Published
                          </button>
                        </td>
                      )}
                      <td>
                        <Link to={`/dashboard/blog/${blog._id}`}>
                          <button className="btn btn-primary btn-sm">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="btn btn-error btn-sm text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="overflow-x-auto mt-10">
              <table className="table">
                {/* head */}
                <thead className="bg-indigo-600 text-center font-semibold text-white text-xl">
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th> Change Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {unPublishedBlogs.map((blog, index) => (
                    <tr key={blog._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="w-16 rounded-full">
                            <img
                              src={blog.image}
                              alt="Tailwind-CSS-Avatar-component"
                            />
                          </div>
                        </div>
                      </td>
                      <td>{blog.name}</td>
                      <td>{blog.email}</td>
                      <td>{blog.title}</td>
                      <td>{blog.status}</td>
                      {blog.status === "published" ? (
                        <td>
                          <button
                            className="btn btn-sm btn-info text-white"
                            onClick={() => handleUnPublished(blog._id)}
                          >
                            UnPublished
                          </button>
                        </td>
                      ) : (
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handlePublished(blog._id)}
                          >
                            Published
                          </button>
                        </td>
                      )}
                      <td>
                        <Link to={`/dashboard/blog/${blog._id}`}>
                          <button className="btn btn-primary btn-sm">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteBlog(blog._id)}
                          className="btn btn-error btn-sm text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AllBlogs;
