import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${user.displayName} Make An Admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/admin/${id}`);
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${user.displayName} Is Admin Now`,
            icon: "success",
          });
        }
      }
    });
  };

  const handleBlockStatus = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${user.displayName} Block The Member`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/admin/status/block/${id}`);
        console.log(res);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${user.displayName} Status Block Now`,
            icon: "success",
          });
        }
      }
    });
  };

  const handleUnBlockUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `${user.displayName} UnBlock The Member`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/users/admin/status/active/${id}`);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${user.displayName} Status Active Now`,
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div className="max-w-screen-lg mx-auto mt-16">
      <div>
        <Helmet>
          <title>All || Users</title>
        </Helmet>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="text-center bg-indigo-600 text-xl font-semibold text-white">
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Edit Status</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <th>
                  <div className="avatar">
                    <div className="w-16 rounded-full">
                      <img src={user.avatar} />
                    </div>
                  </div>
                </th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                {user.status !== "block" ? (
                  <td>
                    <button
                      onClick={() => handleBlockStatus(user._id)}
                      className="btn btn-error text-white btn-sm"
                    >
                      Block
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      onClick={() => handleUnBlockUser(user._id)}
                      className="btn btn-error text-white btn-sm"
                    >
                      Unblock
                    </button>
                  </td>
                )}
                {user.role !== "admin" ? (
                  <td>
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn btn-primary text-white btn-sm"
                    >
                      Make Admin
                    </button>
                  </td>
                ) : (
                  <td>
                    <button className="btn btn-ghost btn-sm">
                      Already Admin
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
