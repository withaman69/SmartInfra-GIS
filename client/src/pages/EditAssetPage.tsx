import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function EditAssetPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    assetType: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const token =
          localStorage.getItem("token");

        const res = await api.get(
          `/assets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const asset = res.data.asset;

        setForm({
          name: asset.name,
          assetType: asset.assetType,
          description:
            asset.description || "",
          latitude:
            asset.latitude.toString(),
          longitude:
            asset.longitude.toString(),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchAsset();
  }, [id]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await api.put(
        `/assets/${id}`,
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
        "Asset Updated Successfully"
      );

      navigate("/assets");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Asset
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="w-full border rounded p-3"
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
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
        />

        <input
          className="w-full border rounded p-3"
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
          className="bg-slate-900 text-white px-6 py-3 rounded"
        >
          Update Asset
        </button>
      </form>
    </div>
  );
}

export default EditAssetPage;