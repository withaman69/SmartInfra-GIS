import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

interface Asset {
  id: string;
  name: string;
  assetType: string;
  description?: string;
  status: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  healthScore: number;
  createdAt: string;
}

function AssetDetailsPage() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { id } = useParams();

  const navigate = useNavigate();

  const [asset, setAsset] = useState<Asset | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
const [logs, setLogs] =
  useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const [ticketTitle, setTicketTitle] = useState("");

  const [ticketDescription, setTicketDescription] = useState("");

  const [priority, setPriority] = useState("MEDIUM");

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/assets/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAsset(res.data.asset);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const assetTickets = res.data.tickets.filter(
          (ticket: any) => ticket.assetId === id,
        );

        setTickets(assetTickets);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTickets();
  }, [id]);
  useEffect(() => {
  const fetchLogs = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res =
        await api.get(
          `/audit/asset/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setLogs(res.data.logs);
    } catch (error) {
      console.error(error);
    }
  };

  fetchLogs();
}, [id]);
  const createTicket = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tickets",
        {
          title: ticketTitle,
          description: ticketDescription,
          assetId: asset?.id,
          priority,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Ticket Created Successfully");
      window.location.reload();
      setShowTicketModal(false);

      setTicketTitle("");

      setTicketDescription("");

      setPriority("MEDIUM");
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <h2 className="text-2xl font-bold">Loading Asset...</h2>;
  }

  if (!asset) {
    return <h2 className="text-2xl font-bold">Asset Not Found</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {asset.imageUrl && (
          <img
            src={asset.imageUrl}
            alt={asset.name}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-4xl font-bold mb-4">{asset.name}</h1>

        <span
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            asset.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : asset.status === "MAINTENANCE"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {asset.status}
        </span>

        <div className="mt-6 space-y-3">
          <p>
            <strong>Type:</strong> {asset.assetType}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {asset.description || "No description"}
          </p>

          <p>
            <strong>Latitude:</strong> {asset.latitude}
          </p>

          <p>
            <strong>Longitude:</strong> {asset.longitude}
          </p>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(asset.createdAt).toLocaleString()}
          </p>
          <div className="mt-6">
  <p className="font-semibold mb-2">
    Health Score
  </p>

  <div className="w-full bg-slate-200 rounded-full h-4">
    <div
      className={`h-4 rounded-full ${
        asset.healthScore > 80
          ? "bg-green-500"
          : asset.healthScore > 50
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
      style={{
        width: `${asset.healthScore}%`,
      }}
    />
  </div>

  <p className="mt-2 text-sm font-medium">
    {asset.healthScore}%
  </p>
</div>
        </div>

        <div className="flex gap-4 mt-8">
          {(user?.role === "ADMIN" || user?.role === "ENGINEER") && (
            <button
              onClick={() => navigate(`/edit-asset/${asset.id}`)}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => setShowTicketModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Create Ticket
          </button>

          <button
            onClick={() => navigate("/assets")}
            className="bg-slate-900 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </div>

      {/* TICKETS SECTION */}

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Asset Maintenance Tickets</h2>

        {tickets.length === 0 ? (
          <p className="text-slate-500">No tickets created for this asset.</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">{ticket.title}</h3>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      ticket.status === "OPEN"
                        ? "bg-red-500"
                        : ticket.status === "IN_PROGRESS"
                          ? "bg-yellow-500"
                          : "bg-green-600"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>

                <p className="mt-2 text-slate-600">{ticket.description}</p>

                <div className="mt-3 flex gap-3">
                  <span className="bg-slate-100 px-3 py-1 rounded">
                    Priority: {ticket.priority}
                  </span>

                  <span className="bg-slate-100 px-3 py-1 rounded">
                    Engineer: {ticket.assignedTo?.name || "Unassigned"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
<div className="bg-white rounded-xl shadow-lg p-8">

  <h2 className="text-2xl font-bold mb-6">
    Asset Activity Timeline
  </h2>

  {logs.length === 0 ? (
    <p className="text-slate-500">
      No activity found.
    </p>
  ) : (
    <div className="space-y-4">

      {logs.map((log) => (
        <div
          key={log.id}
          className="border-l-4 border-blue-500 pl-4 py-2"
        >
          <h3 className="font-semibold">
            {log.action}
          </h3>

          <p className="text-slate-600">
            {log.description}
          </p>

          <p className="text-sm text-slate-400">
            {log.user?.name} •{" "}
            {new Date(
              log.createdAt
            ).toLocaleString()}
          </p>
        </div>
      ))}

    </div>
  )}

</div>
      {/* CREATE TICKET MODAL */}

      {showTicketModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <h2 className="text-2xl font-bold mb-4">
              Create Maintenance Ticket
            </h2>

            <input
              type="text"
              placeholder="Ticket Title"
              value={ticketTitle}
              onChange={(e) => setTicketTitle(e.target.value)}
              className="border p-3 rounded w-full mb-3"
            />

            <textarea
              placeholder="Description"
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
              className="border p-3 rounded w-full mb-3"
            />

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border p-3 rounded w-full mb-4"
            >
              <option value="LOW">LOW</option>

              <option value="MEDIUM">MEDIUM</option>

              <option value="HIGH">HIGH</option>
            </select>

            <div className="flex gap-3">
              <button
                onClick={createTicket}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Create
              </button>

              <button
                onClick={() => setShowTicketModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssetDetailsPage;
