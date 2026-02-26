import { c as createComponent, m as maybeRenderHead, d as renderTemplate, e as createAstro, a as addAttribute, r as renderComponent } from '../chunks/astro/server_BPQpu14k.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BEcER1h5.mjs';
import 'clsx';
/* empty css                                     */
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { s as servicios, g as getServiceImageByKey } from '../chunks/serviciosImages_Dq7pkIZd.mjs';
import { _ as __vite_glob_0_38, a as __vite_glob_0_37, b as __vite_glob_0_36, c as __vite_glob_0_35, d as __vite_glob_0_34, e as __vite_glob_0_33, f as __vite_glob_0_32, g as __vite_glob_0_31, h as __vite_glob_0_30, i as __vite_glob_0_29, j as __vite_glob_0_28, k as __vite_glob_0_27, l as __vite_glob_0_26, m as __vite_glob_0_25, n as __vite_glob_0_24, o as __vite_glob_0_23, q as __vite_glob_0_22, r as __vite_glob_0_21, s as __vite_glob_0_20, t as __vite_glob_0_19, u as __vite_glob_0_18, v as __vite_glob_0_17, w as __vite_glob_0_16, x as __vite_glob_0_15, y as __vite_glob_0_14, z as __vite_glob_0_13, A as __vite_glob_0_12, B as __vite_glob_0_11, C as __vite_glob_0_10, D as __vite_glob_0_9, E as __vite_glob_0_8, F as __vite_glob_0_7, G as __vite_glob_0_6, H as __vite_glob_0_5, I as __vite_glob_0_4, J as __vite_glob_0_3, K as __vite_glob_0_2, L as __vite_glob_0_1, M as __vite_glob_0_0, p as proyectos } from '../chunks/proyectos_Dy718Wo-.mjs';
export { renderers } from '../renderers.mjs';

