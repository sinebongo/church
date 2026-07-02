'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { toLocalDateString } from "@/lib/utils";
import { createClient } from '@supabase/supabase-js';
import { RsvpDialog } from "./RsvpDialog";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "<YOUR_SUPABASE_URL>";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "<YOUR_SUPABASE_ANON_KEY>";
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to format date consistently
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

// Helper function to format time
const formatTime = (timeString: string | undefined) => {
    if (!timeString || typeof timeString !== "string" || !timeString.includes(":")) {
        return "Time TBA";
    }
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
};

export const EventSection = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [isMounted, setIsMounted] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .order('date', { ascending: true });
                if (error) {
                    console.error("Error fetching events:", error);
                    setEvents([]);
                } else {
                    setEvents(data || []);
                }
            } catch (err) {
                console.error("Error fetching events:", err);
                setEvents([]);
            }
        };
        fetchEvents();
        setIsMounted(true);
    }, []);

    // Show all events if no date is selected, otherwise filter by selected date
    const filteredEvents = selectedDate === undefined
        ? events
        : events.filter(event => event.date === toLocalDateString(selectedDate));

    const visibleEvents = filteredEvents.slice(0, 3);

    return (
        <section className="w-full py-16 px-4 md:px-8 bg-cream overflow-x-hidden">
            <div className="max-w-7xl w-full mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-navy mb-4">
                        Upcoming Events
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join us for fellowship, worship, and community service
                    </p>
                </div>

                {visibleEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                        {visibleEvents.map((event) => (
                            <div key={event.id} className="bg-white rounded-2xl border border-navy/15 overflow-hidden flex flex-col transition-colors hover:border-gold">
                                {event.image && (
                                    <div className="h-44 overflow-hidden">
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="p-6 flex flex-col flex-1">
                                    <span className="self-start px-3 py-1 rounded-full bg-navy text-white text-xs font-medium mb-3">
                                        {event.category}
                                    </span>
                                    <h2 className="font-serif text-xl font-bold text-navy mb-3">{event.title}</h2>
                                    <div className="flex flex-col gap-1 text-sm text-gray-600 mb-4">
                                        <span>📅 {formatDate(event.date)}</span>
                                        <span>🕐 {formatTime(event.time)}</span>
                                        <span>📍 {event.location}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">{event.description}</p>
                                    <div className="flex flex-col gap-2">
                                        <RsvpDialog eventId={event.id} eventTitle={event.title} />
                                        <Link
                                            href="/events"
                                            className="text-center border-2 border-navy text-navy px-4 py-2 rounded-xl font-semibold hover:bg-navy hover:text-white transition-all"
                                        >
                                            View All Events
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-navy/15 p-12 text-center mb-8">
                        <h2 className="text-2xl font-bold text-navy mb-4">No Events Found For Selected Date</h2>
                        <p className="text-gray-600 text-lg">Please select another date or check back later.</p>
                    </div>
                )}

                {/* Compact calendar toggle */}
                <div className="max-w-md mx-auto">
                    <button
                        onClick={() => setShowCalendar((v) => !v)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-navy/15 transition-colors hover:border-gold text-navy font-semibold"
                    >
                        {showCalendar ? "Hide Calendar" : "Browse by Date"}
                    </button>
                    {showCalendar && isMounted && (
                        <div className="bg-white rounded-2xl border border-navy/15 p-6 mt-4">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="w-full"
                                fixedWeeks
                                showOutsideDays={false}
                                classNames={{
                                    caption_label: "text-lg font-semibold text-navy",
                                    day_selected: "bg-navy text-white hover:bg-navy hover:text-white focus:bg-navy focus:text-white",
                                    day_today: "bg-gray-100 text-gray-900 font-semibold",
                                }}
                            />
                            {selectedDate && (
                                <button
                                    onClick={() => setSelectedDate(undefined)}
                                    className="mt-3 w-full text-sm text-navy underline"
                                >
                                    Clear date filter
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
