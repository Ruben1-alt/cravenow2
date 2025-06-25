import React from "react";
import contentBanner from '../assets/images/food-banner.jpg';
import featureImg1 from '../assets/images/cont1.webp';
import featureImg2 from '../assets/images/cont2.webp';
import featureImg3 from '../assets/images/cont3.webp';

const Content = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner Section */}
      <div className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center text-white" style={{ backgroundImage: `url(${contentBanner})` }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-5xl font-bold text-white">Explore CraveNow Features</h1>
          <p className="text-lg mt-2">Enhancing the dining experience for customers and restaurants</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img src={featureImg1} alt="Feature 1" className="rounded-md mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Seamless Ordering</h3>
          <p className="text-gray-600">Effortlessly browse, customize, and place orders with a user-friendly interface.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img src={featureImg2} alt="Feature 2" className="rounded-md mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-Time Tracking</h3>
          <p className="text-gray-600">Monitor order progress in real time from placement to delivery.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img src={featureImg3} alt="Feature 3" className="rounded-md mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Analytics</h3>
          <p className="text-gray-600">Gain insights into sales trends, popular dishes, and customer behavior.</p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-red-500 text-white text-center py-12">
        <h2 className="text-3xl font-bold">Get Started with CraveNow</h2>
        <p className="text-lg mt-2">Join us in revolutionizing the dining experience for customers and businesses.</p>
        <a href="https://www.cravenow.com" target="_blank" rel="noopener noreferrer">
          <button className="mt-4 px-6 py-3 bg-white text-red-500 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition">Learn More</button>
        </a>
      </div>
    </div>
  );
};

export default Content;