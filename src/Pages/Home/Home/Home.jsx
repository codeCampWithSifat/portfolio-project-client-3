import AboutUs from "../AboutUs/AboutUs";
import Categories from "../Categories/Categories";
import DonationProcess from "../DonationProcess/DonationProcess";
import Slider from "../Slider/Slider";
import Slogan from "../Slogan/Slogan";

const Home = () => {
  return (
    <div>
      <Slider />
      <Slogan />
      <AboutUs />
      <Categories />
      <DonationProcess />
    </div>
  );
};

export default Home;
