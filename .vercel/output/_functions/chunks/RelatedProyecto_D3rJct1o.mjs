import { c as createComponent, r as renderComponent, d as renderTemplate, e as createAstro } from './astro/server_DEPTrjPg.mjs';
import 'piccolore';
import { p as proyectosRaw } from './Layout_B3F6PsX_.mjs';
import { P as ProyectoCardView, i as isVisibleProject, r as resolveProjectAssetUrl } from './images.server_CjXT5NVC.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
/* empty css                         */

function RelatedProyectoReact({
  title = "Proyectos relacionados",
  subtitle,
  projects,
  backQuery = "",
  showHeader = true,
  variant = "grid"
  // ✅ por defecto el layout clásico
}) {
  if (!projects?.length) return null;
  const safeQuery = backQuery && backQuery !== "?" ? backQuery.startsWith("?") ? backQuery : `?${backQuery}` : "";
  return /* @__PURE__ */ jsxs("section", { className: `related ${variant === "mag" ? "related--mag" : ""}`, children: [
    showHeader && /* @__PURE__ */ jsxs("div", { className: "head", children: [
      /* @__PURE__ */ jsx("h2", { children: title }),
      subtitle ? /* @__PURE__ */ jsx("p", { children: subtitle }) : null
    ] }),
    variant === "mag" ? (() => {
      const featured = projects[0];
      const secondary = projects.slice(1, 4);
      return /* @__PURE__ */ jsxs("div", { className: "magGrid", children: [
        /* @__PURE__ */ jsx(
          ProyectoCardView,
          {
            className: "isFeatured",
            project: featured,
            href: `/proyectos/${featured.slug}${safeQuery}`,
            showServicios: false
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "magSide", children: secondary.map((p) => /* @__PURE__ */ jsx(
          ProyectoCardView,
          {
            className: "isSecondary",
            project: p,
            href: `/proyectos/${p.slug}${safeQuery}`,
            showServicios: false
          },
          p.id
        )) })
      ] });
    })() : /* @__PURE__ */ jsx("div", { className: "relatedGrid", children: projects.map((p) => /* @__PURE__ */ jsx(
      ProyectoCardView,
      {
        project: p,
        href: `/proyectos/${p.slug}${safeQuery}`
      },
      p.id
    )) })
  ] });
}

const $$Astro = createAstro();
const $$RelatedProyecto = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RelatedProyecto;
  const {
    currentSlug,
    limit = 3,
    ids,
    title = ids?.length ? "Proyectos destacados" : "Proyectos relacionados",
    subtitle: subtitleOverride
  } = Astro2.props;
  const backQuery = Astro2.url.search ?? "";
  let related = [];
  let subtitle = subtitleOverride ?? "";
  if (ids?.length) {
    related = ids.map((id) => proyectosRaw.find((p) => p.id === id)).filter((p) => !!p && isVisibleProject(p)).slice(0, limit);
    if (!subtitle) subtitle = "";
  } else {
    const current = proyectosRaw.find((p) => p.slug === currentSlug);
    if (current && isVisibleProject(current)) {
      const base = proyectosRaw.filter(isVisibleProject).filter((p) => p.slug !== current.slug);
      const currentServicios = new Set(
        (current.servicios ?? []).map((r) => String(r).toLowerCase())
      );
      const currentDpto = current.ubicacion?.departamento?.toLowerCase?.() ?? "";
      const relatedByServicio = base.filter(
        (p) => (p.servicios ?? []).some(
          (r) => currentServicios.has(String(r).toLowerCase())
        )
      ).slice(0, limit);
      related = relatedByServicio;
      subtitle = relatedByServicio.length > 0 ? "Relacionados por servicio." : "Relacionados por departamento.";
      if (related.length < limit && currentDpto) {
        const remaining = limit - related.length;
        const used = new Set(related.map((p) => p.slug));
        const byDpto = base.filter((p) => !used.has(p.slug)).filter(
          (p) => (p.ubicacion?.departamento?.toLowerCase?.() ?? "") === currentDpto
        ).slice(0, remaining);
        related = [...related, ...byDpto];
      }
    }
  }
  const relatedWithCover = related.map((p) => ({
    ...p,
    coverUrl: resolveProjectAssetUrl(p.portada)
  }));
  return renderTemplate`${renderComponent($$result, "RelatedProyectoReact", RelatedProyectoReact, { "client:visible": true, "title": title, "subtitle": subtitle, "projects": relatedWithCover, "backQuery": backQuery, "showHeader": !ids, "variant": ids?.length ? "mag" : "grid", "client:component-hydration": "visible", "client:component-path": "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/proyectos/react/RelatedProyectoReact.tsx", "client:component-export": "default" })}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/proyectos/astro/RelatedProyecto.astro", void 0);

export { $$RelatedProyecto as $ };
