import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import backgroundImage from "../assets/images/adminbg.webp";
import { reviewviewallAPI } from "../Services/adminServices";

const ReviewList = () => {
  const navigate = useNavigate();

  const { data: reviews, isLoading, isError } = useQuery({
    queryKey: ["adminAllReviews"],
    queryFn: reviewviewallAPI,
  });

  return (
    <div className="min-h-screen bg-cover bg-center p-6 relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <button 
        onClick={() => navigate("/admin/dashboard")} 
        className="absolute top-6 left-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
      >
        ⬅ Back to Panel
      </button>

      <div className="container mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-md mt-16">
        <h1 className="text-3xl font-bold mb-4">Review List</h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading reviews...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load reviews. Please try again.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">User</th>
                  <th className="py-2 px-4 border">Menu</th>
                  <th className="py-2 px-4 border">Comment</th>
                  <th className="py-2 px-4 border">Rating</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <tr key={review._id} className="text-center border-b">
                      <td className="py-2 px-4 border">{review.user?.username || "N/A"}</td>
                      <td className="py-2 px-4 border">{review.menuItem?.name || "N/A"}</td>
                      <td className="py-2 px-4 border">{review.comment}</td>
                      <td className="py-2 px-4 border">{review.rating}/10</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">No reviews available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
