import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function ComplaintDetailPage() {
  const { id } = useParams();

  const [complaint, setComplaint] =
    useState<any>(null);

  const [timeline, setTimeline] =
    useState<any[]>([]);

  const [user, setUser] =
    useState<any>(null);

  const [engineers, setEngineers] =
    useState<any[]>([]);

  const [selectedEngineer, setSelectedEngineer] =
    useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const meRes = await api.get(
        "/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(meRes.data.user);

      const engineersRes =
        await api.get(
          "/users/engineers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setEngineers(
        engineersRes.data.engineers || []
      );

      const complaintRes =
        await api.get(
          `/complaints/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setComplaint(
        complaintRes.data.complaint
      );

      const timelineRes =
        await api.get(
          `/complaint-timeline/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setTimeline(
        timelineRes.data.timeline || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const assignEngineer = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await api.patch(
        `/complaints/${id}/assign`,
        {
          engineerId:
            selectedEngineer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Engineer Assigned");

      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const resolveComplaint =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        await api.patch(
          `/complaints/${id}/resolve`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Complaint Resolved"
        );

        fetchData();
      } catch (error) {
        console.error(error);
      }
    };

  if (!complaint)
    return (
      <div className="p-6">
        Loading...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Complaint Card */}

      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-3xl font-bold">
          {complaint.title}
        </h1>

        <p className="mt-4 text-slate-600">
          {complaint.description}
        </p>

        <div className="mt-4">
          <span
            className={`px-4 py-2 rounded-full text-white text-sm ${
              complaint.status ===
              "OPEN"
                ? "bg-red-500"
                : complaint.status ===
                  "IN_PROGRESS"
                ? "bg-yellow-500"
                : "bg-green-600"
            }`}
          >
            {complaint.status}
          </span>
        </div>

        {/* ADMIN ASSIGN */}

        {user?.role === "ADMIN" && (
          <div className="mt-6 flex gap-4 items-center">
            <select
              value={
                selectedEngineer
              }
              onChange={(e) =>
                setSelectedEngineer(
                  e.target.value
                )
              }
              className="border p-2 rounded"
            >
              <option value="">
                Select Engineer
              </option>

              {engineers.map(
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

            <button
              onClick={
                assignEngineer
              }
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Assign Engineer
            </button>
          </div>
        )}

        {/* ENGINEER RESOLVE */}

        {user?.role ===
          "ENGINEER" &&
          complaint.status !==
            "RESOLVED" && (
            <div className="mt-6">
              <button
                onClick={
                  resolveComplaint
                }
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Resolve Complaint
              </button>
            </div>
          )}
      </div>

      {/* Timeline */}

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-6">
          Complaint Timeline
        </h2>

        {timeline.length ===
        0 ? (
          <p className="text-slate-500">
            No timeline found
          </p>
        ) : (
          <div className="space-y-6">
            {timeline.map(
              (item) => (
                <div
                  key={item.id}
                  className="flex gap-4"
                >
                  <div className="w-4 h-4 rounded-full bg-blue-600 mt-2" />

                  <div>
                    <h3 className="font-semibold">
                      {
                        item.status
                      }
                    </h3>

                    <p className="text-sm text-slate-500">
                      {new Date(
                        item.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplaintDetailPage;