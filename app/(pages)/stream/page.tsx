"use client";
import React, { useState, useEffect } from "react";
import { FaYoutube, FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';
import { supabase } from "@/lib/supabaseClient";

interface LiveStatus {
  configured: boolean;
  isLive: boolean;
  videoId?: string;
  channelUrl?: string;
}

export default function StreamPage() {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterStatus, setNewsletterStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const [verse, setVerse] = useState("");
  const [message, setMessage] = useState("");
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(null);
  const [checkingLive, setCheckingLive] = useState(true);

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

  // Check whether the church's YouTube channel is currently live
  useEffect(() => {
    const checkLive = async () => {
      try {
        const res = await fetch("/api/youtube-live-status");
        const data = await res.json();
        setLiveStatus(data);
      } catch {
        setLiveStatus({ configured: false, isLive: false });
      } finally {
        setCheckingLive(false);
      }
    };
    checkLive();
  }, []);

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
      setNewsletterEmail('');
    } catch {
      setNewsletterStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold/30 via-white to-navy/10 flex flex-col items-center py-10 px-4 lg:px-25 w-full">
      {/* Word of the Month */}
      <section className="w-full max-w-5xl mb-10 p-8 rounded-3xl bg-gradient-to-r from-gold to-navy shadow-2xl text-white text-center mx-auto relative overflow-hidden">
      <div className="absolute left-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -z-10" />
      <div className="absolute right-0 bottom-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -z-10" />
      <h2 className="text-4xl font-extrabold mb-3 tracking-wide drop-shadow-lg">Word of the Month</h2>
      <p className="text-xl italic mb-2 max-w-2xl mx-auto drop-shadow">{message || "Loading..."}</p>
      <span className="block font-bold text-lg tracking-wider mt-2">{verse || "Loading..."}</span>
      </section>

      {/* Live Sermon Stream */}
      <section className="w-full max-w-6xl p-8 flex flex-col items-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-navy mb-6 tracking-tight text-center">Live Sermon Stream</h1>
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center mb-6 border-4 border-gold/40 shadow-lg">
          {checkingLive ? (
            <div className="text-white/70 text-center px-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4"></div>
              Checking for a live stream...
            </div>
          ) : liveStatus?.isLive && liveStatus.videoId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${liveStatus.videoId}?autoplay=1`}
              title="Live Sermon Stream"
              aria-label="Live Sermon Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ minHeight: 320 }}
            />
          ) : (
            <div className="text-white text-center px-8 py-16">
              <p className="text-2xl font-bold mb-2">We're not live right now</p>
              <p className="text-white/70 mb-6">Join us every Sunday at 10:00 AM for our live sermon.</p>
              <a
                href={liveStatus?.channelUrl ?? "https://www.youtube.com/@ELCSACentralDioceseYouthLeague"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold text-navy font-semibold px-6 py-2 rounded-full hover:bg-white transition-colors"
              >
                Watch Past Sermons on YouTube
              </a>
            </div>
          )}
        </div>
        <p className="text-gray-700 text-lg text-center mb-4">Join us every Sunday for the live sermon. If the stream is not live, please check back at the scheduled time.</p>
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center mt-4">
          <div className="flex-1 bg-navy/10 rounded-xl p-4 text-center">
            <h3 className="font-bold text-navy mb-2">Upcoming Sermon</h3>
            <p className="text-gray-800">"Walking in Faith"<br /><span className="text-sm text-gray-500">Sunday, 10:00 AM</span></p>
          </div>
          <div className="flex-1 bg-gold/10 rounded-xl p-4 text-center">
            <h3 className="font-bold text-gold mb-2">Need Prayer?</h3>
            <p className="text-gray-800">Submit your prayer requests <a href="/contact" className="underline text-navy font-semibold">here</a>.</p>
          </div>
          <div className="flex-1 bg-navy/10 rounded-xl p-4 text-center">
            <h3 className="font-bold text-navy mb-2">Support Our Ministry</h3>
            <p className="text-gray-800">You can give online <a href="/giving" className="underline text-gold font-semibold">here</a>.</p>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="w-full max-w-6xl mx-auto mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-navy mb-2">Connect With Us</h3>
            <p className="text-gray-700 mb-4">Follow us on social media for updates, inspiration, and community events.</p>
            <div className="flex gap-4 justify-center">
              <a href="https://www.youtube.com/@ELCSACentralDioceseYouthLeague" className="text-navy hover:text-gold text-2xl flex items-center gap-2" aria-label="YouTube">
                <FaYoutube /> <span className="hidden sm:inline">YouTube</span>
              </a>
              <a href="https://www.instagram.com/elcsacdyl/" className="text-navy hover:text-gold text-2xl flex items-center gap-2" aria-label="Instagram">
                <FaInstagram /> <span className="hidden sm:inline">Instagram</span>
              </a>
              <a href="https://www.tiktok.com/@elcsa.central.dio" className="text-navy hover:text-gold text-2xl flex items-center gap-2" aria-label="TikTok">
                <FaTiktok /> <span className="hidden sm:inline">TikTok</span>
              </a>
              <a href="https://www.facebook.com/61576120504510" className="text-navy hover:text-gold text-2xl flex items-center gap-2" aria-label="Facebook">
                <FaFacebook /> <span className="hidden sm:inline">Facebook</span>
              </a>
            </div>
          </div>
          <div className="p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-gold mb-2">Join Our Newsletter</h3>
            <p className="text-gray-700 mb-4">Stay up to date with the latest news, events, and sermons.</p>
            <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-navy"
                required
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={newsletterStatus === "sending"}
                className="bg-navy hover:bg-gold text-white font-bold px-6 py-2 rounded-lg transition-all"
              >
                {newsletterStatus === "sending" ? "Subscribing..." : "Subscribe"}
              </button>
              {newsletterStatus === "sent" && (
                <div className="w-full text-green-600 text-sm mt-2 text-center">Thank you for subscribing!</div>
              )}
              {newsletterStatus === "error" && (
                <div className="w-full text-red-600 text-sm mt-2 text-center">Something went wrong. Please try again.</div>
              )}
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
