import { useState } from "react";
import { LuMoonStar, LuSunMedium } from "react-icons/lu";
import { RiCloseLargeFill, RiMenu3Line } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";

const navLinks = ["about", "skills", "projects", "contact"];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 backdrop-blur-sm md:hidden"
          style={{ background: "var(--overlay)" }}
          onClick={closeMenu}
        />
      )}

      <nav
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300"
        style={{ background: "var(--nav-bg)", borderColor: "var(--nav-border)" }}
      >
        <div className="section-container flex items-center justify-between py-4">
          <a href="#home" className="text-base font-semibold uppercase tracking-[0.2em] text-slate-900 dark:text-slate-100">
            Deko Hussein
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="text-sm text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                {link}
              </a>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-900 transition hover:border-teal-400/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <LuSunMedium size={18} /> : <LuMoonStar size={18} />}
            </button>

            <a href="/login" className="secondary-btn">
              Login
            </a>

            <a href="#projects" className="secondary-btn">
              View Projects
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-900 md:hidden dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <RiCloseLargeFill size={18} /> : <RiMenu3Line size={18} />}
          </button>
        </div>

        {menuOpen && (
          <div className="section-container relative z-50 pb-6 md:hidden">
            <div className="panel px-5 py-5">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link}
                    href={`#${link}`}
                    onClick={closeMenu}
                    className="text-sm capitalize text-slate-700 dark:text-slate-200"
                  >
                    {link}
                  </a>
                ))}

                <div className="mt-2 flex gap-3">
                  <button type="button" onClick={toggleTheme} className="secondary-btn flex-1">
                    {theme === "dark" ? "Light" : "Dark"}
                  </button>
                  <a href="/login" onClick={closeMenu} className="secondary-btn flex-1">
                    Login
                  </a>
                </div>

                <div className="flex gap-3">
                  <a href="#projects" onClick={closeMenu} className="secondary-btn flex-1">
                    View Projects
                  </a>
                  <a href="#contact" onClick={closeMenu} className="primary-btn flex-1">
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
