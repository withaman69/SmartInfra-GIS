import { useState } from "react";
import api from "../api/axios";


function CreateAssetPage() {
  const [form, setForm] = useState({
    name: "",
    assetType: "",
    description: "",
    status: "ACTIVE",
    latitude: "",
    longitude: "",
  });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await api.post(
        "/assets",
        {
          ...form,
          latitude: Number(
            form.latitude
          ),
          longitude: Number(
            form.longitude
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Asset Created Successfully"
      );

      setForm({
        name: "",
        assetType: "",
        description: "",
        status: "ACTIVE",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create Asset
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="w-full border rounded p-3"
          placeholder="Asset Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="w-full border rounded p-3"
          placeholder="Asset Type"
          value={form.assetType}
          onChange={(e) =>
            setForm({
              ...form,
              assetType:
                e.target.value,
            })
          }
        />

        <textarea
          className="w-full border rounded p-3"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
        />

        <select
          className="w-full border rounded p-3"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status:
                e.target.value,
            })
          }
        >
          <option value="ACTIVE">
            ACTIVE
          </option>

          <option value="MAINTENANCE">
            MAINTENANCE
          </option>

          <option value="INACTIVE">
            INACTIVE
          </option>
        </select>

        <input
          className="w-full border rounded p-3"
          placeholder="Latitude"
          value={form.latitude}
          onChange={(e) =>
            setForm({
              ...form,
              latitude:
                e.target.value,
            })
          }
        />

        <input
          className="w-full border rounded p-3"
          placeholder="Longitude"
          value={form.longitude}
          onChange={(e) =>
            setForm({
              ...form,
              longitude:
                e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-slate-900 text-white px-6 py-3 rounded hover:bg-slate-700"
        >
          Create Asset
        </button>
      </form>
    </div>
  );
}

export default CreateAssetPage;