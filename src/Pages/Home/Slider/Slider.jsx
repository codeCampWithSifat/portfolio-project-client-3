import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import slider1 from "../../../assets/blood-slider/slider1.jpg";
import slider2 from "../../../assets/blood-slider/slider2.jpg";
import slider3 from "../../../assets/blood-slider/slider3.jpg";
import slider4 from "../../../assets/blood-slider/slider4.jpg";
const Slider = () => {
  return (
    <div>
      <div>
        <Carousel
          autoPlay={true}
          stopOnHover={false}
          showIndicators={false}
          infiniteLoop={true}
        >
          <div>
            <img src={slider1} />
          </div>
          <div>
            <img src={slider2} />
          </div>
          <div>
            <img src={slider3} />
          </div>
          <div>
            <img src={slider4} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
