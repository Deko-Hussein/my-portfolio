import { profile, strengths } from "../data/portfolio";

function AboutSection() {
  return (
    <section id="about" className="section-shell">
      <div className="section-container">
        <div className="section-grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)]">
          <div className="panel card-pad">
            <div className="section-header mb-0">
              <span className="eyebrow">About</span>
              <h2 className="section-title">Focused on useful products, not noise.</h2>
              <p className="section-copy">
                I am a full-stack developer who enjoys building clean interfaces and dependable backend systems.
                My work is strongest where product clarity, technical structure, and real-world usefulness need to
                meet in the same place.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <p className="meta-label">Core stack</p>
                <p className="mt-3 text-base leading-8 text-slate-700 dark:text-slate-300">
                  React, Tailwind CSS, Node.js, Spring Boot, REST APIs, MongoDB, PostgreSQL, and MySQL.
                </p>
              </div>

              <div>
                <p className="meta-label">Value</p>
                <p className="mt-3 text-base leading-8 text-slate-700 dark:text-slate-300">
                  I help turn ideas into structured digital products that are easier to use, easier to maintain, and
                  ready to scale with the team behind them.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-teal-300/14 bg-teal-300/6 px-5 py-5">
              <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">{profile.location}</p>
            </div>
          </div>

          <div className="grid gap-5 md:gap-6">
            {strengths.map((item) => (
              <article key={item.title} className="panel p-6 md:p-7">
                <p className="meta-label">Strength</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-slate-50">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-400">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
