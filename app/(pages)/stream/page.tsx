"use client";
import React, { useState, useEffect } from "react";
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import { supabase } from "@/lib/supabaseClient";

export default function StreamPage() {
  const PLACEHOLDER_VIDEO_ID = 'dmYiBjbA5tg';
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterMsg, setNewsletterMsg] = React.useState('');
  const [verse, setVerse] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  // Fetch current word of the month
  useEffect(() => {
    const fetchWord = async () => {
      const { data } = await supabase
        .from("word_of_month")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1);
      if (data && data.length > 0) {
        setVerse(data[0].verse);
        setMessage(data[0].message);
      }
    };
    fetchWord();
  }, []);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Update word of the month
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase
      .from("word_of_month")
      .insert([{ verse, message, updated_at: new Date().toISOString() }]);
    setLoading(false);
    alert("Word of the Month updated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1c575]/30 via-white to-[#2f3a82]/10 flex flex-col items-center py-10 px-4 lg:px-25 w-full">
      {/* Word of the Month */}
      <section className="w-full max-w-5xl mb-10 p-8 rounded-3xl bg-gradient-to-r from-[#e1c575] to-[#2f3a82] shadow-2xl text-white text-center mx-auto relative overflow-hidden">
      <div className="absolute left-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -z-10" />
      <div className="absolute right-0 bottom-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -z-10" />
      <h2 className="text-4xl font-extrabold mb-3 tracking-wide drop-shadow-lg">Word of the Month</h2>
      <p className="text-xl italic mb-2 max-w-2xl mx-auto drop-shadow">{message || "Loading..."}</p>
      <span className="block font-bold text-lg tracking-wider mt-2">{verse || "Loading..."}</span>
      </section>

      {/* Live Sermon Stream */}
      <section className="w-full max-w-6xl bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center mb-12 border border-[#e1c575]/30">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#2f3a82] mb-6 tracking-tight text-center">Live Sermon Stream</h1>
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center mb-6 border-4 border-[#e1c575]/40 shadow-lg">
          {/* Always show placeholder video */}
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${PLACEHOLDER_VIDEO_ID}`}
            title="Placeholder Sermon Video"
            aria-label="Placeholder Sermon Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ minHeight: 320 }}
          />
        </div>
        <p className="text-gray-700 text-lg text-center mb-4">Join us every Sunday for the live sermon. If the stream is not live, please check back at the scheduled time.</p>
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center mt-4">
          <div className="flex-1 bg-[#2f3a82]/10 rounded-xl p-4 text-center">
            <h3 className="font-bold text-[#2f3a82] mb-2">Upcoming Sermon</h3>
            <p className="text-gray-800">"Walking in Faith"<br /><span className="text-sm text-gray-500">Sunday, 10:00 AM</span></p>
          </div>
          <div className="flex-1 bg-[#e1c575]/10 rounded-xl p-4 text-center">
            <h3 className="font-bold text-[#e1c575] mb-2">Need Prayer?</h3>
            <p className="text-gray-800">Submit your prayer requests <a href="/contact" className="underline text-[#2f3a82] font-semibold">here</a>.</p>
          </div>
          <div className="flex-1 bg-[#2f3a82]/10 rounded-xl p-4 text-center">
            <h3 className="font-bold text-[#2f3a82] mb-2">Support Our Ministry</h3>
            <p className="text-gray-800">You can give online <a href="/giving" className="underline text-[#e1c575] font-semibold">here</a>.</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="w-full max-w-6xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-[#2f3a82] mb-2">Connect With Us</h3>
            <p className="text-gray-700 mb-4">Follow us on social media for updates, inspiration, and community events.</p>
            <div className="flex gap-4 justify-center">
              <a href="https://www.youtube.com/@ELCSACentralDioceseYouthLeague" className="text-[#2f3a82] hover:text-[#e1c575] text-2xl flex items-center gap-2" aria-label="YouTube">
                <FaYoutube /> <span className="hidden sm:inline">YouTube</span>
              </a>
              <a href="https://www.instagram.com/elcsacdyl/" className="text-[#2f3a82] hover:text-[#e1c575] text-2xl flex items-center gap-2" aria-label="Instagram">
                <FaInstagram /> <span className="hidden sm:inline">Instagram</span>
              </a>
            </div>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-[#e1c575] mb-2">Join Our Newsletter</h3>
            <p className="text-gray-700 mb-4">Stay up to date with the latest news, events, and sermons.</p>
            <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2f3a82]"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-[#2f3a82] hover:bg-[#e1c575] text-white font-bold px-6 py-2 rounded-lg transition-all"
                onClick={e => {
                  e.preventDefault();
                  setNewsletterMsg('Thank you for subscribing!');
                  setNewsletterEmail('');
                }}
              >
                Subscribe
              </button>
              {newsletterMsg && (
                <div className="w-full text-green-600 text-sm mt-2 text-center">{newsletterMsg}</div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Admin Section - Manage Word of the Month */}
      

      {/* Footer */}
      <footer className="mt-10 text-center text-gray-400 text-xs sm:text-sm">
        &copy; {year ?? ""} Pretoria Circuit. All rights reserved.
      </footer>
    </div>
  );
}
