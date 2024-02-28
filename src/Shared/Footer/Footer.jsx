/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-7">
        <h1
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold
       md:w-2/5"
        >
          <span className="text-teal-400">Free</span> until you're ready to
          launch
        </h1>
        <div>
          <input
            type="text"
            placeholder="Enter Your ph.no"
            className="text-gray-800
         sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button
            className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font-[Poppins]
         rounded-md text-white md:w-auto w-full"
          >
            Request Code
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:px-8 px-16 lg:mx-20 py-16">
        <div>
          <h2 className="text-lg font-bold mb-10">Blood Donors</h2>
          <p>
            Blood can be vital for people with medical conditions or who are
            having surgery. But blood transfusions can also improve the quality
            of life for people whose illness has no cure.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-10">Quick Link</h3>
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/about">About</Link>
          </p>
          <p>
            <Link to="/contact">Contact</Link>
          </p>
          <p>
            <Link to="/blog">Blog</Link>
          </p>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-10">Donate</h2>
          <p>
            <Link>Become A Monthly Giver</Link>
          </p>
          <p>
            <Link>Make A Single Donation</Link>
          </p>
          <p>
            <Link>Other Ways To Give</Link>
          </p>
          <p>
            <Link>Philanthorapy</Link>
          </p>
          <p>
            <Link>Publications</Link>
          </p>
        </div>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
    text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© {year} Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        {/* <SocialIcons Icons={Icons} /> */}
      </div>
    </footer>
  );
};

export default Footer;
