import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4"></h3>
            <ul className="list-none">
              <li className="mb-2">
                <Link to="/adminlogin" className="hover:text-gray-400">Admin Login</Link>
              </li>
              {/* <li className="mb-2">
                <Link to="/login" className="hover:text-gray-400">Customer</Link>
              </li>
              <li>
                <Link to="/employee-login" className="hover:text-gray-400">Employee</Link>
              </li> */}
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-gray-300">
              CraveNow is dedicated to enhancing the dining experience with modern solutions for both customers and restaurants.
            </p>
            <Link to="/contactus" className="text-orange-400 hover:text-orange-300 mt-2 inline-block">Contact Us</Link>
          </div>

          <div className="w-full md:w-1/4">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex flex-col">
              <div className="flex">
                <a href="#" className="text-gray-300 hover:text-white mr-4">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
              </div>
              <div className="flex mt-2">
                <a href="#" className="text-gray-300 hover:text-white mr-4">Google+</a>
                <a href="#" className="text-gray-300 hover:text-white">RSS</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 pt-6 mt-8">
          <div className="text-center">
            <p className="text-gray-300">&copy; {new Date().getFullYear()} CraveNow - Enhancing the Dining Experience</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
