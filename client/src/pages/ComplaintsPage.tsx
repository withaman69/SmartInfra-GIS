import { useEffect, useState } from "react";
import api from "../api/axios";

function ComplaintsPage() {
    const [complaints, setComplaints] = useState([]);

const [search, setSearch] = useState("");

const filteredComplaints = complaints.filter((complaint: any) =>
  complaint.title?.toLowerCase().includes(search.toLowerCase()) ||
  complaint.description?.toLowerCase().includes(search.toLowerCase())
);
const [showModal, setShowModal] = useState(false);

const [formData, setFormData] = useState({
  title: "",
  description: "",
  category: "",
});

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

    const res = await api.get("/complaints", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

console.log("COMPLAINT RESPONSE:", res.data);

setComplaints(
  res.data.complaints ||
  res.data.data ||
  res.data ||
  []
);
    } catch (error) {
      console.error(error);
    }
  };
const createComplaint = async () => {
  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/complaints",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchComplaints();

    setShowModal(false);

    setFormData({
      title: "",
      description: "",
      category: "",
    });
  } catch (error) {
    console.error(error);
  }
};
 return (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">
        Complaints Management
      </h1>

     <button
  onClick={() => setShowModal(true)}
  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
>
  Create Complaint
</button>
    </div>

    <div className="bg-white rounded-xl shadow p-6">
      <input
        type="text"
        placeholder="Search complaints..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-6"
      />

      {filteredComplaints.length === 0 ? (
        <p className="text-slate-500">
          No complaints found.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredComplaints.map((complaint: any) => (
            <div
              key={complaint.id}
              className="border rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">
                    {complaint.title}
                  </h3>

                  <p className="text-slate-600 mt-2">
                    {complaint.description}
                  </p>

                  <p className="text-sm text-slate-500 mt-2">
                    Category: {complaint.category}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    complaint.status === "OPEN"
                      ? "bg-red-500"
                      : complaint.status === "IN_PROGRESS"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl w-[500px]">
      <h2 className="text-2xl font-bold mb-4">
        Create Complaint
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({
            ...formData,
            title: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-3"
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({
            ...formData,
            description: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-3"
      />

      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) =>
          setFormData({
            ...formData,
            category: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-4"
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={createComplaint}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
)}
  </div>
);
}

export default ComplaintsPage;