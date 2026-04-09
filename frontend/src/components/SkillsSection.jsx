import useLiveCollection from "../hooks/useLiveCollection";

const skillCategories = ["Frontend", "Backend", "Database", "Other Skills", "Tools"];

function SkillsSection() {
  const { items: skills, loading } = useLiveCollection("/skills");

  const groupedSkills = skillCategories.map((category) => ({
    category,
    items: skills.filter((skill) => (skill.category || "Tools") === category),
  }));

  return (
    <section id="skills" className="section-shell">
      <div className="section-container">
        <div className="section-header">
          <span className="eyebrow">Skills</span>
          <h2 className="section-title">Skills managed from the backend.</h2>
          <p className="section-copy">
            Skills are grouped by category and auto-refresh from the API, so dashboard updates appear here without a
            manual page refresh.
          </p>
        </div>

        {loading ? (
          <div className="panel card-pad text-center text-slate-600 dark:text-slate-400">
            Loading skills...
          </div>
        ) : skills.length === 0 ? (
          <div className="panel card-pad text-center text-slate-600 dark:text-slate-400">
            No skills found in the backend yet.
          </div>
        ) : (
          <div className="section-grid md:grid-cols-2 xl:grid-cols-4">
            {groupedSkills.map((group) => (
              <article key={group.category} className="panel card-pad">
                <p className="meta-label">{group.category}</p>

                {group.items.length === 0 ? (
                  <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    No skills added yet.
                  </p>
                ) : (
                  <div className="mt-5 space-y-4">
                    {group.items.map((skill) => (
                      <div key={skill._id}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-50">
                            {skill.name}
                          </h3>
                          <span className="text-xs font-semibold text-teal-700 dark:text-teal-200">
                            {skill.level}%
                          </span>
                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-500"
                            style={{ width: `${skill.level || 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SkillsSection;
