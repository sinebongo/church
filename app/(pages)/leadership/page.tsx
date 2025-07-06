
"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const leadershipTeam = [
  { role: "Deputy Director", name: "Bokamoso Mogedi", img: "/bokamoso.jpg" },
  { role: "Secretary", name: "Obakeng Kgampe", img: "/obakeng.jpg" },
  { role: "Assistant Secretary", name: "Nontobeko Simelane", img: "/nontobeko.jpg" },
  { role: "Treasurer", name: "Obakeng Makgae", img: "/makgae.jpg" },
];

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
              src="/bishop.jpg"
              alt="Rt Rev GA Seane"
              className="w-24 h-24 rounded-full object-cover border-4 border-[#e1c575] mb-4 shadow"
            />
            <h2 className="text-2xl font-bold text-[#2f3a82] mb-1">Rt Rev GA Seane</h2>
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
            <h2 className="text-2xl font-bold text-[#2f3a82] mb-1">Nkagiseng Kgosi Rammekwa</h2>
            <span className="text-base font-medium text-gray-600 mb-2">Director</span>
            <p className="text-[#2f3a82] font-semibold mb-2 text-center">"Test all things; hold fast to what is good." – 1 Thessalonians 5:21</p>
            <p className="max-w-xl text-gray-700 text-center">
              As young believers, we are called to be rooted in Christ, united in faith, and bold in service. The Youth League exists to nurture spiritual growth, encourage fellowship, and empower youth for leadership and outreach. Let us stand firm in truth, transform our communities with Christ’s love, and move forward together in God’s mission.
            </p>
          </div>
        </div>

        {/* Leadership Team Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h3 className="text-3xl font-bold mb-8 text-[#2f3a82] text-center tracking-wide">Leadership Team</h3>
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

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#2f3a82] to-[#e1c575] rounded-lg p-8 mt-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-lg mb-6">
            Be part of a movement that transforms lives and builds faithful leaders for tomorrow.
          </p>
          <Link href="/about" className="bg-white text-[#2f3a82] px-8 py-3 rounded-lg font-semibold hover:bg-[#e1c575]/90 hover:text-white transition-colors">
            Learn More About Us
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 py-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ELCSA Central Diocese Youth League. All rights reserved.
        </footer>
      </div>
    </motion.div>
  );
};

export default LeadershipPage;

