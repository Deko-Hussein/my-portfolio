import { useEffect, useState } from "react";
import API from "../services/api";

function SkillsSection() {
  const [skills, setSkills] = useState([]);

  const experiences = [
    {
      year: "2023 - 2025",
      title: "Full-Stack Developer",
      company: "Freelizin Project",
    },
    {
      year: "2022 - 2024",
      title: "Frontend Developer",
      company: "Personal & Client Projects",
    },
    {
      year: "2021 - 2023",
      title: "UI/UX Designer",
      company: "Independent Work",
    },
  ];

  const education = [
    {
      year: "2022 - Present",
      title: "Bachelor of Computer Science",
      school: "Your University Name",
    },
    {
      year: "2023 - 2024",
      title: "Full-Stack Web Development",
      school: "Online Learning & Practice",
    },
    {
      year: "2021 - 2022",
      title: "UI/UX and Web Design",
      school: "Self Learning Journey",
    },
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/skills");
        setSkills(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
      className="py-24    transition-colors duration-500"
    >
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-3">
            Check My Skills And Work Experiences
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-7">
            A quick overview of my work experience, educational background, and
            technical skills that I use to build modern digital solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="rounded-2xl border border-white/10  p-6 shadow-xl">
            <h3 className="text-xl font-semibold mb-6 ">
              Work Experiences
            </h3>

            <div className="space-y-6">
              {experiences.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-white/10 pb-4 last:border-b-0"
                >
                  <p className="text-sm dark:text-cyan-400 mb-1">{item.year}</p>
                  <h4 className="text-lg font-semibold ">
                    {item.title}
                  </h4>
                  <p className="text-cyan-600 dark:text-cyan-400 text-sm mt-1">{item.company}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
            <h3 className="text-xl font-semibold mb-6 ">Education</h3>

            <div className="space-y-6">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-white/10 pb-4 last:border-b-0"
                >
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 mb-1">{item.year}</p>
                  <h4 className="text-lg font-semibold ">
                    {item.title}
                  </h4>
                  <p className="text-cyan-600 dark:text-cyan-400 text-sm mt-1">{item.school}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white text-gray-900 p-6 md:p-8 shadow-2xl">
            <h3 className="text-xl font-semibold mb-6 text-center">
              My Skills & Advantage
            </h3>

            <div className="space-y-6">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <div key={skill._id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                          {skill.name?.charAt(0)}
                        </div>
                        <h4 className="font-medium text-sm md:text-base">
                          {skill.name}
                        </h4>
                      </div>

                      <span className="text-sm font-semibold text-gray-700">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-orange-500 transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No skills found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;