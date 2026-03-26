import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Projecto, ProjectFilters } from "../../../../lib/projects";

import "../styles/explorer.css";
import "../styles/map.css";

import {
  applyProjectFilters,
  parseFiltersFromUrl,
  buildProjectsQueryString,
  getAvailableStates,
  getAvailableServicios,
  getAvailableDepartamentos,
  formatEstadoLabel,
  formatSimpleLabel,
} from "../../../../lib/projects";

import type {
  Map as MapLibreMap,
  GeoJSONSource,
} from "maplibre-gl"


import "maplibre-gl/dist/maplibre-gl.css";

import ProyectoCardView from "./ProyectoCardView";

type ProjectWithCover = Projecto & {
  coverUrl: string;
};

type Props = {
  projects: ProjectWithCover[];
};

const DEFAULT_CENTER: [number, number] = [-74.5, -9.2];
const DEFAULT_ZOOM = 4;
const MOBILE_BREAKPOINT = 768;
const MOBILE_INITIAL_BATCH = 6;
const MOBILE_BATCH_STEP = 4;
const SOURCE_ID = "projects";
const LAYER_CLUSTERS = "clusters";
const LAYER_CLUSTER_COUNT = "cluster-count";
const LAYER_POINTS = "unclustered";


type FeatureProps = {
  id: string;
  nombre: string;
};

function toGeoJSON(projects: ProjectWithCover[]) {
  // Edge case: coords repetidas -> jitter mínimo determinístico
  const seen = new Map<string, number>();

  const features = projects.map((p) => {
    const lng = p.ubicacion.lng!;
    const lat = p.ubicacion.lat!;

    const key = `${lng.toFixed(6)},${lat.toFixed(6)}`;
    const idx = (seen.get(key) ?? 0);
    seen.set(key, idx + 1);

    // jitter: 0 para el primero, luego un pequeño offset en círculo
    const jitterMeters = idx === 0 ? 0 : Math.min(50, 15 * idx); // cap 25m
    const angle = idx * 0.9; // radian-ish
    const dLng = jitterMeters === 0 ? 0 : (jitterMeters * Math.cos(angle)) / 111320; // aprox
    const dLat = jitterMeters === 0 ? 0 : (jitterMeters * Math.sin(angle)) / 110540;

    return {
      type: "Feature" as const,
      id: p.id, // importante para match/feature-state si luego quieres
      properties: {
        id: p.id,
        nombre: p.nombre,
      } satisfies FeatureProps,
      geometry: {
        type: "Point" as const,
        coordinates: [lng + dLng, lat + dLat] as [number, number],
      },
    };
  });

  return {
    type: "FeatureCollection" as const,
    features,
  };
}

