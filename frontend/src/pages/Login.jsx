

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getErrorMessage = (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.code === "ERR_NETWORK") {
      return "Server-ka lama gaarin. Hubi backend-ka inuu shidan yahay iyo in VITE_API_URL uu sax yahay.";
    }

    return error.message || "Login failed";
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      const res = await API.post("/auth/login", payload);

      const loginData = res?.data?.data;

      if (!loginData?.token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", loginData.token);
      localStorage.setItem("admin", JSON.stringify(loginData));

      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      console.log("LOGIN ERROR DATA:", error.response?.data);

      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0a0a0a] px-4 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-white/5 shadow-lg rounded-2xl p-8 border border-gray-200 dark:border-white/10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Admin Login
        </h1>

        {message && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300 px-4 py-3">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 outline-none bg-white dark:bg-transparent text-gray-900 dark:text-white"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 dark:border-white/10 rounded-lg px-4 py-3 pr-12 outline-none bg-white dark:bg-transparent text-gray-900 dark:text-white"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 transition hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white dark:bg-cyan-500 dark:text-black py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600 dark:text-gray-300">
          Markii ugu horreysay?
          {" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200"
          >
            Samee admin account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
