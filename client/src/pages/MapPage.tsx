import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import { useEffect, useState,useRef } from "react";
import api from "../api/axios";
import MarkerClusterGroup
from "react-leaflet-cluster";
import HeatmapLayer from "../components/HeatmapLayer";

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
 function FlyToAsset({
  feature,
  markerRefs,
}: {
  feature: any;
  markerRefs: any;
}) {
  const map = useMap();

  useEffect(() => {
    if (!feature) return;

    const [lng, lat] =
      feature.geometry.coordinates;

    map.flyTo(
      [lat, lng],
      15,
      {
        duration: 1.5,
      }
    );

    setTimeout(() => {
      const marker =
        markerRefs.current[
          feature.properties.id
        ];

      if (marker) {
        marker.openPopup();
      }
    }, 1600);
  }, [
    feature,
    map,
    markerRefs,
  ]);

  return null;
}
function MapPage() {
  const [geoJson, setGeoJson] =
    useState<any>(null);

  const [filter, setFilter] =
    useState("ALL");
    const [viewMode, setViewMode] =
  useState("MARKERS");
    const [search, setSearch] =
  useState("");
  const [
  selectedFeature,
  setSelectedFeature,
] = useState<any>(null);
const markerRefs =
  useRef<any>({});

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
  geoJson.features.filter(
    (feature: any) => {
      const matchesStatus =
        filter === "ALL" ||
        feature.properties
          .status === filter;

      const matchesSearch =
        feature.properties.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesStatus &&
        matchesSearch
      );
    }
  );
const searchResults =
  search.length > 0
    ? geoJson.features.filter(
        (feature: any) =>
          feature.properties.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )
    : [];
    const heatmapPoints =
  filteredFeatures.map(
    (feature: any) => [
      feature.geometry
        .coordinates[1],
      feature.geometry
        .coordinates[0],
    ]
  );
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">
        GIS Map
      </h1>
<div className="mb-4">
 <div className="mb-4 relative">
  <input
    type="text"
    placeholder="Search Asset..."
    value={search}
    onChange={(e) => {
      setSearch(
        e.target.value
      );

      setSelectedFeature(
        null
      );
    }}
    className="w-full md:w-96 border rounded-lg p-3"
  />

  {search.length > 0 &&
    searchResults.length >
      0 && (
      <div className="absolute bg-white border rounded-lg shadow-lg w-full md:w-96 z-[9999] max-h-60 overflow-y-auto">
        {searchResults.map(
          (
            feature: any
          ) => (
            <div
              key={
                feature
                  .properties.id
              }
              onClick={() => {
                setSelectedFeature(
                  feature
                );

                setSearch(
                  feature
                    .properties
                    .name
                );
              }}
              className="p-3 hover:bg-slate-100 cursor-pointer border-b"
            >
              <div className="font-medium">
                {
                  feature
                    .properties
                    .name
                }
              </div>

              <div className="text-sm text-gray-500">
                {
                  feature
                    .properties
                    .assetType
                }
              </div>
            </div>
          )
        )}
      </div>
    )}
</div>
</div>
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
<div className="flex gap-3 mb-4">
  <button
    onClick={() =>
      setViewMode("MARKERS")
    }
    className="bg-blue-600 text-white px-4 py-2 rounded"
  >
    Markers
  </button>

  <button
    onClick={() =>
      setViewMode("HEATMAP")
    }
    className="bg-purple-600 text-white px-4 py-2 rounded"
  >
    Heatmap
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
        {selectedFeature && (
  <FlyToAsset
  feature={
    selectedFeature
  }
  markerRefs={
    markerRefs
  }
/>
)}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
{
  viewMode === "HEATMAP" && (
    <HeatmapLayer
      points={heatmapPoints}
    />
  )
}
      {
  viewMode ===
    "MARKERS" && (
    <MarkerClusterGroup>
  {filteredFeatures.map(
    (feature: any) => {
      const [lng, lat] =
        feature.geometry.coordinates;

      let markerIcon =
        greenIcon;

      if (
        feature.properties.status ===
        "MAINTENANCE"
      ) {
        markerIcon =
          yellowIcon;
      }

      if (
        feature.properties.status ===
        "INACTIVE"
      ) {
        markerIcon =
          redIcon;
      }

      return (
        <Marker
  ref={(ref) => {
    if (ref) {
      markerRefs.current[
        feature.properties.id
      ] = ref;
    }
  }}
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
            <div className="w-48">
              <h3 className="font-bold text-lg mb-2">
                {
                  feature.properties
                    .name
                }
              </h3>

              {feature.properties
                .imageUrl && (
                <img
                  src={
                    feature.properties
                      .imageUrl
                  }
                  alt={
                    feature.properties
                      .name
                  }
                  className="w-full h-28 object-cover rounded mb-2"
                />
              )}

              <p>
                <strong>Type:</strong>{" "}
                {
                  feature.properties
                    .assetType
                }
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {
                  feature.properties
                    .status
                }
              </p>
            </div>
          </Popup>
        </Marker>
      );
    }
  )}
    </MarkerClusterGroup>
  )
}
      </MapContainer>
    </div>
  );
}

export default MapPage;