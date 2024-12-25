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
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const occasions = [
    { date: '2025-01-26', name: 'Republic Day', description: 'Celebrate the Constitution of India' },
    { date: '2025-03-29', name: 'Holi', description: 'Celebrate the festival of colors' },
    { date: '2025-04-14', name: 'Ambedkar Jayanti', description: 'Celebrate the birth anniversary of Dr. B.R. Ambedkar' },
    { date: '2025-05-01', name: 'Labour Day', description: 'Celebrate the achievements of workers' },
    { date: '2025-05-23', name: 'Eid-ul-Fitr', description: 'Celebrate the end of Ramadan' },
    { date: '2025-08-15', name: 'Independence Day', description: 'Celebrate India’s independence' },
    { date: '2025-09-04', name: 'Eid al-Adha', description: 'Celebrate the festival of sacrifice' },
    { date: '2025-10-22', name: 'Dussehra', description: 'Joyful Dussehra!' },
    { date: '2025-11-14', name: 'Diwali', description: 'Prosperous Diwali!' },
    { date: '2025-10-02', name: 'Gandhi Jayanti', description: 'Celebrate the birth anniversary of Mahatma Gandhi' },
    { date: '2025-12-25', name: 'Christmas', description: 'Celebrate the holiday season' },
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
        <div key={`prev-${i}`} className="lg:h-14 xl:h-24 2xl:h-32 md:h-16 flex items-center xl:text-5xl text-gray-400 md:text-3xl justify-center rounded-full cursor-pointer transition-all">
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
          className={`lg:h-14 xl:h-24 2xl:h-32 md:h-16 flex items-center xl:text-5xl text-black md:text-3xl justify-center rounded-full cursor-pointer transition-all ${isToday
              ? 'bg-white font-bold'
              : occasion
                ? 'border border-cyan-500'
                : 'hover:bg-gray-200 hover:text-black'
            }`}
          onClick={() =>
            setSelectedDate(
              occasion || { date, name: 'No Event', description: `No event scheduled for ${date}.` }
            )
          }
        >
          {i}
        </div>
      );
    }

    // Add next month's first days
    for (let i = lastDayOfMonth; i < 6; i++) {
      days.push(
        <div key={`next-${i}`} className="lg:h-14 xl:h-24 2xl:h-32 md:h-16 flex items-center xl:text-5xl text-gray-400 md:text-3xl justify-center rounded-full cursor-pointer transition-all">
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
      <div className="w-full md:w-1/2 h-screen p-6 bg-gradient-to-r from-gray-300 via-yellow-500 to-amber-400 md:overflow-y-auto relative">
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
        <div className="grid grid-cols-7 gap-2 mb-0 lg:mb-14">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-bold text-black md:text-xl">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
        <div className="hidden md:block absolute bottom-4 left-1/2 transform -translate-x-1/2 justify-center z-10">
          <Logo />
        </div>
      </div>

      <RightSection selectedDate={selectedDate} />
    </div>
  );
};

export default Calendar;
