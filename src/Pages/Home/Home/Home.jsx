import { Helmet } from "react-helmet-async";
import AboutUs from "../AboutUs/AboutUs";
import Categories from "../Categories/Categories";
import DonationProcess from "../DonationProcess/DonationProcess";
import Slider from "../Slider/Slider";
import Slogan from "../Slogan/Slogan";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Slider />
      <Slogan />
      <AboutUs />
      <Categories />
      <DonationProcess />
    </div>
  );
};

export default Home;
