import { useEffect, useState } from "react";
import api from "../api/axios";

function DashboardPage() {
  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const res = await api.get(
          "/assets/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(res.data.stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats)
    return <h2>Loading...</h2>;

  return (
    <div>
      <h1>SmartInfra Dashboard</h1>

      <h2>
        Total Assets:
        {" "}
        {stats.total}
      </h2>

      <h2>
        Active Assets:
        {" "}
        {stats.active}
      </h2>

      <h2>
        Maintenance Assets:
        {" "}
        {stats.maintenance}
      </h2>
    </div>
  );
}

export default DashboardPage;