export default function ProyectoExplorer({ projects }: Props) {
  // state
  const [filters, setFilters] = useState<ProjectFilters>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(MOBILE_INITIAL_BATCH);
  const [mapShouldInit, setMapShouldInit] = useState(false);
  // map refs
  const mapRef = useRef<MapLibreMap | null>(null);
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const initialViewRef = useRef<{ center: [number, number]; zoom: number } | null>(null);

  const resultsTopRef = useRef<HTMLDivElement | null>(null);
  //filtros

  const lastUrlRef = useRef<string>("");
  
  // init filters from URL
  useEffect(() => {
    const url = new URL(window.location.href);
    lastUrlRef.current = `${url.pathname}${url.search}`;
    setFilters(parseFiltersFromUrl(url));
  }, []);

  // memo: options
  const estados = useMemo(() => getAvailableStates(projects), [projects]);
  const servicios = useMemo(() => getAvailableServicios(projects), [projects]);
  const dptos = useMemo(() => getAvailableDepartamentos(projects), [projects]);

  // memo: filtered
  const filtered = useMemo(() => applyProjectFilters(projects, filters), [projects, filters]);

  const filteredWithCoords = useMemo(
    () =>
      filtered.filter(
        (p) => typeof p.ubicacion?.lat === "number" && typeof p.ubicacion?.lng === "number"
      ),
    [filtered]
  );

  const totalVisibles = useMemo(() => applyProjectFilters(projects, {}).length, [projects]);

  const visibleProjects = useMemo(() => {
    if (!isMobile) return filtered;
    return filtered.slice(0, visibleCount);
  }, [filtered, isMobile, visibleCount]);

  const hasMoreMobile = isMobile && visibleProjects.length < filtered.length;
  const showingCount = isMobile ? visibleProjects.length : filtered.length;

  // memo: querystring
  const queryString = useMemo(() => buildProjectsQueryString(filters), [filters]);

  // sync URL (no reload)
  useEffect(() => {
    const isIndex =
      window.location.pathname === "/proyectos" ||
      window.location.pathname === "/proyectos/";

    if (!isIndex) return;

    const next = `${window.location.pathname}${queryString}`;
    if (lastUrlRef.current === next) return;

    lastUrlRef.current = next;

    // ✅ guardo filtros en history.state (clave para back/forward sin “cosas raras”)
    window.history.replaceState({ filters }, "", next);
  }, [queryString, filters]);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    setVisibleCount(MOBILE_INITIAL_BATCH);
  }, [isMobile, filters]);

  useEffect(() => {
    let timeoutId: number | null = null;
    let idleId: number | null = null;
    const g = globalThis as typeof globalThis & {
      requestIdleCallback?: (callback: IdleRequestCallback, opts?: IdleRequestOptions) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof g.requestIdleCallback === "function") {
      idleId = g.requestIdleCallback(() => setMapShouldInit(true), { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(() => setMapShouldInit(true), 350);
    }

    return () => {
      if (idleId !== null && typeof g.cancelIdleCallback === "function") {
        g.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  // init map once
  useEffect(() => {
    let destroyed = false;

    (async () => {
      if (!mapShouldInit) return;
      if (!mapElRef.current || mapRef.current) return;

      const maplibregl = (await import("maplibre-gl")).default;
      if (destroyed) return;

      const map = new maplibregl.Map({
        container: mapElRef.current,
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
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });

      map.addControl(new maplibregl.NavigationControl(), "top-right");

      mapRef.current = map;
      initialViewRef.current = { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM };

      map.on("load", () => {
        if (destroyed) return;

        // 1) Source cluster
        if (!map.getSource(SOURCE_ID)) {
          map.addSource(SOURCE_ID, {
            type: "geojson",
            data: { type: "FeatureCollection", features: [] },
            cluster: true,
            clusterRadius: 40,
            clusterMaxZoom: 16,
          });
        }

        // 2) Cluster circles
        if (!map.getLayer(LAYER_CLUSTERS)) {
          map.addLayer({
            id: LAYER_CLUSTERS,
            type: "circle",
            source: SOURCE_ID,
            filter: ["has", "point_count"],
            paint: {
              "circle-radius": ["step", ["get", "point_count"], 16, 10, 20, 25, 26, 50, 32],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
              "circle-color": "#2a2b6f",
            },
          });
        }

        // 3) Cluster count labels
        if (!map.getLayer(LAYER_CLUSTER_COUNT)) {
          map.addLayer({
            id: LAYER_CLUSTER_COUNT,
            type: "symbol",
            source: SOURCE_ID,
            filter: ["has", "point_count"],
            layout: {
              "text-field": "{point_count_abbreviated}",
              "text-size": 12,
            },
            paint: { "text-color": "#ffffff" },
          });
        }

        // 4) Unclustered points
        if (!map.getLayer(LAYER_POINTS)) {
          map.addLayer({
            id: LAYER_POINTS,
            type: "circle",
            source: SOURCE_ID,
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-radius": 7,
              "circle-color": "#2a2b6f",
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
            },
          });
        }

        // --------- Handlers ---------

        const expandCluster = (e: any) => {
          const map = mapRef.current;
          if (!map) return;

          let feature = e?.features?.[0];

          if (!feature && e?.point) {
            const feats = map.queryRenderedFeatures(e.point, {
              layers: [LAYER_CLUSTERS, LAYER_CLUSTER_COUNT],
            });
            feature = feats.find((f) => (f.properties as any)?.cluster_id != null);
          }

          if (!feature) return;

          const clusterId = Number((feature.properties as any)?.cluster_id);
          const pointCount = (feature.properties as any)?.point_count;

          if (!Number.isFinite(clusterId)) return;

          const coords = (feature.geometry as any).coordinates as [number, number];
          const currentZoom = map.getZoom();

          let zoomIncrement = 3;
          if (pointCount > 50) zoomIncrement = 1.5;
          else if (pointCount > 10) zoomIncrement = 1.5;

          const nextZoom = Math.min(currentZoom + zoomIncrement, 18);

          map.easeTo({
            center: coords,
            zoom: nextZoom,
            duration: 450,
          });
        };

        map.on("click", LAYER_CLUSTERS, expandCluster);
        map.on("click", LAYER_CLUSTER_COUNT, expandCluster);

        map.on("click", LAYER_POINTS, (e) => {
          const feats = map.queryRenderedFeatures(e.point, { layers: [LAYER_POINTS] });
          const f = feats[0];
          if (!f) return;

          const id = (f.properties as any)?.id as string | undefined;
          if (!id) return;

          setSelectedId(id);

          const coords = (f.geometry as any).coordinates as [number, number];
          map.flyTo({ center: coords, zoom: Math.max(map.getZoom(), 16) });
        });

        // Cursor
        map.on("mouseenter", LAYER_CLUSTERS, () => (map.getCanvas().style.cursor = "pointer"));
        map.on("mouseleave", LAYER_CLUSTERS, () => (map.getCanvas().style.cursor = ""));
        map.on("mouseenter", LAYER_CLUSTER_COUNT, () => (map.getCanvas().style.cursor = "pointer"));
        map.on("mouseleave", LAYER_CLUSTER_COUNT, () => (map.getCanvas().style.cursor = ""));
        map.on("mouseenter", LAYER_POINTS, () => (map.getCanvas().style.cursor = "pointer"));
        map.on("mouseleave", LAYER_POINTS, () => (map.getCanvas().style.cursor = ""));

        // Fondo: cerrar selección
        map.on("click", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: [LAYER_CLUSTERS, LAYER_CLUSTER_COUNT, LAYER_POINTS],
          });
          if (!features.length) setSelectedId(null);
        });

        setMapReady(true);
      });
    })();

    return () => {
      destroyed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [mapShouldInit]);



  // keep selectedId valid
  useEffect(() => {
    if (!selectedId) return;
    const stillExists = filteredWithCoords.some((p) => p.id === selectedId);
    if (!stillExists) setSelectedId(null);
  }, [filteredWithCoords, selectedId]);

  // helpers
  const clearAll = useCallback(()=>{
    setFilters({});
  }, []);

  const onChange = useCallback((patch: Partial<ProjectFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetMapView = useCallback(() => {
    const map = mapRef.current;
    const init = initialViewRef.current;
    if (!map || !init) return;

    setSelectedId(null);
    map.easeTo({ center: init.center, zoom: init.zoom, duration: 500 });
  }, []);

  const flyToProject = useCallback((p: ProjectWithCover) => {
    const map = mapRef.current;
    const hasCoords =
      typeof p.ubicacion?.lat === "number" && typeof p.ubicacion?.lng === "number";
    if (!map || !hasCoords) return;

    setSelectedId(p.id);
    map.flyTo({
      center: [p.ubicacion.lng!, p.ubicacion.lat!],
      zoom: Math.max(map.getZoom(), 13),
    });
  }, []);

  const loadMoreMobile = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + MOBILE_BATCH_STEP, filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    const onPopState = () => {
      const url = new URL(window.location.href);

      // sincroniza el guard para que no re-escriba inmediatamente
      lastUrlRef.current = `${url.pathname}${url.search}`;

      setFilters(parseFiltersFromUrl(url));
      setSelectedId(null); // opcional: al volver, cierras selección
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // markers + fit bounds
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const map = mapRef.current;
      if (!map || !mapReady) return;

      const source = map.getSource(SOURCE_ID) as GeoJSONSource | undefined;
      if (!source) return;

      const geojson = toGeoJSON(filteredWithCoords);
      source.setData(geojson as any);

      if (filteredWithCoords.length === 1) {
        const p = filteredWithCoords[0];
        map.flyTo({ center: [p.ubicacion.lng!, p.ubicacion.lat!], zoom: 13 });
        return;
      }

      if (filteredWithCoords.length > 1) {
        const maplibregl = (await import("maplibre-gl")).default;
        if (cancelled) return;

        const bounds = new maplibregl.LngLatBounds();
        geojson.features.forEach((f) => bounds.extend(f.geometry.coordinates));

        map.fitBounds(bounds, { padding: 60, maxZoom: 16, duration: 550 });
        return;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filteredWithCoords, mapReady]);




  const selected = useMemo(
    () => filteredWithCoords.find((p) => p.id === selectedId) ?? null,
    [filteredWithCoords, selectedId]
  );

  const chips = useMemo(() => {
    const list: { key: string; label: string; next: ProjectFilters }[] = [];

    if (filters.estado) {
      list.push({
        key: "estado",
        label: `Estado: ${formatEstadoLabel(filters.estado)}`,
        next: { ...filters, estado: undefined },
      });
    }
    if (filters.servicio) {
      list.push({
        key: "servicio",
        label: `Servicio: ${formatSimpleLabel(filters.servicio)}`,
        next: { ...filters, servicio: undefined },
      });
    }
    if (filters.dpto) {
      list.push({
        key: "dpto",
        label: `Dpto: ${formatSimpleLabel(filters.dpto)}`,
        next: { ...filters, dpto: undefined },
      });
    }
    if (filters.q) {
      list.push({
        key: "q",
        label: `Búsqueda: "${filters.q}"`,
        next: { ...filters, q: undefined },
      });
    }

    return list;
  }, [filters]);

  
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!map.getLayer(LAYER_POINTS)) return;

    // pinta diferente el seleccionado usando una expresión
    // (si no hay selectedId, queda normal)
    map.setPaintProperty(LAYER_POINTS, "circle-radius", [
      "case",
      ["==", ["get", "id"], selectedId ?? ""],
      10,
      7,
    ]);

    map.setPaintProperty(LAYER_POINTS, "circle-stroke-width", [
      "case",
      ["==", ["get", "id"], selectedId ?? ""],
      3,
      2,
    ]);
  }, [selectedId]);


  return (
    <section className="container container-explorer">
      {/* filtros*/ }
      <div className="filters" >
        <div className="filtersBar">
          
          <label className="field">
            <span className="fieldLabel">Estado</span>
            <select
              value={filters.estado ?? ""}
              onChange={(e) => onChange({ estado: e.target.value || undefined })}
            >
              <option value="">Todos</option>
              {estados.map((e) => (
                <option key={e} value={e}>
                  {formatEstadoLabel(e)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Servicio</span>
            <select
              value={filters.servicio ?? ""}
              onChange={(e) => onChange({ servicio: e.target.value || undefined })}
            >
              <option value="">Todos</option>
              {servicios.map((r) => (
                <option key={r} value={r}>
                  {formatSimpleLabel(r)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="fieldLabel">Departamento</span>
            <select
              value={filters.dpto ?? ""}
              onChange={(e) => onChange({ dpto: e.target.value || undefined })}
            >
              <option value="">Todos</option>
              {dptos.map((d) => (
                <option key={d} value={d}>
                  {formatSimpleLabel(d)}
                </option>
              ))}
            </select>
          </label>

          <label className="field searchField">
            <span className="fieldLabel">Buscar</span>
            <input
              type="search"
              placeholder="Nombre, cliente, ubicación…"
              value={filters.q ?? ""}
              onChange={(e) => onChange({ q: e.target.value || undefined })}
            />
          </label>
          <button type="button" className="clearBtn" onClick={clearAll}>
            Limpiar
          </button>
          
        </div>

        <div className="quickFilters" aria-label="Filtros rapidos">
          <button
            type="button"
            className={`quickChip ${!filters.estado ? "is-active" : ""}`}
            onClick={() => onChange({ estado: undefined })}
            aria-pressed={!filters.estado}
          >
            Todos
          </button>
          {estados.map((estado) => {
            const active = filters.estado === estado;
            return (
              <button
                key={`quick-${estado}`}
                type="button"
                className={`quickChip ${active ? "is-active" : ""}`}
                onClick={() => onChange({ estado: active ? undefined : estado })}
                aria-pressed={active}
              >
                {formatEstadoLabel(estado)}
              </button>
            );
          })}
        </div>
      </div>

      {/* RESUMEN */}
      <div className="summaryRow">
        <div className="summaryCount">
          Mostrando <strong>{showingCount}</strong> de <strong>{totalVisibles}</strong>
        </div>

        {chips.length > 0 ? (
          <div className="chips">
            {chips.map((c) => (
              <button
                key={c.key}
                type="button"
                className="chip"
                onClick={() => setFilters(c.next)}
                title="Quitar filtro"
              >
                {c.label} <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
      </div>

      {/* SPLIT */}
      <div ref={resultsTopRef} className="resultsTop"/>
      <div className="split">
        <aside className="splitMap">
          <div className="mapWrap">
            <div className="map" ref={mapElRef} />

            <button type="button" className="mapReset" onClick={resetMapView} title="Reiniciar vista">
              Reset
            </button>

            {selected ? (
              <div className="popup">
                <div className="popupHead">
                  <strong>{selected.nombre}</strong>
                  <button type="button" className="popupClose" onClick={() => setSelectedId(null)}>
                    ×
                  </button>
                </div>
                <div className="popupBody">
                  <div className="popupMeta">
                    {selected.ubicacion.distrito ? `${selected.ubicacion.distrito}, ` : ""}
                    {formatSimpleLabel(selected.ubicacion.departamento)}
                  </div>
                </div>
              </div>
            ) : null}

            {filteredWithCoords.length === 0 ? (
              <div className="mapEmpty">No hay proyectos con coordenadas para estos filtros.</div>
            ) : null}
          </div>
        </aside>


        <section className="splitList">
          {filtered.length > 0 ? (
            <div className="projects-grid" key={queryString}>
              {visibleProjects.map((p) => (
                <ProyectoCardView
                  key={`${p.id}`}
                  project={p}
                  mobileCompact
                  className={p.id === selectedId ? "isActive" : ""}
                >
                  <button type="button" className="btn btn-secondary btn-sm" onClick={() => flyToProject(p)}>
                    Ver en mapa
                  </button>

                  <a className="btn btn-primary btn-sm" href={`/proyectos/${p.slug}${queryString}`} >
                    Ver proyecto
                  </a>
                </ProyectoCardView>
              ))}
            </div>
          ) : (
            <div className="empty">
              <h3>No se encontraron proyectos</h3>
              <p>Prueba quitando filtros o cambiando la búsqueda.</p>
              <button type="button" className="clearBig" onClick={clearAll}>
                Limpiar filtros
              </button>
            </div>
          )}
          {hasMoreMobile ? (
            <div className="loadMoreWrap">
              <button type="button" className="loadMoreBtn" onClick={loadMoreMobile}>
                Cargar mas ({filtered.length - visibleProjects.length} restantes)
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </section>
  );
}
