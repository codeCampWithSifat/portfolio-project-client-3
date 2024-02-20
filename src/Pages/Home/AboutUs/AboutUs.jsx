import slider5 from "../../../assets/blood-slider/slider5.jpg";

const AboutUs = () => {
  return (
    <div>
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={slider5} className="w-1/2 rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-xl font-bold text-indigo-600">About Us</h1>
            <h1 className="text-2xl font-bold text-indigo-600">
              Together We Can Make World More Health & Better
            </h1>
            <p className="py-6 mt-10 text-gray-500">
              Blood donation is the practice of gathering blood from willing
              donors, who are unlikely to become infected or whose health is
              negatively affected by blood.1 Blood donation is a technique in
              which blood is collected from a willing and healthy person for the
              purpose of transfusion to someone else.2 The availability of blood
              varies significantly between low- and high-income nations. A
              country’s general blood supply can be determined by examining the
              percentage of whole-blood donations. In high-income nations, the
              median blood donation rate is 31.5 donations per 1000 individuals
            </p>
            <div className="flex flex-row mt-10 text-gray-500">
              <div>
                <h2 className="my-2"> 1. Good Service</h2>
                <h2 className="my-2"> 2. Help People</h2>
                <h2 className="my-2"> 3. Hygine Tools</h2>
              </div>
              <div className="mx-32">
                <h2 className="my-2"> 4. 24h Service</h2>
                <h2 className="my-2"> 5. Health Check</h2>
                <h2 className="my-2"> 6. Blood Bank</h2>
              </div>
            </div>
            <div>
              <button className="btn btn-primary mt-4">About Us</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
