// 'use client'
// import { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

// const Calendar = () => {
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [days, setDays] = useState([]);
//     const [events, setEvents] = useState([
//         { date: '2024-12-22', title: 'Team Meeting', startTime: '10:00 AM', endTime: "11:00 AM", location: 'Conference Room A', images: [] },
//         { date: '2024-12-22', title: 'Project Review', startTime: '2:00 PM', endTime: "4:00 PM", location: 'Virtual', images: [] },
//     ]);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [fullscreenImage, setFullscreenImage] = useState(null);
//     const [showImagesDropdown, setShowImagesDropdown] = useState(null);

//     const [newEvent, setNewEvent] = useState({
//         title: '',
//         startTime: '',
//         endTime: '',
//         location: '',
//         description: '',
//         images: [],
//     });

//     useEffect(() => {
//         generateCalendarDays(currentDate);
//     }, [currentDate]);

//     const generateCalendarDays = (date) => {
//         const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//         const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

//         const daysArray = [];
//         for (let i = 0; i < startOfMonth.getDay(); i++) {
//             daysArray.push(null);
//         }
//         for (let i = 1; i <= endOfMonth.getDate(); i++) {
//             daysArray.push(new Date(date.getFullYear(), date.getMonth(), i));
//         }
//         setDays(daysArray);
//     };

//     const handlePrevMonth = () => {
//         setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
//     };

//     const handleNextMonth = () => {
//         setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
//     };

//     const handleDayClick = (day) => {
//         setSelectedDate(day);
//     };

