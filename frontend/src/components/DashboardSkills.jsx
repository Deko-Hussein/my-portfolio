import { useEffect, useState } from "react";
import API from "../services/api";

const skillCategories = ["Frontend", "Backend", "Database", "Other Skills", "Tools"];

function DashboardSkills() {
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    level: "",
    category: "Frontend",
  });

  const fetchSkills = async () => {
    try {
      const res = await API.get("/skills");
      setSkills(res.data.data || []);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load skills");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const resetForm = () => {
    setFormData({ name: "", level: "", category: "Frontend" });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        name: formData.name,
        level: Number(formData.level),
        category: formData.category,
      };

      if (editId) {
        await API.put(`/skills/${editId}`, payload);
        setMessage("Skill updated successfully");
      } else {
        await API.post("/skills", payload);
        setMessage("Skill added successfully");
      }

      resetForm();
      fetchSkills();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (skill) => {
    setEditId(skill._id);
    setFormData({
      name: skill.name || "",
      level: skill.level || "",
      category: skill.category || "Tools",
    });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/skills/${id}`);
      setMessage("Skill deleted successfully");

      if (editId === id) {
        resetForm();
      }

      fetchSkills();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
          Skills
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">Manage your stack</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-400">
          Add categorized skills that feed directly into the public portfolio.
        </p>
      </div>

      {message && (
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/8 px-4 py-3 text-sm text-cyan-100">
          {message}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
              {editId ? "Edit Skill" : "New Skill"}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-50">
              {editId ? "Update skill details" : "Add a new skill"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Skill name"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              type="number"
              placeholder="Level (0-100)"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            />

            <select
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              {skillCategories.map((category) => (
                <option key={category} value={category} className="bg-slate-950 text-slate-100">
                  {category}
                </option>
              ))}
            </select>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {editId ? "Update Skill" : "Add Skill"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 font-semibold text-slate-200 transition hover:bg-white/[0.08]"
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
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                Library
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50">Saved skills</h2>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200">
              {skills.length} total
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                {skill.category || "Tools"}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-100">{skill.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{skill.level}% confidence</p>
            </div>

            <div className="flex gap-3 self-start">
              <button
                onClick={() => handleEdit(skill)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08]"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(skill._id)}
                className="rounded-xl bg-rose-500/14 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardSkills;
