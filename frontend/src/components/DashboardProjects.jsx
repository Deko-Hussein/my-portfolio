import { useEffect, useState } from "react";
import { FiEdit2, FiExternalLink, FiGithub, FiImage, FiTrash2 } from "react-icons/fi";
import API from "../services/api";

function DashboardProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

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
      const response = await API.get("/projects");
      setProjects(response.data.data || []);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      githubUrl: "",
      liveUrl: "",
      techStack: "",
      featured: false,
    });
    setEditId(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
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

  const handleSubmit = async (event) => {
    event.preventDefault();
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

      const response = editId
        ? await API.put(`/projects/${editId}`, payload)
        : await API.post("/projects", payload);

      setMessage(response.data.message || (editId ? "Project updated successfully" : "Project added successfully"));
      resetForm();

      fetchProjects();
    } catch (error) {
      console.error(error);
      setMessage(
          error.response?.data?.message ||
          error.response?.data?.error ||
          (editId ? "Failed to update project" : "Failed to add project")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setFormData({
      title: project.title || "",
      description: project.description || "",
      image: project.image || "",
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
      techStack: (project.techStack || []).join(", "),
      featured: Boolean(project.featured),
    });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/projects/${id}`);
      setMessage("Project deleted successfully");

      if (editId === id) {
        resetForm();
      }

      fetchProjects();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to delete project");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p className="max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400">
          Add portfolio projects, upload a preview image, attach links, and control which work is featured on the
          public site.
        </p>
      </div>

      {message && (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
          {message}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <section className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#07111a] md:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
              {editId ? "Edit Project" : "New Project"}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white">
              {editId ? "Update project details" : "Publish project details"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Project title"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-transparent dark:text-white"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Short project description"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-transparent dark:text-white"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="githubUrl"
                placeholder="GitHub URL"
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-transparent dark:text-white"
                value={formData.githubUrl}
                onChange={handleChange}
              />

              <input
                name="liveUrl"
                placeholder="Live URL"
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-transparent dark:text-white"
                value={formData.liveUrl}
                onChange={handleChange}
              />
            </div>

            <input
              name="techStack"
              placeholder="React, Node.js, MongoDB"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-transparent dark:text-white"
              value={formData.techStack}
              onChange={handleChange}
            />

            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <label className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-white">
                <FiImage size={16} />
                Project image
              </label>

              <input
                type="file"
                accept="image/*"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none dark:border-white/10 dark:bg-transparent dark:text-white"
                onChange={handleImageChange}
              />

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-4 h-40 w-full rounded-2xl object-cover border border-gray-200 dark:border-white/10"
                />
              )}
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 dark:border-white/10 dark:bg-white/[0.03] dark:text-white">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 accent-cyan-500"
              />
              Mark as featured
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-2xl bg-gray-950 px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-cyan-500 dark:text-black"
              >
                {loading ? "Saving..." : editId ? "Update Project" : "Add Project"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:bg-transparent dark:text-white dark:hover:bg-white/5"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
                Published
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">Project library</h2>
            </div>

            <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white">
              {projects.length} total
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="rounded-[28px] border border-gray-200 bg-white p-8 text-center text-gray-600 shadow-sm dark:border-white/10 dark:bg-[#07111a] dark:text-gray-400">
              No projects added yet.
            </div>
          ) : (
            <div className="grid gap-5">
              {projects.map((project) => (
                <article
                  key={project._id}
                  className="rounded-[28px] border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#07111a] md:p-6"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="mb-5 h-52 w-full rounded-2xl object-cover"
                    />
                  )}

                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                        {project.featured && (
                          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-400">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-50 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
                      >
                        <FiEdit2 size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(project._id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                      >
                        <FiTrash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>

                  {project.techStack?.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <span
                          key={`${project._id}-${index}`}
                          className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-gray-950 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black"
                      >
                        <FiGithub size={16} />
                        GitHub
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 dark:border-white/20 dark:text-white"
                      >
                        <FiExternalLink size={16} />
                        Live Preview
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default DashboardProjects;
