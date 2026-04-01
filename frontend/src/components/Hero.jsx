import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 bg-gradient-to-b from-gray-100 to-white dark:from-[#0a0a0a] dark:to-[#111] overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full"></div>

      <div className="section-container flex flex-col md:flex-row items-center gap-12 relative z-10">

        {/* SOCIAL ICONS LEFT */}
        <div className="hidden md:flex flex-col gap-4">
          <a
            href="https://github.com/Deko-Hussein"
            target="_blank"
            rel="noreferrer"
            className="p-3 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-md hover:bg-cyan-500 hover:text-white transition duration-300"
          >
            <FaGithub size={18} />
          </a>
          <a
            href="#"
            className="p-3 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-md hover:bg-cyan-500 hover:text-white transition duration-300"
          >
            <FaLinkedin size={18} />
          </a>
          <div className="w-[2px] h-10 bg-gray-300 dark:bg-white/20 mx-auto"></div>
        </div>

        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <p className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-600 dark:text-cyan-300">
            Full Stack Developer
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            I build scalable
            <span className="text-cyan-600 dark:text-cyan-400"> digital systems </span>
            that solve real-world problems.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-8 max-w-2xl mb-8">
            Full-Stack Developer & UI/UX Designer building modern, high-performance and user-friendly applications using React, Spring Boot, and modern technologies.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="relative inline-flex items-center justify-center px-6 py-3 font-semibold text-white rounded-xl bg-cyan-600 overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition duration-300"></span>
              <span className="relative z-10">View Projects</span>
            </a>
            <a
              href="#contact"
              className="px-6 py-3 font-semibold rounded-xl border border-gray-300 dark:border-white/20 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition duration-300"
            >
              Contact Me
            </a>
          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">15+</h3>
              <p>Projects</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">10+</h3>
              <p>Technologies</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2+</h3>
              <p>Years Experience</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="card-ui p-8 w-full max-w-md rounded-3xl shadow-lg bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10">
            <div className="h-[420px] rounded-[24px] flex items-center justify-center">
              <div className="text-center">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="mx-auto h-32 w-32 rounded-full object-cover border-4 border-cyan-500 mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Deko Hussein
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Full Stack Developer • UI/UX Designer
                </p>
                <div className="flex justify-center gap-3 mt-4 flex-wrap">
                  <span className="px-3 py-1 text-xs bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 rounded-full">React</span>
                  <span className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full">Spring Boot</span>
                  <span className="px-3 py-1 text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-full">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;