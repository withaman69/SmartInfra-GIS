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

  const [image, setImage] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const uploadImage =
    async (): Promise<string> => {
      if (!image) return "";

      try {
        setUploading(true);

        const token =
          localStorage.getItem("token");

        const formData =
          new FormData();

        formData.append(
          "image",
          image
        );

        const res =
          await api.post(
            "/assets/upload-image",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        return res.data.imageUrl;
      } catch (error) {
        console.error(error);
        return "";
      } finally {
        setUploading(false);
      }
    };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const imageUrl =
        await uploadImage();

      await api.post(
        "/assets",
        {
          ...form,
          imageUrl,
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

      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Failed to create asset");
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

        <div>
          <label className="block mb-2 font-medium">
            Asset Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files?.[0] ||
                  null
              )
            }
            className="w-full border rounded p-3"
          />
        </div>

        {image && (
          <img
            src={URL.createObjectURL(
              image
            )}
            alt="Preview"
            className="w-40 h-40 object-cover rounded border"
          />
        )}

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
          disabled={uploading}
          className="bg-slate-900 text-white px-6 py-3 rounded hover:bg-slate-700 disabled:bg-slate-500"
        >
          {uploading
            ? "Uploading..."
            : "Create Asset"}
        </button>
      </form>
    </div>
  );
}

export default CreateAssetPage;