import React, { useEffect, useState } from 'react'

function TimeWeather() {

    const [weather, setWeather] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());

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
    return (
        <div className=" flex justify-between text-black md:font-bold font-medium p-4 backdrop-blur-lg w-full rounded-lg z-10 bg-white/20 shadow-xl md:bg-white/20 md:backdrop-blur-lg ">
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
                        <p className='text-lg md:text-xl xl:text-2xl'>Humid: {weather.humidity}%</p>
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
    )
}

export default TimeWeather