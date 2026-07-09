import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

interface Props {
  points: [number, number][];
}

function HeatmapLayer({
  points,
}: Props) {
  const map = useMap();

  useEffect(() => {
    const heatLayer =
      (L as any).heatLayer(
        points,
        {
          radius: 25,
          blur: 15,
          maxZoom: 17,
        }
      );

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(
        heatLayer
      );
    };
  }, [map, points]);

  return null;
}

export default HeatmapLayer;