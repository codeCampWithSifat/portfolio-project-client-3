import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://portfolio-project-server-3.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
