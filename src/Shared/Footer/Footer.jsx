/* eslint-disable react/no-unescaped-entities */
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black mt-10">
      <div className="max-w-screen-lg mx-auto mt-10 ">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 text-white">
          <div className="flex my-10">
            <div className="mt-2 ">
              <FaPhone />
            </div>
            <div className="ml-4">
              <p>Emergency Calling</p>
              <p>+8801675646283</p>
            </div>
          </div>
          <div className="flex my-10">
            <div className="mt-2 ">
              <MdMarkEmailRead />
            </div>
            <div className="ml-4">
              <p>Email Us</p>
              <p>sayedhossainsifat100@gmail.com</p>
            </div>
          </div>
          <div className="flex my-10">
            <div className="mt-2 ">
              <IoMdContacts />
            </div>
            <div className="ml-4">
              <h2>Let's Connect</h2>
              <div className="flex">
                <p>
                  <FaFacebookF />
                </p>
                <p className="mx-2">
                  <FaLinkedin />
                </p>
                <p>
                  <FaInstagramSquare />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="divider my-4"></div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 text-white mt-10">
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-10">Blood Donors</h2>
            <p>
              Blood can be vital for people with medical conditions or who are
              having surgery. But blood transfusions can also improve the
              quality of life for people whose illness has no cure.
            </p>
          </div>
          <div className="text-center">
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
          <div className="">
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

          <div>
            <h2 className="text-lg font-bold mb-10">Photo Gallery</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
