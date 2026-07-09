import { useEffect, useState } from "react";
import api from "../api/axios";

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

const COLORS = [
  "#22c55e",
  "#eab308",
  "#ef4444",
];

function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    maintenance: 0,
    inactive: 0,
  });

  const [statusData, setStatusData] =
    useState<any[]>([]);

  const [typeData, setTypeData] =
    useState<any[]>([]);

  const [recentAssets, setRecentAssets] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const statsRes =
          await api.get(
            "/assets/stats",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const chartRes =
          await api.get(
            "/assets/charts",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const recentRes =
          await api.get(
            "/assets/recent",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setStats({
          total:
            statsRes.data.stats?.total || 0,
          active:
            statsRes.data.stats?.active || 0,
          maintenance:
            statsRes.data.stats
              ?.maintenance || 0,
          inactive:
            statsRes.data.stats
              ?.inactive || 0,
        });

        setStatusData(
          chartRes.data.statusData
        );

        setTypeData(
          chartRes.data.typeData
        );

        setRecentAssets(
          recentRes.data.assets
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-gray-500">
            Total Assets
          </h2>
          <p className="text-3xl font-bold">
            {stats.total}
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded-xl shadow-md">
          <h2 className="text-green-700">
            Active
          </h2>
          <p className="text-3xl font-bold">
            {stats.active}
          </p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
          <h2 className="text-yellow-700">
            Maintenance
          </h2>
          <p className="text-3xl font-bold">
            {stats.maintenance}
          </p>
        </div>

        <div className="bg-red-100 p-6 rounded-xl shadow-md">
          <h2 className="text-red-700">
            Inactive
          </h2>
          <p className="text-3xl font-bold">
            {stats.inactive}
          </p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Assets by Status
          </h2>

          <div className="h-[400px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="count"
                  nameKey="status"
                  outerRadius={120}
                  label
                >
                  {statusData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Assets by Type
          </h2>

          <div className="h-[400px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={typeData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="assetType"
                />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="count"
                  fill="#3b82f6"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RECENT ASSETS */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Recent Assets
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">
                Name
              </th>

              <th className="text-left p-3">
                Type
              </th>

              <th className="text-left p-3">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {recentAssets.map(
              (asset) => (
                <tr
                  key={asset.id}
                  className="border-b hover:bg-slate-50"
                >
                  <td className="p-3">
                    {asset.name}
                  </td>

                  <td className="p-3">
                    {asset.assetType}
                  </td>

                  <td className="p-3">
                    {asset.status}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;