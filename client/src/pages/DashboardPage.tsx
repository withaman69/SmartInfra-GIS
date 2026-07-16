import { useEffect, useState } from "react";
import api from "../api/axios";
import { exportDashboardReport } from "../utils/exportReport";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import DashboardMap from "../components/DashboardMap";
import { useNavigate } from "react-router-dom";
const COLORS = ["#22c55e", "#eab308", "#ef4444"];

function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    maintenance: 0,
    inactive: 0,
  });

  const [statusData, setStatusData] = useState<any[]>([]);

  const [typeData, setTypeData] = useState<any[]>([]);

  const [recentAssets, setRecentAssets] = useState<any[]>([]);
  const [recentTickets, setRecentTickets] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [healthData, setHealthData] =
  useState<any[]>([]);
  const [criticalAssets, setCriticalAssets] =
  useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [ticketStats, setTicketStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchHealthAnalytics =
  async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res =
        await api.get(
          "/assets/health-analytics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      console.log(
        "Health Analytics:",
        res.data
      );

      setHealthData(
        res.data.data
      );
    } catch (error) {
      console.error(error);
    }
  };
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    setUser(storedUser);
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const statsRes = await api.get("/assets/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const chartRes = await api.get("/assets/charts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const criticalRes =
  await api.get(
    "/assets/critical-assets",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

        setCriticalAssets(criticalRes.data.assets);

        const recentRes = await api.get("/assets/recent", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats({
          total: statsRes.data.stats?.total || 0,
          active: statsRes.data.stats?.active || 0,
          maintenance: statsRes.data.stats?.maintenance || 0,
          inactive: statsRes.data.stats?.inactive || 0,
        });

        setStatusData(chartRes.data.statusData);

        setTypeData(chartRes.data.typeData);

        setRecentAssets(recentRes.data.assets);
        const userRes = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(userRes.data.user);
        const ticketsRes = await api.get("/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const profileRes = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(profileRes.data.user);
        const activityRes = await api.get("/activity/recent", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setActivities(activityRes.data.activities);
        const ticketStatsRes = await api.get("/tickets/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRecentTickets(ticketsRes.data.tickets.slice(0, 5));
        setTicketStats(ticketStatsRes.data.stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchHealthAnalytics();
  }, []);
  const getQuickActions = () => {
    if (!user) return [];

    switch (user.role) {
      case "ADMIN":
        return [
          {
            title: "Create Asset",
            path: "/create-asset",
          },
          {
            title: "Manage Tickets",
            path: "/tickets",
          },
          {
            title: "GIS Map",
            path: "/map",
          },
        ];

      case "ENGINEER":
        return [
          {
            title: "My Tickets",
            path: "/tickets",
          },
          {
            title: "GIS Map",
            path: "/map",
          },
        ];

      case "RESEARCHER":
        return [
          {
            title: "GIS Map",
            path: "/map",
          },
          {
            title: "Nearby Assets",
            path: "/nearby-assets",
          },
        ];

      default:
        return [];
    }
  };
  return (

    <div className="space-y-8">
    {criticalAssets.length > 0 && (
  <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-xl">
    <h2 className="font-bold text-lg">
      ⚠ {criticalAssets.length} Asset
      {criticalAssets.length > 1
        ? "s Need"
        : " Needs"}{" "}
      Immediate Attention
    </h2>

    <p className="text-sm mt-1">
      Assets with low health score
      or maintenance status have
      been detected.
    </p>
  </div>
)}
     {/* HEADER */}
<div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
  <h1 className="text-4xl font-bold text-slate-900">
    Infrastructure Command Center
  </h1>

  {user && (
    <span className="inline-block mt-3 px-4 py-1 bg-slate-100 rounded-full text-sm">
      Role: {user.role}
    </span>
  )}

  <p className="text-slate-600 mt-4 text-lg">
    Monitor infrastructure assets, manage maintenance operations, and
    visualize GIS intelligence from a single platform.
  </p>

  <div className="flex flex-wrap gap-3 mt-6">

    {user?.role === "ADMIN" && (
      <button
        onClick={() => navigate("/create-asset")}
        className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-800"
      >
        Create Asset
      </button>
    )}

    <button
      onClick={() => navigate("/tickets")}
      className="border border-slate-300 px-5 py-2 rounded-lg hover:bg-slate-100"
    >
      View Tickets
    </button>

    <button
      onClick={() =>
        exportDashboardReport({
          totalAssets: stats.total,
          activeAssets: stats.active,
          maintenanceAssets: stats.maintenance,
          inactiveAssets: stats.inactive,
          totalTickets: ticketStats.total,
        })
      }
      className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
    >
      📄 Export Report
    </button>

  </div>
</div>
      {/* ASSET KPIs */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Asset Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-gray-500">Total Assets</h3>

            <p className="text-3xl font-bold">{stats.total}</p>
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow-md">
            <h3 className="text-green-700">Active</h3>

            <p className="text-3xl font-bold">{stats.active}</p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
            <h3 className="text-yellow-700">Maintenance</h3>

            <p className="text-3xl font-bold">{stats.maintenance}</p>
          </div>

          <div className="bg-red-100 p-6 rounded-xl shadow-md">
            <h3 className="text-red-700">Inactive</h3>

            <p className="text-3xl font-bold">{stats.inactive}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-2xl font-bold mb-4">
    Asset Health Analytics
  </h2>

  <div className="h-[350px]">
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <PieChart>
        <Pie
          data={healthData}
          dataKey="count"
          nameKey="category"
          outerRadius={120}
          label
        >
          <Cell fill="#22c55e" />
          <Cell fill="#f59e0b" />
          <Cell fill="#ef4444" />
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
<div className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-2xl font-bold mb-4">
    Assets Needing Attention
  </h2>

  {criticalAssets.length === 0 ? (
    <p className="text-green-600">
      No critical assets found.
    </p>
  ) : (
    <div className="space-y-4">
      {criticalAssets.map(
        (asset) => (
          <div
  key={asset.id}
  onClick={() =>
    navigate(`/assets/${asset.id}`)
  }
  className="border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50"
>
            <div>
              <h3 className="font-bold">
                {asset.name}
              </h3>

              <p className="text-sm text-slate-600">
                {asset.assetType}
              </p>
            </div>

            <div className="text-right">
             <p
  className={`font-semibold ${
    asset.healthScore > 70
      ? "text-green-600"
      : asset.healthScore > 40
      ? "text-yellow-600"
      : "text-red-600"
  }`}
>
  Health: {asset.healthScore}
</p>

              <p className="text-sm">
                {asset.status}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  )}
</div>
      {/* TICKET KPIs */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Ticket Operations</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-slate-500">Total Tickets</h3>

            <p className="text-3xl font-bold">{ticketStats.total}</p>
          </div>

          <div className="bg-red-100 p-6 rounded-xl shadow-md">
            <h3 className="text-red-700">Open</h3>

            <p className="text-3xl font-bold">{ticketStats.open}</p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
            <h3 className="text-yellow-700">In Progress</h3>

            <p className="text-3xl font-bold">{ticketStats.inProgress}</p>
          </div>

          <div className="bg-green-100 p-6 rounded-xl shadow-md">
            <h3 className="text-green-700">Resolved</h3>

            <p className="text-3xl font-bold">{ticketStats.resolved}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-3">
          {getQuickActions().map((action) => (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg"
            >
              {action.title}
            </button>
          ))}
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Assets by Status</h2>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={120}
                  label
                >
                  {statusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Assets by Type</h2>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="assetType" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-2xl font-bold mb-4">
    Infrastructure GIS View
  </h2>

  <DashboardMap
    assets={recentAssets}
  />
</div>

      {/* RECENT DATA */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Recent Assets</h2>

          <div className="space-y-3">
            {recentAssets.map((asset) => (
              <div key={asset.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{asset.name}</h3>

                <p className="text-slate-500">{asset.assetType}</p>

                <p className="text-sm mt-1">{asset.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">Recent Tickets</h2>

          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{ticket.title}</h3>

                <p className="text-slate-500">{ticket.priority}</p>

                <p className="text-sm mt-1">{ticket.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="border-l-4 border-slate-900 pl-4">
              <p className="font-medium">{activity.title}</p>

              <p className="text-sm text-slate-500">
                {new Date(activity.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
