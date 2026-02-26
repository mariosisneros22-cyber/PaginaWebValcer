import { jsxs, jsx } from 'react/jsx-runtime';
import { P as ProyectoCardView } from './images.server_CsA1g8SL.mjs';
/* empty css                          */

function RelatedProyectoReact({
  title = "Proyectos relacionados",
  subtitle,
  projects,
  backQuery = ""
}) {
  if (!projects?.length) return null;
  const safeQuery = backQuery && backQuery !== "?" ? backQuery.startsWith("?") ? backQuery : `?${backQuery}` : "";
  return /* @__PURE__ */ jsxs("section", { className: "related", children: [
    /* @__PURE__ */ jsxs("div", { className: "head", children: [
      /* @__PURE__ */ jsx("h2", { children: title }),
      subtitle ? /* @__PURE__ */ jsx("p", { children: subtitle }) : null
    ] }),
    /* @__PURE__ */ jsx("div", { className: "relatedGrid", children: projects.map((p) => /* @__PURE__ */ jsx(
      ProyectoCardView,
      {
        project: p,
        href: `/proyectos/${p.slug}${safeQuery}`
      },
      p.id
    )) })
  ] });
}

export { RelatedProyectoReact as R };
