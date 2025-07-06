'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const UPCOMING_EVENTS = [
    {
        id: 1,
        title: "Youth Fellowship Night",
        date: "2025-07-12",
        time: "18:00",
        location: "Main Hall",
        description: "Join us for an evening of worship, games, and fellowship. All are welcome!",
        category: "Youth",
         color: "bg-gradient-to-br from-[#2f3a82] to-blue-600"
    },
    {
        id: 2,
        title: "Sunday Morning Worship",
        date: "2025-07-13",
        time: "10:00",
        location: "Sanctuary",
        description: "Join us for our weekly worship service with inspiring music and message.",
        category: "Worship",
        color: "bg-gradient-to-br from-[#2f3a82] to-blue-600"
    },
    {
        id: 3,
        title: "Community Outreach",
        date: "2025-07-15",
        time: "14:00",
        location: "Community Center",
        description: "Help us serve our local community with food distribution and fellowship.",
        category: "Outreach",
         color: "bg-gradient-to-br from-[#2f3a82] to-blue-600"
    }
];

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Helper function to format date consistently
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

export const EventSection = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [isMounted, setIsMounted] = useState(false);
    const [activeEventIndex, setActiveEventIndex] = useState(0);
    
    useEffect(() => {
        setIsMounted(true);
        setSelectedDate(new Date(UPCOMING_EVENTS[0].date));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveEventIndex((prev) => (prev + 1) % UPCOMING_EVENTS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const currentDate = new Date();
    const currentMonth = MONTHS[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    return (
        <section className="w-full py-16 px-4 md:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen overflow-x-hidden">
            <div className="max-w-7xl w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#2f3a82] mb-4">
                        Upcoming Events
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join us for fellowship, worship, and community service
                    </p>
                    
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Featured Event Card */}
                    <div className="lg:col-span-2">
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white h-[500px]">
                            <div className={cn(
                                "absolute inset-0 opacity-10 transition-all duration-1000",
                                UPCOMING_EVENTS[activeEventIndex].color
                            )}></div>
                            
                            
                            {/* Event Content */}
                            <div className="relative p-8 h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span className={cn(
                                            "px-4 py-2 rounded-full text-white text-sm font-medium",
                                            UPCOMING_EVENTS[activeEventIndex].color
                                        )}>
                                            {UPCOMING_EVENTS[activeEventIndex].category}
                                        </span>
                                        <div className="flex space-x-2">
                                            {UPCOMING_EVENTS.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setActiveEventIndex(index)}
                                                    className={cn(
                                                        "w-3 h-3 rounded-full transition-all",
                                                        index === activeEventIndex 
                                                            ? "bg-[#2f3a82] scale-125" 
                                                            : "bg-gray-300 hover:bg-gray-400"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-3xl md:text-4xl font-bold text-[#2f3a82] mb-6">
                                        {UPCOMING_EVENTS[activeEventIndex].title}
                                    </h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="flex items-center bg-gray-50 rounded-xl p-4">
                                            <div className="w-10 h-10 bg-[#2f3a82] rounded-full flex items-center justify-center mr-3">
                                                <span className="text-white font-bold">📅</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Date</p>
                                                <p className="font-semibold text-[#2f3a82]">
                                                    {formatDate(UPCOMING_EVENTS[activeEventIndex].date)}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center bg-gray-50 rounded-xl p-4">
                                            <div className="w-10 h-10 bg-[#2f3a82] rounded-full flex items-center justify-center mr-3">
                                                <span className="text-white font-bold">🕐</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Time</p>
                                                <p className="font-semibold text-[#2f3a82]">
                                                    {UPCOMING_EVENTS[activeEventIndex].time}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center bg-gray-50 rounded-xl p-4">
                                            <div className="w-10 h-10 bg-[#2f3a82] rounded-full flex items-center justify-center mr-3">
                                                <span className="text-white font-bold">📍</span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Location</p>
                                                <p className="font-semibold text-[#2f3a82]">
                                                    {UPCOMING_EVENTS[activeEventIndex].location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-700 text-lg leading-relaxed">
                                        {UPCOMING_EVENTS[activeEventIndex].description}
                                    </p>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                    <Link
                                        href="/events"
                                        className="bg-[#2f3a82] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#22306a] transition-all transform hover:scale-105 shadow-lg text-center"
                                    >
                                        Register Now
                                    </Link>
                                    <Link
                                        href="/events"
                                        className="border-2 border-[#2f3a82] text-[#2f3a82] px-8 py-4 rounded-xl font-semibold hover:bg-[#2f3a82] hover:text-white transition-all transform hover:scale-105 text-center"
                                    >
                                        View All Events
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calendar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl p-6 h-[500px] flex flex-col">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold text-[#2f3a82] mb-2">Event Calendar</h3>
                                <p className="text-gray-600">Select a date to view events</p>
                            </div>
                            
                            <div className="flex-1">
                                {isMounted ? (
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        className="w-full h-full flex flex-col"
                                        fixedWeeks
                                        showOutsideDays={false}
                                        classNames={{
                                            months: "flex flex-col space-y-4 flex-1",
                                            month: "space-y-4 flex-1",
                                            caption: "flex justify-center pt-1 relative items-center",
                                            caption_label: "text-lg font-semibold text-[#2f3a82]",
                                            nav: "space-x-1 flex items-center",
                                            nav_button: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 rounded-full hover:bg-gray-100",
                                            table: "w-full border-collapse space-y-1 flex-1",
                                            head_row: "flex",
                                            head_cell: "text-gray-500 rounded-md w-8 font-normal text-[0.8rem]",
                                            row: "flex w-full mt-2",
                                            cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#2f3a82] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                            day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-gray-100 transition-colors",
                                            day_selected: "bg-[#2f3a82] text-white hover:bg-[#2f3a82] hover:text-white focus:bg-[#2f3a82] focus:text-white",
                                            day_today: "bg-gray-100 text-gray-900 font-semibold",
                                            day_outside: "text-gray-400 opacity-50",
                                            day_disabled: "text-gray-400 opacity-50",
                                            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                            day_hidden: "invisible",
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2f3a82] mx-auto mb-4"></div>
                                            <p className="text-gray-500">Loading calendar...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
