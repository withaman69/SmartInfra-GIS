import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

interface Asset {
  id: string;
  name: string;
  assetType: string;
  status: string;
  imageUrl?: string;
}

function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);

  const [filter, setFilter] = useState("ALL");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const handleDelete = async (
  id: string
) => {
  try {
    const token =
      localStorage.getItem("token");

    await api.delete(
      `/assets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAssets((prev) =>
      prev.filter(
        (asset) => asset.id !== id
      )
    );
  } catch (error) {
    console.error(error);
  }
};
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/assets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAssets(res.data.assets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

 

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <h2 className="text-2xl font-semibold">Loading Assets...</h2>
      </div>
    );
  }

  const filteredAssets = assets.filter((asset) => {
    const matchesStatus = filter === "ALL" || asset.status === filter;

    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.assetType.toLowerCase().includes(search.toLowerCase()) ||
      asset.status.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const exportCSV = () => {
    const headers = "Name,Type,Status\n";

    const rows = assets
      .map((asset) => `${asset.name},${asset.assetType},${asset.status}`)
      .join("\n");

    const csv = headers + rows;

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(blob, "assets.csv");
  };

  return (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold">
        Assets
      </h1>

      <div className="flex gap-2">

        {(user?.role === "ADMIN" ||
          user?.role === "ENGINEER") && (
          <button
            onClick={() =>
              navigate("/create-asset")
            }
            className="bg-slate-900 text-white px-4 py-2 rounded"
          >
            Create Asset
          </button>
        )}

        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>

      </div>
    </div>

    <div className="mb-4">
      <input
        type="text"
        placeholder="Search assets..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full md:w-96 border rounded-lg p-3"
      />
    </div>

    <div className="flex gap-3 mb-6">
      <button
        onClick={() => setFilter("ALL")}
        className="bg-slate-900 text-white px-4 py-2 rounded"
      >
        All
      </button>

      <button
        onClick={() => setFilter("ACTIVE")}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Active
      </button>

      <button
        onClick={() =>
          setFilter("MAINTENANCE")
        }
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Maintenance
      </button>

      <button
        onClick={() =>
          setFilter("INACTIVE")
        }
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Inactive
      </button>
    </div>

    {filteredAssets.length === 0 ? (
      <div className="bg-white rounded-xl shadow-md p-10 text-center">
        <h2 className="text-2xl font-bold">
          No Assets Found
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first asset or
          adjust filters.
        </p>
      </div>
    ) : (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">
                Image
              </th>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Asset Type
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.map(
              (asset) => (
                <tr
                  key={asset.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4">
                    {asset.imageUrl ? (
                      <img
                        src={asset.imageUrl}
                        alt={asset.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <span>
                        No Image
                      </span>
                    )}
                  </td>

                  <td className="p-4 font-medium">
                    {asset.name}
                  </td>

                  <td className="p-4">
                    {asset.assetType}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        asset.status ===
                        "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : asset.status ===
                              "MAINTENANCE"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        navigate(
                          `/assets/${asset.id}`
                        )
                      }
                      className="bg-slate-900 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>

                    {(user?.role ===
                      "ADMIN" ||
                      user?.role ===
                        "ENGINEER") && (
                      <button
                        onClick={() =>
                          navigate(
                            `/edit-asset/${asset.id}`
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded ml-2"
                      >
                        Edit
                      </button>
                    )}

                    {user?.role ===
                      "ADMIN" && (
                      <button
                        onClick={() =>
                          handleDelete(
                            asset.id
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}

export default AssetsPage;
