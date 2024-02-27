import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingButton from "../../Components/LoadingButton";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import slider1 from "../../assets/blood-slider/slider3.jpg";
import SingleBlog from "./SingleBlog";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/add-blog`);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingButton />;
  }
  const publishedBlogs = blogs.filter((blog) => blog.status === "published");
  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <div>
        <div>
          <Carousel
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
          >
            <div>
              <img className="h-[600px]" src={slider1} />
            </div>
          </Carousel>
        </div>

        <div>
          <h2 className="text-indigo-600 text-2xl my-20 font-bold text-center">
            All Users Blog
          </h2>

          <div className="max-w-screen-xl mx-auto">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-10">
              {publishedBlogs.map((blog) => (
                <SingleBlog key={blog._id} blog={blog}></SingleBlog>
              ))}
            </div>

            <div className="text-center my-10">
              <Link to="/dashboard/contentManagement/add-blog">
                <button className="btn bg-indigo-600 text-white hover:bg-indigo-600 hover:text-black">
                  Write Your Own Blog
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
