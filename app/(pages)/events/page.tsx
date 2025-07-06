'use client';
import React, { useState, useEffect } from 'react';
// import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const ALL_EVENTS = [
    {
        id: 1,
        title: "Youth Fellowship Night",
        date: "2025-07-12",
        time: "18:00",
        location: "Main Hall",
        description: "Join us for an evening of worship, games, and fellowship. All are welcome!",
        category: "Youth",
        image: "/CDYL.jpg",
        featured: true
    },
    {
        id: 2,
        title: "Sunday Morning Worship",
        date: "2025-07-13",
        time: "10:00",
        location: "Sanctuary",
        description: "Join us for our weekly worship service with inspiring music and message.",
        category: "Worship",
        image: "/CDYL.jpg",
        featured: true
    },
    {
        id: 3,
        title: "Community Outreach",
        date: "2025-07-15",
        time: "14:00",
        location: "Community Center",
        description: "Help us serve our local community with food distribution and fellowship.",
        category: "Outreach",
        image: "/CDYL.jpg",
        featured: false
    },
    {
        id: 4,
        title: "Bible Study",
        date: "2025-07-16",
        time: "19:00",
        location: "Fellowship Room",
        description: "Weekly Bible study and discussion group for all ages.",
        category: "Study",
        image: "/CDYL.jpg",
        featured: false
    },
    {
        id: 5,
        title: "Prayer Meeting",
        date: "2025-07-18",
        time: "19:30",
        location: "Prayer Chapel",
        description: "Join us for our weekly prayer meeting and spiritual reflection.",
        category: "Prayer",
        image: "/CDYL.jpg",
        featured: false
    },
    {
        id: 6,
        title: "Children's Ministry",
        date: "2025-07-20",
        time: "10:00",
        location: "Children's Room",
        description: "Fun activities, games, and Bible stories for children ages 5-12.",
        category: "Children",
        image: "/CDYL.jpg",
        featured: false
    },
    {
        id: 7,
        title: "Choir Practice",
        date: "2025-07-22",
        time: "19:00",
        location: "Choir Loft",
        description: "Weekly choir practice for all who love to sing and worship.",
        category: "Music",
        image: "/CDYL.jpg",
        featured: false
    },
    {
        id: 8,
        title: "Men's Breakfast",
        date: "2025-07-26",
        time: "08:00",
        location: "Fellowship Hall",
        description: "Monthly men's breakfast with fellowship and inspiring message.",
        category: "Men",
        image: "/CDYL.jpg",
        featured: false
    }
];

const CATEGORIES = ["All", "Youth", "Worship", "Outreach", "Study", "Prayer", "Children", "Music", "Men"];

// Helper function to format date consistently
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
};

export default function EventsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const filteredEvents = ALL_EVENTS.filter(event => {
        const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
        const dateMatch = !selectedDate || event.date === selectedDate.toISOString().split('T')[0];
        return categoryMatch && dateMatch;
    });

    const featuredEvents = filteredEvents.filter(event => event.featured);
    const regularEvents = filteredEvents.filter(event => !event.featured);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-[#2f3a82] to-blue-600 text-white py-20">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Church Events
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                        Join us for worship, fellowship, and community service. 
                        There's something for everyone in our church family.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-[#2f3a82] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            View Calendar
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#2f3a82] transition-colors">
                            Register for Event
                        </button>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Category Filter */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <h3 className="text-xl font-bold text-[#2f3a82] mb-4">Filter by Category</h3>
                            <div className="space-y-2">
                                {CATEGORIES.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={cn(
                                            "w-full text-left px-4 py-2 rounded-lg transition-colors font-medium",
                                            selectedCategory === category
                                                ? "bg-[#2f3a82] text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        )}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Calendar */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-[#2f3a82] mb-4">Event Calendar</h3>
                            {isMounted && (
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="w-full"
                                    classNames={{
                                        day_selected: "bg-[#2f3a82] text-white hover:bg-[#2f3a82] hover:text-white focus:bg-[#2f3a82] focus:text-white",
                                        day_today: "bg-gray-100 text-gray-900 font-semibold",
                                        caption_label: "text-[#2f3a82] font-semibold",
                                    }}
                                />
                            )}
                            {selectedDate && (
                                <button
                                    onClick={() => setSelectedDate(undefined)}
                                    className="mt-4 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Clear Date Filter
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Featured Events */}
                        {featuredEvents.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-[#2f3a82] mb-6">Featured Events</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {featuredEvents.map(event => (
                                        <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                            <div className="relative h-48">
                                                <img 
                                                    src={event.image} 
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-[#2f3a82] text-white px-3 py-1 rounded-full text-sm font-medium">
                                                        {event.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-[#2f3a82] mb-2">{event.title}</h3>
                                                <div className="flex items-center text-gray-600 mb-4 space-x-4">
                                                    <div className="flex items-center">
                                                        <span className="mr-2">📅</span>
                                                        <span>{formatDate(event.date)}</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="mr-2">🕐</span>
                                                        <span>{formatTime(event.time)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-gray-600 mb-4">
                                                    <span className="mr-2">📍</span>
                                                    <span>{event.location}</span>
                                                </div>
                                                <p className="text-gray-700 mb-4">{event.description}</p>
                                                <button className="w-full bg-[#2f3a82] text-white px-4 py-2 rounded-lg hover:bg-[#22306a] transition-colors font-semibold">
                                                    Register Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Regular Events */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#2f3a82] mb-6">
                                {selectedCategory === "All" ? "All Events" : `${selectedCategory} Events`}
                            </h2>
                            {regularEvents.length > 0 ? (
                                <div className="space-y-6">
                                    {regularEvents.map(event => (
                                        <div key={event.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="md:w-48 h-32 md:h-auto">
                                                    <img 
                                                        src={event.image} 
                                                        alt={event.title}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-[#2f3a82] mb-2">{event.title}</h3>
                                                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                                                                {event.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                        <div className="flex items-center text-gray-600">
                                                            <span className="mr-2">📅</span>
                                                            <span>{formatDate(event.date)}</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600">
                                                            <span className="mr-2">🕐</span>
                                                            <span>{formatTime(event.time)}</span>
                                                        </div>
                                                        <div className="flex items-center text-gray-600">
                                                            <span className="mr-2">📍</span>
                                                            <span>{event.location}</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700 mb-4">{event.description}</p>
                                                    <button className="bg-[#2f3a82] text-white px-6 py-2 rounded-lg hover:bg-[#22306a] transition-colors font-semibold">
                                                        Learn More
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                    <div className="text-6xl mb-4">📅</div>
                                    <h3 className="text-2xl font-bold text-[#2f3a82] mb-2">No Events Found</h3>
                                    <p className="text-gray-600 mb-6">
                                        {selectedDate 
                                            ? `No events scheduled for ${formatDate(selectedDate.toISOString().split('T')[0])}`
                                            : selectedCategory === "All" 
                                                ? "No events are currently scheduled."
                                                : `No ${selectedCategory.toLowerCase()} events are currently scheduled.`
                                        }
                                    </p>
                                    <button 
                                        onClick={() => {
                                            setSelectedCategory("All");
                                            setSelectedDate(undefined);
                                        }}
                                        className="bg-[#2f3a82] text-white px-6 py-2 rounded-lg hover:bg-[#22306a] transition-colors font-semibold"
                                    >
                                        View All Events
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <section className="bg-[#2f3a82] text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Stay Connected
                    </h2>
                    <p className="text-xl mb-8">
                        Don't miss out on upcoming events and announcements. 
                        Subscribe to our newsletter for weekly updates.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none ring-2 ring-white focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-[#2f3a82] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
