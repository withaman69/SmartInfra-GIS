import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50">

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-slate-900">
            SmartInfra GIS
          </h1>

          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 border border-slate-300 rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">

        <h1 className="text-6xl font-bold text-slate-900 mb-6">
          Infrastructure Intelligence Platform
        </h1>

        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
          Monitor assets, manage maintenance,
          visualize infrastructure operations,
          and make data-driven decisions.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-slate-900 text-white px-6 py-3 rounded-lg"
          >
            Access Platform
          </Link>

          <a
            href="#features"
            className="border border-slate-300 px-6 py-3 rounded-lg"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-4xl font-bold">10K+</h2>
            <p className="text-slate-600">
              Assets Managed
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-4xl font-bold">1200+</h2>
            <p className="text-slate-600">
              Tickets Processed
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-4xl font-bold">45+</h2>
            <p className="text-slate-600">
              Engineers
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-4xl font-bold">99.8%</h2>
            <p className="text-slate-600">
              System Availability
            </p>
          </div>

        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-xl font-bold mb-3">
              GIS Asset Mapping
            </h3>
            <p className="text-slate-600">
              Visualize infrastructure assets
              on interactive maps.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-xl font-bold mb-3">
              Maintenance Tracking
            </h3>
            <p className="text-slate-600">
              Create and manage tickets
              efficiently.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-xl font-bold mb-3">
              Analytics Dashboard
            </h3>
            <p className="text-slate-600">
              Gain insights from assets
              and maintenance operations.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-600">
          SmartInfra GIS © 2026
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;