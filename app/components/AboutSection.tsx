'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useContent } from '@/app/context/ContentProvider';
import { Button } from '@/components/ui/button';

export const AboutSection = () => {
  const heading = useContent('about.heading', 'Message from the Church');
  const body1 = useContent('about.body_1', 'Central Diocese Youth League is a dynamic and vibrant organization dedicated to empowering and guiding young people within the Church.');
  const body2 = useContent('about.body_2', 'Our mission is to cultivate spiritual growth, leadership, and active participation in the community, all while fostering deep connections with God through worship, prayer, and reflection on His word.');
  const body3 = useContent('about.body_3', 'The Youth League is structured across several active divisions in the Province of Gauteng including Potchefstroom in the Northwest, ensuring a comprehensive and inclusive approach to youth ministry.');
  const ctaLabel = useContent('about.cta_label', 'Learn More');
return (
  <div className="flex flex-col md:flex-row items-center justify-center bg-white  text-navy md:h-[90vh] overflow-x-hidden overflow-hidden my-8 px-8 md:px-12 w-full">
    
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
        className="font-serif text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <span className="text-gold">{heading}</span>
      </motion.h1>
      <motion.p
        className="mb-4 text-lg leading-relaxed font-semibold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
      {body1}
      </motion.p>
      <motion.p
        className="mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        {body2}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        viewport={{ once: true }}
      >
        {body3}
      </motion.p>
      <motion.form
        action="/about"
        method="get"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <Button type="submit" size="lg" className="mt-6 bg-navy hover:bg-gold-dark">
          {ctaLabel}
        </Button>
      </motion.form>
    </motion.div>
    
  </div>
)
}
