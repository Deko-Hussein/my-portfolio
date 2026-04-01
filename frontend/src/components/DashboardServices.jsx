import { useEffect, useState } from "react";
import API from "../services/api";

function DashboardServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
  });

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/services", formData);
      setFormData({ title: "", description: "", icon: "" });
      fetchServices();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to add service");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/services/${id}`);
      fetchServices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Services</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow mb-8 space-y-4">
        <input
          type="text"
          placeholder="Service Title"
          className="w-full border px-4 py-3 rounded-lg"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Service Description"
          className="w-full border px-4 py-3 rounded-lg"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></textarea>
        <input
          type="text"
          placeholder="Icon Name"
          className="w-full border px-4 py-3 rounded-lg"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
        />
        <button className="bg-black text-white px-6 py-3 rounded-lg">Add Service</button>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white p-6 rounded-2xl shadow flex justify-between items-start gap-4">
            <div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-gray-700 mt-2">{service.description}</p>
            </div>
            <button
              onClick={() => handleDelete(service._id)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardServices;