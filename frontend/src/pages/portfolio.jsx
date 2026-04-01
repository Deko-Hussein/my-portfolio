import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ServicesSection from "../components/ServicesSection";
import ProjectsSection from "../components/ProjectsSection";
import Footer from "../components/Footer";
import Home from "./Home";

function Portfolio() {
  return (
    <div className="overflow-x-hidden bg-white-90 dark:bg-black transition-colors duration-500 text-gray-900 dark:text-white">
      <Navbar />

      <main className="transition-colors duration-500">
        <Home />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection />
      </main>

      <Footer/>
    </div>
  );
}

export default Portfolio;