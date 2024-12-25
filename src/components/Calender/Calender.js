'use client'
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RightSection from './rightSection';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [today, setToday] = useState(new Date());

  // For illustration, you can add special occasions in the `occasions` array
  const occasions = [
    [
      { date: '2025-01-26', name: 'Republic Day', description: 'Celebrate the Constitution of India' },
      { date: '2025-03-29', name: 'Holi', description: 'Celebrate the festival of colors' },
      { date: '2025-04-14', name: 'Ambedkar Jayanti', description: 'Celebrate the birth anniversary of Dr. B.R. Ambedkar' },
      { date: '2025-05-01', name: 'Labour Day', description: 'Celebrate the achievements of workers' },
      { date: "2025-05-23", name: "Eid-ul-Fitr", description: "Celebrate the end of Ramadan" },
      { date: '2025-08-15', name: 'Independence Day', description: 'Celebrate India’s independence' },
      { date: "2025-09-04", name: "Eid al-Adha", description: "Celebrate the festival of sacrifice" },
      { date: "2025-10-22", name: "Dussehra", description: "Joyfull Dusshera!"
      },
      { date: "2025-11-14", name: "Diwali", description: "Prosperous Diwali!"
      },
      { date: '2025-10-02', name: 'Gandhi Jayanti', description: 'Celebrate the birth anniversary of Mahatma Gandhi' },
      { date: '2025-12-25', name: 'Christmas', description: 'Celebrate the holiday season' }
    ]

  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(currentYear, currentMonth);
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    return [
      ...Array(firstDay).fill(null), // Empty slots for alignment
      ...days.map((day) => {
        const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const occasion = occasions.find((o) => o.date === date);
        const isToday =
          today.getDate() === day &&
          today.getMonth() === currentMonth &&
          today.getFullYear() === currentYear;

        const isSelected = selectedDate && selectedDate.date === date;

        return (
          <div
            key={day}
            className={`lg:h-18 xl:h-24 md:h-16 flex items-center xl:text-5xl text-white md:text-3xl justify-center rounded-full cursor-pointer transition-all ${isToday
              ? 'bg-yellow-500 font-bold' : isSelected && !occasion ? 'bg-gray-200 text-black font-semibold'
                : occasion
                  ? 'border border-cyan-500'
                  : ' hover:bg-gray-200 hover:text-black'
              }`}
            onClick={() => setSelectedDate(occasion || { date, name: 'No Event', description: `No event scheduled for ${date}.` })}
          >
            <p className="text-center leading-7 ">{day}</p>
          </div>
        );
      }),
    ];
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };


  const selectedOccasions = selectedDate
    ? occasions.filter((o) => o.date === selectedDate)
    : [];


  return (
    <div className="flex flex-col md:flex-row xl:h-screen h-screen font-Montserrat">
      {/* Calendar Section */}
      <div className="w-full md:w-1/2 md:h-full min-h-min p-6 bg-black md:overflow-y-auto ">
        {/* Month and Year Navigation */}
        <div className="flex justify-between items-center lg:mb-16 mb-6">
          <button
            className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
            onClick={handlePreviousMonth}
          >
            <ChevronLeft height={32} width={32} />
          </button>
          <h2 className="lg:text-5xl text-2xl text-center font-semibold text-white">
            {months[currentMonth]} {currentYear}
          </h2>
          <button
            className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
            onClick={handleNextMonth}
          >
            <ChevronRight height={32} width={32} />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 w-full">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-bold text-white md:text-xl">
              {day}
            </div>
          ))}

          {renderCalendarDays()}
        </div>
      </div>

      {/* Right Section with Overlay */}
      <RightSection selectedDate={selectedDate} ocassions={selectedOccasions} />
    </div>
  );
};

export default Calendar;  