//     const closeModal = () => {
//         setShowModal(false);
//         setNewEvent({
//             title: '',
//             startTime: '',
//             endTime: '',
//             location: '',
//             description: '',
//             images: [],
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewEvent((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleAddEvent = () => {
//         if (!newEvent.title || !selectedDate) return;
//         setEvents((prevEvents) => [
//             ...prevEvents,
//             {
//                 date: selectedDate.toISOString().split('T')[0],
//                 ...newEvent,
//             },
//         ]);
//         closeModal();
//     };

//     const formattedSelectedDate = selectedDate
//         ? selectedDate.toISOString().split('T')[0]
//         : null;

//     const openImageFullScreen = (image) => {
//         setFullscreenImage(image);
//     };

//     const closeFullscreen = () => {
//         setFullscreenImage(null);
//     };

//     return (
//         <div>
//             <div className="text-center text-3xl font-medium p-8">
//                 Your Personal Calendar
//             </div>
//             <div className="flex flex-wrap lg:flex-nowrap p-4">
//                 {/* Calendar Section */}
//                 <div className="w-full lg:w-2/3 p-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-lg lg:text-2xl font-semibold">
//                             {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
//                         </h2>
//                         <div className="flex gap-2">
//                             <button
//                                 className="bg-gray-200 p-2 flex rounded-3xl hover:bg-gray-300 transition"
//                                 onClick={handlePrevMonth}
//                             >
//                                 <ChevronLeft />
//                             </button>
//                             <button
//                                 className="bg-gray-200 p-2 flex rounded-3xl hover:bg-gray-300 transition"
//                                 onClick={handleNextMonth}
//                             >
//                                 <ChevronRight />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="grid grid-cols-7 gap-2 text-center">
//                         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
//                             <div key={day} className="font-bold text-xs lg:text-base">
//                                 {day}
//                             </div>
//                         ))}

//                         {days.map((day, index) => {
//                             const isToday =
//                                 day && day.toDateString() === new Date().toDateString();
//                             const isSelected =
//                                 day &&
//                                 formattedSelectedDate === day.toISOString().split('T')[0];
//                             const hasEvent = events.some(
//                                 (event) =>
//                                     day && event.date === day.toISOString().split('T')[0]
//                             );

//                             return (
//                                 <div
//                                     key={index}
//                                     className={`p-2 lg:p-4 border rounded cursor-pointer transition ${
//                                         isToday
//                                             ? 'bg-blue-200 ring-2 ring-blue-500'
//                                             : isSelected
//                                             ? 'bg-gray-200 ring-2 ring-gray-500'
//                                             : 'bg-gray-100 hover:bg-gray-200'
//                                     }`}
//                                     onClick={() => day && handleDayClick(day)}
//                                 >
//                                     <div className="text-sm lg:text-base">{day ? day.getDate() : ''}</div>
//                                     {hasEvent && (
//                                         <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 mx-auto"></div>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Events Section */}
//                 <div className="w-full lg:w-1/3 p-4 border-t lg:border-t-0 lg:border-l">
//                     <h3 className="text-sm lg:text-lg font-medium mb-4">
//                         Events for {selectedDate ? selectedDate.toDateString() : '...'}
//                     </h3>
//                     {events.filter((event) => event.date === formattedSelectedDate).length ? (
//                         <ul>
//                             {events
//                                 .filter((event) => event.date === formattedSelectedDate)
//                                 .map((event, index) => (
//                                     <li
//                                         key={index}
//                                         className="p-2 lg:p-4 bg-gray-50 mb-2 rounded-lg hover:bg-gray-100 transition"
//                                     >
//                                         <h4 className="font-medium mb-1 lg:mb-2 text-sm lg:text-base">
//                                             {event.title}
//                                         </h4>
//                                         <div className="flex flex-wrap items-center text-xs lg:text-sm text-muted-foreground gap-2 lg:gap-4">
//                                             <div className="flex items-center gap-1">
//                                                 <Clock className="w-4 h-4" />
//                                                 <span>{event.startTime} - {event.endTime}</span>
//                                             </div>
//                                             {event.location && (
//                                                 <div className="flex items-center gap-1">
//                                                     <MapPin className="w-4 h-4" />
//                                                     <span>{event.location}</span>
//                                                 </div>
//                                             )}
//                                         </div>

//                                         {/* Image Dropdown */}
//                                         {event.images && event.images.length > 0 && (
//                                             <div className="mt-2">
//                                                 <button
//                                                     className="text-blue-500 font-medium"
//                                                     onClick={() => setShowImagesDropdown(index)}
//                                                 >
//                                                     View Images ({event.images.length})
//                                                 </button>
//                                                 {showImagesDropdown === index && (
//                                                     <div className="mt-2 grid grid-cols-2 gap-2">
//                                                         {event.images.map((image, i) => (
//                                                             <img
//                                                                 key={i}
//                                                                 src={image}
//                                                                 alt={`Event Image ${i + 1}`}
//                                                                 className="w-full h-32 object-cover rounded cursor-pointer"
//                                                                 onClick={() => openImageFullScreen(image)}
//                                                             />
//                                                         ))}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         )}
//                                     </li>
//                                 ))}
//                         </ul>
//                     ) : (
//                         <p className="text-gray-500 text-xs lg:text-sm">No events for today.</p>
//                     )}

//                     {selectedDate && (
//                         <button
//                             className="bg-blue-500 text-white px-3 py-1 lg:px-4 lg:py-2 rounded mt-4 hover:bg-blue-600 transition"
//                             onClick={() => setShowModal(true)}
//                         >
//                             Add Event
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* Fullscreen Image Modal */}
//             {fullscreenImage && (
//                 <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//                     <div className="relative w-full max-w-2xl">
//                         <img src={fullscreenImage} alt="Fullscreen" className="w-full h-auto rounded" />
//                         <button
//                             className="absolute top-2 right-2 text-white text-xl"
//                             onClick={closeFullscreen}
//                         >
//                             &times;
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Modal for Adding Event */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                     <div className="sm:max-w-[425px] w-full px-4 animate-scale-in bg-white rounded-md p-4">
//                         <h3 className="text-lg font-bold mb-2">
//                             Add Event for {selectedDate?.toDateString()}
//                         </h3>
//                         <label className="block text-sm mb-1">Event Title</label>
//                         <input
//                             type="text"
//                             name="title"
//                             value={newEvent.title}
//                             placeholder="Event Title"
//                             onChange={handleInputChange}
//                             className="w-full p-2 border rounded mb-2"
//                         />
//                         <label className="block text-sm mb-1">Start Time</label>
//                         <input
//                             type="time"
//                             name="startTime"
//                             value={newEvent.startTime}
//                             onChange={handleInputChange}
//                             className="w-full p-2 border rounded mb-2"
//                         />
//                         <label className="block text-sm mb-1">End Time</label>
//                         <input
//                             type="time"
//                             name="endTime"
//                             value={newEvent.endTime}
//                             onChange={handleInputChange}
//                             className="w-full p-2 border rounded mb-2"
//                         />
//                         <label className="block text-sm mb-1">Location</label>
//                         <input
//                             type="text"
//                             name="location"
//                             value={newEvent.location}
//                             onChange={handleInputChange}
//                             className="w-full p-2 border rounded mb-2"
//                         />
//                         <label className="block text-sm mb-1">Event Images</label>
//                         <input
//                             type="file"
//                             name="images"
//                             accept="image/*"
//                             multiple
//                             onChange={(e) => {
//                                 const files = Array.from(e.target.files);
//                                 const newImages = files.map(file => URL.createObjectURL(file));
//                                 setNewEvent((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
//                             }}
//                             className="w-full p-2 border rounded mb-2"
//                         />
//                         <div className="flex justify-between items-center mt-4">
//                             <button
//                                 onClick={closeModal}
//                                 className="bg-gray-300 text-black px-4 py-2 rounded"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleAddEvent}
//                                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                             >
//                                 Add Event
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Calendar;


'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './style.css'

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const [events, setEvents] = useState([
        {
            date: '2024-08-15',
            title: 'Independence Day',
            priority: true,
            description: 'A national holiday to commemorate the independence of India. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum ',
            images: ['/images/independence1.jpg', '/images/independence2.jpg', '/images/independence3.jpg'],
        },
        {
            date: '2024-11-12',
            title: 'Diwali',
            priority: true,
            description: 'The festival of lights celebrated across India.',
            images: ['/images/diwali1.jpg', '/images/diwali2.jpg'],
        },
        {
            date: '2024-01-14',
            title: 'Makar Sankranti',
            priority: false,
            description: 'A harvest festival celebrated in India.',
            images: ['/images/makar1.jpg', '/images/makar2.jpg'],
        },
    ]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        generateCalendarDays(currentDate);
    }, [currentDate]);

    const generateCalendarDays = (date) => {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const daysArray = [];
        for (let i = 0; i < startOfMonth.getDay(); i++) {
            daysArray.push(null);
        }
        for (let i = 1; i <= endOfMonth.getDate(); i++) {
            daysArray.push(new Date(date.getFullYear(), date.getMonth(), i));
        }
        setDays(daysArray);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const closeEventModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-sans">
            <div className="max-w-4xl mx-auto p-4">
                {/* Calendar Section */}
                <div className="flex flex-col items-center">
                    <div className="flex justify-between w-full items-center mb-4">
                        <button
                            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                            onClick={handlePrevMonth}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-2xl font-semibold">
                            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                        </h2>
                        <button
                            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                            onClick={handleNextMonth}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 w-full">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="text-center font-bold">
                                {day}
                            </div>
                        ))}

                        {days.map((day, index) => {
                            const isToday =
                                day && day.toDateString() === new Date().toDateString();
                            const hasEvent = events.some(
                                (event) =>
                                    day && event.date === day.toISOString().split('T')[0]
                            );

                            return (
                                <div
                                    key={index}
                                    className={`h-16 flex items-center justify-center border rounded-lg cursor-pointer transition-all ${isToday
                                        ? 'bg-blue-200 text-blue-800'
                                        : hasEvent
                                            ? 'bg-yellow-100 hover:bg-yellow-200'
                                            : 'bg-white hover:bg-gray-100'
                                        }`}
                                >
                                    {day ? day.getDate() : ''}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Events Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${event.priority
                                    ? 'bg-gradient-to-r from-blue-300 to-green-500 text-white'
                                    : 'bg-white border'
                                    }`}
                                onClick={() => handleEventClick(event)}
                            >
                                <h4 className="text-lg font-bold mb-2">{event.title}</h4>
                                <p className="text-sm">{event.date}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Event Modal */}
                {/* {selectedEvent && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
                            <button
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                onClick={closeEventModal}
                            >
                                &times;
                            </button>
                            <h3 className="text-xl font-bold mb-4">{selectedEvent.title}</h3>
                            <p className="mb-2 text-sm">{selectedEvent.date}</p>
                            <p className="mb-4 text-gray-700">{selectedEvent.description}</p>
                            <div className="grid grid-cols-2 gap-2">
                                {selectedEvent.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={"https://t3.ftcdn.net/jpg/08/55/99/18/360_F_855991899_FLUPxeeq1C3UwNIv7ofH0exOn9OyNN8J.jpg"}
                                        alt={selectedEvent.title}
                                        className="rounded-lg object-cover h-52 w-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )} */}
                {/* Event Modal */}
                {/* Event Modal */}
                {selectedEvent && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div
                            className="bg-white p-6 rounded-lg h-1/2 md:h-2/3 overflow-auto shadow-lg relative transition-transform transform scale-95 opacity-0 animate-fadeInUp w-full sm:w-4/5 md:w-1/2 lg:w-2/3"
                        >
                            <button
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                onClick={() => {
                                    document.querySelector('.animate-fadeInUp').classList.add('animate-fadeOutDown');
                                    setTimeout(closeEventModal, 300); // Allow the animation to complete
                                }}
                            >
                                &times;
                            </button>
                            <h3 className="text-xl font-bold mb-4 text-center sm:text-left">{selectedEvent.title}</h3>
                            <p className="mb-2 text-sm text-gray-600">{selectedEvent.date}</p>
                            <p className="mb-4 text-gray-700">{selectedEvent.description}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {selectedEvent.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={"https://t3.ftcdn.net/jpg/08/55/99/18/360_F_855991899_FLUPxeeq1C3UwNIv7ofH0exOn9OyNN8J.jpg"}
                                        alt={selectedEvent.title}
                                        className="rounded-lg object-cover w-full h-48 sm:h-52"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Calendar;
