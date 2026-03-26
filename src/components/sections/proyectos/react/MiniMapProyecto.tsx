import React, { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

type Props = {
  lng: number;
  lat: number;
  zoom?: number;
  className?: string;
  lazy?: boolean;
  rootMargin?: string;
  initOnIdle?: boolean;
  releaseOnExit?: boolean;
  showMarker?: boolean;
  showAttribution?: boolean;
};

const PERU_BOUNDS: [[number, number], [number, number]] = [
  [-81.35, -18.35],
  [-68.65, 0.25],
];

export default function MiniMapaProyecto({
  lng,
  lat,
  zoom = 14,
  className = "miniMap",
  lazy = false,
  rootMargin = "180px 0px",
  initOnIdle = false,
  releaseOnExit = false,
  showMarker = true,
  showAttribution = true,
}: Props) {
  const mapRef = useRef<any>(null);
  const elRef = useRef<HTMLDivElement | null>(null);
  const [shouldInit, setShouldInit] = useState(!lazy);
  const idleHandleRef = useRef<number | null>(null);

  useEffect(() => {
    if (!lazy || !elRef.current) return;

    const scheduleInit = () => {
      if (shouldInit) return;

      if (!initOnIdle) {
        setShouldInit(true);
        return;
      }

      const g = globalThis as typeof globalThis & {
        requestIdleCallback?: (callback: IdleRequestCallback, opts?: IdleRequestOptions) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

      if (typeof g.requestIdleCallback === "function") {
        idleHandleRef.current = g.requestIdleCallback(
          () => {
            idleHandleRef.current = null;
            setShouldInit(true);
          },
          { timeout: 1000 }
        );
      } else {
        idleHandleRef.current = window.setTimeout(() => {
          idleHandleRef.current = null;
          setShouldInit(true);
        }, 180);
      }
    };

    const clearScheduledInit = () => {
      const handle = idleHandleRef.current;
      if (handle === null) return;

      const g = globalThis as typeof globalThis & {
        cancelIdleCallback?: (handle: number) => void;
      };

      if (typeof g.cancelIdleCallback === "function") {
        g.cancelIdleCallback(handle);
      } else {
        window.clearTimeout(handle);
      }
      idleHandleRef.current = null;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);

        if (isIntersecting) {
          scheduleInit();
          return;
        }

        clearScheduledInit();

        if (releaseOnExit) {
          setShouldInit(false);
        }
      },
      { rootMargin }
    );

    observer.observe(elRef.current);

    return () => {
      clearScheduledInit();
      observer.disconnect();
    };
  }, [lazy, shouldInit, rootMargin, initOnIdle, releaseOnExit]);

  useEffect(() => {
    let destroyed = false;

    (async () => {
      if (!shouldInit) return;
      if (!elRef.current || mapRef.current) return;

      const maplibregl = (await import("maplibre-gl")).default;

      if (destroyed) return;

      const map = new maplibregl.Map({
        container: elRef.current,
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
              attribution: "OpenStreetMap contributors",
            },
          },
          layers: [{ id: "osm", type: "raster", source: "osm" }],
        },
        center: [lng, lat],
        zoom,
        interactive: false,
        attributionControl: showAttribution ? undefined : false,
      });

      mapRef.current = map;

      map.on("load", () => {
        map.setMaxBounds(PERU_BOUNDS);
        if (showMarker) {
          new maplibregl.Marker({ color: "#2a2b6f" }).setLngLat([lng, lat]).addTo(map);
        }
      });
    })();

    return () => {
      destroyed = true;
      mapRef.current?.remove?.();
      mapRef.current = null;
    };
  }, [lng, lat, zoom, shouldInit, showMarker, showAttribution]);

  return <div ref={elRef} className={className} />;
}
