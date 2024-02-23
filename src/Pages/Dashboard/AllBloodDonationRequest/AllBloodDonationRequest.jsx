import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingButton from "../../../Components/LoadingButton";
import useDonationCounter from "../../../Hooks/useDonationCounter";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const AllBloodDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { countDonation } = useDonationCounter();
  const numberOfPages = Math.ceil(countDonation / itemsPerPage);

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

  const { data: allDonations = [], isLoading } = useQuery({
    queryKey: ["allBloodDonation", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/allBloodDonation?page=${currentPage}&size=${itemsPerPage}`
      );
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingButton />;
  }

  const pendingDonations = allDonations.filter(
    (item) => item.status === "pending"
  );
  const inProgressDonations = allDonations.filter(
    (item) => item.status === "inprogress"
  );
  const doneDonations = allDonations.filter((item) => item.status === "done");
  const calcelDonations = allDonations.filter(
    (item) => item.status === "cancel"
  );
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
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
    </div>
  );
};

export default AllBloodDonationRequest;
