'use client'
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const [events, setEvents] = useState([
        { date: '2024-12-22', title: 'Team Meeting', startTime: '10:00 AM', endTime: "11:00 AM", location: 'Conference Room A', images: [] },
        { date: '2024-12-22', title: 'Project Review', startTime: '2:00 PM', endTime: "4:00 PM", location: 'Virtual', images: [] },
    ]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [showImagesDropdown, setShowImagesDropdown] = useState(null);

    const [newEvent, setNewEvent] = useState({
        title: '',
        startTime: '',
        endTime: '',
        location: '',
        description: '',
        images: [],
    });

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

    const handleDayClick = (day) => {
        setSelectedDate(day);
    };

    const closeModal = () => {
        setShowModal(false);
        setNewEvent({
            title: '',
            startTime: '',
            endTime: '',
            location: '',
            description: '',
            images: [],
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddEvent = () => {
        if (!newEvent.title || !selectedDate) return;
        setEvents((prevEvents) => [
            ...prevEvents,
            {
                date: selectedDate.toISOString().split('T')[0],
                ...newEvent,
            },
        ]);
        closeModal();
    };

    const formattedSelectedDate = selectedDate
        ? selectedDate.toISOString().split('T')[0]
        : null;

    const openImageFullScreen = (image) => {
        setFullscreenImage(image);
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
    };

    return (
        <div>
            <div className="text-center text-3xl font-medium p-8">
                Your Personal Calendar
            </div>
            <div className="flex flex-wrap lg:flex-nowrap p-4">
                {/* Calendar Section */}
                <div className="w-full lg:w-2/3 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg lg:text-2xl font-semibold">
                            {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                        </h2>
                        <div className="flex gap-2">
                            <button
                                className="bg-gray-200 p-2 flex rounded-3xl hover:bg-gray-300 transition"
                                onClick={handlePrevMonth}
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                className="bg-gray-200 p-2 flex rounded-3xl hover:bg-gray-300 transition"
                                onClick={handleNextMonth}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="font-bold text-xs lg:text-base">
                                {day}
                            </div>
                        ))}

                        {days.map((day, index) => {
                            const isToday =
                                day && day.toDateString() === new Date().toDateString();
                            const isSelected =
                                day &&
                                formattedSelectedDate === day.toISOString().split('T')[0];
                            const hasEvent = events.some(
                                (event) =>
                                    day && event.date === day.toISOString().split('T')[0]
                            );

                            return (
                                <div
                                    key={index}
                                    className={`p-2 lg:p-4 border rounded cursor-pointer transition ${
                                        isToday
                                            ? 'bg-blue-200 ring-2 ring-blue-500'
                                            : isSelected
                                            ? 'bg-gray-200 ring-2 ring-gray-500'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                    onClick={() => day && handleDayClick(day)}
                                >
                                    <div className="text-sm lg:text-base">{day ? day.getDate() : ''}</div>
                                    {hasEvent && (
                                        <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 mx-auto"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Events Section */}
                <div className="w-full lg:w-1/3 p-4 border-t lg:border-t-0 lg:border-l">
                    <h3 className="text-sm lg:text-lg font-medium mb-4">
                        Events for {selectedDate ? selectedDate.toDateString() : '...'}
                    </h3>
                    {events.filter((event) => event.date === formattedSelectedDate).length ? (
                        <ul>
                            {events
                                .filter((event) => event.date === formattedSelectedDate)
                                .map((event, index) => (
                                    <li
                                        key={index}
                                        className="p-2 lg:p-4 bg-gray-50 mb-2 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        <h4 className="font-medium mb-1 lg:mb-2 text-sm lg:text-base">
                                            {event.title}
                                        </h4>
                                        <div className="flex flex-wrap items-center text-xs lg:text-sm text-muted-foreground gap-2 lg:gap-4">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{event.startTime} - {event.endTime}</span>
                                            </div>
                                            {event.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{event.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Image Dropdown */}
                                        {event.images && event.images.length > 0 && (
                                            <div className="mt-2">
                                                <button
                                                    className="text-blue-500 font-medium"
                                                    onClick={() => setShowImagesDropdown(index)}
                                                >
                                                    View Images ({event.images.length})
                                                </button>
                                                {showImagesDropdown === index && (
                                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                                        {event.images.map((image, i) => (
                                                            <img
                                                                key={i}
                                                                src={image}
                                                                alt={`Event Image ${i + 1}`}
                                                                className="w-full h-32 object-cover rounded cursor-pointer"
                                                                onClick={() => openImageFullScreen(image)}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </li>
                                ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-xs lg:text-sm">No events for today.</p>
                    )}

                    {selectedDate && (
                        <button
                            className="bg-blue-500 text-white px-3 py-1 lg:px-4 lg:py-2 rounded mt-4 hover:bg-blue-600 transition"
                            onClick={() => setShowModal(true)}
                        >
                            Add Event
                        </button>
                    )}
                </div>
            </div>

            {/* Fullscreen Image Modal */}
            {fullscreenImage && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="relative w-full max-w-2xl">
                        <img src={fullscreenImage} alt="Fullscreen" className="w-full h-auto rounded" />
                        <button
                            className="absolute top-2 right-2 text-white text-xl"
                            onClick={closeFullscreen}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Adding Event */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="sm:max-w-[425px] w-full px-4 animate-scale-in bg-white rounded-md p-4">
                        <h3 className="text-lg font-bold mb-2">
                            Add Event for {selectedDate?.toDateString()}
                        </h3>
                        <label className="block text-sm mb-1">Event Title</label>
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            placeholder="Event Title"
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <label className="block text-sm mb-1">Start Time</label>
                        <input
                            type="time"
                            name="startTime"
                            value={newEvent.startTime}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <label className="block text-sm mb-1">End Time</label>
                        <input
                            type="time"
                            name="endTime"
                            value={newEvent.endTime}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <label className="block text-sm mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={newEvent.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <label className="block text-sm mb-1">Event Images</label>
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                const newImages = files.map(file => URL.createObjectURL(file));
                                setNewEvent((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
                            }}
                            className="w-full p-2 border rounded mb-2"
                        />
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddEvent}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Add Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;


