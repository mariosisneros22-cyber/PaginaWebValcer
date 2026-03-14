import React, { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

type Props = { lng: number; lat: number; zoom?: number };

const PERU_BOUNDS: [[number, number], [number, number]] = [
  [-81.35, -18.35],
  [-68.65, 0.25],
];

export default function MiniMapaProyecto({ lng, lat, zoom = 14 }: Props) {
  const mapRef = useRef<any>(null);
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let destroyed = false;

    (async () => {
      if (!elRef.current || mapRef.current) return;

      const maplibregl = (await import("maplibre-gl")).default;

      if (destroyed) return;

      const map = new maplibregl.Map({
        container: elRef.current!,
        style: {
          version: 8,
          glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
          sources: {
            osm: {
              type: "raster",
              tiles: [
                "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
              ],
              tileSize: 256,
              attribution: "© OpenStreetMap contributors",
            },
          },
          layers: [{ id: "osm", type: "raster", source: "osm" }],
        },
        center: [lng, lat],
        zoom,
        interactive: false, // ✅ minimapa: menos costo
      });

      mapRef.current = map;

      map.on("load", () => {
        map.setMaxBounds(PERU_BOUNDS);
        new maplibregl.Marker({ color: "#2a2b6f" }).setLngLat([lng, lat]).addTo(map);
      });
    })();

    return () => {
      destroyed = true;
      mapRef.current?.remove?.();
      mapRef.current = null;
    };
  }, [lng, lat, zoom]);

  return <div ref={elRef} className="miniMap" />;
}
