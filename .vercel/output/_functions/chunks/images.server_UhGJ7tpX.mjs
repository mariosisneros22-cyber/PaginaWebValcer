import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
/* empty css                         */
import { _ as __vite_glob_0_38, a as __vite_glob_0_37, b as __vite_glob_0_36, c as __vite_glob_0_35, d as __vite_glob_0_34, e as __vite_glob_0_33, f as __vite_glob_0_32, g as __vite_glob_0_31, h as __vite_glob_0_30, i as __vite_glob_0_29, j as __vite_glob_0_28, k as __vite_glob_0_27, l as __vite_glob_0_26, m as __vite_glob_0_25, n as __vite_glob_0_24, o as __vite_glob_0_23, p as __vite_glob_0_22, q as __vite_glob_0_21, r as __vite_glob_0_20, s as __vite_glob_0_19, t as __vite_glob_0_18, u as __vite_glob_0_17, v as __vite_glob_0_16, w as __vite_glob_0_15, x as __vite_glob_0_14, y as __vite_glob_0_13, z as __vite_glob_0_12, A as __vite_glob_0_11, B as __vite_glob_0_10, C as __vite_glob_0_9, D as __vite_glob_0_8, E as __vite_glob_0_7, F as __vite_glob_0_6, G as __vite_glob_0_5, H as __vite_glob_0_4, I as __vite_glob_0_3, J as __vite_glob_0_2, K as __vite_glob_0_1, L as __vite_glob_0_0 } from './proyectoHero_ByyPjilN.mjs';

