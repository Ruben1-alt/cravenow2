import { useEffect } from "react";

const Featured = () => (
  <section className="bg-gray-100 py-16">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 lg:px-12">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Services</h2>
        <ul className="list-disc pl-5 space-y-4 text-lg text-gray-700">
          <li>Always fresh and high-quality ingredients</li>
          <li>Authentic and diverse menu options</li>
          <li>Exceptional dining experience</li>
        </ul>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">The Best Food</h2>
        <img src="pic11.jpg" alt="Delicious Food" className="rounded-lg shadow-lg mb-6 w-full" />
        <h3 className="text-2xl font-semibold text-gray-800">Today's Specials</h3>
        <p className="text-gray-600 mt-2">Indulge in our chef's special creations, crafted with passion and precision.</p>
      </div>
    </div>
  </section>
);

const App = () => {
  useEffect(() => {
    // import("js/jquery.min.js");
    // import("js/jquery.flexslider.js");
  }, []);

  return (
    <div className="bg-white font-sans">
      <Navbar />
      <Featured />
    </div>
  );
};

export default Featured;