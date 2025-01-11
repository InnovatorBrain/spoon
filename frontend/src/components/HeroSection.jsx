import first_image from '../../src/assets/sec_image.jpeg';

const HeroSection = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-wind-50 to-earth-60">
      <div className="container px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:py-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left animate-slide-in-left">
            <h1 className="text-4xl font-bold sm:text-5xl mb-6 text-white font-ptserif">
              The Geek Tutor's Vision
            </h1>
            <p className="text-white text-lg sm:text-xl mb-8 font-ptserif">
              At Our Platform, we believe in empowering individuals through education. Our platform provides access to expert
              teachers, interactive lessons, and a broad range of courses to help you achieve your goals.
            </p>
            <button className="px-6 py-3 bg-[#208718] text-white rounded-lg shadow-lg hover:bg-[#fff] transition duration-300 hover:text-[#208718] font-ptserif">
              Get a free consultation
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-1/2 animate-slide-in-right">
            <img
              src="https://d2cbg94ubxgsnp.cloudfront.net/Pictures/2000xAny/3/8/7/504387_shutterstock_16d76998306_487275.jpg"
              alt="About Us"
              className="rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
