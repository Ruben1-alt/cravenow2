import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-900 text-white p-4 shadow-lg fixed w-full z-10 top-0">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-extrabold">CraveNow</h1>
      <ul className="flex space-x-6 font-medium">
        <li><Link to='/' className="hover:text-yellow-400 transition duration-300">Home</Link></li>
        <li><Link to='/restaurants' className="hover:text-yellow-400 transition duration-300">Restaurant</Link></li>
        <li><Link to='/services' className="hover:text-yellow-400 transition duration-300">Services</Link></li>
        <li><Link to='/about' className="hover:text-yellow-400 transition duration-300">About us</Link></li>
        <li><Link to='/login' className="hover:text-yellow-400 transition duration-300">Login</Link></li>
      </ul>
    </div>
  </nav>
);

export default function RestaurantPage() {
  const [restaurant] = useState({
    name: "",
    description: "A modern restaurant serving delicious meals with fresh ingredients in a cozy ambiance.",
    address: "123 Food Street, Flavor Town",
    phone: "(123) 456-7890",
    menuPreview: [
      { name: "Pasta Primavera", image: "pasta.jpeg" },
      { name: "Grilled Salmon", image: "salmon.jpeg" },
      { name: "Classic Cheeseburger", image: "brgr.jpeg" }
    ],
    image: "rest1.png",
    additionalImage: "rest.webp"
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <header className="relative h-96 bg-cover bg-center flex items-center justify-center text-white text-center shadow-lg" style={{ backgroundImage: `url(${restaurant.image})` }}>
        <div className="absolute inset-0 bg- bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-extrabold drop-shadow-lg">{restaurant.name}</h1><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <p className="text-xl mt-2 max-w-xl px-4 drop-shadow-lg text-white-600 font-bold">{restaurant.description}</p>
                </div>
      </header>
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <img src={restaurant.additionalImage} alt="Additional view of restaurant" className="w-full h-64 object-cover rounded-lg shadow-md mb-6" />
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Menu Preview</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white shadow-lg p-6 rounded-lg">
          {restaurant.menuPreview.map((item, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-md text-gray-700 font-extrabold text-lg text-center">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-2" />
              🍽️ {item.name}
            </li>
          ))}
        </ul>
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-extrabold text-gray-800">Contact Us</h2>
          <p className="text-gray-700 text-lg mt-2 font-bold">📍 {restaurant.address}</p>
          <p className="text-gray-700 text-lg font-bold">📞 {restaurant.phone}</p>
        </div>
      </div>
    </div>
  );
}