const isVisibleProject = (p) => {
  const visible = p.visible ?? true;
  const estado = (p.estado || "").toLowerCase().trim();
  const blockedByEstado = estado === "arbitraje" || estado === "arbitrraje" || estado === "arbitrrajes" || estado === "arbitrajes";
  return visible && !blockedByEstado;
};
const normalize = (s) => (s ?? "").toString().trim().toLowerCase();
function getVisibleProjects(projects) {
  return projects.filter(isVisibleProject);
}
function getAvailableStates(projects) {
  const set = /* @__PURE__ */ new Set();
  for (const p of getVisibleProjects(projects)) {
    if (!p.estado) continue;
    set.add(normalize(p.estado));
  }
  const order = ["en_ejecucion", "finalizado"];
  return [
    ...order.filter((x) => set.has(x)),
    ...[...set].filter((x) => !order.includes(x)).sort()
  ];
}
function getAvailableServicios(projects) {
  const set = /* @__PURE__ */ new Set();
  for (const p of getVisibleProjects(projects)) {
    for (const r of p.servicios ?? []) {
      const v = normalize(r);
      if (v) set.add(v);
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
function getAvailableDepartamentos(projects) {
  const set = /* @__PURE__ */ new Set();
  for (const p of getVisibleProjects(projects)) {
    const d = normalize(p.ubicacion?.departamento ?? "");
    if (d) set.add(d);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}
const norm = (s) => (s ?? "").toString().trim().toLowerCase();
const allowedEstados = /* @__PURE__ */ new Set(["en_ejecucion", "finalizado"]);
function parseFiltersFromUrl(url) {
  const sp = url.searchParams;
  const estado = norm(sp.get("estado") ?? "");
  const servicio = norm(sp.get("servicio") ?? "");
  const dpto = norm(sp.get("dpto") ?? "");
  const q = (sp.get("q") ?? "").toString().trim();
  return {
    estado: allowedEstados.has(estado) ? estado : void 0,
    servicio: servicio || void 0,
    dpto: dpto || void 0,
    q: q || void 0
  };
}
function applyProjectFilters(projects, filters) {
  const base = getVisibleProjects(projects);
  const estado = filters.estado ? norm(filters.estado) : "";
  const servicio = filters.servicio ? norm(filters.servicio) : "";
  const dpto = filters.dpto ? norm(filters.dpto) : "";
  const q = filters.q ? norm(filters.q) : "";
  return base.filter((p) => {
    if (estado && norm(p.estado) !== estado) return false;
    if (servicio) {
      const has = (p.servicios ?? []).some((r) => norm(r) === servicio);
      if (!has) return false;
    }
    if (dpto) {
      const pd = norm(p.ubicacion?.departamento ?? "");
      if (pd !== dpto) return false;
    }
    if (q) {
      const haystack = [
        p.nombre,
        p.cliente,
        // ✅ si ya lo agregaste en el type como obligatorio
        p.resumen,
        p.ubicacion?.departamento,
        p.ubicacion?.provincia,
        p.ubicacion?.distrito,
        ...p.servicios ?? [],
        p.estado
      ].filter(Boolean).map((x) => String(x)).join(" ");
      if (!norm(haystack).includes(q)) return false;
    }
    return true;
  });
}
function buildProjectsQueryString(filters) {
  const sp = new URLSearchParams();
  if (filters.estado) sp.set("estado", norm(filters.estado));
  if (filters.servicio) sp.set("servicio", norm(filters.servicio));
  if (filters.dpto) sp.set("dpto", norm(filters.dpto));
  if (filters.q) sp.set("q", filters.q.trim());
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}
function titleCase(s) {
  const v = (s ?? "").toString().trim();
  if (!v) return "";
  return v.charAt(0).toUpperCase() + v.slice(1);
}
function formatEstadoLabel(estado) {
  const v = (estado ?? "").toString().trim().toLowerCase();
  if (v === "en_ejecucion") return "En ejecución";
  if (v === "finalizado") return "Finalizado";
  return titleCase(v.replaceAll("_", " "));
}
function formatSimpleLabel(v) {
  return titleCase((v ?? "").toString().trim().toLowerCase());
}
function assertValidProjects(projects) {
  const errors = [];
  for (const p of projects) {
    if (!p.cliente || !p.cliente.trim()) errors.push(`${p.slug}: falta cliente`);
    if (!p.nombre || !p.nombre.trim()) errors.push(`${p.slug}: falta nombre`);
    if (!p.slug || !p.slug.trim()) errors.push(`${p.id}: falta slug`);
  }
  if (errors.length) {
    throw new Error(`Datos inválidos en proyectos.json:
- ${errors.join("\n- ")}`);
  }
}
function estadoToKey(estado) {
  return (estado ?? "").toString().trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "_");
}

function ProyectoCardView({
  project,
  href,
  className,
  children,
  showServicios = true,
  mobileCompact = false
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cls = `project-card${mobileCompact ? " is-mobile-compact" : ""}${className ? ` ${className}` : ""}`;
  const estadoKey = estadoToKey(project.estado);
  const extra = Math.max(0, (project.servicios?.length ?? 0) - 2);
  const Inner = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "thumb", children: project.coverUrl ? /* @__PURE__ */ jsx(
      "img",
      {
        src: project.coverUrl,
        alt: project.nombre,
        loading: "lazy",
        decoding: "async",
        fetchPriority: "low"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "thumbFallback" }) }),
    /* @__PURE__ */ jsxs("div", { className: "body", children: [
      /* @__PURE__ */ jsx("h3", { className: "title", children: project.nombre }),
      /* @__PURE__ */ jsxs("p", { className: "meta metaLocation", children: [
        project.ubicacion?.distrito ? `${project.ubicacion.distrito}, ` : "",
        project.ubicacion?.departamento
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `mobileDetails${isExpanded ? " is-expanded" : ""}`, children: [
        /* @__PURE__ */ jsx("p", { className: "meta metaClient", children: project.cliente }),
        /* @__PURE__ */ jsxs("div", { className: "badges", children: [
          /* @__PURE__ */ jsx("span", { className: `tech-badge estado-${estadoKey}`, children: formatEstadoLabel(estadoKey) }),
          showServicios && /* @__PURE__ */ jsxs(Fragment, { children: [
            (project.servicios ?? []).slice(0, 2).map((s, i) => /* @__PURE__ */ jsx("span", { className: "tech-badge", children: formatSimpleLabel(s) }, `${s}-${i}`)),
            extra > 0 ? /* @__PURE__ */ jsxs("span", { className: "tag", children: [
              "+",
              extra
            ] }) : null
          ] })
        ] })
      ] }),
      mobileCompact ? /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "mobileExpandBtn",
          "aria-expanded": isExpanded,
          onClick: () => setIsExpanded((prev) => !prev),
          children: isExpanded ? "Ver menos" : "Ver mas"
        }
      ) : null,
      children ? /* @__PURE__ */ jsx("div", { className: "cardActions", children }) : null
    ] })
  ] });
  if (href) {
    return /* @__PURE__ */ jsx("a", { className: cls, href, children: Inner });
  }
  return /* @__PURE__ */ jsx("article", { className: cls, children: Inner });
}

