import { Link } from "react-router-dom";
import {
  FiMap,
  FiDatabase,
  FiTool,
  FiBarChart2,
} from "react-icons/fi";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* NAVBAR */}

      <nav className="border-b border-slate-800 backdrop-blur-lg">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <h1 className="text-3xl font-bold">

            <span className="text-blue-500">
              SmartInfra
            </span>{" "}
            GIS

          </h1>

          <div className="flex gap-4">

            <Link
              to="/login"
              className="px-5 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>

          </div>

        </div>

      </nav>

      {/* HERO */}

      <section className="relative max-w-7xl mx-auto px-6 py-32 text-center">

        <div className="absolute inset-0">

          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />

          <div className="absolute bottom-0 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        </div>

        <div className="relative z-10">

          <h1 className="text-7xl font-extrabold leading-tight">

            Infrastructure

            <br />

            Intelligence Platform

          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto mt-8">

            Manage Assets. Monitor Infrastructure.
            Analyze GIS Data.
            Optimize Maintenance Operations.

          </p>

          <div className="flex justify-center gap-5 mt-12">

            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              Access Platform
            </Link>

            <a
              href="#features"
              className="border border-slate-700 hover:bg-slate-800 px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              Explore Features
            </a>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-4 gap-6">

          {[
            {
              value: "10K+",
              label: "Assets Managed",
            },
            {
              value: "1200+",
              label: "Tickets Processed",
            },
            {
              value: "45+",
              label: "Engineers",
            },
            {
              value: "99.8%",
              label: "Availability",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 backdrop-blur"
            >

              <h2 className="text-5xl font-bold text-blue-500">

                {item.value}

              </h2>

              <p className="text-slate-400 mt-3">

                {item.label}

              </p>

            </div>
          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-24"
      >

        <h2 className="text-5xl font-bold text-center mb-16">

          Platform Features

        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <FiMap className="text-4xl text-blue-500 mb-4" />

            <h3 className="text-xl font-bold mb-3">

              GIS Mapping

            </h3>

            <p className="text-slate-400">

              Visualize assets on interactive
              GIS maps.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <FiDatabase className="text-4xl text-green-500 mb-4" />

            <h3 className="text-xl font-bold mb-3">

              Asset Management

            </h3>

            <p className="text-slate-400">

              Track and manage infrastructure
              assets.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <FiTool className="text-4xl text-red-500 mb-4" />

            <h3 className="text-xl font-bold mb-3">

              Maintenance Tickets

            </h3>

            <p className="text-slate-400">

              Efficient maintenance workflow.

            </p>

          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <FiBarChart2 className="text-4xl text-yellow-500 mb-4" />

            <h3 className="text-xl font-bold mb-3">

              Analytics

            </h3>

            <p className="text-slate-400">

              Gain actionable insights from
              infrastructure data.

            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24 text-center">

        <h2 className="text-5xl font-bold">

          Ready to Modernize Infrastructure?

        </h2>

        <p className="text-slate-400 mt-5 text-lg">

          Join SmartInfra GIS today.

        </p>

        <Link
          to="/register"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold"
        >
          Get Started
        </Link>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-slate-800 py-8 text-center text-slate-500">

        SmartInfra GIS © 2026

      </footer>

    </div>
  );
}

export default LandingPage;