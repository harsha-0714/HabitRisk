import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import useAuth from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

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
        "/auth/register",
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
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-6">

          HealthRisk Radar

        </h1>

        <h2 className="text-xl font-semibold mb-4">

          Create Account

        </h2>

        {

          error &&

          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">

            {error}

          </div>

        }

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border rounded p-3"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded p-3"
            disabled={loading}
          >

            {

              loading

              ?

              "Creating Account..."

              :

              "Register"

            }

          </button>

        </form>

        <p className="text-center mt-5">

          Already have an account?

          <Link
            to="/"
            className="text-blue-600 ml-2"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );
}

export default Register;