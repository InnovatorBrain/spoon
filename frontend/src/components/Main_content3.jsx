import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import firstimage from '../images/image-john.jpg'
import secondimage from '../images/image-tanya.jpg'
import thirdimage from '../images/image-jeremy.png'
const reviews = [
  {
    id: 1,
    image: firstimage,
    text: "This platform has completely revolutionized the way I learn. The AI recommendations are on point!",
    name: "Bairstow",
    stars: 5,
  },
  {
    id: 2,
    image: secondimage,
    text: "I love the personalized learning approach. It feels like the app truly understands my needs.",
    name: "Aleeza",
    stars: 4,
  },
  {
    id: 3,
    image: thirdimage,
    text: "The user experience is smooth, and the results are amazing. Highly recommend it!",
    name: "John Brown",
    stars: 5,
  },
];

export default function ReviewSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const nextReview = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>    
    <div className="flex flex-col items-center justify-center bg-gray-100 py-10 px-6">
    <h1 className="text-center font-bold text-4xl font-ptserif mb-3 text-gray-800">Feedback From Our Community</h1>
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 max-w-4xl">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
          <img
            src={reviews[currentIndex].image}
            alt={reviews[currentIndex].name}
            className="rounded-full w-40 h-40 border-4 border-lime-500 shadow-lg"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-lg text-gray-700 font-medium leading-7 mb-4">
            "{reviews[currentIndex].text}"
          </p>
          <p className="text-xl font-semibold text-gray-900 mb-2">
            {reviews[currentIndex].name}
          </p>
          {/* Star Ratings */}
          <div className="flex items-center mb-4">
            {Array.from({ length: reviews[currentIndex].stars }).map((_, i) => (
              <FaStar key={i} className="text-yellow-500 text-xl mr-1" />
            ))}
          </div>
          {/* Navigation Icons */}
          <div className="flex space-x-4">
            <button
              onClick={prevReview}
              className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gradient-to-tr from-wind-50 to-earth-60 hover:text-white transition duration-300"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextReview}
              className="p-3 bg-gray-200 rounded-full shadow-md hover:bg-gradient-to-tr from-wind-50 to-earth-60 hover:text-white transition duration-300"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>

  );
}
