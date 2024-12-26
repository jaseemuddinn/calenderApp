'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RightSection from './rightSection';
import Image from 'next/image';
import Logo from './logo';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [today, setToday] = useState(new Date());

  const months = [
    "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्टूबर", "नवम्बर", "दिसम्बर",
  ];

  const occasions = [
    { date: '2025-01-26', name: 'गणतंत्र दिवस', description: 'भारत के संविधान का उत्सव मनाएं' },
    { date: '2025-03-29', name: 'होली', description: 'रंगों के त्योहार का जश्न मनाएं' },
    { date: '2025-04-14', name: 'अंबेडकर जयंती', description: 'डॉ. बी.आर. अंबेडकर की जयंती का उत्सव मनाएं' },
    { date: '2025-05-01', name: 'मजदूर दिवस', description: 'श्रमिकों की उपलब्धियों का उत्सव मनाएं' },
    { date: '2025-05-23', name: 'ईद-उल-फितर', description: 'रमज़ान के समापन का जश्न मनाएं' },
    { date: '2025-08-15', name: 'स्वतंत्रता दिवस', description: 'भारत की स्वतंत्रता का उत्सव मनाएं' },
    { date: '2025-09-04', name: 'ईद-अल-अधा', description: 'त्याग के पर्व का जश्न मनाएं' },
    { date: '2025-10-22', name: 'दशहरा', description: 'खुशहाल दशहरा!' },
    { date: '2025-11-14', name: 'दीवाली', description: 'समृद्ध दीवाली का जश्न मनाएं!' },
    { date: '2025-10-02', name: 'गांधी जयंती', description: 'महात्मा गांधी की जयंती का उत्सव मनाएं' },
    { date: '2025-12-25', name: 'क्रिसमस', description: 'छुट्टियों के मौसम का उत्सव मनाएं' }
  ];


  const renderCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
    const lastDateOfLastMonth = new Date(currentYear, currentMonth, 0).getDate();

    let days = [];

    // Add previous month's last days
    for (let i = firstDayOfMonth; i > 0; i--) {
      days.push(
        <div key={`prev-${i}`} className="lg:h-14 xl:h-24  2xl:h-32 md:h-16 flex items-start xl:text-5xl text-gray-400 md:text-3xl justify-center rounded-full cursor-pointer transition-all">
          {lastDateOfLastMonth - i + 1}
        </div>
      );
    }

    // Add current month's days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const occasion = occasions.find((o) => o.date === date);
      const isToday =
        today.getDate() === i &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;

      days.push(
        <div
          key={`curr-${i}`}
          className={`lg:h-14 xl:h-24 2xl:h-32 md:h-16 3xl:h-44 h-10 flex flex-col items-center xl:text-5xl text-black md:text-3xl rounded-full cursor-pointer transition-all ${isToday
            ? ' font-bold'
            : occasion
              ? 'font-medium'
              : ' hover:text-black'
            }`}
          onClick={() =>
            setSelectedDate(
              occasion || { date, name: 'No Event', description: `No event scheduled for ${date}.` }
            )
          }
        >

          <div className=''>{i}</div>
          {isToday && (
            <div className="flex flex-col items-center">
              <span className="w-2 h-2 lg:h-4 lg:w-4 bg-blue-500 rounded-full mb-2"></span>
              <div className="text-xl lg:text-3xl text-center font-medium text-black overflow-hidden md:block">
              </div>
            </div>
          )}
          {occasion && <div className="text-xs lg:text-lg text-center font-medium text-black overflow-hidden">{occasion.name}</div>}
        </div>
        // </div>
      );
    }

    // Add next month's first days
    for (let i = lastDayOfMonth; i < 6; i++) {
      days.push(
        <div key={`next-${i}`} className="lg:h-14 xl:h-24 2xl:h-32 md:h-16 flex items-start xl:text-5xl text-gray-400 md:text-3xl justify-center rounded-full cursor-pointer transition-all">
          {i - lastDayOfMonth + 1}
        </div>
      );
    }

    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
  };

  return (
    <div className="h-screen overflow-y-auto flex flex-col md:flex-row font-Montserrat">
      <div className="w-full md:w-1/2 md:h-screen p-6 bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 md:overflow-y-auto relative">
        <div className="flex justify-between items-center lg:mb-16 mb-6">
          <button
            className="p-2 rounded-full bg-black text-white"
            onClick={handlePreviousMonth}
          >
            <ChevronLeft className="h-4 w-4 md:h-8 md:w-8" />
          </button>
          <h2 className="lg:text-5xl text-2xl text-center font-semibold text-black">
            {months[currentMonth]} {currentYear}
          </h2>
          <button
            className="p-2 rounded-full bg-black text-white"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-4 w-4 md:h-8 md:w-8" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-0 lg:mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-bold text-black md:text-xl">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
        <div className="invisible md:visible bottom-4 z-20">
          <Logo />
        </div>
      </div>

      <RightSection selectedDate={selectedDate} />
    </div>
  );
};

export default Calendar;
