import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            SmartInfra GIS
          </h1>

          <p className="text-slate-400 mt-2">
            Infrastructure Intelligence Platform
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="text-slate-300 text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default LoginPage;