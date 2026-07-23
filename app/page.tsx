// Centralized database-driven portfolio homepage layout
import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import Experience from "../sections/Experience";
import Education from "../sections/Education";
import Certificates from "../sections/Certificates";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import { PortfolioProvider } from "../components/PortfolioContext";

export default function Home() {
  return (
    <PortfolioProvider>
      <Navbar />
      <main className="flex-grow flex flex-col w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </PortfolioProvider>
  );
}
