import React from "react";


const ContactSection = () => {
  return (
    <section id="contact" className="w-full py-16 px-4  bg-gradient-to-br from-[#2f3a82] to-blue-600  overflow-x-hidden">
      <div className="">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">Contact Us</h2>
        <p className="mb-8 text-blue-100 text-center text-lg">We would love to hear from you! Reach out with any questions or comments.</p>
        <form className="bg-white/80 rounded-lg shadow p-8 flex flex-col gap-4 max-w-xl mx-auto">
          <input type="text" placeholder="Your Name" className="border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input type="email" placeholder="elcsa.cdpyl@gmail.com" className="border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <textarea placeholder="Your Message" rows={4} className="border border-blue-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button type="submit" className="bg-[#2f3a82] hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
