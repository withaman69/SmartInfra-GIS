import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function RegisterPage() {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        setLoading(true);

        await api.post(
          "/auth/register",
          {
            name,
            email,
            password,
          }
        );

        alert(
          "Registration Successful"
        );

        navigate("/login");
      } catch (error) {
        console.error(error);
        alert(
          "Registration Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-slate-400 mt-2">
            Join SmartInfra GIS
          </p>

        </div>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default RegisterPage;