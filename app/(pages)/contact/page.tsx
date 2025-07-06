

"use client";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const address = [
  "Pretoria Circuit",
  "01 Sompane Street,",
  "Atteridgeville",
  "PO Box 47 Atteridgeville",
  "0008",
];


export default function ContactPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className=" w-full mx-auto px-8 md:px-25 py-8 bg-white rounded-xl shadow-lg mt-6 animate-fade-in"
    >
      <header className="flex flex-col items-center mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900 mb-2 tracking-tight drop-shadow-lg">Contact Us</h1>
        <p className="text-base sm:text-lg text-gray-600">We'd love to hear from you! Reach out or visit us at our main branch.</p>
      </header>
      <div className="flex flex-col md:flex-row gap-8">
        <section className="flex-1 flex flex-col gap-4 bg-blue-50 rounded-lg p-4 sm:p-6 border border-blue-100 shadow-sm min-w-0">
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 text-blue-800 mb-2"><FaMapMarkerAlt /> Main Branch Address</h2>
          <address className="not-italic text-gray-700 text-base sm:text-lg space-y-1">
            {address.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </address>
          <div className="flex items-center gap-2 mt-4 text-blue-700 text-sm sm:text-base">
            <FaPhoneAlt /> <span>+27 12 345 6789</span>
          </div>
          <div className="flex items-center gap-2 text-blue-700 text-sm sm:text-base">
            <FaEnvelope /> <span>info@pretoriacircuit.org</span>
          </div>
          <div className="flex items-center gap-2 text-blue-700 text-sm sm:text-base">
            <span className="font-semibold">Office Hours:</span>
            <span>Mon - Fri: 8:00 AM - 4:00 PM</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-blue-700 text-sm sm:text-base">
            <span className="font-semibold">Social:</span>
            <a href="https://facebook.com/pretoriacircuit" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
            <span className="hidden sm:inline">|</span>
            <a href="https://twitter.com/pretoriacircuit" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
          </div>
        </section>
        <section className="flex-1 flex flex-col gap-4 min-w-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-2">Send Us a Message</h2>
          <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-medium text-blue-900">Name</label>
              <input id="name" name="name" type="text" required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base" placeholder="Your Name" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium text-blue-900">Email</label>
              <input id="email" name="email" type="email" required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base" placeholder="you@email.com" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="message" className="font-medium text-blue-900">Message</label>
              <textarea id="message" name="message" rows={4} required className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base" placeholder="Type your message here..." />
            </div>
            <button type="submit" className="bg-blue-700 text-white font-semibold py-2 px-4 rounded hover:bg-blue-800 transition text-sm sm:text-base">Send Message</button>
          </form>
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-2 mt-8">Location Map</h2>
          <div className="w-full h-56 sm:h-64 rounded-lg overflow-hidden border-2 border-blue-200 shadow-md">
            <iframe
              title="Pretoria Circuit Map"
              src="https://www.google.com/maps?q=01+Sompane+Street,+Atteridgeville,+Pretoria,+0008&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
      <footer className="mt-10 text-center text-gray-400 text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} Pretoria Circuit. All rights reserved.
      </footer>
    </motion.main>
  );
}