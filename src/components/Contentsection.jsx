import { useEffect } from "react";

const ContentSection = ({ title, text, link, image }) => (
  <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
    <h2 className="text-2xl font-bold mb-3 text-gray-800">{title}</h2>
    {image && <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded-lg" />}
    <p className="text-gray-700 mb-4 text-lg leading-relaxed">{text}</p>
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition">Read More</a>
  </div>
);

const App = () => {
    useEffect(() => {
      // import("js/jquery.min.js");
      // import("js/jquery.flexslider.js");
    }, []);
  
    return (
      <div className="bg-white">
        <Navbar />
        {/* <FlexSlider />
        <Content />
        <Featured /> */}
      </div>
    );
};
  
export default ContentSection;