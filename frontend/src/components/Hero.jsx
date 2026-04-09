import { useState } from "react";
import { FiArrowRight, FiGithub, FiMapPin } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa6";
import { RiWhatsappLine } from "react-icons/ri";
import { profile } from "../data/portfolio";

const socialIcons = {
  github: FiGithub,
  linkedin: FaLinkedinIn,
  whatsapp: RiWhatsappLine,
};

function Hero() {
  const [showImage, setShowImage] = useState(Boolean(profile.image));
  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-32">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.26))] dark:bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.16),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0),rgba(2,6,23,0.22))]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.16),transparent_42%),radial-gradient(circle_at_right,rgba(14,165,233,0.12),transparent_28%)]" />
      <div className="absolute left-[-8rem] top-32 -z-10 h-56 w-56 rounded-full bg-teal-300/20 blur-3xl dark:bg-teal-400/10" />
      <div className="absolute right-[-5rem] top-20 -z-10 h-64 w-64 rounded-full bg-sky-300/25 blur-3xl dark:bg-cyan-400/10" />

      <div className="section-container section-shell">
        <div className="section-grid items-center lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="relative">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="eyebrow mb-0">{profile.role}</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-white/60 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-slate-700 backdrop-blur dark:bg-slate-950/35 dark:text-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.85)]" />
                AVAILABLE NOW
              </span>
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-slate-950 dark:text-slate-50 md:text-6xl md:leading-[1.02] xl:text-[4.35rem]">
              Building{" "}
              <span className="bg-[linear-gradient(135deg,#0f766e,#06b6d4)] bg-clip-text text-transparent dark:bg-[linear-gradient(135deg,#5eead4,#67e8f9)]">
                clear, scalable
              </span>{" "}
              web products that feel sharp from first click.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300 md:text-xl">
              {profile.intro}
            </p>

            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#projects" className="primary-btn gap-2">
                View Projects
                <FiArrowRight size={16} />
              </a>
              <a href="#contact" className="secondary-btn">
                Contact Me
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/65 px-4 py-2 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
                <FiMapPin size={15} className="text-teal-500 dark:text-teal-300" />
                {profile.location}
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/65 px-4 py-2 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
                {profile.availability}
              </span>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 md:mt-12 md:gap-5">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[28px] border border-slate-200/75 bg-white/70 px-5 py-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/8 dark:bg-white/[0.04] dark:shadow-[0_24px_70px_rgba(2,6,23,0.24)]"
                >
                  <div className="h-1.5 w-16 rounded-full bg-[linear-gradient(135deg,#14b8a6,#06b6d4)]" />
                  <p className="mt-5 text-3xl font-semibold text-slate-950 dark:text-slate-50">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[34px] border border-teal-300/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(241,245,249,0.92))] p-6 shadow-[0_30px_100px_rgba(15,23,42,0.16)] backdrop-blur dark:bg-[linear-gradient(180deg,rgba(10,20,31,0.94),rgba(7,17,26,0.96))] dark:shadow-[0_30px_100px_rgba(2,6,23,0.38)] md:p-8">
            <div className="absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(45,212,191,0.55),transparent)]" />
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl dark:bg-cyan-400/10" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="meta-label">Profile</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-50">
                  {profile.name}
                </h2>
                <p className="mt-2 text-base text-slate-700 dark:text-slate-300">{profile.role}</p>
              </div>

              <div className="overflow-hidden rounded-[26px] border border-teal-300/20 bg-[linear-gradient(135deg,rgba(45,212,191,0.18),rgba(15,23,42,0.08))] shadow-[0_20px_60px_rgba(13,148,136,0.16)]">
                {showImage ? (
                  <img
                    src={profile.image}
                    alt={profile.imageAlt || profile.name}
                    className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                    onError={() => setShowImage(false)}
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center text-2xl font-semibold text-teal-700 dark:text-teal-200 sm:h-28 sm:w-28">
                    {initials}
                  </div>
                )}
              </div>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-[30px] border border-slate-200/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(240,253,250,0.86))] p-3 shadow-[0_24px_70px_rgba(15,23,42,0.08)] dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(15,23,42,0.88),rgba(15,118,110,0.22))]">
              {showImage ? (
                <div className="relative">
                  <img
                    src={profile.image}
                    alt={profile.imageAlt || profile.name}
                    className="h-72 w-full rounded-[22px] object-cover md:h-[24rem]"
                    onError={() => setShowImage(false)}
                  />
                  <div className="absolute inset-x-0 bottom-0 rounded-b-[22px] bg-[linear-gradient(180deg,transparent,rgba(15,23,42,0.82))] p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-200">
                      Product Builder
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">{profile.name}</p>
                    <p className="mt-1 text-sm text-slate-200">{profile.role}</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-72 w-full items-center justify-center rounded-[22px] border border-dashed border-slate-300/80 bg-white/70 px-6 text-center text-sm leading-7 text-slate-500 dark:border-white/15 dark:bg-slate-950/40 dark:text-slate-400">
                  Add your image as `frontend/public/hero.png` and it will appear here automatically.
                </div>
              )}

              <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-white/60 bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/45 dark:text-slate-200">
                Open for work
              </div>
            </div>

            <div className="mt-8 space-y-4 md:space-y-5">
              <div className="rounded-[26px] border border-slate-200/70 bg-[var(--inset)] px-4 py-4 dark:border-white/8">
                <p className="meta-label">Focus</p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {profile.focus.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-teal-300/18 bg-white/80 px-3 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[26px] border border-slate-200/70 bg-[var(--inset)] px-4 py-4 dark:border-white/8">
                  <p className="meta-label">Location</p>
                  <p className="mt-3 flex items-center gap-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    <FiMapPin size={16} className="text-teal-300" />
                    {profile.location}
                  </p>
                </div>

                <div className="rounded-[26px] border border-slate-200/70 bg-[var(--inset)] px-4 py-4 dark:border-white/8">
                  <p className="meta-label">Availability</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    {profile.availability}
                  </p>
                </div>
              </div>

              <div className="rounded-[26px] border border-slate-200/70 bg-[var(--inset)] px-4 py-4 dark:border-white/8">
                <p className="meta-label">Links</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {profile.socialLinks.map((link) => {
                    const Icon = socialIcons[link.type] || FiGithub;
                    const isAnchorLink = link.href.startsWith("#");

                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={isAnchorLink ? undefined : "_blank"}
                        rel={isAnchorLink ? undefined : "noreferrer"}
                        className="secondary-btn gap-2"
                      >
                        <Icon size={16} />
                        {link.label}
                      </a>
                    );
                  })}
                  <a href="#contact" className="secondary-btn">
                    Start a Conversation
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Hero;
