import { c as createComponent, r as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DEPTrjPg.mjs';
import 'piccolore';
import { p as proyectosRaw, $ as $$Layout } from '../chunks/Layout_B3F6PsX_.mjs';
import { M as proyectoHero } from '../chunks/proyectoHero_ByyPjilN.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
/* empty css                                 */
import { p as parseFiltersFromUrl, g as getAvailableStates, c as getAvailableServicios, d as getAvailableDepartamentos, h as applyProjectFilters, j as buildProjectsQueryString, f as formatEstadoLabel, b as formatSimpleLabel, P as ProyectoCardView, a as assertValidProjects, r as resolveProjectAssetUrl } from '../chunks/images.server_CjXT5NVC.mjs';
/* empty css                                  */
import { $ as $$Button } from '../chunks/button_B7UJg7TY.mjs';
export { renderers } from '../renderers.mjs';

const DEFAULT_CENTER = [-74.5, -9.2];
const DEFAULT_ZOOM = 4;
const MOBILE_BREAKPOINT = 768;
const MOBILE_INITIAL_BATCH = 6;
const MOBILE_BATCH_STEP = 4;
const SOURCE_ID = "projects";
const LAYER_CLUSTERS = "clusters";
const LAYER_CLUSTER_COUNT = "cluster-count";
const LAYER_POINTS = "unclustered";
function toGeoJSON(projects) {
  const seen = /* @__PURE__ */ new Map();
  const features = projects.map((p) => {
    const lng = p.ubicacion.lng;
    const lat = p.ubicacion.lat;
    const key = `${lng.toFixed(6)},${lat.toFixed(6)}`;
    const idx = seen.get(key) ?? 0;
    seen.set(key, idx + 1);
    const jitterMeters = idx === 0 ? 0 : Math.min(50, 15 * idx);
    const angle = idx * 0.9;
    const dLng = jitterMeters === 0 ? 0 : jitterMeters * Math.cos(angle) / 111320;
    const dLat = jitterMeters === 0 ? 0 : jitterMeters * Math.sin(angle) / 110540;
    return {
      type: "Feature",
      id: p.id,
      // importante para match/feature-state si luego quieres
      properties: {
        id: p.id,
        nombre: p.nombre
      },
      geometry: {
        type: "Point",
        coordinates: [lng + dLng, lat + dLat]
      }
    };
  });
  return {
    type: "FeatureCollection",
    features
  };
}
function ProyectoExplorer({ projects }) {
  const [filters, setFilters] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(MOBILE_INITIAL_BATCH);
  const mapRef = useRef(null);
  const mapElRef = useRef(null);
  const initialViewRef = useRef(null);
  const resultsTopRef = useRef(null);
  const lastUrlRef = useRef("");
  useEffect(() => {
    const url = new URL(window.location.href);
    lastUrlRef.current = `${url.pathname}${url.search}`;
    setFilters(parseFiltersFromUrl(url));
  }, []);
  const estados = useMemo(() => getAvailableStates(projects), [projects]);
  const servicios = useMemo(() => getAvailableServicios(projects), [projects]);
  const dptos = useMemo(() => getAvailableDepartamentos(projects), [projects]);
  const filtered = useMemo(() => applyProjectFilters(projects, filters), [projects, filters]);
  const filteredWithCoords = useMemo(
    () => filtered.filter(
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
  const queryString = useMemo(() => buildProjectsQueryString(filters), [filters]);
  useEffect(() => {
    const isIndex = window.location.pathname === "/proyectos" || window.location.pathname === "/proyectos/";
    if (!isIndex) return;
    const next = `${window.location.pathname}${queryString}`;
    if (lastUrlRef.current === next) return;
    lastUrlRef.current = next;
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
    let destroyed = false;
    (async () => {
      if (!mapElRef.current || mapRef.current) return;
      const maplibregl = (await import('maplibre-gl')).default;
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
                "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
              ],
              tileSize: 256,
              attribution: "© OpenStreetMap contributors"
            }
          },
          layers: [{ id: "osm", type: "raster", source: "osm" }]
        },
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM
      });
      map.addControl(new maplibregl.NavigationControl(), "top-right");
      mapRef.current = map;
      initialViewRef.current = { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM };
      map.on("load", () => {
        if (destroyed) return;
        if (!map.getSource(SOURCE_ID)) {
          map.addSource(SOURCE_ID, {
            type: "geojson",
            data: { type: "FeatureCollection", features: [] },
            cluster: true,
            clusterRadius: 40,
            clusterMaxZoom: 16
          });
        }
        if (!map.getLayer(LAYER_CLUSTERS)) {
          map.addLayer({
            id: LAYER_CLUSTERS,
            type: "circle",
            source: SOURCE_ID,
            filter: ["has", "point_count"],
            paint: {
              "circle-radius": ["step", ["get", "point_count"], 16, 10, 20, 25, 26, 50, 32],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#fff",
              "circle-color": "#111"
            }
          });
        }
        if (!map.getLayer(LAYER_CLUSTER_COUNT)) {
          map.addLayer({
            id: LAYER_CLUSTER_COUNT,
            type: "symbol",
            source: SOURCE_ID,
            filter: ["has", "point_count"],
            layout: {
              "text-field": "{point_count_abbreviated}",
              "text-size": 12
            },
            paint: { "text-color": "#fff" }
          });
        }
        if (!map.getLayer(LAYER_POINTS)) {
          map.addLayer({
            id: LAYER_POINTS,
            type: "circle",
            source: SOURCE_ID,
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-radius": 7,
              "circle-color": "#111",
              "circle-stroke-width": 2,
              "circle-stroke-color": "#fff"
            }
          });
        }
        const expandCluster = (e) => {
          const map2 = mapRef.current;
          if (!map2) return;
          let feature = e?.features?.[0];
          if (!feature && e?.point) {
            const feats = map2.queryRenderedFeatures(e.point, {
              layers: [LAYER_CLUSTERS, LAYER_CLUSTER_COUNT]
            });
            feature = feats.find((f) => f.properties?.cluster_id != null);
          }
          if (!feature) return;
          const clusterId = Number(feature.properties?.cluster_id);
          const pointCount = feature.properties?.point_count;
          if (!Number.isFinite(clusterId)) return;
          const coords = feature.geometry.coordinates;
          const currentZoom = map2.getZoom();
          let zoomIncrement = 3;
          if (pointCount > 50) zoomIncrement = 1.5;
          else if (pointCount > 10) zoomIncrement = 1.5;
          const nextZoom = Math.min(currentZoom + zoomIncrement, 18);
          map2.easeTo({
            center: coords,
            zoom: nextZoom,
            duration: 450
          });
        };
        map.on("click", LAYER_CLUSTERS, expandCluster);
        map.on("click", LAYER_CLUSTER_COUNT, expandCluster);
        map.on("click", LAYER_POINTS, (e) => {
          const feats = map.queryRenderedFeatures(e.point, { layers: [LAYER_POINTS] });
          const f = feats[0];
          if (!f) return;
          const id = f.properties?.id;
          if (!id) return;
          setSelectedId(id);
          const coords = f.geometry.coordinates;
          map.flyTo({ center: coords, zoom: Math.max(map.getZoom(), 16) });
        });
        map.on("mouseenter", LAYER_CLUSTERS, () => map.getCanvas().style.cursor = "pointer");
        map.on("mouseleave", LAYER_CLUSTERS, () => map.getCanvas().style.cursor = "");
        map.on("mouseenter", LAYER_CLUSTER_COUNT, () => map.getCanvas().style.cursor = "pointer");
        map.on("mouseleave", LAYER_CLUSTER_COUNT, () => map.getCanvas().style.cursor = "");
        map.on("mouseenter", LAYER_POINTS, () => map.getCanvas().style.cursor = "pointer");
        map.on("mouseleave", LAYER_POINTS, () => map.getCanvas().style.cursor = "");
        map.on("click", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: [LAYER_CLUSTERS, LAYER_CLUSTER_COUNT, LAYER_POINTS]
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
  }, []);
  useEffect(() => {
    if (!selectedId) return;
    const stillExists = filteredWithCoords.some((p) => p.id === selectedId);
    if (!stillExists) setSelectedId(null);
  }, [filteredWithCoords, selectedId]);
  const clearAll = useCallback(() => {
    setFilters({});
  }, []);
  const onChange = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);
  const resetMapView = useCallback(() => {
    const map = mapRef.current;
    const init = initialViewRef.current;
    if (!map || !init) return;
    setSelectedId(null);
    map.easeTo({ center: init.center, zoom: init.zoom, duration: 500 });
  }, []);
  const flyToProject = useCallback((p) => {
    const map = mapRef.current;
    const hasCoords = typeof p.ubicacion?.lat === "number" && typeof p.ubicacion?.lng === "number";
    if (!map || !hasCoords) return;
    setSelectedId(p.id);
    map.flyTo({
      center: [p.ubicacion.lng, p.ubicacion.lat],
      zoom: Math.max(map.getZoom(), 13)
    });
  }, []);
  const loadMoreMobile = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + MOBILE_BATCH_STEP, filtered.length));
  }, [filtered.length]);
  useEffect(() => {
    const onPopState = () => {
      const url = new URL(window.location.href);
      lastUrlRef.current = `${url.pathname}${url.search}`;
      setFilters(parseFiltersFromUrl(url));
      setSelectedId(null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const map = mapRef.current;
      if (!map || !mapReady) return;
      const source = map.getSource(SOURCE_ID);
      if (!source) return;
      const geojson = toGeoJSON(filteredWithCoords);
      source.setData(geojson);
      if (filteredWithCoords.length === 1) {
        const p = filteredWithCoords[0];
        map.flyTo({ center: [p.ubicacion.lng, p.ubicacion.lat], zoom: 13 });
        return;
      }
      if (filteredWithCoords.length > 1) {
        const maplibregl = (await import('maplibre-gl')).default;
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
    const list = [];
    if (filters.estado) {
      list.push({
        key: "estado",
        label: `Estado: ${formatEstadoLabel(filters.estado)}`,
        next: { ...filters, estado: void 0 }
      });
    }
    if (filters.servicio) {
      list.push({
        key: "servicio",
        label: `Servicio: ${formatSimpleLabel(filters.servicio)}`,
        next: { ...filters, servicio: void 0 }
      });
    }
    if (filters.dpto) {
      list.push({
        key: "dpto",
        label: `Dpto: ${formatSimpleLabel(filters.dpto)}`,
        next: { ...filters, dpto: void 0 }
      });
    }
    if (filters.q) {
      list.push({
        key: "q",
        label: `Búsqueda: "${filters.q}"`,
        next: { ...filters, q: void 0 }
      });
    }
    return list;
  }, [filters]);
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!map.getLayer(LAYER_POINTS)) return;
    map.setPaintProperty(LAYER_POINTS, "circle-radius", [
      "case",
      ["==", ["get", "id"], selectedId ?? ""],
      10,
      7
    ]);
    map.setPaintProperty(LAYER_POINTS, "circle-stroke-width", [
      "case",
      ["==", ["get", "id"], selectedId ?? ""],
      3,
      2
    ]);
  }, [selectedId]);
  return /* @__PURE__ */ jsxs("section", { className: "container container-explorer", children: [
    /* @__PURE__ */ jsxs("div", { className: "filters", children: [
      /* @__PURE__ */ jsxs("div", { className: "filtersBar", children: [
        /* @__PURE__ */ jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsx("span", { className: "fieldLabel", children: "Estado" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: filters.estado ?? "",
              onChange: (e) => onChange({ estado: e.target.value || void 0 }),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Todos" }),
                estados.map((e) => /* @__PURE__ */ jsx("option", { value: e, children: formatEstadoLabel(e) }, e))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsx("span", { className: "fieldLabel", children: "Servicio" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: filters.servicio ?? "",
              onChange: (e) => onChange({ servicio: e.target.value || void 0 }),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Todos" }),
                servicios.map((r) => /* @__PURE__ */ jsx("option", { value: r, children: formatSimpleLabel(r) }, r))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "field", children: [
          /* @__PURE__ */ jsx("span", { className: "fieldLabel", children: "Departamento" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: filters.dpto ?? "",
              onChange: (e) => onChange({ dpto: e.target.value || void 0 }),
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Todos" }),
                dptos.map((d) => /* @__PURE__ */ jsx("option", { value: d, children: formatSimpleLabel(d) }, d))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "field searchField", children: [
          /* @__PURE__ */ jsx("span", { className: "fieldLabel", children: "Buscar" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "search",
              placeholder: "Nombre, cliente, ubicación…",
              value: filters.q ?? "",
              onChange: (e) => onChange({ q: e.target.value || void 0 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "clearBtn", onClick: clearAll, children: "Limpiar" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "quickFilters", "aria-label": "Filtros rapidos", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: `quickChip ${!filters.estado ? "is-active" : ""}`,
            onClick: () => onChange({ estado: void 0 }),
            "aria-pressed": !filters.estado,
            children: "Todos"
          }
        ),
        estados.map((estado) => {
          const active = filters.estado === estado;
          return /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: `quickChip ${active ? "is-active" : ""}`,
              onClick: () => onChange({ estado: active ? void 0 : estado }),
              "aria-pressed": active,
              children: formatEstadoLabel(estado)
            },
            `quick-${estado}`
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "summaryRow", children: [
      /* @__PURE__ */ jsxs("div", { className: "summaryCount", children: [
        "Mostrando ",
        /* @__PURE__ */ jsx("strong", { children: showingCount }),
        " de ",
        /* @__PURE__ */ jsx("strong", { children: totalVisibles })
      ] }),
      chips.length > 0 ? /* @__PURE__ */ jsx("div", { className: "chips", children: chips.map((c) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          className: "chip",
          onClick: () => setFilters(c.next),
          title: "Quitar filtro",
          children: [
            c.label,
            " ",
            /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "×" })
          ]
        },
        c.key
      )) }) : /* @__PURE__ */ jsx("span", {})
    ] }),
    /* @__PURE__ */ jsx("div", { ref: resultsTopRef, className: "resultsTop" }),
    /* @__PURE__ */ jsxs("div", { className: "split", children: [
      /* @__PURE__ */ jsx("aside", { className: "splitMap", children: /* @__PURE__ */ jsxs("div", { className: "mapWrap", children: [
        /* @__PURE__ */ jsx("div", { className: "map", ref: mapElRef }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "mapReset", onClick: resetMapView, title: "Reiniciar vista", children: "Reset" }),
        selected ? /* @__PURE__ */ jsxs("div", { className: "popup", children: [
          /* @__PURE__ */ jsxs("div", { className: "popupHead", children: [
            /* @__PURE__ */ jsx("strong", { children: selected.nombre }),
            /* @__PURE__ */ jsx("button", { type: "button", className: "popupClose", onClick: () => setSelectedId(null), children: "×" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "popupBody", children: /* @__PURE__ */ jsxs("div", { className: "popupMeta", children: [
            selected.ubicacion.distrito ? `${selected.ubicacion.distrito}, ` : "",
            formatSimpleLabel(selected.ubicacion.departamento)
          ] }) })
        ] }) : null,
        filteredWithCoords.length === 0 ? /* @__PURE__ */ jsx("div", { className: "mapEmpty", children: "No hay proyectos con coordenadas para estos filtros." }) : null
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "splitList", children: [
        filtered.length > 0 ? /* @__PURE__ */ jsx("div", { className: "projects-grid", children: visibleProjects.map((p) => /* @__PURE__ */ jsxs(
          ProyectoCardView,
          {
            project: p,
            mobileCompact: true,
            className: p.id === selectedId ? "isActive" : "",
            children: [
              /* @__PURE__ */ jsx("button", { type: "button", className: "btn btn-secondary btn-sm", onClick: () => flyToProject(p), children: "Ver en mapa" }),
              /* @__PURE__ */ jsx("a", { className: "btn btn-primary btn-sm", href: `/proyectos/${p.slug}${queryString}`, children: "Ver proyecto" })
            ]
          },
          `${p.id}`
        )) }, queryString) : /* @__PURE__ */ jsxs("div", { className: "empty", children: [
          /* @__PURE__ */ jsx("h3", { children: "No se encontraron proyectos" }),
          /* @__PURE__ */ jsx("p", { children: "Prueba quitando filtros o cambiando la búsqueda." }),
          /* @__PURE__ */ jsx("button", { type: "button", className: "clearBig", onClick: clearAll, children: "Limpiar filtros" })
        ] }),
        hasMoreMobile ? /* @__PURE__ */ jsx("div", { className: "loadMoreWrap", children: /* @__PURE__ */ jsxs("button", { type: "button", className: "loadMoreBtn", onClick: loadMoreMobile, children: [
          "Cargar mas (",
          filtered.length - visibleProjects.length,
          " restantes)"
        ] }) }) : null
      ] })
    ] })
  ] });
}

const $$ProyectoExplorer = createComponent(($$result, $$props, $$slots) => {
  assertValidProjects(proyectosRaw);
  const projectsWithCover = proyectosRaw.map((p) => ({
    ...p,
    coverUrl: resolveProjectAssetUrl(p.portada)
  }));
  return renderTemplate`${renderComponent($$result, "ProyectoExplorerReact", ProyectoExplorer, { "client:load": true, "projects": projectsWithCover, "client:component-hydration": "load", "client:component-path": "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/proyectos/react/ProyectoExplorerReact.tsx", "client:component-export": "default" })}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/proyectos/astro/ProyectoExplorer.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Valcer - Proyectos", "heroTitle": "Proyectos", "heroImage": proyectoHero, "data-astro-cid-y22iwnlk": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section-2" data-astro-cid-y22iwnlk> <div class="container" data-astro-cid-y22iwnlk> <h2 class="inp-t" data-astro-cid-y22iwnlk> Construimos soluciones que transforman territorio e industria.</h2> <p class="inp-p" data-astro-cid-y22iwnlk> Más de 20 proyectos ejecutados en todo el país</p> </div> </section> ${renderComponent($$result2, "ProyectoExplorer", $$ProyectoExplorer, { "data-astro-cid-y22iwnlk": true })} <section class="section" data-astro-cid-y22iwnlk> <div class="container" data-astro-cid-y22iwnlk> <h2 class="fnp-t" data-astro-cid-y22iwnlk>¿Tienes un proyecto en mente?</h2> <p class="fnp-p" data-astro-cid-y22iwnlk>Conversemos sobre cómo podemos ayudarte.</p> ${renderComponent($$result2, "Button", $$Button, { "href": "/contacto", "data-astro-cid-y22iwnlk": true }, { "default": ($$result3) => renderTemplate` Conversemos ` })} </div> </section> ` })} `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/proyectos/index.astro", void 0);

const $$file = "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/proyectos/index.astro";
const $$url = "/proyectos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
