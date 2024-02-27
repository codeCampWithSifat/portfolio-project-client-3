import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className=" flex justify-center items-center">
        <div className="w-9/12 p-4 mt-28 mb-10">
          <h2 className="text-3xl text-center">About Us</h2>
        </div>
      </div>
    </>
  );
};

export default About;
