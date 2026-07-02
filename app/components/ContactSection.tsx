"use client";

import React from "react";
import { useContent } from "@/app/context/ContentProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Background3D } from "./Background3D";

const ContactSection = () => {
  const heading = useContent("contact.heading", "Contact Us");
  const intro = useContent("contact.intro", "We would love to hear from you! Reach out with any questions or comments.");
  const phone = useContent("contact.phone", "+27 (11) 930-3555");
  const email = useContent("contact.email", "elcsa.cdpyl@gmail.com");

  return (
    <section id="contact" className="relative w-full py-16 px-4 bg-gradient-to-br from-navy to-navy-dark overflow-x-hidden">
      <Background3D variant="spheres" intensity="subtle" />
      <div className="relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white text-center mb-8">{heading}</h2>
        <p className="mb-4 text-white/80 text-center text-lg">{intro}</p>
        <p className="mb-8 text-white/80 text-center text-lg font-semibold">
          <span>Phone: </span>
          <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="underline">{phone}</a>
        </p>
        <form className="flex flex-col gap-4 max-w-xl mx-auto">
          <Input type="text" placeholder="Your Name" className="bg-white" />
          <Input type="email" placeholder={email} className="bg-white" />
          <Textarea placeholder="Your Message" rows={4} className="bg-white" />
          <Button type="submit" className="bg-gold text-navy hover:bg-white">Send Message</Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
