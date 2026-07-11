import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();

  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/survey");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        formData
      );

      login(
        response.data.user,
        response.data.token
      );

      navigate("/survey");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          HealthRisk Radar
        </h1>

        <h2 className="text-xl font-semibold mb-4">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded p-3"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded p-3"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-5">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;