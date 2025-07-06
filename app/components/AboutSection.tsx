'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const AboutSection = () => {
return (
  <div className="flex flex-col md:flex-row items-center justify-center bg-white  text-[#2f3a82] md:h-[90vh] overflow-x-hidden overflow-hidden my-8 px-8 md:px-12 w-full">
    
    {/* Image Section */}
    <motion.div 
      className="w-full md:w-1/2 flex justify-center max-h-[60vh] overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative w-full h-[350px] md:w-[600px] md:h-[450px] rounded-lg overflow-hidden shadow-lg">
      <Image
        src="/CDYL.jpg"
        alt="Church Youth"
        fill
        style={{ objectFit: 'cover', objectPosition: 'top' }}
        priority
      />
      </div>
    </motion.div>
    {/* Message Section */}
    <motion.div 
      className="w-full md:w-1/2 p-8 flex flex-col justify-center"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h1 
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <span className="text-[#e1c575]">Message from the Church</span>
      </motion.h1>
      <motion.p 
        className="mb-4 text-lg leading-relaxed font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
      <span className="font-semibold text-[#e1c575]">Central Diocese Youth League</span> is a dynamic and vibrant organization dedicated to empowering and guiding young people within the Church.
      </motion.p>
      <motion.p 
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        Our mission is to cultivate spiritual growth, leadership, and active participation in the community, all while fostering deep connections with God through worship, prayer, and reflection on His word.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        viewport={{ once: true }}
      >
        The Youth League is structured across several active divisions in the Province of Gauteng including Potchefstroom in the Northwest, ensuring a comprehensive and inclusive approach to youth ministry.
      </motion.p>
      <motion.form 
        action="/about" 
        method="get"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <button
          type="submit"
          className="mt-6 px-6 py-3 bg-[#2f3a82] font-semibold rounded-full shadow hover:bg-[#d4b15c] transition-colors text-white text-lg"
        >
          Learn More
        </button>
      </motion.form>
    </motion.div>
    
  </div>
)
}
