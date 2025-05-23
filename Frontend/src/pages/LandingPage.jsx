import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import MitraSection from "../components/MitraSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import { MarqueeDemo as TestimoniSection } from "../components/TestimoniSection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MitraSection />
      <AboutSection id="about"/>
      <ServicesSection id="services"/>
      <TestimoniSection id="testimoni"/>
      <FaqSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
