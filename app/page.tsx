import About from "./(pages)/about/page";
import { AboutSection } from "./components/AboutSection";
import { EventSection } from "./components/EventSection";
import { Hero } from "./components/Hero";

import GivingSection from "./components/GivingSection";
import LeadershipSection from "./components/LeadershipSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
   <>
   <Hero/>
  <AboutSection/>
  <EventSection/>
  <GivingSection/>
  <LeadershipSection/>
  <ContactSection/>
   </>
  );
}
