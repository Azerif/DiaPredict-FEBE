import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MitraSection from "../components/MitraSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import { MarqueeDemo as TestimoniSection } from "../components/TestimoniSection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import ObserverProvider from "../lib/ObserverProvider";

const LandingPage = () => {
  return (
    <ObserverProvider>
      <Navbar />
      <HeroSection />
      <MitraSection />
      <AboutSection id="about" />
      <ServicesSection id="services" />
      <TestimoniSection id="testimoni" />
      <FaqSection />
      <Footer />
    </ObserverProvider>
  );
};

export default LandingPage;
