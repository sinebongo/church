
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { leadershipTeam, additionalleaders } from "../../services/data";
import ChurchMembersList from "@/app/components/ChurchMembersList";



const LeadershipPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#2f3a82] mb-4">Leadership</h1>
          <div className="w-24 h-1 bg-[#e1c575] mx-auto"></div>
        </div>

        {/* Bishop & Director Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bishop */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center border-2 border-[#2f3a82]/10">
            <img
              src="/bishop.png"
              alt="Rt Rev GA Seane"
              className="w-24 h-24 rounded-full object-cover border-4 border-[#e1c575] mb-4 shadow"
            />
            <h2 className="text-lg md:text-2xl font-bold text-[#2f3a82] mb-1">Rt Rev GA Seane</h2>
            <span className="text-base font-medium text-gray-600 mb-2">Bishop</span>
            <blockquote className="italic text-gray-700 mb-2 border-l-4 border-[#e1c575] pl-4">
              “Beloved in Christ, as we journey together in faith, let us remember that our strength is found in unity and our hope in Christ alone. May the Lord guide and bless each of you as you serve with humility, love, and unwavering faith. Together, let us be a light to the world, steadfast in prayer and bold in our witness. Remain rooted in grace and let your lives reflect the love of our Savior.”
            </blockquote>
            <p className="text-sm text-gray-500">— Rt Rev GA Seane</p>
          </div>
          {/* Director */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center border-2 border-[#2f3a82]/10">
            <img
              src="/kgosi.jpg"
              alt="Nkagiseng Kgosi Rammekwa"
              className="w-24 h-24 rounded-full object-cover border-4 border-[#2f3a82] mb-4 shadow"
            />
            <h2 className="text-lg md:text-2xl font-bold text-[#2f3a82] mb-1">Nkagiseng Rammekwa</h2>
            <span className="text-base font-medium text-gray-600 mb-2">Director</span>
            <p className="text-[#2f3a82] font-semibold mb-2 text-center">"Test all things; hold fast to what is good." – 1 Thessalonians 5:21</p>
            <p className="max-w-xl text-gray-700 text-center">
              As young believers, we are called to be rooted in Christ, united in faith, and bold in service. The Youth League exists to nurture spiritual growth, encourage fellowship, and empower youth for leadership and outreach. Let us stand firm in truth, transform our communities with Christ’s love, and move forward together in God’s mission.
            </p>
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-3xl font-bold mb-8 text-[#2f3a82] text-center tracking-wide">Executive Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {leadershipTeam.map((member, idx) => (
              <div key={member.name} className="flex flex-col items-center gap-2 p-6 rounded-2xl shadow min-w-[180px] bg-gray-50 border-2 border-[#2f3a82]/10">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover border-2 shadow mb-2"
                  style={{ borderColor: idx % 2 === 0 ? '#e1c575' : '#2f3a82' }}
                />
                <span className="font-semibold text-[#2f3a82] text-lg text-center">{member.name}</span>
                <div className="text-sm text-gray-500 text-center">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
          {/* Leadership Team Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-3xl font-bold mb-8 text-[#2f3a82] text-center tracking-wide">Additional Leadership Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {additionalleaders.map((member, idx) => (
              <div key={member.name} className="flex flex-col items-center gap-2 p-6 rounded-2xl shadow min-w-[180px] bg-gray-50 border-2 border-[#2f3a82]/10">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover border-2 shadow mb-2"
                  style={{ borderColor: idx % 2 === 0 ? '#e1c575' : '#2f3a82' }}
                />
                <span className="font-semibold text-[#2f3a82] text-lg text-center">{member.name}</span>
                <div className="text-sm text-gray-500 text-center">{member.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Church Members Section */}
        <div className="relative bg-gradient-to-r from-[#2f3a82] via-[#e1c575]/60 to-[#e1c575] rounded-3xl p-10 mt-16 shadow-xl overflow-hidden">
          {/* Decorative SVGs */}
          <svg className="absolute top-0 left-0 w-32 h-32 opacity-20" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="50" fill="#e1c575" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-40 h-40 opacity-10" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" rx="30" fill="#2f3a82" />
          </svg>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg tracking-tight bg-gradient-to-r from-[#e1c575] via-white to-[#2f3a82] bg-clip-text text-transparent">
              Our Church Members
            </h2>
            <p className="text-lg text-center mb-8 text-white/90 font-light">
              United in faith, diverse in gifts — together we shine brighter. Meet the heart of our community!
            </p>
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: "backOut" }}
                viewport={{ once: true }}
                className="w-full"
              >
                <ChurchMembersList />
              </motion.div>
            </div>
          </div>
        </div>

        <footer className="mt-10 text-center text-gray-400 text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} Pretoria Circuit. All rights reserved.
        </footer>
      </div>
    </motion.div>
  );
};

export default LeadershipPage;

