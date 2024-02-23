import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import "./MyDonationRequest.css";

const MyDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { count } = useLoaderData();
  // console.log("count", count);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

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
  const { data: donations = [] } = useQuery({
    queryKey: ["donations/pagination", user?.email, currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/donations/pagination?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
  });

  const pendingDonations = donations.filter(
    (item) => item.status === "pending"
  );
  const inProgressDonations = donations.filter(
    (item) => item.status === "inprogress"
  );
  const doneDonations = donations.filter((item) => item.status === "done");
  const calcelDonations = donations.filter((item) => item.status === "cancel");
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="text-center mt-16">
        <Tabs>
          <TabList>
            <Tab>Pending</Tab>
            <Tab>In-Progress</Tab>
            <Tab>Done</Tab>
            <Tab>Cancel</Tab>
          </TabList>

          <TabPanel>
            <div className=" mx-20">
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
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* row 1 */}
                    {pendingDonations.map((item, index) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className=" mx-20">
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
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* row 1 */}
                    {inProgressDonations.map((item, index) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className=" mx-20">
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
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* row 1 */}
                    {doneDonations.map((item, index) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className=" mx-20">
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
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* row 1 */}
                    {calcelDonations.map((item, index) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
        </Tabs>
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
    </div>
  );
};

export default MyDonationRequest;
