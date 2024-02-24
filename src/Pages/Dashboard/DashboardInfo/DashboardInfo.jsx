import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingButton from "../../../Components/LoadingButton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import "./DashboardInfo.css";

const DashboardInfo = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // const { donationCounter } = useDonationCounterQuery();
  // console.log("UsedonationCounter", donationCounter);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { count } = useLoaderData();
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: donations = [],
    isLoading: donatinoLoading,
    refetch,
  } = useQuery({
    queryKey: ["donations", user?.email, currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donations?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
  });

  if (donatinoLoading) {
    return <LoadingButton />;
  }

  const handleItemPerPage = (e) => {
    const value = Number(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteDonationInfo = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteDonation = await axiosSecure.delete(`/donations/${id}`);
        if (deleteDonation.data?.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your Donation Request Has Been Deleted",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div>
      <div>
        <h2 className="text-center text-indigo-600 font-bold text-3xl mt-10">
          {" "}
          Welcome {user.displayName} On Your Dashboard
        </h2>
      </div>

      <div>
        {/* overflow-x-auto */}
        <div className="overflow-x-auto">
          <table className="table mt-10">
            {/* head */}
            <thead className="text-center text-indigo-600 font-bold text-xl">
              <tr>
                <th>#</th>
                <th> Name</th>
                <th> Location</th>
                <th>Donation Date</th>
                <th>Donation Time</th>
                <th>Donor Name</th>
                <th>Donor Email</th>
                <th>Status</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}
              {donations.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.recipientName}</td>
                  <td>
                    {item.district} || {item.upazila}
                  </td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.donorName}</td>
                  <td>{item.donorEmail}</td>
                  <td>{item.status}</td>

                  <td>
                    <Link to={`/dashboard/editDonationRequest/${item._id}`}>
                      <button className="btn btn-sm btn-primary">Edit</button>
                    </Link>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDeleteDonationInfo(item._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center pagination my-10">
        <button
          onClick={handlePreviousPage}
          className="btn btn-active btn-ghost btn-sm"
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? `btn btn-sm selected text-white`
                : `btn btn-sm btn-primary`
            }
            key={page}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          className="btn btn-active btn-ghost btn-sm"
        >
          Next
        </button>

        <select
          value={itemsPerPage}
          className="select select-success select-sm "
          onChange={handleItemPerPage}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div className="my-20 text-center">
        <Link to={`/dashboard/myDonationRequest`}>
          <button className="btn btn-primary">View My All Request</button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardInfo;
