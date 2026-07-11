import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FiHome,
  FiMap,
  FiDatabase,
  FiPlusCircle,
  FiTool,
  FiSearch,
  FiLogOut,
  FiUsers,
} from "react-icons/fi";

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FiHome />,
    },

    {
      name: "Assets",
      path: "/assets",
      icon: <FiDatabase />,
    },

    {
      name: "GIS Map",
      path: "/map",
      icon: <FiMap />,
    },

    ...(user.role === "ADMIN" ||
    user.role === "ENGINEER"
      ? [
          {
            name: "Create Asset",
            path: "/create-asset",
            icon: <FiPlusCircle />,
          },
        ]
      : []),

    ...(user.role === "ADMIN"
      ? [
          {
            name: "Users",
            path: "/users",
            icon: <FiUsers />,
          },
        ]
      : []),

    {
      name: "Nearby Assets",
      path: "/nearby-assets",
      icon: <FiSearch />,
    },

    {
      name: "Tickets",
      path: "/tickets",
      icon: <FiTool />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-stone-50">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">

        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold">
            SmartInfra GIS
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Infrastructure Platform
          </p>

          <p className="text-xs text-slate-500 mt-3">
            {user.name} ({user.role})
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-white text-slate-900 font-semibold"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

        </nav>

        <div className="p-4 border-t border-slate-800">

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");

              navigate("/");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800"
          >
            <FiLogOut />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}

export default MainLayout;