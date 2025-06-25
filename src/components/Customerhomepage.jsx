import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Bell, Search, User, Utensils } from "lucide-react";
import backgroundImg from "../assets/images/custhome.webp";
import menuImg from "../assets/images/menu.gif";
import ordersImg from "../assets/images/order.webp";
import cartImg from "../assets/images/cart.webp";
import reviewImg from "../assets/images/compaint.webp";
import reservationImg from "../assets/images/vreserve.webp";
import reservationvImg from "../assets/images/reser.webp";
import { logoutAction } from "../REDUX/userSlice";

const CustomerHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch function

  const handleLogout = () => {
    dispatch(logoutAction()); // Dispatch Redux action to clear user state
    sessionStorage.removeItem('userToken')
    navigate("/login"); // Redirect to login after logout
  };
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImg})` }}>
      {/* Header */}
      <header className="bg-indigo-800 bg-opacity-90 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link to="/employee/profileview" className="hover:underline">
                  <User className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link to="/customer/notifications" className="hover:underline">
                  <Bell className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link to="/customer/restaurantview" className="hover:underline">
                  <Utensils className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link to="/customer/search" className="hover:underline">
                  <Search className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Welcome Section */}
      <header className="bg-black bg-opacity-50 text-white py-10 text-center">
        <h2 className="text-4xl font-extrabold">Welcome to CraveNow</h2>
        <p className="text-lg mt-2">Explore delicious dishes and order your favorite meals with ease.</p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/customer/menu" className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition">
            <img src={menuImg} alt="Menu" className="w-16 mx-auto mb-3 rounded-lg" />
            <h3 className="text-lg font-semibold">Today's Menu</h3>
          </Link>
          <Link to="/customer/cartview" className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition">
            <img src={cartImg} alt="Cart" className="w-16 mx-auto mb-3 rounded-lg" />
            <h3 className="text-lg font-semibold">View Cart</h3>
          </Link>
          <Link to="/customer/orders" className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition">
            <img src={ordersImg} alt="Orders" className="w-16 mx-auto mb-3 rounded-lg" />
            <h3 className="text-lg font-semibold">Your Orders</h3>
          </Link>
         
          <Link to="/customer/complaint" className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition">
            <img src={reviewImg} alt="Customer Review" className="w-16 mx-auto mb-3 rounded-lg" />
            <h3 className="text-lg font-semibold">Add Complaint</h3>
          </Link>
          <Link to="/customer/reservation" className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition">
            <img src={reservationvImg} alt="Reservation" className="w-16 mx-auto mb-3 rounded-lg" />
            <h3 className="text-lg font-semibold">Add Reservation</h3>
          </Link>
          <Link to="/customer/reservationview" className="bg-white shadow-lg p-6 rounded-lg text-center hover:shadow-xl transition">
            <img src={reservationImg} alt="Reservation" className="w-16 mx-auto mb-3 rounded-lg" />
            <h3 className="text-lg font-semibold">View Reservation</h3>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CustomerHome;
