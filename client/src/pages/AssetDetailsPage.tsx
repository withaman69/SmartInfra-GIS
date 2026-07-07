import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function AssetDetailsPage() {
  const { id } = useParams();

  const [asset, setAsset] =
    useState<any>(null);

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
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setAsset(res.data.asset);
        } catch (error) {
          console.error(error);
        }
      };

    fetchAsset();
  }, [id]);

  if (!asset) {
    return (
      <h2 className="text-2xl font-bold">
        Loading Asset...
      </h2>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h1 className="text-4xl font-bold mb-6">
        {asset.name}
      </h1>

      <div className="space-y-4">
        <p>
          <strong>Type:</strong>{" "}
          {asset.assetType}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {asset.status}
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {asset.description}
        </p>

        <p>
          <strong>Latitude:</strong>{" "}
          {asset.latitude}
        </p>

        <p>
          <strong>Longitude:</strong>{" "}
          {asset.longitude}
        </p>
      </div>
    </div>
  );
}

export default AssetDetailsPage;