const imgs = /* #__PURE__ */ Object.assign({"../../../../assets/images/proyecto/proj_001/01.jpg": __vite_glob_0_0,"../../../../assets/images/proyecto/proj_001/01.webp": __vite_glob_0_1,"../../../../assets/images/proyecto/proj_001/02.jpg": __vite_glob_0_2,"../../../../assets/images/proyecto/proj_001/02.webp": __vite_glob_0_3,"../../../../assets/images/proyecto/proj_001/03.jpg": __vite_glob_0_4,"../../../../assets/images/proyecto/proj_001/03.webp": __vite_glob_0_5,"../../../../assets/images/proyecto/proj_001/04.jpg": __vite_glob_0_6,"../../../../assets/images/proyecto/proj_001/04.webp": __vite_glob_0_7,"../../../../assets/images/proyecto/proj_001/05.jpg": __vite_glob_0_8,"../../../../assets/images/proyecto/proj_001/05.webp": __vite_glob_0_9,"../../../../assets/images/proyecto/proj_001/06.jpg": __vite_glob_0_10,"../../../../assets/images/proyecto/proj_001/06.webp": __vite_glob_0_11,"../../../../assets/images/proyecto/proj_001/cover.jpg": __vite_glob_0_12,"../../../../assets/images/proyecto/proj_001/cover.webp": __vite_glob_0_13,"../../../../assets/images/proyecto/proj_002/01.jpg": __vite_glob_0_14,"../../../../assets/images/proyecto/proj_002/01.webp": __vite_glob_0_15,"../../../../assets/images/proyecto/proj_002/cover.jpg": __vite_glob_0_16,"../../../../assets/images/proyecto/proj_002/cover.webp": __vite_glob_0_17,"../../../../assets/images/proyecto/proj_003/01.jpg": __vite_glob_0_18,"../../../../assets/images/proyecto/proj_003/01.webp": __vite_glob_0_19,"../../../../assets/images/proyecto/proj_003/cover.jpg": __vite_glob_0_20,"../../../../assets/images/proyecto/proj_003/cover.webp": __vite_glob_0_21,"../../../../assets/images/proyecto/proj_004/01.jpg": __vite_glob_0_22,"../../../../assets/images/proyecto/proj_004/01.webp": __vite_glob_0_23,"../../../../assets/images/proyecto/proj_004/cover.jpg": __vite_glob_0_24,"../../../../assets/images/proyecto/proj_004/cover.webp": __vite_glob_0_25,"../../../../assets/images/proyecto/proj_005/01.jpg": __vite_glob_0_26,"../../../../assets/images/proyecto/proj_005/01.webp": __vite_glob_0_27,"../../../../assets/images/proyecto/proj_005/cover.jpg": __vite_glob_0_28,"../../../../assets/images/proyecto/proj_005/cover.webp": __vite_glob_0_29,"../../../../assets/images/proyecto/proj_006/01.jpg": __vite_glob_0_30,"../../../../assets/images/proyecto/proj_006/01.webp": __vite_glob_0_31,"../../../../assets/images/proyecto/proj_006/cover.jpg": __vite_glob_0_32,"../../../../assets/images/proyecto/proj_006/cover.webp": __vite_glob_0_33,"../../../../assets/images/proyecto/proyecto-1.jpg": __vite_glob_0_34,"../../../../assets/images/proyecto/proyecto-2.jpg": __vite_glob_0_35,"../../../../assets/images/proyecto/proyecto-3.jpg": __vite_glob_0_36,"../../../../assets/images/proyecto/proyecto-4.jpg": __vite_glob_0_37,"../../../../assets/images/proyecto/proyectoHero.jpg": __vite_glob_0_38


});
function resolveProjectAssetUrl(relPath) {
  const key = `../../../../assets/images/proyecto/${relPath}`;
  const mod = imgs[key];
  return mod ? mod.default.src : "";
}

export { ProyectoCardView as P, assertValidProjects as a, formatSimpleLabel as b, getAvailableServicios as c, getAvailableDepartamentos as d, estadoToKey as e, formatEstadoLabel as f, getAvailableStates as g, applyProjectFilters as h, isVisibleProject as i, buildProjectsQueryString as j, parseFiltersFromUrl as p, resolveProjectAssetUrl as r };
