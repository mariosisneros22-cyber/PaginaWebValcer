import { c as createComponent, r as renderComponent, d as renderTemplate } from '../chunks/astro/server_BPQpu14k.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BEcER1h5.mjs';
import { p as proyectos, N as proyectoHero } from '../chunks/proyectos_Dy718Wo-.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import '../chunks/index.50c79162_yBNm_q_9.mjs';
import { p as parseFiltersFromUrl, g as getAvailableStates, c as getAvailableServicios, d as getAvailableDepartamentos, h as applyProjectFilters, j as buildProjectsQueryString, f as formatEstadoLabel, b as formatSimpleLabel, P as ProyectoCardView, a as assertValidProjects, r as resolveProjectAssetUrl } from '../chunks/images.server_CsA1g8SL.mjs';
export { renderers } from '../renderers.mjs';

const DEFAULT_CENTER = [-9.2, -74.5];
const DEFAULT_ZOOM = 4;
function ProyectoExplorer({ projects }) {
  const [filters, setFilters] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapModule, setMapModule] = useState(null);
  const mapRef = useRef(null);
  const mapElRef = useRef(null);
  const markerGroupRef = useRef(null);
  const markersRef = useRef(/* @__PURE__ */ new Map());
  const initialViewRef = useRef(null);
  const resultsTopRef = useRef(null);
  const lastUrlRef = useRef("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    (async () => {
      try {
        await Promise.resolve({                             });
        await import('../chunks/index.50c79162_yBNm_q_9.mjs').then(n => n.M);
        await import('../chunks/index.50c79162_yBNm_q_9.mjs').then(n => n.a);
        const L = (await import('leaflet')).default;
        await import('leaflet.markercluster');
        setMapModule(L);
      } catch (err) {
        console.error("Failed to load Leaflet:", err);
      }
    })();
  }, []);
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
    if (!mapElRef.current || mapRef.current) return;
    if (!mapModule) return;
    const map = mapModule.map(mapElRef.current).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    mapModule.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19
    }).addTo(map);
    const markerGroup = mapModule.markerClusterGroup({
      maxClusterRadius: 40,
      disableClusteringAtZoom: 16
    });
    mapRef.current = map;
    markerGroupRef.current = markerGroup;
    map.addLayer(markerGroup);
    initialViewRef.current = {
      center: mapModule.latLng(DEFAULT_CENTER),
      zoom: DEFAULT_ZOOM
    };
    map.on("click", (e) => {
      if (!e.originalEvent?.target?.closest?.(".leaflet-popup")) {
        setSelectedId(null);
      }
    });
    setMapReady(true);
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapModule]);
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
    map.setView(init.center, init.zoom, { animate: true, duration: 500 });
  }, []);
  const flyToProject = useCallback((p) => {
    const map = mapRef.current;
    const hasCoords = typeof p.ubicacion?.lat === "number" && typeof p.ubicacion?.lng === "number";
    if (!map || !hasCoords) return;
    setSelectedId(p.id);
    map.flyTo(mapModule.latLng(p.ubicacion.lat, p.ubicacion.lng), Math.max(map.getZoom(), 13), {
      animate: true,
      duration: 750
    });
  }, []);
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
    const map = mapRef.current;
    const markerGroup = markerGroupRef.current;
    if (!map || !markerGroup || !mapReady) return;
    markerGroup.clearLayers();
    markersRef.current.clear();
    filteredWithCoords.forEach((project) => {
      const { lat, lng } = project.ubicacion;
      if (typeof lat !== "number" || typeof lng !== "number") return;
      const isSelected = project.id === selectedId;
      const marker = mapModule.circleMarker([lat, lng], {
        radius: isSelected ? 10 : 7,
        color: "#fff",
        weight: isSelected ? 3 : 2,
        opacity: 1,
        fillColor: "#111",
        fillOpacity: 0.8
      });
      marker.on("click", (e) => {
        e.stopPropagation();
        setSelectedId(project.id);
        map.flyTo(mapModule.latLng(lat, lng), Math.max(map.getZoom(), 16), {
          animate: true,
          duration: 750
        });
      });
      marker.on("mouseover", () => {
        marker.setStyle({ weight: 3 });
        map.getContainer().style.cursor = "pointer";
      });
      marker.on("mouseout", () => {
        marker.setStyle({ weight: isSelected ? 3 : 2 });
        map.getContainer().style.cursor = "";
      });
      marker.bindPopup(project.nombre, { closeButton: false, autoClose: false });
      markersRef.current.set(project.id, marker);
      markerGroup.addLayer(marker);
    });
    if (filteredWithCoords.length > 1) {
      setTimeout(() => {
        const bounds = markerGroup.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
        }
      }, 50);
    } else if (filteredWithCoords.length === 1) {
      const p = filteredWithCoords[0];
      map.flyTo(mapModule.latLng(p.ubicacion.lat, p.ubicacion.lng), 13, {
        animate: true,
        duration: 750
      });
    }
  }, [filteredWithCoords, selectedId, mapReady]);
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
  return /* @__PURE__ */ jsxs("section", { className: "container container-explorer", children: [
    /* @__PURE__ */ jsx("div", { className: "filters", children: /* @__PURE__ */ jsxs("div", { className: "filtersBar", children: [
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
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "summaryRow", children: [
      /* @__PURE__ */ jsxs("div", { className: "summaryCount", children: [
        "Mostrando ",
        /* @__PURE__ */ jsx("strong", { children: filtered.length }),
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
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "mapReset",
            onClick: resetMapView,
            title: "Reiniciar vista",
            children: "Reset"
          }
        ),
        selected ? /* @__PURE__ */ jsxs("div", { className: "popup", children: [
          /* @__PURE__ */ jsxs("div", { className: "popupHead", children: [
            /* @__PURE__ */ jsx("strong", { children: selected.nombre }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "popupClose",
                onClick: () => setSelectedId(null),
                children: "×"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "popupBody", children: /* @__PURE__ */ jsxs("div", { className: "popupMeta", children: [
            selected.ubicacion.distrito ? `${selected.ubicacion.distrito}, ` : "",
            formatSimpleLabel(selected.ubicacion.departamento)
          ] }) })
        ] }) : null,
        filteredWithCoords.length === 0 ? /* @__PURE__ */ jsx("div", { className: "mapEmpty", children: "No hay proyectos con coordenadas para estos filtros." }) : null
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "splitList", children: filtered.length > 0 ? /* @__PURE__ */ jsx("div", { className: "projects-grid", children: filtered.map((p) => /* @__PURE__ */ jsxs(
        ProyectoCardView,
        {
          project: p,
          className: p.id === selectedId ? "isActive" : "",
          children: [
            /* @__PURE__ */ jsx("button", { type: "button", className: "seeOnMap", onClick: () => flyToProject(p), children: "Ver en mapa" }),
            /* @__PURE__ */ jsx("a", { className: "seeProject", href: `/proyectos/${p.slug}${queryString}`, children: "Ver proyecto" })
          ]
        },
        `${p.id}`
      )) }, queryString) : /* @__PURE__ */ jsxs("div", { className: "empty", children: [
        /* @__PURE__ */ jsx("h3", { children: "No se encontraron proyectos" }),
        /* @__PURE__ */ jsx("p", { children: "Prueba quitando filtros o cambiando la búsqueda." }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "clearBig", onClick: clearAll, children: "Limpiar filtros" })
      ] }) })
    ] })
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  assertValidProjects(proyectos);
  const projectsWithCover = proyectos.map((p) => ({
    ...p,
    coverUrl: resolveProjectAssetUrl(p.portada)
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Valcer - Proyectos", "heroTitle": "Proyectos", "heroImage": proyectoHero }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProyectoExplorerReact", ProyectoExplorer, { "client:idle": true, "projects": projectsWithCover, "client:component-hydration": "idle", "client:component-path": "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/proyectos/react/ProyectoExplorerReact.tsx", "client:component-export": "default" })} ` })}`;
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
