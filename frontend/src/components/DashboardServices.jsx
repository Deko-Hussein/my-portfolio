import { useEffect, useState } from "react";
import API from "../services/api";

function DashboardServices() {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");
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
      setMessage("Service added successfully");
      fetchServices();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to add service");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/services/${id}`);
      setMessage("Service deleted successfully");
      fetchServices();
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Failed to delete service");
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
          Services
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">Shape your offers</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-400">
          Keep your service list clean, focused, and aligned with the kind of
          clients you want to attract.
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
              New Service
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-50">Add service details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Service title"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Service description"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
              rows="5"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
            <input
              type="text"
              placeholder="Icon name"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/50"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            />
            <button className="rounded-2xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Add Service
            </button>
          </form>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
                Current
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-50">Service library</h2>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200">
              {services.length} total
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service._id}
            className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                Service
              </p>
              <h3 className="mt-3 text-xl font-semibold text-slate-100">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p>
              {service.icon && (
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                  Icon: {service.icon}
                </p>
              )}
            </div>

            <button
              onClick={() => handleDelete(service._id)}
              className="mt-6 rounded-xl bg-rose-500/14 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20"
            >
              Delete
            </button>
          </div>
        ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardServices;
