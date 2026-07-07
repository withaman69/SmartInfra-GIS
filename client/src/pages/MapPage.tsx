import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";

import { useEffect, useState } from "react";
import api from "../api/axios";
const greenIcon =
  new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

const yellowIcon =
  new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

const redIcon =
  new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
function MapPage() {
  const [geoJson, setGeoJson] =
    useState<any>(null);

  const [filter, setFilter] =
    useState("ALL");

  useEffect(() => {
    const fetchGeoJson =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          const res =
            await api.get(
              "/assets/geojson",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          setGeoJson(res.data);
        } catch (error) {
          console.error(error);
        }
      };

    fetchGeoJson();
  }, []);

  if (!geoJson) {
    return (
      <h2 className="text-xl font-bold">
        Loading Map...
      </h2>
    );
  }

  const filteredFeatures =
    filter === "ALL"
      ? geoJson.features
      : geoJson.features.filter(
          (feature: any) =>
            feature.properties
              .status === filter
        );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">
        GIS Map
      </h1>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() =>
            setFilter("ALL")
          }
          className="bg-slate-900 text-white px-4 py-2 rounded"
        >
          All
        </button>

        <button
          onClick={() =>
            setFilter("ACTIVE")
          }
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Active
        </button>

        <button
          onClick={() =>
            setFilter(
              "MAINTENANCE"
            )
          }
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Maintenance
        </button>

        <button
          onClick={() =>
            setFilter(
              "INACTIVE"
            )
          }
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Inactive
        </button>
      </div>

      <MapContainer
        center={[15.3015, 74.1235]}
        zoom={13}
        style={{
          height: "80vh",
          width: "100%",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

       {filteredFeatures.map(
  (feature: any) => {
    const [
      lng,
      lat,
    ] =
      feature.geometry
        .coordinates;

    let markerIcon =
      greenIcon;

    if (
      feature.properties
        .status ===
      "MAINTENANCE"
    ) {
      markerIcon =
        yellowIcon;
    }

    if (
      feature.properties
        .status ===
      "INACTIVE"
    ) {
      markerIcon =
        redIcon;
    }

    return (
      <Marker
        key={
          feature.properties.id
        }
        position={[
          lat,
          lng,
        ]}
        icon={markerIcon}
      >
                <Popup>
                  <h3 className="font-bold">
                    {
                      feature
                        .properties
                        .name
                    }
                  </h3>

                  <p>
                    Status:{" "}
                    {
                      feature
                        .properties
                        .status
                    }
                  </p>
                </Popup>
              </Marker>
            );
          }
        )}
      </MapContainer>
    </div>
  );
}

export default MapPage;