'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CirclePlay, Info, Play, X } from 'lucide-react';
import Logo from './logo';

const RightSection = ({ selectedDate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentMonth] = useState(new Date().getMonth());
  const [currentTime, setCurrentTime] = useState(new Date());

  const [weather, setWeather] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [matchingOccasion, setMatchingOccasion] = useState(null);
  const [overlayContent, setOverlayContent] = useState(null);

  const handleOverlayClose = (content) => {
    setOverlayContent(null);
  }


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
      date: "2025-01-26",
      title: "Republic Day",
      description: "Nagar Nigam Moradabad wishes everyone a Happy Republic Day, celebrating the spirit of unity, diversity, and progress. Let us honor the Constitution of India and work together for a brighter future for all citizens.",
    },
    {
      date: "2025-03-29",
      title: "Holi Celebration",
      description: "Nagar Nigam Moradabad wishes everyone a colorful and joyous Holi, celebrating the arrival of spring and the triumph of good over evil. Let us come together to spread happiness, love, and harmony throughout our community.",
    },
    {
      date: "2025-04-14",
      title: "Ambedkar Jayanti",
      description: "Nagar Nigam Moradabad wishes everyone a Happy Ambedkar Jayanti, honoring the legacy of Dr. B.R. Ambedkar and his contributions to social justice and equality. Let us continue to uphold his values and work towards a more inclusive society.",
    },
    {
      date: "2025-05-01",
      title: "Labour Day",
      description: "Nagar Nigam Moradabad wishes all workers a Happy Labour Day, recognizing their hard work, dedication, and contributions to our city's growth and development. Let us strive to create a more equitable and prosperous future for all laborers.",
    },
    {
      date: "2025-05-23",
      title: "Eid-ul-Fitr",
      description: "Nagar Nigam Moradabad wishes everyone a blessed Eid-ul-Fitr, marking the end of Ramadan and the month of fasting. Let us celebrate this joyous occasion with family, friends, and neighbors, spreading peace, love, and goodwill.",
    },
    {
      date: "2025-08-15",
      title: "Independence Day",
      description: "Nagar Nigam Moradabad wishes everyone a Happy Independence Day, commemorating the freedom and sovereignty of our nation. Let us honor the sacrifices of our forefathers and work towards a more prosperous and inclusive India.",
    },
    {
      date: "2025-09-04",
      title: "Eid al-Adha",
      description: "Nagar Nigam Moradabad wishes everyone a joyous Eid al-Adha, celebrating the spirit of sacrifice, charity, and compassion. Let us come together to share blessings, kindness, and happiness with those in need.",
    },
    {
      date: "2025-10-22",
      title: "Dussehra",
      description: "Nagar Nigam Moradabad wishes everyone a Happy Dussehra, commemorating the victory of good over evil and the triumph of righteousness. Let us celebrate this auspicious occasion with prayers, rituals, and festive cheer.",
    },
    {
      date: "2025-11-14",
      title: "Diwali",
      description: "Nagar Nigam Moradabad wishes everyone a prosperous and joyous Diwali, celebrating the festival of lights, prosperity, and happiness. Let us illuminate our homes and hearts with love, positivity, and good fortune.",
    },
    {
      date: "2025-10-02",
      title: "Gandhi Jayanti",
      description: "Nagar Nigam Moradabad wishes everyone a Happy Gandhi Jayanti, honoring the birth anniversary of Mahatma Gandhi and his principles of truth, non-violence, and social justice. Let us follow his path of peace, harmony, and equality.",
    },
    {
      date: "2025-12-25",
      title: "Christmas",
      description: "Nagar Nigam Moradabad wishes everyone a Merry Christmas, celebrating the birth of Jesus Christ and the spirit of love, joy, and giving. Let us come together to share the festive season with family, friends, and community.",
    }
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
    <div onClick={() => {
      setOverlayVisible(false);
    }} className="md:w-1/2 relative h-screen bg-white shadow-lg flex flex-col flex-grow">
      {overlayVisible && (
        <div onClick={(e) => e.stopPropagation()} className="absolute top-1/4 md:top-auto md:bottom-32 left-4 h-4/5 right-4 bg-white/20 backdrop-blur-lg p-4 rounded-lg shadow-lg z-20 overflow-y-auto md:h-1/3">
          <p onClick={() => setOverlayVisible(false)} className='absolute font-semibold text-red-600 right-4 top-2 cursor-pointer'>
            <X />
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
      {overlayContent && (
        <div
          className="absolute inset-0 flex items-center justify-center   z-20"
          onClick={handleOverlayClose}
        >
          <div
            className="absolute md:top-auto md:bottom-32 left-4 right-4 bg-white/60 backdrop-blur-lg p-4 rounded-lg shadow-lg z-20 overflow-y-auto h-4/5 md:min-h-min max-h-[90vh] md:h-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <p
              onClick={handleOverlayClose}
              className="absolute md:hidden top-2 right-4 text-red-500 cursor-pointer text-xl font-bold z-20"
            >
              <X />
            </p>

            {/* Conditional Content */}
            {overlayContent.type === 'info' && (
              <div className=''>
                <h2 className="text-xl font-bold">About Gau Shaala</h2>
                <p className="mt-2">{overlayContent.content}</p>
              </div>
            )}

            {overlayContent.type === 'video' && (
              <div className="w-full">
                <video controls className="w-full h-full rounded-md">
                  <source src={overlayContent.content} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
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


      <div className="absolute flex justify-between md:top-4 md:left-4 md:right-4 text-black font-bold p-4 backdrop-blur-lg w-full md:w-auto rounded-lg z-10 bg-white/60 md:bg-white/20 md:backdrop-blur-lg ">
        {/* Date and Time Section */}
        <div className="flex flex-col text-left font-Montserrat">
          <p className="md:text-2xl xl:text-6xl lg:text-3xl text-xl">{formatTime(currentTime)}</p>
          <p className="lg:text-3xl xl:text-6xl md:text-2xl text-xl">{formatDate(currentTime)}</p>
        </div>

        {/* Weather Section */}
        {weather && (
          <div className=" text-xl xl:text-2xl md:gap-2 flex flex-col">
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
              <p className='text-lg md:text-xl xl:text-2xl'>Humidity: {weather.humidity}%</p>
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
      <div className='md:hidden absolute bottom-4 px-2 left-0 right-0 flex justify-start md:justify-center space-x-4 z-10'>
        <Logo />
      </div>
      <div className="relative">
        {/* Main Content */}
        <div className="text-white absolute flex bottom-4 left-0 right-0 md:justify-center justify-end px-4 space-x-4 z-10">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() =>
              setOverlayContent({
                type: 'info',
                content: 'Gau Shaala is a non-profit organization dedicated to the welfare of cows and other animals. We provide shelter, food, and medical care to abandoned and injured animals. Our mission is to create a safe and loving environment for all animals, where they can live in peace and harmony. We believe that every animal deserves to be treated with kindness and respect, and we work tirelessly to ensure that all animals in our care receive the love and attention they deserve. Thank you for supporting our cause!',
              })
            }
          >
            <Info className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-black md:text-white md:bg-transparent bg-white/60 md:backdrop-blur-0 backdrop-blur-lg rounded-full md:rounded-none" />
            <p className='hidden lg:block'>About us</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() =>
              setOverlayContent({
                type: 'video',
                content: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Replace with your video URL
              })
            }
          >
            <CirclePlay className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-black md:text-white md:bg-transparent bg-white/60 md:backdrop-blur-0 backdrop-blur-lg rounded-full md:rounded-none" />
            <p className='hidden lg:block'>Watch Video</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default RightSection;
