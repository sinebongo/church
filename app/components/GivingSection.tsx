import React from "react";

const GivingSection = () => {
  return (
    <section id="giving" className="w-full bg-white py-16 px-4 md:px-16 overflow-x-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-10">
        {/* Left: Creative Card */}
        <div className="flex-1 flex flex-col justify-center items-start bg-white/80 rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-[#e1c575] relative overflow-hidden">
          <span className="absolute -top-8 -left-8 w-32 h-32 bg-[#e1c575]/30 rounded-full blur-2xl z-0"></span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2f3a82] mb-4 z-10">Empower Change</h2>
          <p className="mb-6 text-[#2f3a82] text-lg md:text-xl z-10">Your gift fuels hope, outreach, and transformation. Join us in making a difference—one act of kindness at a time.</p>
          <div className="mb-8 z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block w-3 h-3 bg-[#2f3a82] rounded-full"></span>
              <span className="font-semibold text-[#2f3a82]">Online Giving (Secure)</span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block w-3 h-3 bg-[#e1c575] rounded-full"></span>
              <span className="font-semibold text-[#2f3a82]">Bank Transfer</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-3 h-3 bg-[#2f3a82] rounded-full"></span>
              <span className="font-semibold text-[#2f3a82]">In-Person at Services</span>
            </div>
          </div>
          <a href="/giving" className="inline-block bg-gradient-to-r from-[#2f3a82] to-[#e1c575] hover:from-[#e1c575] hover:to-[#2f3a82] text-white hover:text-[#2f3a82] font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 z-10 border-2 border-transparent hover:border-[#2f3a82]">Give Now</a>
        </div>
        {/* Right: Animated/Creative Visual */}
        <div className="flex-1 flex flex-col justify-center items-center relative">
          <div className="relative w-56 h-56 md:w-72 md:h-72 flex items-center justify-center">
            <img src="/logo.png" alt="Giving" className="w-full h-full object-contain rounded-full border-8 border-[#e1c575] shadow-2xl animate-pulse-slow" />
            <span className="absolute -top-6 -right-6 w-20 h-20 bg-[#2f3a82]/20 rounded-full blur-2xl"></span>
            <span className="absolute bottom-0 left-0 w-16 h-16 bg-[#e1c575]/20 rounded-full blur-2xl"></span>
          </div>
          <p className="mt-6 text-[#2f3a82] text-center text-lg font-medium max-w-xs">Thank you for being a vital part of our mission. Your support is changing lives!</p>
        </div>
      </div>
    </section>
  );
};

export default GivingSection;
