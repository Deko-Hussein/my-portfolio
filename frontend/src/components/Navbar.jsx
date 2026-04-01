// import { useState } from "react";
// import { useTheme } from "../context/ThemeContext";
// import { IoMdMenu } from "react-icons/io";
// import { RiCloseLargeFill } from "react-icons/ri";
// import { LuSunMoon } from "react-icons/lu";
// import { IoMoonOutline } from "react-icons/io5";

// function Navbar() {
//   const { theme, toggleTheme } = useTheme();
//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleMobileLinkClick = () => {
//     setMenuOpen(false);
//   };

//   return (
//     <>
//       {/* ✅ OVERLAY (mobile menu) */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//           onClick={() => setMenuOpen(false)}
//         />
//       )}

//       <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-xl shadow-sm dark:shadow-black/20 transition-colors duration-300">
//         <div className="section-container flex items-center justify-between py-4">
//           {/* LOGO */}
//           <a
//             href="#home"
//             className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
//           >
//             Defoojaa
//           </a>

//           {/* DESKTOP MENU */}
//           <div className="hidden md:flex items-center gap-8 text-sm text-gray-700 dark:text-gray-300">
//             {["Home","about", "skills", "projects", "contact"].map(
//               (link) => (
//                 <a
//                   key={link}
//                   href={`#${link}`}
//                   className="capitalize hover:text-black dark:hover:text-white transition"
//                 >
//                   {link}
//                 </a>
//               )
//             )}

//             {/* THEME BUTTON */}
//             <button
//               onClick={toggleTheme}
//               type="button"
//               className="flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 bg-white dark:bg-white/5 text-black dark:text-white hover:scale-110 active:scale-95 transition-all duration-200"
//               aria-label="Toggle theme"
//             >
//               {theme === "dark" ? (
//                 <LuSunMoon className="text-yellow-400 text-lg" /> 
//               ) : (
//                 <IoMoonOutline className="text-gray-800 text-lg dark:text-yellow-300" /> 
//               )}
//             </button>

//             {/* ADMIN */}
//             <a
//               href="/login"
//               className="rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
//             >
//               Admin
//             </a>
//           </div>

//           {/* MOBILE MENU BUTTON */}
//           <button
//             type="button"
//             className="md:hidden text-2xl text-black dark:text-white z-50"
//             onClick={() => setMenuOpen((prev) => !prev)}
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? <RiCloseLargeFill /> : <IoMdMenu />}
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         {menuOpen && (
//           <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-gray-700 dark:text-gray-300 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-300 z-50">
//             {["Home", "about","skills", "services", "projects", "contact"].map(
//               (link) => (
//                 <a
//                   key={link}
//                   href={`#${link}`}
//                   onClick={handleMobileLinkClick}
//                   className="capitalize hover:text-black dark:hover:text-white transition"
//                 >
//                   {link}
//                 </a>
//               )
//             )}

//             {/* THEME BUTTON MOBILE */}
//             <button
//               onClick={toggleTheme}
//               type="button"
//               className="flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 bg-white dark:bg-white/5 text-black dark:text-white"
//             >
//               {theme === "dark" ? (
//                 <>
//                   <LuSunMoon className="text-yellow-400 text-lg" />
//                   <span>Light mode</span>
//                 </>
//               ) : (
//                 <>
//                   <IoMoonOutline className="text-gray-800 text-lg dark:text-yellow-300" />
//                   <span>Dark mode</span>
//                 </>
//               )}
//             </button>

//             {/* ADMIN */}
//             <a
//               href="/login"
//               onClick={handleMobileLinkClick}
//               className="hover:text-black dark:hover:text-white transition"
//             >
//               Admin
//             </a>
//           </div>
//         )}
//       </nav>
//     </>
//   );
// }

// export default Navbar;

// Navbar.jsx
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { IoMdMenu } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import { LuSunMoon } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMobileLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-xl shadow-sm dark:shadow-black/20 transition-colors duration-300">
        <div className="section-container flex items-center justify-between py-4">
          <a
            href="#home"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Defoojaa
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-700 dark:text-gray-300">
            {["home", "about", "skills", "projects", "contact"].map(
              (link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className="capitalize hover:text-black dark:hover:text-white transition"
                >
                  {link}
                </a>
              )
            )}

            <button
              onClick={toggleTheme}
              type="button"
              className="flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 bg-white dark:bg-white/5 text-black dark:text-white hover:scale-110 active:scale-95 transition-all duration-200"
            >
              {theme === "dark" ? (
                <LuSunMoon className="text-yellow-400 text-lg" />
              ) : (
                <IoMoonOutline className="text-gray-800 text-lg dark:text-yellow-300" />
              )}
            </button>

            <a
              href="/login"
              className="rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              Admin
            </a>
          </div>

          <button
            type="button"
            className="md:hidden text-2xl text-black dark:text-white z-50"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <RiCloseLargeFill /> : <IoMdMenu />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-gray-700 dark:text-gray-300 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl transition-all duration-300 z-50">
            {["home", "about","skills","projects","contact"].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={handleMobileLinkClick}
                className="capitalize hover:text-black dark:hover:text-white transition"
              >
                {link}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              type="button"
              className="flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 bg-white dark:bg-white/5 text-black dark:text-white"
            >
              {theme === "dark" ? (
                <>
                  <LuSunMoon className="text-yellow-400 text-lg" />
                  <span>Light mode</span>
                </>
              ) : (
                <>
                  <IoMoonOutline className="text-gray-800 text-lg dark:text-yellow-300" />
                  <span>Dark mode</span>
                </>
              )}
            </button>

            <a
              href="/login"
              onClick={handleMobileLinkClick}
              className="hover:text-black dark:hover:text-white transition"
            >
              Admin
            </a>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;