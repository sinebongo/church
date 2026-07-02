'use client';
import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { cn, toLocalDateString } from "@/lib/utils";
import { createClient } from '@supabase/supabase-js';
import { RsvpDialog } from "@/app/components/RsvpDialog";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to format date consistently
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

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

export default function EventsPage() {
    const [categories, setCategories] = useState<string[]>(["All"]);
    const [events, setEvents] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [isMounted, setIsMounted] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNewsletterStatus("sending");
        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "newsletter", email: newsletterEmail }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            setNewsletterStatus("sent");
            setNewsletterEmail("");
        } catch {
            setNewsletterStatus("error");
        }
    };

    useEffect(() => {
        setIsMounted(true);

        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch categories
                const { data: catData, error: catError } = await supabase
                    .from('categories')
                    .select('name');
                if (catError) {
                    console.error("Error fetching categories:", catError);
                }
                if (catData) {
                    setCategories(["All", ...catData.map((c: any) => c.name)]);
                }

                // Fetch events with all columns matching your static structure
                const { data: eventData, error: eventError } = await supabase
                    .from('events')
                    .select(`
                        id,
                        title,
                        date,
                        time,
                        location,
                        description,
                        category,
                        image,
                        featured,
                        color
                    `);
                if (eventError) {
                    console.error("Error fetching events:", eventError);
                }
                if (eventData) {
                    setEvents(eventData);
                }
            } catch (err) {
                console.error("Error fetching events:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter events by selected date and category
    const filteredEvents = (!selectedDate && selectedCategory === "All")
        ? events
        : events.filter(event => {
            const categoryMatch = selectedCategory === "All" || event.category === selectedCategory;
            const dateMatch = !selectedDate || event.date === toLocalDateString(selectedDate);
            return categoryMatch && dateMatch;
        });

    const featuredEvents = filteredEvents.filter(event => event.featured);
    const regularEvents = filteredEvents.filter(event => !event.featured);

    // Ref for calendar section
    const calendarRef = React.useRef<HTMLDivElement>(null);

    const handleScrollToCalendar = () => {
        if (calendarRef.current) {
            calendarRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-cream to-white">
            {/* Mobile Filter Modal */}
            <div className={`fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center ${showMobileFilters ? '' : 'hidden'}`}>
                <div className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-sm relative">
                    <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl" onClick={() => setShowMobileFilters(false)}>&times;</button>
                    <h3 className="text-xl font-bold text-navy mb-4">Filters</h3>
                    {/* Category Filter */}
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2">Category</h4>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => { setSelectedCategory(category); setShowMobileFilters(false); }}
                                    className={cn(
                                        "w-full text-left px-4 py-2 rounded-lg transition-colors font-medium",
                                        selectedCategory === category
                                            ? "bg-navy text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    )}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Calendar Filter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Date</h4>
                        {isMounted && (
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={date => { setSelectedDate(date); setShowMobileFilters(false); }}
                                className="w-full mb-2"
                                classNames={{
                                    day_selected: "bg-navy text-white hover:bg-navy hover:text-white focus:bg-navy focus:text-white",
                                    day_today: "bg-gray-100 text-gray-900 font-semibold",
                                    caption_label: "text-navy font-semibold",
                                }}
                            />
                        )}
                        {selectedDate && (
                            <button
                                onClick={() => setSelectedDate(undefined)}
                                className="mt-2 w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Clear Date Filter
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-navy to-navy-dark text-white py-20">
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-dark" />
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <p className="uppercase tracking-widest text-gold text-sm font-medium mb-3">Events</p>
                    <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
                        Church Events
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/80">
                        Join us for worship, fellowship, and community service.
                        There's something for everyone in our church family.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="bg-white text-navy px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            onClick={handleScrollToCalendar}
                        >
                            View Calendar
                        </button>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar for desktop */}
                    <div className="lg:col-span-1 hidden lg:block">
                        {/* Category Filter */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <h3 className="text-xl font-bold text-navy mb-4">Filter by Category</h3>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={cn(
                                            "w-full text-left px-4 py-2 rounded-lg transition-colors font-medium",
                                            selectedCategory === category
                                                ? "bg-navy text-white"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        )}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Calendar */}
                        <div className="bg-white rounded-2xl shadow-lg p-6" ref={calendarRef} id="calendar-section">
                            <h3 className="text-xl font-bold text-navy mb-4">Event Calendar</h3>
                            {isMounted && (
                                <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    className="w-full"
                                    classNames={{
                                        day_selected: "bg-navy text-white hover:bg-navy hover:text-white focus:bg-navy focus:text-white",
                                        day_today: "bg-gray-100 text-gray-900 font-semibold",
                                        caption_label: "text-navy font-semibold",
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
                        {/* Mobile Filter Button */}
                        <div className="mb-6 lg:hidden flex justify-end">
                            <button
                                className="bg-navy text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#22306a] transition-colors"
                                onClick={() => setShowMobileFilters(true)}
                            >
                                Filter Events
                            </button>
                        </div>
                        {/* Featured Events */}
                        {featuredEvents.length > 0 && (
                            <div className="mb-12">
                                <h2 className="text-3xl font-bold text-navy mb-6">Featured Events</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {featuredEvents.map(event => (
                                        <div key={event.id} className="bg-white rounded-2xl border border-navy/15 overflow-hidden transition-colors hover:border-gold">
                                            <div className="relative h-48">
                                                <img 
                                                    src={event.image || "/placeholder.jpg"} // fallback image
                                                    alt={event.title || "Event image"}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-navy text-white px-3 py-1 rounded-full text-sm font-medium">
                                                        {event.category}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-navy mb-2">{event.title}</h3>
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
                                                <RsvpDialog eventId={event.id} eventTitle={event.title} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Regular Events */}
                        <div>
                            <h2 className="text-3xl font-bold text-navy mb-6">
                                {selectedCategory === "All" ? "All Events" : `${selectedCategory} Events`}
                            </h2>
                            {loading ? (
                                <div className="bg-white rounded-2xl border border-navy/15 p-12 text-center">
                                    <div className="text-2xl mb-4">Loading events...</div>
                                </div>
                            ) : regularEvents.length > 0 ? (
                                <div className="space-y-6">
                                    {regularEvents.map(event => (
                                        <div key={event.id} className="bg-white rounded-2xl border border-navy/15 p-6 transition-colors hover:border-gold">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="md:w-48 h-32 md:h-auto">
                                                    <img 
                                                        src={event.image || "/placeholder.jpg"} // fallback image
                                                        alt={event.title || "Event image"}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-navy mb-2">{event.title}</h3>
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
                                                    <RsvpDialog eventId={event.id} eventTitle={event.title} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border border-navy/15 p-12 text-center">
                                    <div className="text-6xl mb-4">📅</div>
                                    <h3 className="text-2xl font-bold text-navy mb-2">No Events Found</h3>
                                    <p className="text-gray-600 mb-6">
                                        {selectedDate 
                                            ? `No events scheduled for ${formatDate(toLocalDateString(selectedDate))}`
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
                                        className="bg-navy text-white px-6 py-2 rounded-lg hover:bg-[#22306a] transition-colors font-semibold"
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
            <section className="bg-navy text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Stay Connected
                    </h2>
                    <p className="text-xl mb-8">
                        Don't miss out on upcoming events and announcements. 
                        Subscribe to our newsletter for weekly updates.
                    </p>
                    {newsletterStatus === "sent" ? (
                        <p className="max-w-md mx-auto bg-white/10 rounded-lg p-4">Thank you for subscribing!</p>
                    ) : (
                        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="elcsa.cdpyl@gmail.com"
                                required
                                value={newsletterEmail}
                                onChange={e => setNewsletterEmail(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none ring-2 ring-white focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="submit"
                                disabled={newsletterStatus === "sending"}
                                className="bg-white text-navy px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                            >
                                {newsletterStatus === "sending" ? "Subscribing..." : "Subscribe"}
                            </button>
                            {newsletterStatus === "error" && (
                                <p className="w-full text-center text-sm text-white bg-red-500/60 rounded-lg py-2">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}
