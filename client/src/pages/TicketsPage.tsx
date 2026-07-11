import { useEffect, useState } from "react";
import api from "../api/axios";

function TicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
const [users, setUsers] =
  useState<any[]>([]);


 useEffect(() => {
  const fetchData = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const ticketsRes =
        await api.get("/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      setTickets(
        ticketsRes.data.tickets
      );

      const usersRes =
        await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      setUsers(
        usersRes.data.users
      );
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);
  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);
 const assignEngineer = async (
  ticketId: string,
  engineerId: string
) => {
  try {
    const token =
      localStorage.getItem(
        "token"
      );

    await api.patch(
      `/tickets/${ticketId}/assign`,
      {
        assignedToId:
          engineerId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(
      "Engineer assigned"
    );

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
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
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-4xl font-bold">
        Maintenance Tickets
      </h1>

      <div className="bg-slate-100 px-4 py-2 rounded-lg">
        Total Tickets: {tickets.length}
      </div>
    </div>

    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="p-4 text-left">
              Title
            </th>

            <th className="p-4 text-left">
              Asset
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Priority
            </th>

            <th className="p-4 text-left">
              Created
            </th>

            <th className="p-4 text-left">
              Assigned Engineer
            </th>

            <th className="p-4 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="border-b hover:bg-slate-50"
            >
              <td className="p-4 font-medium">
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
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    ticket.priority === "HIGH"
                      ? "bg-red-600"
                      : ticket.priority ===
                          "MEDIUM"
                        ? "bg-yellow-500"
                        : "bg-blue-600"
                  }`}
                >
                  {ticket.priority}
                </span>
              </td>

              <td className="p-4">
                {new Date(
                  ticket.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                {ticket.assignedTo?.name ||
                  "Unassigned"}
              </td>

              <td className="p-4 flex gap-2 flex-wrap">

                {/* ADMIN ONLY */}
                {user?.role ===
                  "ADMIN" && (
                  <select
                    value={
                      ticket.assignedToId ||
                      ""
                    }
                    onChange={(e) =>
                      assignEngineer(
                        ticket.id,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="">
                      Assign Engineer
                    </option>

                    {users
                      .filter(
                        (u) =>
                          u.role ===
                          "ENGINEER"
                      )
                      .map(
                        (engineer) => (
                          <option
                            key={
                              engineer.id
                            }
                            value={
                              engineer.id
                            }
                          >
                            {
                              engineer.name
                            }
                          </option>
                        )
                      )}
                  </select>
                )}

                {/* ENGINEER ONLY */}
                {user?.role ===
                  "ENGINEER" && (
                  <>
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
                  </>
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
