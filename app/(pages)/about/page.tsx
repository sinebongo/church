

"use client";

import { motion } from "framer-motion";
import DownloadButton from "../../components/DownloadButton";

export default function About() {
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
          <h1 className="text-5xl font-bold text-[#2f3a82] mb-4">About Us</h1>
          <div className="w-24 h-1 bg-[#e1c575] mx-auto"></div>
        </div>

        {/* Introduction Section */}
        <div className=" mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            The Central Diocese Youth League is a dynamic and vibrant organization dedicated to empowering and guiding young people within the Church. Our mission is to cultivate spiritual growth, leadership, and active participation in the community, all while fostering deep connections with God through worship, prayer, and reflection on His word.
          </p>
        </div>

        {/* Circuits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-[#2f3a82] mb-6 text-center">Our Circuits</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            The Youth League is structured across several active divisions in the Province of Gauteng including Potchefstroom in the Northwest, ensuring a comprehensive and inclusive approach to youth ministry:
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border-2 border-[#2f3a82]/10 hover:border-[#2f3a82]/30">
              <div className="w-12 h-12 bg-[#2f3a82] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a82] mb-2">Western Part</h3>
              <p className="text-gray-700 font-medium mb-3">Western Circuit</p>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p>7272 Mzinto Street,</p>
                <p>Kagiso 2,</p>
                <p>1754</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border-2 border-[#2f3a82]/10 hover:border-[#2f3a82]/30">
              <div className="w-12 h-12 bg-[#2f3a82] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a82] mb-2">Eastern Part</h3>
              <p className="text-gray-700 font-medium mb-3">Eastern Circuit</p>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p>820 Kubedi Street</p>
                <p>Vosloorus</p>
                <p>Boksburg</p>
                <p>1475</p>    </div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border-2 border-[#2f3a82]/10 hover:border-[#2f3a82]/30">
           
              <div className="w-12 h-12 bg-[#2f3a82] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a82] mb-2">Central Part</h3>
              <p className="text-gray-700 font-medium mb-3">Soweto Circuit</p>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p>7349 Martinus Smith Dr</p>
                <p>Diepkloof Zone 4</p>
                <p>Soweto</p>
                <p>1862</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border-2 border-[#2f3a82]/10 hover:border-[#2f3a82]/30">
              <div className="w-12 h-12 bg-[#2f3a82] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a82] mb-2">Northern Part</h3>
              <p className="text-gray-700 font-medium mb-3">Pretoria Circuit</p>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p>01 Sompane street,</p>
                <p>Atteridgeville</p>
                <p>PO Box 47 Atteridgeville</p>
                <p>0008</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow border-2 border-[#2f3a82]/10 hover:border-[#2f3a82]/30">
              <div className="w-12 h-12 bg-[#2f3a82] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#2f3a82] mb-2">Southern Part</h3>
              <p className="text-gray-700 font-medium mb-3">Southern Mission Circuit</p>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p>12597 - 12593 Boleu St</p>
                <p>Sebokeng Unit 11, Sebokeng</p>
                <p>1983</p>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 mt-8 text-center">
            Each of these circuits plays a vital role in uniting youth across the Diocese (Province of Gauteng), promoting shared experiences, and providing opportunities for growth in faith, leadership, and service. Through our collective efforts, we aim to nurture a new generation of responsible, faith-filled leaders who contribute to the growth of the Church and the betterment of society.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#2f3a82]/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#2f3a82] rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#2f3a82]">Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to guide, inspire, and lead the youth within the Church, fostering growth in love, patience, and faith in Christ through worship and the study of God's word. We aim to create a space for reflection on the Christian faith, encouraging youth to apply it to their daily lives. By taking active roles in church responsibilities, we nurture leadership qualities and equip our members to lead others to Christ. Through physical, mental, and spiritual growth, we encourage responsibility within both the family and community, striving for the values of peace, justice, freedom, and righteousness as taught in the Kingdom of God.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-[#2f3a82]/10">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#e1c575] rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-[#2f3a82]">Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              We envision a community where young people are empowered to become faithful, responsible, and compassionate leaders who reflect the teachings of Christ in their actions. Through regular prayer, participation, and a commitment to spiritual growth, we aim to foster a strong, vibrant church that spreads the love of Christ and works towards the progress of God's Kingdom on earth.
            </p>
          </div>
        </div>
        {/* Downloadable Documents Section */}
        <div className="bg-gradient-to-r from-[#2f3a82] to-[#2f3a82]/80 rounded-lg p-8 mt-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Downloadable Documents</h2>
          <p className="text-lg mb-6">
            Access important documents and resources for the Central Diocese Youth League.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-4">
            <DownloadButton href="/documents/CCDYL_SOCIAL_MEDIA_ANNOUNCEMENT.pdf">
              Social Media Announcement
            </DownloadButton>
            <DownloadButton href="/documents/elcsa_by-laws_20102-edited-09-2011.pdf">
              ELCSA Youth League By-Laws (2010/2011)
            </DownloadButton>
            <DownloadButton href="/documents/ELCSA-CONSTITUTION-AMMENDED-SEPTEMBER-2011-THE-FINAL-ONE-WITHOUTH-SIGNATURES-PAGE-3-.pdf">
              ELCSA Constitution (Amended September 2011)
            </DownloadButton>
            <DownloadButton href="/documents/Probation_Booklet_DC-3_011837.pdf">
              Probation Booklet
            </DownloadButton>
            <DownloadButton href="/documents/Signed_ELCSA_Youth_League_Constitution-1.pdf">
              Signed ELCSA Youth League Constitution
            </DownloadButton>
          </div>
        </div>
          <footer className="mt-10 text-center text-gray-400 text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} ELCSA CDYL. All rights reserved.
      </footer>
      </div>
    </motion.div>
  );
}