const Main_content1 = () => {
  const countries = [
    { name: 'UAE', code: 'ae' },
    { name: 'UK', code: 'gb' },
    { name: 'US', code: 'us' },
  ];

  return (
    <div className="bg-gray-200 text-gray-700 py-8 px-4 font-ptserif">
      <div className="max-w-screen-lg mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 ">Trusted by Students Worldwide</h1>
        {/* Center the boxes */}
        <div className="flex justify-center items-center gap-6">
          {countries.map((country, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-40 h-20 bg-gradient-to-tr from-wind-50 to-earth-60 text-white rounded-lg py-6 px-4 shadow-lg hover:shadow-xl transition-shadow
              hover:bg-white hover:text-black"
            >
              <img
                src={`https://flagcdn.com/w40/${country.code}.png`}
                alt={`${country.name} flag`}
                className="w-6 h-6 object-cover mb-3"
              />
              <span className="font-medium">{country.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main_content1;
