import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getErrorMessage = (error) => {
    const serverMessage = error.response?.data?.message;

    if (serverMessage === "Admin already exists") {
      return "Email-kan hore ayaa loo diiwaangeliyey. Fadlan gal bogga login.";
    }

    if (serverMessage === "Please provide name, email, and password") {
      return "Fadlan buuxi name, email, iyo password.";
    }

    if (serverMessage === "Password must be at least 6 characters") {
      return "Password-ku waa inuu ugu yaraan noqdaa 6 xaraf.";
    }

    if (serverMessage) {
      return serverMessage;
    }

    if (error.code === "ERR_NETWORK") {
      return "Server-ka lama gaarin. Hubi backend-ka inuu shidan yahay iyo in VITE_API_URL uu sax yahay.";
    }

    return error.message || "Registration failed";
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
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      console.log("REGISTER PAYLOAD:", payload);

      const res = await API.post("/auth/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("REGISTER RESPONSE:", res.data);

      const registerData = res?.data?.data;

      if (!registerData?.token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", registerData.token);
      localStorage.setItem("admin", JSON.stringify(registerData));

      navigate("/dashboard");
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      console.log("REGISTER ERROR DATA:", error.response?.data);

      setMessage(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Register</h1>

        {message && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-3">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 transition hover:text-gray-700"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Admin ma leedahay hore?
          {" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-700 transition hover:text-cyan-600"
          >
            Ku laabo login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
