import { useState } from "react";
import api from "../api/axios";

function NearbyAssetsPage() {
  const [lat, setLat] =
    useState("");

  const [lng, setLng] =
    useState("");

  const [radius, setRadius] =
    useState("5");

  const [assets, setAssets] =
    useState<any[]>([]);

  const searchNearby =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.get(
            `/assets/nearby?latitude=${lat}&longitude=${lng}&radius=${radius}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setAssets(
          res.data.assets
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        Nearby Assets Search
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-4">
        <input
          className="w-full border rounded p-3"
          placeholder="Latitude"
          value={lat}
          onChange={(e) =>
            setLat(
              e.target.value
            )
          }
        />

        <input
          className="w-full border rounded p-3"
          placeholder="Longitude"
          value={lng}
          onChange={(e) =>
            setLng(
              e.target.value
            )
          }
        />

        <input
          className="w-full border rounded p-3"
          placeholder="Radius (km)"
          value={radius}
          onChange={(e) =>
            setRadius(
              e.target.value
            )
          }
        />

        <button
          onClick={
            searchNearby
          }
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Search
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-4">
                Name
              </th>
              <th className="p-4">
                Type
              </th>
              <th className="p-4">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {assets.map(
              (asset) => (
                <tr
                  key={asset.id}
                >
                  <td className="p-4">
                    {asset.name}
                  </td>

                  <td className="p-4">
                    {
                      asset.assetType
                    }
                  </td>

                  <td className="p-4">
                    {
                      asset.status
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NearbyAssetsPage;