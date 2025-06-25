import React from 'react';

function AdminFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 p-6 transition-all duration-300 ease-in-out hover:bg-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Craveneow Admin. All rights reserved.
          </p>
          <p className="mt-2 text-xs">
            Powered by React & Tailwind CSS
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="/terms" className="text-sm hover:text-white transition-colors duration-200">
            Terms of Service
          </a>
          <a href="/privacy" className="text-sm hover:text-white transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="/contact" className="text-sm hover:text-white transition-colors duration-200">
            Contact Us
          </a>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="#" className="hover:text-white transition-colors duration-200">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-white transition-colors duration-200">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default AdminFooter;