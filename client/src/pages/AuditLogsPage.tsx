import { useEffect, useState } from "react";
import api from "../api/axios";

function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.get("/audit", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        setLogs(res.data.logs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const filteredLogs =
    logs.filter((log) =>
      `${log.user?.name || ""} ${
        log.description || ""
      } ${log.action || ""} ${
        log.entityType || ""
      }`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-bold">
          Loading Audit Logs...
        </h1>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Audit Logs
          </h1>

          <p className="text-slate-500 mt-1">
            Track all platform activities
          </p>
        </div>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border px-4 py-2 rounded-lg w-72"
          />

          <div className="bg-slate-100 px-4 py-2 rounded-lg font-medium">
            Total: {filteredLogs.length}
          </div>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>
              <th className="p-4 text-left">
                User
              </th>

              <th className="p-4 text-left">
                Action
              </th>

              <th className="p-4 text-left">
                Entity
              </th>

              <th className="p-4 text-left">
                Description
              </th>

              <th className="p-4 text-left">
                Date
              </th>
            </tr>

          </thead>

          <tbody>

            {filteredLogs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center p-10 text-slate-500"
                >
                  No audit logs found
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-medium">
                    {log.user?.name ||
                      "Unknown User"}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        log.action ===
                        "CREATE"
                          ? "bg-green-600"
                          : log.action ===
                            "UPDATE"
                          ? "bg-yellow-500"
                          : log.action ===
                            "DELETE"
                          ? "bg-red-600"
                          : log.action ===
                            "UPLOAD"
                          ? "bg-blue-600"
                          : "bg-slate-700"
                      }`}
                    >
                      {log.action}
                    </span>

                  </td>

                  <td className="p-4">
                    {log.entityType}
                  </td>

                  <td className="p-4">
                    {log.description}
                  </td>

                  <td className="p-4 text-slate-600">
                    {new Date(
                      log.createdAt
                    ).toLocaleString()}
                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AuditLogsPage;