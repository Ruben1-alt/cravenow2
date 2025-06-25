import { MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import contactBg from "../assets/images/contact.webp"; // ✅ Correctly Import Image

export default function ContactUs() {
  return (
    <div 
      className="container mx-auto p-12 max-w-7xl rounded-lg shadow-2xl relative"
      style={{ backgroundImage: `url(${contactBg})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
    >
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6">
        <Link to="/" className="bg-blue text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300">
          ← Back to Home
        </Link>
      </div>
      
      <div className="bg-black bg-opacity-50 p-10 rounded-lg text-white text-center">
        <h1 className="text-5xl font-bold mt-4">Contact Us</h1>
        <p className="text-lg mt-2">We'd love to hear from you! Reach out to us for any inquiries.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 mt-10 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
        {/* Contact Info */}
        <div className="space-y-8 p-8 rounded-lg shadow-md">
          <div className="flex items-center space-x-4 text-xl font-medium">
            <MapPin className="text-red-500 w-8 h-8" />
            <span className="text-gray-800">123 Main Street, New York, NY</span>
          </div>
          <div className="flex items-center space-x-4 text-xl font-medium">
            <Phone className="text-green-500 w-8 h-8" />
            <span className="text-gray-800">+1 234 567 890</span>
          </div>
          <div className="flex items-center space-x-4 text-xl font-medium">
            <Mail className="text-blue-500 w-8 h-8" />
            <span className="text-gray-800">support@cravenow.com</span>
          </div>
        </div>
        
        {/* Google Map */}
        <div className="overflow-hidden rounded-lg shadow-md">
          <iframe
            className="w-full h-[400px] rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24176.539551728185!2d-74.006015!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMzAuMCJX!5e0!3m2!1sen!2sus!4v1614705350145!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
