import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Problems from "../components/landing/Problems";
import Solution from "../components/landing/Solution";
import HowItWorks from "../components/landing/HowItWorks";
import Pricing from "../components/landing/Pricing";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problems />
      <Solution />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}