const servicioHero = new Proxy({"src":"/_astro/industria.D-UAh4Hh.jpg","width":5508,"height":4389,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/servicios/servicioHero.jpg";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro();
const $$ServiceIntro = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ServiceIntro;
  const {
    title = "Soluciones Integrales para tu Proyecto",
    description = "En Valcer, ofrecemos servicios especializados que combinan experiencia de m\xE1s de 15 a\xF1os, est\xE1ndares internacionales de calidad y un equipo dedicado a tu \xE9xito."
  } = Astro2.props;
  const advantages = [
    {
      icon: "\u25C6",
      title: "Experiencia Acreditada",
      description: "15+ a\xF1os ejecutando proyectos complejos con certificaciones ISO y est\xE1ndares internacionales"
    },
    {
      icon: "\u25B8",
      title: "Ejecuci\xF3n R\xE1pida",
      description: "Metodolog\xEDas probadas y equipos multidisciplinarios para cumplir plazos sin comprometer calidad"
    },
    {
      icon: "\u2713",
      title: "Seguridad Prioritaria",
      description: "Protocolos rigurosos de seguridad laboral y gesti\xF3n de riesgos en todas las operaciones"
    },
    {
      icon: "\u2605",
      title: "Soporte Continuo",
      description: "Acompa\xF1amiento desde la planificaci\xF3n hasta post-ejecuci\xF3n con comunicaci\xF3n transparente"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="section section-accent" data-astro-cid-nizysu5r> <div class="container" data-astro-cid-nizysu5r> <div class="intro-header" data-astro-cid-nizysu5r> <h1 class="intro-title" data-astro-cid-nizysu5r>${title}</h1> <p class="intro-description" data-astro-cid-nizysu5r>${description}</p> </div> <div class="advantages-grid" data-astro-cid-nizysu5r> ${advantages.map((advantage) => renderTemplate`<div class="advantage-card" data-astro-cid-nizysu5r> <div class="advantage-icon" data-astro-cid-nizysu5r>${advantage.icon}</div> <h3 class="advantage-title" data-astro-cid-nizysu5r>${advantage.title}</h3> <p class="advantage-description" data-astro-cid-nizysu5r>${advantage.description}</p> </div>`)} </div> <div class="intro-cta" data-astro-cid-nizysu5r> <p data-astro-cid-nizysu5r>Cada proyecto es único. Contamos con soluciones personalizadas para tus necesidades específicas.</p> </div> </div> </section> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/servicios/ServiceIntro.astro", void 0);

function ServiciosSplitReact({
  services,
  projectsByService,
  projectsBaseHref
}) {
  const firstId = services?.[0]?.id ?? "";
  const [activeId, setActiveId] = useState(firstId);
  const active = useMemo(
    () => services.find((s) => s.id === activeId) ?? services[0],
    [activeId, services]
  );
  projectsByService?.[active?.id ?? ""] ?? [];
  const allHref = `${projectsBaseHref}?servicio=${encodeURIComponent(active?.id ?? "")}`;
  return /* @__PURE__ */ jsxs("div", { className: "services-split__layout", children: [
    /* @__PURE__ */ jsx("div", { className: "services-split__left", role: "tablist", "aria-label": "Servicios", children: services.map((s) => {
      const selected = s.id === activeId;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: `services-split__tab ${selected ? "is-active" : ""}`,
          role: "tab",
          "aria-selected": selected,
          "aria-controls": `panel-${s.id}`,
          onClick: () => setActiveId(s.id),
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveId(s.id);
            }
          },
          children: /* @__PURE__ */ jsx("h3", { className: "services-split__tabTitle", children: s.title.split("\n").map((line, i) => /* @__PURE__ */ jsxs("span", { className: "services-line", children: [
            line,
            /* @__PURE__ */ jsx("br", {})
          ] }, i)) })
        },
        s.id
      );
    }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        id: `panel-${active?.id ?? ""}`,
        className: "services-split__right",
        role: "tabpanel",
        "aria-label": active?.title ?? "Servicio",
        children: /* @__PURE__ */ jsxs("div", { className: "services-panel", children: [
          /* @__PURE__ */ jsx("div", { className: "services-panel__media", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: active?.imageSrc ?? "",
              alt: active?.imageAlt ?? active?.title ?? "Servicio",
              loading: "lazy",
              decoding: "async",
              width: "1200",
              height: "600"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "services-panel__content", children: [
            /* @__PURE__ */ jsx("div", { className: "services-panel__base", children: /* @__PURE__ */ jsx("p", { className: "services-panel__tagline", children: active?.tagline }) }),
            /* @__PURE__ */ jsx("div", { className: "services-panel__body", children: /* @__PURE__ */ jsx("ul", { className: "services-panel__list", children: (active?.items ?? []).slice(0, 6).map((it) => /* @__PURE__ */ jsx("li", { children: it }, it)) }) }),
            /* @__PURE__ */ jsx("div", { className: "services-panel__footer", children: /* @__PURE__ */ jsxs("div", { className: "services-panel__ctaRow", children: [
              /* @__PURE__ */ jsx("a", { className: "btn btn-primary", href: allHref, children: active?.projectsCtaLabel ?? "Ver proyectos" }),
              /* @__PURE__ */ jsx("a", { className: "btn services-btn-outline", href: "/contacto", children: "Cotizar" })
            ] }) })
          ] })
        ] })
      }
    )
  ] });
}

const isoRaw = [
	{
		id: "iso-9001-2015",
		number: "9001:2015",
		title: "Sistema de Gestión de Calidad",
		scope: "Ejecución y supervisión de obras civiles y prestación de servicios asociados.",
		status: "vigente",
		year: 2015,
		certificate: "/pdf/ISO9001-2015.pdf"
	},
	{
		id: "iso-14001-2015",
		number: "14001:2015",
		title: "Sistema de Gestión Ambiental",
		scope: "Gestión ambiental aplicada a proyectos de infraestructura, operaciones y mantenimiento.",
		status: "vigente",
		year: 2015,
		certificate: "/pdf/ISO14001-2015.pdf"
	},
	{
		id: "iso-37001-2016",
		number: "37001:2016",
		title: "Sistema de Gestión Antisoborno",
		scope: "Implementación de controles y políticas para la prevención de soborno y prácticas corruptas.",
		status: "vigente",
		year: 2016,
		certificate: "/pdf/ISO37001-2016.pdf"
	},
	{
		id: "iso-45001-2018",
		number: "45001:2018",
		title: "Sistema de Gestión de Seguridad y Salud en el Trabajo",
		scope: "Gestión de seguridad y salud ocupacional en operaciones, obra y planta.",
		status: "vigente",
		year: 2018,
		certificate: "/pdf/ISO45001-2018.pdf"
	},
	{
		id: "iso-50001-2018",
		number: "50001:2018",
		title: "Sistema de Gestión de Energía",
		scope: "Gestión eficiente del consumo energético y mejora continua del desempeño energético.",
		status: "vigente",
		year: 2018,
		certificate: "/pdf/ISO50001-2018.pdf"
	}
];

const $$IsoGrid = createComponent(($$result, $$props, $$slots) => {
  const iso = isoRaw;
  return renderTemplate`${maybeRenderHead()}<section class="section iso-section" id="iso" data-astro-cid-dclbtk5i> <div class="container" data-astro-cid-dclbtk5i> <header class="iso-head" data-astro-cid-dclbtk5i> <h2 data-astro-cid-dclbtk5i>Certificaciones ISO</h2> <p class="iso-lead" data-astro-cid-dclbtk5i>
Estándares internacionales que respaldan nuestros procesos, seguridad operativa y gestión.
</p> </header> <div class="iso-grid" role="list" data-astro-cid-dclbtk5i> ${iso.map((item) => renderTemplate`<article class="iso-card" role="listitem"${addAttribute(`ISO ${item.number}`, "aria-label")} data-astro-cid-dclbtk5i> <div class="iso-top" data-astro-cid-dclbtk5i> <div class="iso-label" data-astro-cid-dclbtk5i> <span class="iso-label__text" data-astro-cid-dclbtk5i>ISO</span> <span class="iso-number" data-astro-cid-dclbtk5i>${item.number}</span> </div> ${item.status && renderTemplate`<span${addAttribute(`iso-badge iso-badge--${item.status}`, "class")} data-astro-cid-dclbtk5i> ${item.status === "vigente" ? "Vigente" : "En proceso"} </span>`} </div> <div class="iso-body" data-astro-cid-dclbtk5i> <h3 class="iso-title" data-astro-cid-dclbtk5i>${item.title}</h3> <p class="iso-scope" data-astro-cid-dclbtk5i>${item.scope}</p> ${typeof item.year === "number" && renderTemplate`<p class="iso-year" data-astro-cid-dclbtk5i>Año: ${item.year}</p>`} </div> <div class="iso-foot" data-astro-cid-dclbtk5i> ${item.certificate ? renderTemplate`<a class="iso-link"${addAttribute(item.certificate, "href")} target="_blank" rel="noopener" data-astro-cid-dclbtk5i>
Ver certificado
</a>` : renderTemplate`<span class="iso-muted" data-astro-cid-dclbtk5i>Certificado disponible a solicitud</span>`} </div> </article>`)} </div> </div> </section> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/servicios/IsoGrid.astro", void 0);

const projectImages = /* #__PURE__ */ Object.assign({"/src/assets/images/proyecto/proj_001/01.jpg": __vite_glob_0_0,"/src/assets/images/proyecto/proj_001/01.webp": __vite_glob_0_1,"/src/assets/images/proyecto/proj_001/02.jpg": __vite_glob_0_2,"/src/assets/images/proyecto/proj_001/02.webp": __vite_glob_0_3,"/src/assets/images/proyecto/proj_001/03.jpg": __vite_glob_0_4,"/src/assets/images/proyecto/proj_001/03.webp": __vite_glob_0_5,"/src/assets/images/proyecto/proj_001/04.jpg": __vite_glob_0_6,"/src/assets/images/proyecto/proj_001/04.webp": __vite_glob_0_7,"/src/assets/images/proyecto/proj_001/05.jpg": __vite_glob_0_8,"/src/assets/images/proyecto/proj_001/05.webp": __vite_glob_0_9,"/src/assets/images/proyecto/proj_001/06.jpg": __vite_glob_0_10,"/src/assets/images/proyecto/proj_001/06.webp": __vite_glob_0_11,"/src/assets/images/proyecto/proj_001/cover.jpg": __vite_glob_0_12,"/src/assets/images/proyecto/proj_001/cover.webp": __vite_glob_0_13,"/src/assets/images/proyecto/proj_002/01.jpg": __vite_glob_0_14,"/src/assets/images/proyecto/proj_002/01.webp": __vite_glob_0_15,"/src/assets/images/proyecto/proj_002/cover.jpg": __vite_glob_0_16,"/src/assets/images/proyecto/proj_002/cover.webp": __vite_glob_0_17,"/src/assets/images/proyecto/proj_003/01.jpg": __vite_glob_0_18,"/src/assets/images/proyecto/proj_003/01.webp": __vite_glob_0_19,"/src/assets/images/proyecto/proj_003/cover.jpg": __vite_glob_0_20,"/src/assets/images/proyecto/proj_003/cover.webp": __vite_glob_0_21,"/src/assets/images/proyecto/proj_004/01.jpg": __vite_glob_0_22,"/src/assets/images/proyecto/proj_004/01.webp": __vite_glob_0_23,"/src/assets/images/proyecto/proj_004/cover.jpg": __vite_glob_0_24,"/src/assets/images/proyecto/proj_004/cover.webp": __vite_glob_0_25,"/src/assets/images/proyecto/proj_005/01.jpg": __vite_glob_0_26,"/src/assets/images/proyecto/proj_005/01.webp": __vite_glob_0_27,"/src/assets/images/proyecto/proj_005/cover.jpg": __vite_glob_0_28,"/src/assets/images/proyecto/proj_005/cover.webp": __vite_glob_0_29,"/src/assets/images/proyecto/proj_006/01.jpg": __vite_glob_0_30,"/src/assets/images/proyecto/proj_006/01.webp": __vite_glob_0_31,"/src/assets/images/proyecto/proj_006/cover.jpg": __vite_glob_0_32,"/src/assets/images/proyecto/proj_006/cover.webp": __vite_glob_0_33,"/src/assets/images/proyecto/proyecto-1.jpg": __vite_glob_0_34,"/src/assets/images/proyecto/proyecto-2.jpg": __vite_glob_0_35,"/src/assets/images/proyecto/proyecto-3.jpg": __vite_glob_0_36,"/src/assets/images/proyecto/proyecto-4.jpg": __vite_glob_0_37,"/src/assets/images/proyecto/proyectoHero.jpg": __vite_glob_0_38


});
function getProjectImageFromPath(pathFromJson) {
  const full = `/src/assets/images/proyecto/${pathFromJson}`;
  const entry = projectImages[full];
  return entry?.default ?? null;
}

const $$Servicios = createComponent(($$result, $$props, $$slots) => {
  const servicios$1 = servicios.map((s) => ({
    id: s.id,
    title: s.title,
    tagline: s.tagline,
    items: s.items,
    imageSrc: getServiceImageByKey(s.imageKey).src,
    imageAlt: s.title,
    projectsCtaLabel: s.projectsCtaLabel ?? "Ver proyectos"
  }));
  const proyectos$1 = proyectos.filter((p) => p.visible !== false).map((p) => {
    const coverImg = p.portada ? getProjectImageFromPath(p.portada) : null;
    return {
      id: p.id,
      slug: p.slug,
      nombre: p.nombre,
      cliente: p.cliente ?? "",
      estado: p.estado ?? "",
      servicios: p.servicios ?? [],
      ubicacionText: p.ubicacion ? [p.ubicacion.distrito, p.ubicacion.provincia, p.ubicacion.departamento].filter(Boolean).join(", ") : "",
      coverSrc: coverImg?.src ?? ""
    };
  });
  const projectsByService = {};
  for (const proj of proyectos$1) {
    for (const servId of proj.servicios) {
      if (!projectsByService[servId]) projectsByService[servId] = [];
      projectsByService[servId].push(proj);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Valcer - Servicios", "heroTitle": "Servicios", "heroImage": servicioHero }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "ServiceIntro", $$ServiceIntro, {})}  ${maybeRenderHead()}<section class="section"> <div class="container"> ${renderComponent($$result2, "ServiciosSplitReact", ServiciosSplitReact, { "client:idle": true, "services": servicios$1, "projectsByService": projectsByService, "projectsBaseHref": "/proyectos", "client:component-hydration": "idle", "client:component-path": "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/servicios/ServiciosSplitReact", "client:component-export": "default" })} </div> </section>  ${renderComponent($$result2, "IsoGrid", $$IsoGrid, {})} ` })}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/servicios.astro", void 0);

const $$file = "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/servicios.astro";
const $$url = "/servicios";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Servicios,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
