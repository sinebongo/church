"use client";

import React from "react";
import { useContent } from "@/app/context/ContentProvider";
import { useTilt } from "@/hooks/useTilt";

const GivingSection = () => {
  const tilt = useTilt();
  const heading = useContent("giving.heading", "Empower Change");
  const body = useContent(
    "giving.body",
    "In response to the escalating crisis in our society, our organization was pleased to announce that we donated over 120+ blankets to four NGOs in the Vanderbijlpark area in July. This initiative aimed to provide essential support and warmth to those affected, and we are committed to making a positive impact in our community."
  );
  const ctaLabel = useContent("giving.cta_label", "Give Now");
  const image = useContent("giving.image", "/charity.jpg");

  return (
    <section
      id="giving"
      className="w-full bg-gradient-to-br from-white via-[#f9f6ef] to-[#fdf6e3] py-20 px-4 md:px-16 overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-12">
        {/* Left: Message */}
        <div className="flex-1 flex flex-col justify-center items-start p-4 md:p-6 relative overflow-hidden">
          {/* Subtle background accent */}
          <span className="absolute -top-12 -left-12 w-40 h-40 bg-gold/20 rounded-full blur-3xl z-0"></span>
          <span className="absolute top-1/2 left-0 -translate-y-1/2 w-24 h-24 bg-navy/10 rounded-full blur-2xl z-0"></span>
          <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-navy mb-4 z-10 drop-shadow-lg">
            {heading}
          </h2>
          <p className="mb-8 text-navy text-lg md:text-xl z-10 leading-relaxed">
            {body}
          </p>
          <a
            href="/giving"
            className="inline-block bg-gradient-to-r from-navy to-gold hover:from-gold hover:to-navy text-white hover:text-navy font-bold py-3 px-10 rounded-full shadow-xl transition-all duration-300 z-10 border-2 border-transparent hover:border-navy focus:outline-none focus:ring-4 focus:ring-gold/40"
          >
            {ctaLabel}
          </a>
        </div>
        {/* Right: Animated/Creative Visual */}
        <div className="flex-1 flex flex-col justify-center items-center relative">
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            {/* Decorative shapes around the image */}
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold/30 rounded-full blur-3xl z-0"></span>
            <span className="absolute top-14 -left-12 w-24 h-24 bg-navy/20 rounded-full blur-2xl z-0"></span>
            <span className="absolute bottom-10 -right-12 w-28 h-28 bg-gold/20 rounded-full blur-2xl z-0"></span>
            <span className="absolute bottom-2 left-14 w-20 h-20 bg-navy/10 rounded-full blur-2xl z-0"></span>
            {/* Main image */}
            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              style={tilt.style}
              className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-gold shadow-2xl relative z-10 bg-white flex items-center justify-center"
            >
              <img
              src={image}
              alt="Giving"
              className="w-full h-full object-cover"
              loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GivingSection;
