'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CirclePlay, Info, X } from 'lucide-react';
import Logo from './logo';
import { specialOccasions } from '../json/specialOcassion';
import { monthlyImages } from '../json/images';
import './style.css'

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

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Get images for the current month, fallback to January if not found
  const currentImages = monthlyImages[currentMonth]?.length
    ? monthlyImages[currentMonth]
    : monthlyImages.January;



  // Update current image every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentImages.length]);
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
            <button
              onClick={() => setOverlayContent(null)}
              className="mt-2 md:p-2 p-1 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Image Carousel */}
      <div className="relative w-full h-full overflow-hidden">
        {/* For larger screens */}
        <Image
          src={currentImages[currentImageIndex]}
          alt="Monthly Image"
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-2000 ease-in-out opacity-100 md:block hidden"
          style={{
            animation: 'fade 2s',
          }}
        />

        {/* For smaller screens */}
        <Image
          src={currentImages[currentImageIndex]}
          alt="Monthly Image"
          layout="fill"
          objectFit="contain"
          objectPosition="bottom"
          className="transition-opacity duration-2000 ease-in-out opacity-100 md:hidden block"
          style={{
            animation: 'fade 2s',
          }}
        />
      </div>
      <div className="absolute flex justify-between md:top-4 md:left-4 md:right-4 text-black font-bold p-4 backdrop-blur-lg w-full md:w-auto rounded-lg z-10 bg-white/60 md:bg-white/20 md:backdrop-blur-lg ">
        {/* Date and Time Section */}
        <div className="flex flex-col text-left font-Montserrat">
          <p className="md:text-2xl xl:text-5xl lg:text-3xl text-xl">{formatTime(currentTime)}</p>
          <p className="lg:text-3xl xl:text-5xl md:text-2xl text-xl">{formatDate(currentTime)}</p>
        </div>

        {/* Weather Section */}
        {weather && (
          <div className=" text-xl xl:text-2xl md:gap-2 flex flex-col justify-start">
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
