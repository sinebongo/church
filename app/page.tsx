import { AboutSection } from "./components/AboutSection";
import { EventSection } from "./components/EventSection";
import { Hero } from "./components/Hero";

import GivingSection from "./components/GivingSection";
import LeadershipSection from "./components/LeadershipSection";

import ContactSection from "./components/ContactSection";
import { Background3D } from "./components/Background3D";
import { FaInstagram, FaYoutube } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <EventSection />
      <GivingSection />
      <LeadershipSection />
      {/* Social Media Section */}
      <section className="relative w-full py-8 px-4 bg-gradient-to-br from-navy to-blue-600 text-white text-center overflow-hidden">
        <Background3D variant="sparkles" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <a href="https://www.instagram.com/elcsacdyl/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition">
              <FaInstagram className="text-2xl" /> <span className="hidden sm:inline">Instagram:</span> @ELCSACDYL
            </a>
            <a href="https://www.youtube.com/@ELCSACentralDioceseYouthLeague" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition">
              <FaYoutube className="text-2xl" /> <span className="hidden sm:inline">YouTube:</span> @ ELCSA Central Diocese Youth League
            </a>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
