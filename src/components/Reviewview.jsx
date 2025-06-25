import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Home, User, Bell, Utensils, Search } from "lucide-react";
import backgroundImage from "../assets/images/review.webp";
import { reviewmenuAPI } from "../Services/customerServices";

const ReviewView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItemId = location.state?.menuItemId;
console.log(menuItemId);

  const { data: allReviews, isLoading, isError } = useQuery({
    queryKey: ["customerReviews"],
    queryFn: ()=>reviewmenuAPI(menuItemId),
  });
console.log(allReviews);

  // Filter reviews based on passed menuItemId
  const reviews = allReviews;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-indigo-900 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">CraveNow</h1>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li><Link to="/customer/chome"><Home className="w-6 h-6" /></Link></li>
              <li><Link to="/employee/profileview"><User className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/notifications"><Bell className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/restaurantview"><Utensils className="w-6 h-6" /></Link></li>
              <li><Link to="/customer/search"><Search className="w-6 h-6" /></Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div 
        className="flex flex-col items-center justify-center flex-grow bg-cover bg-center p-8 relative" 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <button
          onClick={() => navigate("/customer/menu")}
          className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300"
        >
          ⬅ Back to Menu
        </button>

        <div className="max-w-4xl mx-auto p-8 border rounded-xl shadow-lg bg-white bg-opacity-90">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Customer Reviews</h2>

          {isLoading ? (
            <p className="text-gray-500 text-center italic">Loading reviews...</p>
          ) : isError ? (
            <p className="text-red-500 text-center">Failed to load reviews. Please try again.</p>
          ) : reviews?.length === 0 ? (
            <p className="text-gray-500 text-center italic">No reviews available for this item.</p>
          ) : (
            <ul className="space-y-6">
              {reviews.map((review) => (
                <li key={review._id} className="p-6 border rounded-lg shadow-sm bg-gray-50">
                  <p className="text-lg font-semibold">User: <span className="text-blue-600">{review.user?.username}</span></p>
                  <p className="text-yellow-500 font-bold mt-2">Rating: {review.rating}/10</p>
                  <p className="text-gray-600 mt-1">Comment: <span className="font-medium">{review.comment}</span></p>
                  <p className="text-gray-400 text-sm mt-2">Posted on: {new Date(review.createdAt).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewView;
