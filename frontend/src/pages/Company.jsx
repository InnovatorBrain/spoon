import React from "react";
import { FaLeaf } from "react-icons/fa";

export default function Company() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex items-center justify-center">
      {/* Background SVG */}
      <div className="absolute inset-0 -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-full"
        >
          <path
            fill="#6EE7B7"
            fillOpacity="0.3"
            d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,106.7C672,75,768,53,864,69.3C960,85,1056,139,1152,149.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container px-6 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:py-20">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 mb-6">
              <FaLeaf className="inline text-green-600 mb-2 mr-2" size={28} />
              Founder's <span className="text-green-600">Vision</span>
            </h1>
            <p className="text-gray-700 text-lg sm:text-xl mb-8 leading-relaxed">
              At <span className="font-semibold text-green-600">Our Platform</span>, we aim to create a transformative learning
              experience for everyone. By connecting learners with world-class educators, we strive to nurture personal and professional growth for a sustainable future.
            </p>
            <button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
              Learn More
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRlYWNoZXIlMjBhbmQlMjBzdHVkZW50c3xlbnwwfHx8fDE2ODI4ODExOTk&ixlib=rb-1.2.1&q=80&w=1080"
              alt="Vision"
              className="rounded-lg shadow-xl hover:scale-105 transform transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
