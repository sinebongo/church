"use client";
import React from 'react';
import { motion } from "framer-motion";

export default function Giving() {
  const [showBankDetails, setShowBankDetails] = React.useState(false);

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
          <h1 className="text-5xl font-bold text-[#2f3a82] mb-4">Tithing & Giving</h1>
          <div className="w-24 h-1 bg-[#e1c575] mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            "Honor the Lord with your wealth and with the firstfruits of all your produce" - Proverbs 3:9
          </p>
        </div>

        {/* Introduction Section */}
        <div className="p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2f3a82] mb-4">Your Generosity Makes a Difference</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At the Demarcation Central Diocese Youth League, we believe that giving is an act of worship and trust in God. 
              Your generous contributions help us continue our mission of empowering young people, building strong communities, 
              and spreading God's love throughout our circuits.
            </p>
          </div>
        </div>

        {/* Why We Give Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#2f3a82] mb-6 text-center">Why We Give</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2f3a82] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2f3a82] mb-2">Worship & Obedience</h3>
                  <p className="text-gray-700">Giving is a form of worship that demonstrates our trust in God's provision and our obedience to His word.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2f3a82] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2f3a82] mb-2">Supporting Ministry</h3>
                  <p className="text-gray-700">Your gifts directly support youth programs, community outreach, and ministry activities across our circuits.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2f3a82] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2f3a82] mb-2">Building Community</h3>
                  <p className="text-gray-700">Together, we build stronger communities and create lasting impact in the lives of young people.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#2f3a82] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2f3a82] mb-2">Advancing God's Kingdom</h3>
                  <p className="text-gray-700">Every gift helps advance God's kingdom and brings hope to those who need it most.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ways to Give Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#2f3a82] mb-8 text-center">Ways to Give</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Online Giving */}
            <div className="bg-gradient-to-br from-[#2f3a82] to-[#4a5ba8] text-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Online Giving</h3>
              <p className="text-white/90 mb-4">Give securely online using your bank account or credit card</p>
              <a href='./contact' className="bg-white text-[#2f3a82] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Give Online
              </a>
            </div>

            {/* Bank Transfer */}
            <div className="flip-card">
              <div className={`flip-card-inner ${showBankDetails ? 'flipped' : ''}`}> 
                {/* Front Side */}
                <div className="flip-card-front card-content">
                  <div className="w-16 h-16 bg-[#2f3a82] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#2f3a82] mb-3">Bank Transfer</h3>
                  <p className="text-gray-700 mb-4">Make a direct bank transfer to our church account</p>
                  <button
                    className="bg-[#2f3a82] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2f3a82]/90 transition-colors"
                    onClick={() => setShowBankDetails(true)}
                  >
                    Bank Details
                  </button>
                </div>
                {/* Back Side */}
                <div className="flip-card-back card-content">
                  <h4 className="text-lg font-bold text-[#2f3a82] mb-2">Church Bank Details</h4>
                  <p className="text-gray-700"><span className="font-semibold">Bank Name:</span> Standard Bank</p>
                  <p className="text-gray-700"><span className="font-semibold">Account Name:</span> Marketlink Business</p>
                  <p className="text-gray-700"><span className="font-semibold">Account Number:</span> 000 0001 37371675</p>
                  <p className="text-gray-700"><span className="font-semibold">Branch Code:</span> 21019</p>
                  <button
                    className="bg-[#2f3a82] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2f3a82]/90 transition-colors mt-4"
                    onClick={() => setShowBankDetails(false)}
                  >
                    Hide Details
                  </button>
                </div>
              </div>
              <style>{`
                .flip-card {
                  background-color: transparent;
                  width: 100%;
                  height: 100%;
                  perspective: 1000px;
                  min-height: 340px;
                  display: flex;
                  align-items: stretch;
                }
                .flip-card-inner {
                  width: 100%;
                  height: 100%;
                  transition: transform 0.7s cubic-bezier(.4,2,.3,1);
                  transform-style: preserve-3d;
                  position: relative;
                }
                .card-content {
                  background: white;
                  border-radius: 0.75rem;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                  border: 2px solid #2f3a8233;
                  padding: 1.5rem;
                  text-align: center;
                  min-height: 340px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  backface-visibility: hidden;
                }
                .flip-card-back {
                  background: #f9f9f9;
                  border: 1px solid #2f3a8233;
                  transform: rotateY(180deg);
                }
                .flipped {
                  transform: rotateY(180deg);
                }
              `}</style>
            </div>

            {/* In-Person Giving */}
            <div className="bg-white border-2 border-[#2f3a82]/20 rounded-lg p-6 text-center hover:shadow-lg transition-shadow hover:border-[#2f3a82]/40">
              <div className="w-16 h-16 bg-[#2f3a82] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a82] mb-3">In-Person Giving</h3>
              <p className="text-gray-700 mb-4">Bring your offering during church services or events</p>
              <a href='/about' className="bg-[#2f3a82] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#2f3a82]/90 transition-colors">
                Visit Us
              </a>
            </div>
          </div>
        </div>

        {/* Tithing Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#2f3a82] mb-6 text-center">Understanding Tithing</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-[#2f3a82] mb-4">What is a Tithe?</h3>
              <p className="text-gray-700 mb-4">
                A tithe is 10% of your income given to God through the church. It's a biblical principle that acknowledges 
                God as the source of all our blessings and demonstrates our trust in His provision.
              </p>
              <blockquote className="border-l-4 border-[#e1c575] pl-4 italic text-gray-600 mb-4">
                "Bring the full tithe into the storehouse, that there may be food in my house. And thereby put me to the test, 
                says the Lord of hosts, if I will not open the windows of heaven for you and pour down for you a blessing 
                until there is no more need." - Malachi 3:10
              </blockquote>
            </div>
            <div className="bg-gradient-to-br from-[#2f3a82]/10 to-[#e1c575]/10 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-[#2f3a82] mb-4">Benefits of Tithing</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#e1c575] rounded-full"></span>
                  <span>Demonstrates faith and obedience</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#e1c575] rounded-full"></span>
                  <span>Invites God's blessings into your life</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#e1c575] rounded-full"></span>
                  <span>Supports the work of the church</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#e1c575] rounded-full"></span>
                  <span>Develops a generous heart</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#e1c575] rounded-full"></span>
                  <span>Helps break the spirit of greed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Special Offerings */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#2f3a82] mb-6 text-center">Special Offerings</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#2f3a82]/5 to-[#e1c575]/5 rounded-lg p-6 border border-[#2f3a82]/20">
              <h3 className="text-xl font-semibold text-[#2f3a82] mb-3">Youth Ministry</h3>
              <p className="text-gray-700 mb-4">Support youth programs, camps, and leadership development initiatives.</p>
              <button className="text-[#2f3a82] font-semibold hover:underline">Learn More →</button>
            </div>
            <div className="bg-gradient-to-br from-[#2f3a82]/5 to-[#e1c575]/5 rounded-lg p-6 border border-[#2f3a82]/20">
              <h3 className="text-xl font-semibold text-[#2f3a82] mb-3">Community Outreach</h3>
              <p className="text-gray-700 mb-4">Help us reach out to the community with food drives and assistance programs.</p>
              <button className="text-[#2f3a82] font-semibold hover:underline">Learn More →</button>
            </div>
            <div className="bg-gradient-to-br from-[#2f3a82]/5 to-[#e1c575]/5 rounded-lg p-6 border border-[#2f3a82]/20">
              <h3 className="text-xl font-semibold text-[#2f3a82] mb-3">Building Fund</h3>
              <p className="text-gray-700 mb-4">Contribute to facility improvements and expansion projects.</p>
              <button className="text-[#2f3a82] font-semibold hover:underline">Learn More →</button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-[#2f3a82] to-[#4a5ba8] text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Giving?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            We're here to help! If you have any questions about tithing, giving, or would like to speak with someone 
            about your contribution, please don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-[#2f3a82] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Contact Us
            </a>
            
          </div>
        </div>
      </div>
    </motion.div>
  );
}