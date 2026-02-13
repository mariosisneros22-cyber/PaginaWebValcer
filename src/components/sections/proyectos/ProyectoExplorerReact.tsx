import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Projecto, ProjectFilters } from "../../../lib/projects";
import "./proyecto-explorer.css";

import {
  applyProjectFilters,
  parseFiltersFromUrl,
  buildProjectsQueryString,
  getAvailableStates,
  getAvailableRubros,
  getAvailableDepartamentos,
  formatEstadoLabel,
  formatSimpleLabel,
} from "../../../lib/projects";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import ProyectoCardView from "./ProyectoCardView";

type ProjectWithCover = Projecto & {
  coverUrl: string;
};

type Props = {
  projects: ProjectWithCover[];
};

const DEFAULT_CENTER: [number, number] = [-77.0428, -12.0464];
const DEFAULT_ZOOM = 10;

export default function ProyectoExplorer({ projects }: Props) {
  // state
  const [filters, setFilters] = useState<ProjectFilters>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // map refs
  const mapRef = useRef<maplibregl.Map | null>(null);
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const initialViewRef = useRef<{ center: [number, number]; zoom: number } | null>(null);

  // init filters from URL
  useEffect(() => {
    const url = new URL(window.location.href);
    setFilters(parseFiltersFromUrl(url));
  }, []);

  // memo: options
  const estados = useMemo(() => getAvailableStates(projects), [projects]);
  const rubros = useMemo(() => getAvailableRubros(projects), [projects]);
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

  // memo: querystring
  const queryString = useMemo(() => buildProjectsQueryString(filters), [filters]);

  // sync URL (no reload)
  useEffect(() => {
    const next = `${window.location.pathname}${queryString}`;
    window.history.replaceState(null, "", next);
  }, [queryString]);

  // init map once
  useEffect(() => {
    if (!mapElRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapElRef.current,
      style: {
        version: 8,
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

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      map.remove();
      mapRef.current = null;
    };
  }, []);

  // keep selectedId valid
  useEffect(() => {
    if (!selectedId) return;
    const stillExists = filteredWithCoords.some((p) => p.id === selectedId);
    if (!stillExists) setSelectedId(null);
  }, [filteredWithCoords, selectedId]);

  // helpers
  const clearAll = useCallback(() => setFilters({}), []);

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

  // markers + fit bounds
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const run = () => {
      // clear old
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // create new
      const markers: maplibregl.Marker[] = filteredWithCoords.map((p) => {
        const el = document.createElement("button");
        el.type = "button";
        el.className = `marker ${p.id === selectedId ? "isActive" : ""}`;
        el.title = p.nombre;

        el.onclick = () => {
          setSelectedId(p.id);
          map.flyTo({
            center: [p.ubicacion.lng!, p.ubicacion.lat!],
            zoom: Math.max(map.getZoom(), 13),
          });
        };

        return new maplibregl.Marker({ element: el })
          .setLngLat([p.ubicacion.lng!, p.ubicacion.lat!])
          .addTo(map);
      });

      markersRef.current = markers;

      // fit view
      if (filteredWithCoords.length === 1) {
        const p = filteredWithCoords[0];
        map.flyTo({ center: [p.ubicacion.lng!, p.ubicacion.lat!], zoom: 13 });
      } else if (filteredWithCoords.length > 1) {
        const bounds = new maplibregl.LngLatBounds();
        filteredWithCoords.forEach((p) => bounds.extend([p.ubicacion.lng!, p.ubicacion.lat!]));
        map.fitBounds(bounds, { padding: 60, maxZoom: 13 });
      }
    };

    if (!map.isStyleLoaded()) {
      map.once("load", run);
      return;
    }

    run();
  }, [filteredWithCoords, selectedId]);

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
    if (filters.rubro) {
      list.push({
        key: "rubro",
        label: `Rubro: ${formatSimpleLabel(filters.rubro)}`,
        next: { ...filters, rubro: undefined },
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

  return (
    <section className="container">
      {/* FILTROS */}
      <div className="filters">
        <div className="row">
          <label>
            Estado
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

          <label>
            Rubro
            <select
              value={filters.rubro ?? ""}
              onChange={(e) => onChange({ rubro: e.target.value || undefined })}
            >
              <option value="">Todos</option>
              {rubros.map((r) => (
                <option key={r} value={r}>
                  {formatSimpleLabel(r)}
                </option>
              ))}
            </select>
          </label>

          <label>
            Departamento
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

          <label className="search">
            Buscar
            <input
              type="search"
              placeholder="Nombre, cliente, ubicación, rubro…"
              value={filters.q ?? ""}
              onChange={(e) => onChange({ q: e.target.value || undefined })}
            />
          </label>

          <div className="actions">
            <button type="button" onClick={clearAll}>
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {/* RESUMEN */}
      <div className="summary">
        <span>
          Mostrando <strong>{filtered.length}</strong> de <strong>{totalVisibles}</strong>
        </span>

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
        ) : null}
      </div>

      {/* SPLIT */}
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
            <div className="projects-grid">
              {filtered.map((p) => (
                <ProyectoCardView
                  key={p.id}
                  project={p}
                  className={p.id === selectedId ? "isActive" : ""}
                >
                  <button type="button" className="seeOnMap" onClick={() => flyToProject(p)}>
                    Ver en mapa
                  </button>

                  <a className="seeProject" href={`/proyectos/${p.slug}${queryString}`}>
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
        </section>
      </div>
    </section>
  );
}
