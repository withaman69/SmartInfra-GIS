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
  "#ef4444",
  "#eab308",
  "#22c55e",
];
function TicketDashboardPage() {
  const [stats, setStats] =
    useState({
      total: 0,
      open: 0,
      inProgress: 0,
      resolved: 0,
    });

    const [statusData, setStatusData] =
  useState<any[]>([]);

const [priorityData, setPriorityData] =
  useState<any[]>([]);

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await api.get(
              "/tickets/stats",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );
            const chartsRes =
  await api.get(
    "/tickets/charts",
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  setStatusData(chartsRes.data.statusData);
  setPriorityData(chartsRes.data.priorityData);

          setStats(
            res.data.stats
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
      Ticket Analytics
    </h1>

    {/* KPI Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-gray-500">
          Total Tickets
        </h2>

        <p className="text-3xl font-bold">
          {stats.total}
        </p>
      </div>

      <div className="bg-red-100 p-6 rounded-xl shadow-md">
        <h2 className="text-red-700">
          Open
        </h2>

        <p className="text-3xl font-bold">
          {stats.open}
        </p>
      </div>

      <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
        <h2 className="text-yellow-700">
          In Progress
        </h2>

        <p className="text-3xl font-bold">
          {stats.inProgress}
        </p>
      </div>

      <div className="bg-green-100 p-6 rounded-xl shadow-md">
        <h2 className="text-green-700">
          Resolved
        </h2>

        <p className="text-3xl font-bold">
          {stats.resolved}
        </p>
      </div>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Status Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Tickets by Status
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
                cx="50%"
                cy="50%"
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

      {/* Priority Bar Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Tickets by Priority
        </h2>

        <div className="h-[400px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={priorityData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="priority"
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
  </div>
);
}

export default TicketDashboardPage;