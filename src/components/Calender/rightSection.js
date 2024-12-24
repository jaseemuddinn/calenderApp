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
  const [isOverlayActive, setIsOverlayActive] = useState(false);

  const specialOccasions = [
    {
      date: "2024-12-25",
      title: "Christmas Celebration",
      description: "Nagar Nigam Moradabad wishes everyone a joyful Christmas, celebrating unity, generosity, and reflection. Let us come together with thoughtful gestures, festive cheer, and a commitment to fostering community spirit and shared values.",
    },
    {
      date: "2024-12-31",
      title: "New Year's Eve",
      description: "On behalf of Nagar Nigam Moradabad, we extend our heartfelt wishes for a prosperous and joyful New Year. Together, let us continue striving for the progress and development of our city, fostering a cleaner, greener, and more vibrant Moradabad.",
    },
    {
      date: "2025-01-01",
      title: "New Year Celebration",
      description: "On behalf of Nagar Nigam Moradabad, we extend our heartfelt wishes for a prosperous and joyful New Year. Together, let us continue striving for the progress and development of our city, fostering a cleaner, greener, and more vibrant Moradabad. loremj kasbdk j fhba kshjdfvb kahjsd bfkhjas dbfk j hasbdf khjasb dfkhjbas dkfba sdkjhf baskjd hbkas hjdd b fjkhas dbfkh jasbdfkjha sdbfkjhas dbdfkjhaf bjkhasdbf jkhasb dfkj hahj",
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
          '/api/weather?q=Ghaziabad'
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
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
      "https://i.ibb.co/yy9h6ZH/1194387.jpg",
      "https://i.ibb.co/cFsF8w3/1194393.jpg",
      "https://i.ibb.co/8Ptd1gz/1194395.jpg",
      "https://i.ibb.co/hyPHcFf/1194396.jpg",
      "https://i.ibb.co/MNWZtpN/1194400.jpg",
      "https://i.ibb.co/Z6RMcJf/1194404.jpg",
      "https://i.ibb.co/yRDkMym/1194415.jpg",
      "https://i.ibb.co/L0CSS3M/1194423.jpg",
      "https://i.ibb.co/njw9xY0/1194430.jpg",
      "https://i.ibb.co/KmSJ4Jy/1194437.jpg",
      "https://i.ibb.co/PCBydcm/1194441.jpg",
      "https://i.ibb.co/2nQxd8v/1194445.jpg",
      "https://i.ibb.co/6yrPtH7/1194451.jpg",
      "https://i.ibb.co/FzNjvCw/1194364.jpg",
      "https://i.ibb.co/L5z5vbG/1194367.jpg",
      "https://i.ibb.co/4dS8nYW/1194368.jpg",
      "https://i.ibb.co/4dS8nYW/1194368.jpg",
      "https://i.ibb.co/r5MMHYh/1194377.jpg",
      "https://i.ibb.co/T1M9FRv/1194378.jpg",
    ], // Jan
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
      "https://i.ibb.co/yy9h6ZH/1194387.jpg",
      "https://i.ibb.co/cFsF8w3/1194393.jpg",
      "https://i.ibb.co/8Ptd1gz/1194395.jpg",
      "https://i.ibb.co/hyPHcFf/1194396.jpg",
      "https://i.ibb.co/MNWZtpN/1194400.jpg",
      "https://i.ibb.co/Z6RMcJf/1194404.jpg",
      "https://i.ibb.co/yRDkMym/1194415.jpg",
      "https://i.ibb.co/L0CSS3M/1194423.jpg",
      "https://i.ibb.co/njw9xY0/1194430.jpg",
      "https://i.ibb.co/KmSJ4Jy/1194437.jpg",
      "https://i.ibb.co/PCBydcm/1194441.jpg",
      "https://i.ibb.co/2nQxd8v/1194445.jpg",
      "https://i.ibb.co/6yrPtH7/1194451.jpg",
      "https://i.ibb.co/FzNjvCw/1194364.jpg",
      "https://i.ibb.co/L5z5vbG/1194367.jpg",
      "https://i.ibb.co/4dS8nYW/1194368.jpg",
      "https://i.ibb.co/4dS8nYW/1194368.jpg",
      "https://i.ibb.co/r5MMHYh/1194377.jpg",
      "https://i.ibb.co/T1M9FRv/1194378.jpg",
    ], // Feb
    [
      'https://i.ibb.co/T1M9FRv/1194378.jpg',
      'https://i.ibb.co/wpWcFBc/1194440.jpg',
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
    ], // March
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
      'https://i.ibb.co/xmc6YZF/1194457.jpg',
      'https://i.ibb.co/H2V25NK/1194367.jpg',
      'https://i.ibb.co/0Vnyx97/1194375.jpg',
      'https://i.ibb.co/pPmGvs6/1194383.jpg',
      'https://i.ibb.co/Tt2SF1y/1194387.jpg',
      "https://i.ibb.co/yy9h6ZH/1194387.jpg",
      "https://i.ibb.co/cFsF8w3/1194393.jpg",
      "https://i.ibb.co/8Ptd1gz/1194395.jpg",
      "https://i.ibb.co/hyPHcFf/1194396.jpg",
      "https://i.ibb.co/MNWZtpN/1194400.jpg",
      "https://i.ibb.co/Z6RMcJf/1194404.jpg",
      "https://i.ibb.co/yRDkMym/1194415.jpg",
      "https://i.ibb.co/L0CSS3M/1194423.jpg",
      "https://i.ibb.co/njw9xY0/1194430.jpg",
      "https://i.ibb.co/KmSJ4Jy/1194437.jpg",
      "https://i.ibb.co/PCBydcm/1194441.jpg",
      "https://i.ibb.co/2nQxd8v/1194445.jpg",
      "https://i.ibb.co/6yrPtH7/1194451.jpg",
      "https://i.ibb.co/FzNjvCw/1194364.jpg",
      "https://i.ibb.co/L5z5vbG/1194367.jpg",
      "https://i.ibb.co/4dS8nYW/1194368.jpg",
      "https://i.ibb.co/4dS8nYW/1194368.jpg",
      "https://i.ibb.co/r5MMHYh/1194377.jpg",
      "https://i.ibb.co/T1M9FRv/1194378.jpg",
    ], // Dec

  ];
  const currentImages = monthlyImages[currentMonth]?.length
    ? monthlyImages[currentMonth]
    : monthlyImages[0];

  // Update current image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
    }, 10000); // Change image every 5 seconds
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
    <div className="md:w-1/2 relative h-screen bg-white shadow-lg flex flex-col">
      {overlayVisible && (
        <div className="absolute top-1/4 md:top-auto md:bottom-32 left-4 right-4 bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg z-20 overflow-y-auto h-48 md:h-1/3">
          <p onClick={()=>setOverlayVisible(false)} className='absolute font-semibold text-red-600 right-4 top-2 cursor-pointer'>
            X
          </p>
          <p className="md:text-2xl text-base font-bold">{matchingOccasion.title}</p>
          <p className="md:text-xl text-sm ">{matchingOccasion.description}</p>
          <p className="text-md text-black">{matchingOccasion.date}</p>
          <button
            onClick={() => setOverlayVisible(false)}
            className="mt-2 md:p-2 p-1 bg-red-500 text-white rounded-md"
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
          className="transition-opacity duration-1000 hidden md:block"
        />
        <Image
          src={currentImages[currentImageIndex]}
          alt="Monthly Image"
          layout="fill"
          objectFit="contain"
          objectPosition='bottom'
          className="transition-opacity duration-1000 block md:hidden"
        />
      </div>


      <div className="absolute flex justify-between md:top-4 left-4 right-4 text-black font-bold p-4  rounded-lg z-10 bg-white/30 md:bg-white/20 md:backdrop-blur-lg ">
        {/* Date and Time Section */}
        <div className="flex flex-col text-left font-Montserrat">
          <p className="md:text-3xl lg:text-4xl text-xl">{formatTime(currentTime)}</p>
          <p className="lg:text-4xl md:text-3xl text-xl">{formatDate(currentTime)}</p>
        </div>

        {/* Weather Section */}
        {weather && (
          <div className=" text-xl md:gap-2 flex flex-col">
            {/* <h3 className="text-lg font-bold mb-2">Weather</h3> */}
            <div className="flex items-center mb-2">
              <img
                src="https://i.ibb.co/nz9w8Wb/temprature.png"
                alt="Temperature Icon"
                className="md:w-8 md:h-8 h-5 w-5 mr-2"
              />
              <p>{weather.temp}°C</p>
            </div>
            <div className="flex items-center mb-2">
              <img
                src="https://i.ibb.co/1ZWprcD/humidity.png"
                alt="Humidity Icon"
                className="md:w-8 md:h-8 h-5 w-5 mr-2"
              />
              <p className='text-lg md:text-xl'>Humidity: {weather.humidity}%</p>
            </div>
            <div className="md:flex items-center hidden">
              <img
                src="https://i.ibb.co/3y8g04C/wind.png"
                alt="Wind Speed Icon"
                className="w-8 h-8 mr-2 hidden md:block"
              />
              <p>Wind: {weather.wind} km/h</p>
            </div>
          </div>
        )}
      </div>


      {/* Bottom Overlay: Logos */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4 space-x-4 z-10">
        <Image
          className="rounded-full w-12 h-12 md:w-16 md:h-16 "
          src="https://i.ibb.co/tp71NhB/Whats-App-Image-2024-12-23-at-20-46-27-a8aab388.jpg"
          alt="Logo 1"
          width={50}
          height={50}
        />
        <Image
          className="rounded-full w-12 h-12 md:w-16 md:h-16"
          src="https://i.ibb.co/FhMdHJy/Whats-App-Image-2024-12-23-at-20-46-29-7df89220.jpg"
          alt="Logo 2"
          width={50}
          height={50}
        />
        <Image
          className="rounded-full w-12 h-12 md:w-16 md:h-16"
          src="https://i.ibb.co/3MDKQ2B/Whats-App-Image-2024-12-23-at-20-46-29-7d0573d1.jpg"
          alt="Logo 3"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
};

export default RightSection;
