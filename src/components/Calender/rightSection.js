'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const RightSection = ({ selectedDate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentMonth] = useState(new Date().getMonth());
  const [currentTime, setCurrentTime] = useState(new Date());

  const [weather, setWeather] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [matchingOccasion, setMatchingOccasion] = useState(null);

  const specialOccasions = [
    {
      date: "2024-12-25",
      title: "Christmas Celebration",
      description: "A special occasion to celebrate togetherness and joy!",
    },
    {
      date: "2024-12-31",
      title: "New Year's Eve",
      description: "Celebrate the end of the year and welcome the new year!",
    },
    {
      date: "2025-01-01",
      title: "New Year Celebration",
      description: "Welcome the New Year with excitement and resolutions!",
    },
    {
      date: "2024-02-14",
      title: "Valentine's Day",
      description: "A day to celebrate love and affection.",
    },
    
  ];
  useEffect(() => {
    const foundOcassion = specialOccasions.find(
      (occasion) => selectedDate && selectedDate.date === occasion.date
    );
  
    if (foundOcassion) {
      setMatchingOccasion(foundOcassion);
      setOverlayVisible(true);
      console.log("Special Occasion:", foundOcassion);
    } else {
      setMatchingOccasion(null);
      setOverlayVisible(false);
      console.log("No special occasion today");
    }
  }, [selectedDate]);
  

  useEffect(() => {
    // Fetch weather data here
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=c5265023b2474a5786e102512242312&q=Ghaziabad&aqi=no`
        );
        const data = await response.json();
        setWeather({
          temp: data.current.temp_c,
          description: data.current.condition.text,
          icon: data.current.condition.icon,
          humidity: data.current.humidity,
          wind: data.current.wind_kph,
          feelsLike: data.current.feelslike_c,
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchWeather();
  }, []);

  const monthlyImages = [
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // December
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
    ], // Jan
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // February
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // Mar
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // Apr
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // May
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // June
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // July
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // Aug
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // Sept
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // Oct
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // Nov
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // Dec
  ];

  const currentImages = monthlyImages[currentMonth] || ['https://i.ibb.co/xmc6YZF/1194457.jpg'];

  // Update current image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 6);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) =>
    `${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')}`;

  const formatDate = (time) => {
    const options = { month: 'long', day: 'numeric' }; // Exclude year
    return time.toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-1/2 relative h-full bg-white shadow-lg flex flex-col">
      {overlayVisible && (
        <div className="absolute bottom-32 left-4 right-4 bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg z-10">
          <p className="text-2xl font-bold">{matchingOccasion.title}</p>
          <p className="text-xl">{matchingOccasion.description}</p>
          <p className="text-md text-black">{matchingOccasion.date}</p>
          <button
            onClick={() => setOverlayVisible(false)}
            className="mt-2 p-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      )}
      {/* Image Carousel */}
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={currentImages[currentImageIndex]}
          alt="Monthly Image"
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-1000"
        />
      </div>


      <div className="absolute flex justify-between top-4 left-4 right-4 text-black font-bold p-4 rounded-lg z-10 bg-white/20 backdrop-blur-lg ">
        {/* Date and Time Section */}
        <div className="flex flex-col text-left font-Montserrat">
          <p className="text-6xl">{formatTime(currentTime)}</p>
          <p className="text-5xl">{formatDate(currentTime)}</p>
        </div>

        {/* Weather Section */}
        {weather && (
          <div className=" text-3xl gap-4 flex flex-col items-end">
            {/* <h3 className="text-lg font-bold mb-2">Weather</h3> */}
            <div className="flex items-center mb-2">
              <img
                src="https://i.ibb.co/nz9w8Wb/temprature.png"
                alt="Temperature Icon"
                className="w-10 h-10 mr-2"
              />
              <p>{weather.temp}°C</p>
            </div>
            <div className="flex items-center mb-2">
              <img
                src="https://i.ibb.co/1ZWprcD/humidity.png"
                alt="Humidity Icon"
                className="w-10 h-10 mr-2"
              />
              <p>Humidity: {weather.humidity}%</p>
            </div>
            <div className="flex items-center">
              <img
                src="https://i.ibb.co/3y8g04C/wind.png"
                alt="Wind Speed Icon"
                className="w-10 h-10 mr-2"
              />
              <p>Wind: {weather.windSpeed} km/h</p>
            </div>
          </div>
        )}
      </div>


      {/* Bottom Overlay: Logos */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-start px-4 space-x-4 z-10">
        <Image className='rounded-full' src="https://i.ibb.co/tp71NhB/Whats-App-Image-2024-12-23-at-20-46-27-a8aab388.jpg" alt="Logo 1" width={80} height={80} />
        <Image className='rounded-full' src="https://i.ibb.co/FhMdHJy/Whats-App-Image-2024-12-23-at-20-46-29-7df89220.jpg" alt="Logo 2" width={80} height={80} />
        <Image className='rounded-full' src="https://i.ibb.co/3MDKQ2B/Whats-App-Image-2024-12-23-at-20-46-29-7d0573d1.jpg" alt="Logo 3" width={80} height={80} />
      </div>
    </div>
  );
};

export default RightSection;
