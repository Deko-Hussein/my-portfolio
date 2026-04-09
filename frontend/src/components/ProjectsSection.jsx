import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import useLiveCollection from "../hooks/useLiveCollection";

const heroImage = "/hero.png";

function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { items: projects, loading } = useLiveCollection("/projects");

  useEffect(() => {
    if (currentIndex > projects.length - 1) {
      setCurrentIndex(0);
    }
  }, [projects, currentIndex]);

  const currentProject = useMemo(() => {
    if (!projects.length) return null;

    const activeProject = projects[currentIndex];
    const bannerTitle = activeProject.bannerTitle || activeProject.title;
    const bannerCopy = activeProject.bannerCopy || activeProject.description;

    return {
      ...activeProject,
      label: activeProject.featured ? "Featured Project" : "Project Showcase",
      bannerTitle,
      bannerCopy,
      hasBannerContent:
        bannerTitle !== activeProject.title || bannerCopy !== activeProject.description,
      image: activeProject.image || heroImage,
      stack: activeProject.techStack || [],
      outcome: activeProject.outcome || activeProject.description,
      githubUrl: activeProject.githubUrl || "#",
      liveUrl: activeProject.liveUrl || "#",
    };
  }, [projects, currentIndex]);

  const showPrevious = () => {
    if (!projects.length) return;
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const showNext = () => {
    if (!projects.length) return;
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="projects" className="section-shell">
      <div className="section-container">
        <div className="section-header">
          <span className="eyebrow">Projects</span>
          <h2 className="section-title">Projects pulled directly from my backend.</h2>
          <p className="section-copy">
            This showcase auto-refreshes from the API, so adding a new project in the dashboard updates the portfolio
            without editing frontend code or manually refreshing the page.
          </p>
        </div>

        {loading ? (
          <div className="panel card-pad text-center text-slate-600 dark:text-slate-400">
            Loading projects...
          </div>
        ) : !currentProject ? (
          <div className="panel card-pad text-center text-slate-600 dark:text-slate-400">
            No projects found in the backend yet.
          </div>
        ) : (
        <div className="relative">
          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-0 top-[13rem] z-20 hidden h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-[0_18px_40px_rgba(34,211,238,0.25)] transition hover:bg-cyan-400 lg:flex"
            aria-label="Previous project"
          >
            <FiArrowLeft size={24} />
          </button>

          <button
            type="button"
            onClick={showNext}
            className="absolute right-0 top-[13rem] z-20 hidden h-14 w-14 translate-x-1/2 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-[0_18px_40px_rgba(34,211,238,0.25)] transition hover:bg-cyan-400 lg:flex"
            aria-label="Next project"
          >
            <FiArrowRight size={24} />
          </button>

          <div className="overflow-hidden rounded-[34px] border border-slate-200/70 bg-white/75 shadow-[0_28px_100px_rgba(2,6,23,0.12)] dark:border-white/8 dark:bg-slate-900/70 dark:shadow-[0_28px_100px_rgba(2,6,23,0.28)]">
            <div className="overflow-hidden">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="h-[22rem] w-full object-cover md:h-[28rem]"
              />
            </div>

            <div className="px-6 py-10 md:px-16 md:py-12">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <p className="meta-label">{currentProject.label}</p>

                {currentProject.hasBannerContent && (
                  <>
                    <h3 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-slate-50 md:text-5xl">
                      {currentProject.bannerTitle}
                    </h3>

                    <p className="mt-5 max-w-4xl text-base leading-8 text-slate-600 dark:text-slate-400 md:text-xl">
                      {currentProject.bannerCopy}
                    </p>
                  </>
                )}

                <h3 className={`${currentProject.hasBannerContent ? "mt-8" : "mt-4"} text-4xl font-semibold text-slate-950 dark:text-slate-50 md:text-6xl`}>
                  {currentProject.title}
                </h3>

                <p className="mt-6 max-w-4xl text-lg leading-9 text-slate-600 dark:text-slate-400 md:text-2xl">
                  {currentProject.description}
                </p>

                <div className="mt-7 flex flex-wrap justify-center gap-2">
                  {currentProject.stack.map((item) => (
                    <span key={item} className="badge">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
                  <a href={currentProject.githubUrl} className="primary-btn gap-2">
                    GitHub Repository
                    <FiArrowUpRight size={18} />
                  </a>
                  <a href={currentProject.liveUrl} className="primary-btn gap-2">
                    See Live
                    <FiArrowUpRight size={18} />
                  </a>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-3">
                {projects.map((project, index) => (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-3 rounded-full transition-all ${
                      currentIndex === index
                        ? "w-10 bg-cyan-400"
                        : "w-3 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
                    }`}
                    aria-label={`Go to ${project.title}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4 lg:hidden">
            <button
              type="button"
              onClick={showPrevious}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-slate-950"
              aria-label="Previous project"
            >
              <FiArrowLeft size={20} />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-slate-950"
              aria-label="Next project"
            >
              <FiArrowRight size={20} />
            </button>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
