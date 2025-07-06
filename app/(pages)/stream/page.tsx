
import React from 'react';

export default function StreamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1c575]/30 via-white to-[#2f3a82]/10 flex flex-col items-center py-10 px-4 lg:px-25 w-full">
      {/* Word of the Month */}
      <section className="w-full max-w-5xl mb-10 p-8 rounded-3xl bg-gradient-to-r from-[#e1c575] to-[#2f3a82] shadow-2xl text-white text-center mx-auto relative overflow-hidden">
        <div className="absolute left-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -z-10" />
        <div className="absolute right-0 bottom-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -z-10" />
        <h2 className="text-4xl font-extrabold mb-3 tracking-wide drop-shadow-lg">Word of the Month</h2>
        <p className="text-xl italic mb-2 max-w-2xl mx-auto drop-shadow">"Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."</p>
        <span className="block font-bold text-lg tracking-wider mt-2">Philippians 4:6</span>
      </section>

      {/* Live Sermon Stream */}
      <section className="w-full max-w-6xl bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center mb-12 border border-[#e1c575]/30">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#2f3a82] mb-6 tracking-tight text-center">Live Sermon Stream</h1>
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center mb-6 border-4 border-[#e1c575]/40 shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/live_stream?channel=UC4QZ_LsYcvcq7qOsOhpAX4A"
            title="Live Sermon Stream"
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
              <a href="#" className="text-[#2f3a82] hover:text-[#e1c575] text-2xl" aria-label="Facebook"><i className="fab fa-facebook" /></a>
              <a href="#" className="text-[#2f3a82] hover:text-[#e1c575] text-2xl" aria-label="YouTube"><i className="fab fa-youtube" /></a>
              <a href="#" className="text-[#2f3a82] hover:text-[#e1c575] text-2xl" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            </div>
          </div>
          <div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold text-[#e1c575] mb-2">Join Our Newsletter</h3>
            <p className="text-gray-700 mb-4">Stay up to date with the latest news, events, and sermons.</p>
            <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
              <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2f3a82]" required />
              <button type="submit" className="bg-[#2f3a82] hover:bg-[#e1c575] text-white font-bold px-6 py-2 rounded-lg transition-all">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-gray-500 text-sm mt-auto">
        &copy; {new Date().getFullYear()} ELCSA-CD. All rights reserved.
      </footer>
    </div>
  );
}
