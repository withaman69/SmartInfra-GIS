import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function EditAssetPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] =
    useState({
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

  useEffect(() => {
    const fetchAsset =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await api.get(
              `/assets/${id}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const asset =
            res.data.asset;

          setForm({
            name: asset.name,
            assetType:
              asset.assetType,
            description:
              asset.description || "",
            status:
              asset.status,
            latitude:
              asset.latitude.toString(),
            longitude:
              asset.longitude.toString(),
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchAsset();
  }, [id]);
  const uploadImage =
  async () => {
    if (!image) return null;

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
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      return res.data.imageUrl;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        const token =
          localStorage.getItem(
            "token"
          );

       const imageUrl =
  await uploadImage();

await api.put(
  `/assets/${id}`,
  {
    ...form,
    imageUrl:
      imageUrl || undefined,
    latitude: Number(
      form.latitude
    ),
    longitude: Number(
      form.longitude
    ),
  },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Asset Updated Successfully"
        );

        navigate(
          `/assets/${id}`
        );
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <h2 className="text-2xl font-bold">
        Loading Asset...
      </h2>
    );
  }

  return (
    <div className="max-w-2xl bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Asset
      </h1>

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >
        <input
          className="w-full border rounded p-3"
          placeholder="Asset Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value,
            })
          }
        />

        <input
          className="w-full border rounded p-3"
          placeholder="Asset Type"
          value={
            form.assetType
          }
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
          value={
            form.description
          }
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
          value={
            form.status
          }
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
          value={
            form.latitude
          }
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
          value={
            form.longitude
          }
          onChange={(e) =>
            setForm({
              ...form,
              longitude:
                e.target.value,
            })
          }
        />
        <div>
  <label className="block mb-2 font-medium">
    Replace Asset Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) =>
      setImage(
        e.target.files?.[0] || null
      )
    }
    className="w-full border rounded p-3"
  />
</div>

        <button
          type="submit"
          className="bg-slate-900 text-white px-6 py-3 rounded hover:bg-slate-700"
        >
          Update Asset
        </button>
      </form>
    </div>
  );
}

export default EditAssetPage;