function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500"
    >
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="card-ui p-8 md:p-10">
            <p className="text-cyan-600 dark:text-cyan-400 font-semibold mb-3">
              About Me
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
              I am Deko Hussein Said, a passionate Full-Stack Developer.
            </h2>

            <p className="text-gray-700 dark:text-gray-300 leading-8 mb-6">
              Hello! I'm Deko Hussein Said, a dedicated Full-Stack Developer with
              a passion for creating dynamic and responsive web applications.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-8 mb-6">
              My expertise lies in the MERN stack, MongoDB, Express.js, React,
              and Node.js, as well as PHP, Java Spring Boot, and SQL databases
              like PostgreSQL and MySQL.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-8 mb-6">
              I am passionate about building digital solutions that solve
              real-world problems, especially in areas like job platforms,
              business systems, and community-focused applications.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-8 mb-6">
              I have worked on projects like Freelizin, a job connection
              platform that links job seekers with employers, with a strong
              focus on usability and real impact.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-8 mb-6">
              I combine strong development skills with UI/UX design knowledge to
              create applications that are not only functional but also
              intuitive and user-friendly.
            </p>

            <p className="text-gray-500 dark:text-gray-400 leading-8">
              My goal is to grow as a software engineer, build scalable systems,
              and contribute to impactful tech solutions in Somalia and beyond.
            </p>
          </div>

          <div className="grid gap-6">
            <div className="card-ui p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Frontend Development
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                React, Tailwind CSS, responsive design, modern user interface,
                and user-friendly experiences.
              </p>
            </div>

            <div className="card-ui p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Backend Development
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Node.js, Express, PHP, Java Spring Boot, REST API development,
                authentication, and scalable system logic.
              </p>
            </div>

            <div className="card-ui p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Database & Systems
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                MongoDB, PostgreSQL, MySQL, CRUD systems, admin dashboards,
                business systems, and community-focused platforms.
              </p>
            </div>

            <div className="card-ui p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                UI/UX Mindset
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                I combine strong development skills with UI/UX design knowledge
                to create applications that are functional, intuitive, and
                clean.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;