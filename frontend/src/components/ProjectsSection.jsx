import { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const currentProject = useMemo(() => {
    if (!projects.length) return null;
    return projects[currentIndex];
  }, [projects, currentIndex]);

  const handlePrev = () => {
    if (!projects.length) return;
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (!projects.length) return;
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="projects"
      className="py-24 transition-colors duration-500"
    >
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
            Projects
          </h2>
          <p className="text-sm md:text-base text-cyan-700 dark:text-cyan-300">
            Most recent work
          </p>
        </div>

        {!currentProject ? (
          <div className="text-center text-gray-500 dark:text-gray-300">
            No projects found.
          </div>
        ) : (
          <div className="relative max-w-6xl mx-auto">
            <button
              onClick={handlePrev}
              className="absolute left-[-18px] md:left-[-28px] top-[35%] z-20 w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition"
              aria-label="Previous project"
            >
              <FiChevronLeft className="text-2xl" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-[-18px] md:right-[-28px] top-[35%] z-20 w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition"
              aria-label="Next project"
            >
              <FiChevronRight className="text-2xl" />
            </button>

            <div className="rounded-[22px] overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 transition-colors duration-500">
              <div className="relative">
                <img
                  src={
                    currentProject.image ||
                    "https://via.placeholder.com/1200x650?text=Project+Preview"
                  }
                  alt={currentProject.title}
                  className="w-full h-[260px] md:h-[430px] object-cover"
                />
               
              </div>
            </div>

            {/* Project Info */}
            <div className="text-center mt-10">
              <h3 className="text-3xl md:text-5xl font-bold mb-5 text-gray-900 dark:text-white">
                {currentProject.title}
              </h3>

              <p className="text-gray-700 dark:text-gray-300 text-base md:text-2xl max-w-4xl mx-auto leading-8 md:leading-10">
                {currentProject.description}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    GitHub Repository
                    <FiExternalLink />
                  </a>
                )}

                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    See Live
                    <FiExternalLink />
                  </a>
                )}
              </div>

              <div className="mt-8 flex justify-center gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    type="button"
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-blue-500"
                        : "w-2.5 bg-gray-400 dark:bg-white/20 hover:bg-gray-500 dark:hover:bg-white/40"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;