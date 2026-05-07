import { useEffect } from "react";
import { useMap } from "@/components/ui/map";

export function MapDebug() {
    const { map } = useMap();

    useEffect(() => {
        if (!map) return;

        function logMapState() {
            if (!map) return;

            const center = map.getCenter();
            const zoom = map.getZoom();
            const bearing = map.getBearing();
            const pitch = map.getPitch();
            const bounds = map.getBounds();

            console.clear();

            console.log("=================================");
            console.log("MAP CONFIG");
            console.log("=================================");

            console.log(`
const MAP_CENTER: [number, number] = [
  ${center.lng.toFixed(6)},
  ${center.lat.toFixed(6)}
];
`);

            console.log(`
<Map
  center={MAP_CENTER}
  zoom={${zoom.toFixed(2)}}
  pitch={${pitch.toFixed(2)}}
  bearing={${bearing.toFixed(2)}}
  minZoom={${(zoom - 1).toFixed(2)}}
  maxZoom={${(zoom + 1).toFixed(2)}}
  maxBounds={[
    [${bounds.getWest().toFixed(6)}, ${bounds.getSouth().toFixed(6)}],
    [${bounds.getEast().toFixed(6)}, ${bounds.getNorth().toFixed(6)}],
  ]}
/>
`);

            console.log(`
map.fitBounds(
  [
    [${bounds.getWest().toFixed(6)}, ${bounds.getSouth().toFixed(6)}],
    [${bounds.getEast().toFixed(6)}, ${bounds.getNorth().toFixed(6)}],
  ],
  {
    padding: {
      top: 100,
      bottom: 0,
      left: 80,
      right: 0,
    },
    bearing: ${bearing.toFixed(2)},
    pitch: ${pitch.toFixed(2)},
    duration: 0,
  }
);
`);

            console.log("=================================");
        }

        map.on("moveend", logMapState);

        logMapState();

        return () => {
            map.off("moveend", logMapState);
        };
    }, [map]);

    return null;
}