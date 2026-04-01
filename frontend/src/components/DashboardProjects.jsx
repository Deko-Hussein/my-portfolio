// import { useEffect, useState } from "react";
// import API from "../services/api";

// function DashboardProjects() {
//   const [projects, setProjects] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: "",
//     githubUrl: "",
//     liveUrl: "",
//     techStack: "",
//     featured: false,
//   });

//   const fetchProjects = async () => {
//     try {
//       const res = await API.get("/projects");
//       setProjects(res.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/projects", {
//         ...formData,
//         techStack: formData.techStack
//           .split(",")
//           .map((item) => item.trim())
//           .filter(Boolean),
//       });

//       setFormData({
//         title: "",
//         description: "",
//         image: "",
//         githubUrl: "",
//         liveUrl: "",
//         techStack: "",
//         featured: false,
//       });

//       fetchProjects();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/projects/${id}`);
//       fetchProjects();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Projects</h1>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow mb-8 space-y-4">
//         <input name="title" placeholder="Title" className="w-full border px-4 py-3 rounded-lg" value={formData.title} onChange={handleChange} />
//         <textarea name="description" placeholder="Description" className="w-full border px-4 py-3 rounded-lg" value={formData.description} onChange={handleChange}></textarea>
//         <input name="image" placeholder="Image URL" className="w-full border px-4 py-3 rounded-lg" value={formData.image} onChange={handleChange} />
//         <input name="githubUrl" placeholder="GitHub URL" className="w-full border px-4 py-3 rounded-lg" value={formData.githubUrl} onChange={handleChange} />
//         <input name="liveUrl" placeholder="Live URL" className="w-full border px-4 py-3 rounded-lg" value={formData.liveUrl} onChange={handleChange} />
//         <input name="techStack" placeholder="React, Node.js, MongoDB" className="w-full border px-4 py-3 rounded-lg" value={formData.techStack} onChange={handleChange} />

//         <label className="flex items-center gap-2">
//           <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
//           Featured
//         </label>

//         <button className="bg-black text-white px-6 py-3 rounded-lg">Add Project</button>
//       </form>

//       <div className="grid md:grid-cols-2 gap-6">
//         {projects.map((project) => (
//           <div key={project._id} className="bg-white p-6 rounded-2xl shadow">
//             <h3 className="text-xl font-semibold">{project.title}</h3>
//             <p className="text-gray-700 my-2">{project.description}</p>
//             <button
//               onClick={() => handleDelete(project._id)}
//               className="bg-red-600 text-white px-4 py-2 rounded-lg mt-3"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DashboardProjects;


import { useEffect, useState } from "react";
import API from "../services/api";

function DashboardProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    githubUrl: "",
    liveUrl: "",
    techStack: "",
    featured: false,
  });

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data.data || []);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        ...formData,
        techStack: formData.techStack
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const res = await API.post("/projects", payload);

      setMessage(res.data.message || "Project added successfully");

      setFormData({
        title: "",
        description: "",
        image: "",
        githubUrl: "",
        liveUrl: "",
        techStack: "",
        featured: false,
      });

      fetchProjects();
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to add project"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      setMessage("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Projects
      </h1>

      {message && (
        <div className="mb-4 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-4 py-3 text-gray-800 dark:text-white">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-blue-500 p-6 rounded-2xl shadow mb-8 space-y-4 border border-gray-200 dark:border-white/10"
      >
        <input
          name="title"
          placeholder="Title"
          className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white px-4 py-3 rounded-lg outline-none"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white px-4 py-3 rounded-lg outline-none"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />

        <div>
          <label className="block mb-2 font-medium text-gray-900 dark:text-white">
            Project Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white px-4 py-3 rounded-lg outline-none"
            onChange={handleImageChange}
          />
        </div>

        {formData.image && (
          <div className="mt-2">
            <img
              src={formData.image}
              alt="Preview"
              className="w-full max-w-xs h-40 object-cover rounded-xl border border-gray-300 dark:border-white/10"
            />
          </div>
        )}

        <input
          name="githubUrl"
          placeholder="GitHub URL"
          className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white px-4 py-3 rounded-lg outline-none"
          value={formData.githubUrl}
          onChange={handleChange}
        />

        <input
          name="liveUrl"
          placeholder="Live URL"
          className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white px-4 py-3 rounded-lg outline-none"
          value={formData.liveUrl}
          onChange={handleChange}
        />

        <input
          name="techStack"
          placeholder="React, Node.js, MongoDB"
          className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white px-4 py-3 rounded-lg outline-none"
          value={formData.techStack}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 text-gray-900 dark:text-white">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-black dark:bg-cyan-500 dark:text-black text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow border border-gray-200 dark:border-white/10"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            )}

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {project.title}
            </h3>

            <p className="text-gray-700 dark:text-gray-300 my-2">
              {project.description}
            </p>

            {project.techStack?.length > 0 && (
              <div className="flex flex-wrap gap-2 my-3">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black"
                >
                  GitHub
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white"
                >
                  Live
                </a>
              )}
            </div>

            <button
              onClick={() => handleDelete(project._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardProjects;