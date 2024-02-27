import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import slider1 from "../../assets/blood-slider/contact.jpg";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <div>
        <div>
          <Carousel
            showIndicators={false}
            showThumbs={false}
            showStatus={false}
          >
            <div>
              <img className="h-[700px]" src={slider1} />
            </div>
          </Carousel>
        </div>

        <div>
          <div className=" flex justify-center items-center">
            <div className="w-2/5 p-4 mt-28 mb-10">
              <h2 className="text-3xl text-center text-indigo-600">
                Contact With Us
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="my-10">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text text-md">Your Name </span>
                  </label>
                  <input
                    type="text"
                    name="text"
                    className="input input-bordered w-full "
                    {...register("text", { required: true })}
                    placeholder="Enter Your Name"
                  />
                  {errors.text && (
                    <span className="text-red-800 mt-2">Text is required</span>
                  )}
                </div>
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text text-md">Your Email</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    className="input input-bordered w-full "
                    {...register("email", {
                      required: true,
                    })}
                    placeholder="Enter Your Email"
                  />
                  {errors.email && (
                    <span className="text-red-800 mt-2">Email is Required</span>
                  )}
                </div>
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text text-md">Description</span>
                  </label>
                  <textarea
                    type="text"
                    name="text"
                    className="textarea textarea-bordered"
                    {...register("description", {
                      required: true,
                    })}
                    placeholder="Write Your Description"
                  />
                  {errors.description && (
                    <span className="text-red-800 mt-2">
                      Description is Required
                    </span>
                  )}
                </div>
                <input
                  type="submit"
                  className="input input-bordered w-2/5 bg-indigo-600 text-white my-4"
                  value="Send Message"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
