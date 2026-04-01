import { useState } from "react";
import API from "../services/api";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg("");

    try {
      const res = await API.post("/messages", formData);
      setResponseMsg(res.data.message || "Message sent successfully");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setResponseMsg(error.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-cyan-600 dark:text-cyan-400 font-semibold mb-3">Contact</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let’s Build Something Serious
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-8 max-w-xl">
              Have a project, portfolio, dashboard, or business system idea? Send
              a message and let’s discuss the work properly.
            </p>
          </div>

          <div className="card-ui p-8">
            {responseMsg && (
              <div className="mb-4 rounded-2xl border border-cyan-300 dark:border-cyan-400/20 bg-cyan-50 dark:bg-cyan-400/10 px-4 py-3 text-cyan-700 dark:text-cyan-300">
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
                placeholder="Subject"
                className="input-style"
                value={formData.subject}
                onChange={handleChange}
              />
              <textarea
                name="message"
                rows="6"
                placeholder="Write your message"
                className="input-style resize-none"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button type="submit" className="primary-btn w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;