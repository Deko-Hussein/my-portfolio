import { useState } from "react";
import API from "../services/api";
import { contactDetails } from "../data/portfolio";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setResponseMsg("");

    try {
      const response = await API.post("/messages", formData);
      setResponseMsg(response.data.message || "Message sent successfully.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setResponseMsg(error.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-shell">
      <div className="section-container">
        <div className="section-grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="panel card-pad">
            <span className="eyebrow">Contact</span>
            <h2 className="section-title">Let&apos;s build something focused and useful.</h2>
            <p className="section-copy">
              If you need a developer who can think through product structure and implementation with the same care,
              I&apos;d be glad to hear about it.
            </p>

            <div className="mt-8 space-y-4">
              {contactDetails.map((detail) => (
                <div key={detail} className="rounded-2xl border border-slate-200/70 bg-[var(--inset)] px-4 py-4 text-sm leading-7 text-slate-700 dark:border-white/8 dark:text-slate-300">
                  {detail}
                </div>
              ))}
            </div>
          </div>

          <div className="panel-strong card-pad">
            {responseMsg && (
              <div className="mb-5 rounded-2xl border border-teal-300/30 bg-teal-300/10 px-4 py-3 text-sm text-teal-700 dark:text-teal-100">
                {responseMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                className="input-style"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Your email"
                className="input-style"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="subject"
                placeholder="Project type or subject"
                className="input-style"
                value={formData.subject}
                onChange={handleChange}
              />

              <textarea
                name="message"
                rows="6"
                placeholder="Tell me about the product, goal, or problem you want to solve."
                className="input-style resize-none"
                value={formData.message}
                onChange={handleChange}
              />

              <button type="submit" disabled={loading} className="primary-btn w-full disabled:cursor-not-allowed disabled:opacity-70">
                {loading ? "Sending..." : "Contact Me"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
