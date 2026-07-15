import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface Props {
  assets: any[];
}

function DashboardMap({ assets }: Props) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      className="h-[400px] w-full rounded-xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {assets.map((asset) => (
        <Marker
          key={asset.id}
          position={[
            asset.latitude,
            asset.longitude,
          ]}
        >
          <Popup>
            <strong>{asset.name}</strong>

            <br />

            {asset.assetType}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default DashboardMap;