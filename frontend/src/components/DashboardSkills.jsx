import { useEffect, useState } from "react";
import API from "../services/api";

function DashboardSkills() {
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    level: "",
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
    setFormData({ name: "", level: "" });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        name: formData.name,
        level: Number(formData.level),
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
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Skills
      </h1>

      {message && (
        <div className="mb-4 rounded-xl border border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-4 py-3 text-gray-800 dark:text-white">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow mb-8 space-y-4 border border-gray-200 dark:border-white/10"
      >
        <input
          type="text"
          placeholder="Skill Name"
          className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white px-4 py-3 rounded-lg outline-none"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Level"
          className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white px-4 py-3 rounded-lg outline-none"
          value={formData.level}
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-black dark:bg-cyan-500 dark:text-black text-white px-6 py-3 rounded-lg font-semibold"
          >
            {editId ? "Update Skill" : "Add Skill"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 dark:bg-white/10 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow flex justify-between items-center border border-gray-200 dark:border-white/10"
          >
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {skill.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {skill.level}%
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(skill)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(skill._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSkills;