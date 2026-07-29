import { useEffect, useState } from "react";
import api from "../api/axios";

function EngineerDashboardPage() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(
        "/complaints/assigned/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(
        res.data.complaints || []
      );
    } catch (error) {
      console.error(error);
    }
  };

  const resolveComplaint = async (
    id: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/complaints/${id}/resolve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchComplaints();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Engineer Dashboard
      </h1>

      <div className="space-y-4">
        {complaints.map((complaint: any) => (
          <div
            key={complaint.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="font-bold text-xl">
              {complaint.title}
            </h2>

            <p className="text-slate-600 mt-2">
              {complaint.description}
            </p>

            <div className="flex justify-between mt-4">
              <span>
                {complaint.status}
              </span>

              {complaint.status !==
                "RESOLVED" && (
                <button
                  onClick={() =>
                    resolveComplaint(
                      complaint.id
                    )
                  }
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EngineerDashboardPage;