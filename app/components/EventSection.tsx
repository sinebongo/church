'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ALL_EVENTS, MONTHS } from '../services/data';

const UPCOMING_EVENTS = ALL_EVENTS.filter(event => new Date(event.date) >= new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());



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
        if (UPCOMING_EVENTS.length > 0) {
            setSelectedDate(new Date(UPCOMING_EVENTS[0].date));
        }
    }, []);

    useEffect(() => {
        if (UPCOMING_EVENTS.length > 0) {
            const interval = setInterval(() => {
                setActiveEventIndex((prev) => (prev + 1) % UPCOMING_EVENTS.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, []);

    // Filter events by selected date
    const filteredEvents = selectedDate
        ? UPCOMING_EVENTS.filter(event => {
            const eventDate = new Date(event.date);
            return (
                eventDate.getFullYear() === selectedDate.getFullYear() &&
                eventDate.getMonth() === selectedDate.getMonth() &&
                eventDate.getDate() === selectedDate.getDate()
            );
        })
        : UPCOMING_EVENTS;

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
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white h-auto sm:h-[500px] p-4 sm:p-8">
                            {filteredEvents.length > 0 ? (
                                <>
                                    <div className={cn(
                                        "absolute inset-0 opacity-10 transition-all duration-1000",
                                        filteredEvents[activeEventIndex % filteredEvents.length].color
                                    )}></div>
                                    {/* Event Content */}
                                    <div className="relative p-0 sm:p-8 h-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center justify-between mb-6">
                                                <span className={cn(
                                                    "px-4 py-2 rounded-full text-white text-sm font-medium",
                                                    filteredEvents[activeEventIndex % filteredEvents.length].color
                                                )}>
                                                    {filteredEvents[activeEventIndex % filteredEvents.length].category}
                                                </span>
                                                <div className="flex space-x-2">
                                                    {filteredEvents.map((_, index) => (
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
                                                {filteredEvents[activeEventIndex % filteredEvents.length].title}
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                                <div className="flex items-center bg-gray-50 rounded-xl p-4">
                                                    <div className="w-10 h-10 bg-[#2f3a82] rounded-full flex items-center justify-center mr-3">
                                                        <span className="text-white font-bold">📅</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Date</p>
                                                        <p className="font-semibold text-[#2f3a82]">
                                                            {formatDate(filteredEvents[activeEventIndex % filteredEvents.length].date)}
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
                                                            {filteredEvents[activeEventIndex % filteredEvents.length].time}
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
                                                            {filteredEvents[activeEventIndex % filteredEvents.length].location}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 text-lg leading-relaxed">
                                                {filteredEvents[activeEventIndex % filteredEvents.length].description}
                                            </p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                            <Link
                                                href="/events"
                                                className="border-2 border-[#2f3a82] text-[#2f3a82] px-8 py-4 rounded-xl font-semibold hover:bg-[#2f3a82] hover:text-white transition-all transform hover:scale-105 text-center"
                                            >
                                                View All Events
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full p-8">
                                    <h2 className="text-2xl font-bold text-[#2f3a82] mb-4">No Events Found For Selected Date</h2>
                                    <p className="text-gray-600 text-lg">Please select another date or check back later.</p>
                                </div>
                            )}
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
