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

function TicketAnalyticsPage() {
  const [statusData, setStatusData] =
    useState<any[]>([]);

  const [priorityData, setPriorityData] =
    useState<any[]>([]);

  useEffect(() => {
    const fetchAnalytics =
      async () => {
        const token =
          localStorage.getItem("token");

        const res =
          await api.get(
            "/tickets/analytics",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const analytics =
          res.data.analytics;

        setStatusData([
          {
            name: "Open",
            value:
              analytics.status.open,
          },
          {
            name: "In Progress",
            value:
              analytics.status
                .inProgress,
          },
          {
            name: "Resolved",
            value:
              analytics.status
                .resolved,
          },
        ]);

        setPriorityData([
          {
            priority: "HIGH",
            count:
              analytics.priority.high,
          },
          {
            priority: "MEDIUM",
            count:
              analytics.priority
                .medium,
          },
          {
            priority: "LOW",
            count:
              analytics.priority.low,
          },
        ]);
      };

    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold">
        Ticket Analytics
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Ticket Status
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
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

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4">
            Ticket Priority
          </h2>

          <div className="h-[400px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={priorityData}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

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

export default TicketAnalyticsPage;