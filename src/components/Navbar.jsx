import { useEffect } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => (
  <header className="bg-gray-900 text-white py-4 fixed w-full z-10 top-0 shadow-md">
    <div className="container mx-auto flex justify-between items-center px-6">
      <Link to="/" className="text-2xl font-extrabold">CraveNow</Link>
      <nav>
        <ul className="flex space-x-6 text-white font-medium">
          <li><Link to='/' className="hover:text-yellow-400 transition duration-300">Home</Link></li>
          <li><Link to='/restaurants' className="hover:text-yellow-400 transition duration-300">Restaurant</Link></li>
          <li><Link to='/services' className="hover:text-yellow-400 transition duration-300">Services</Link></li>
          <li><Link to='/about' className="hover:text-yellow-400 transition duration-300">About us</Link></li>
          <li><Link to='/login' className="hover:text-yellow-400 transition duration-300">Login</Link></li>
        </ul>
      </nav>
      <div className="logo">
        <Link to="/">
          <img src="logo.png" alt="CraveNow Logo" className="h-12" />
        </Link>
      </div>
    </div>
  </header>
);

const App = () => {
  useEffect(() => {
    // import("js/jquery.min.js");
    // import("js/jquery.flexslider.js");
  }, []);

  return (
    <div className="bg-white pt-20">
      <Navbar />
      {/* <FlexSlider />
      <Content />
      <Featured /> */}
    </div>
  );
};

export default Navbar;
