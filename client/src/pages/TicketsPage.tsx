import { useEffect, useState } from "react";
import api from "../api/axios";

function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTickets(res.data.tickets);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTickets();
  }, []);
  const updateStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/tickets/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === id
            ? {
                ...ticket,
                status,
              }
            : ticket,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Maintenance Tickets</h1>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">Title</th>

              <th className="p-4 text-left">Asset</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Priority</th>

              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-left">
  Engineer
</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
  {tickets.map((ticket) => (
    <tr
      key={ticket.id}
      className="border-b"
    >
      <td className="p-4">
        {ticket.title}
      </td>

      <td className="p-4">
        {ticket.asset?.name}
      </td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-white text-sm ${
            ticket.status === "OPEN"
              ? "bg-red-500"
              : ticket.status ===
                  "IN_PROGRESS"
                ? "bg-yellow-500"
                : "bg-green-600"
          }`}
        >
          {ticket.status}
        </span>
      </td>

      <td className="p-4">
        {ticket.priority}
      </td>

      <td className="p-4">
        {new Date(
          ticket.createdAt
        ).toLocaleDateString()}
      </td>

      <td className="p-4">
        {ticket.assignedTo
          ?.name || "Unassigned"}
      </td>

      <td className="p-4">
        {ticket.status ===
          "OPEN" && (
          <button
            onClick={() =>
              updateStatus(
                ticket.id,
                "IN_PROGRESS"
              )
            }
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Start
          </button>
        )}

        {ticket.status ===
          "IN_PROGRESS" && (
          <button
            onClick={() =>
              updateStatus(
                ticket.id,
                "RESOLVED"
              )
            }
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Resolve
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketsPage;
