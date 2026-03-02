import { c as createComponent, m as maybeRenderHead, r as renderComponent, d as renderTemplate, a as addAttribute } from '../chunks/astro/server_DEPTrjPg.mjs';
import 'piccolore';
import { s as serviciosRaw, p as proyectosRaw, $ as $$Layout } from '../chunks/Layout_DqsIHtQ9.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useMemo, useEffect } from 'react';
/* empty css                                     */
import { _ as __vite_glob_0_38, a as __vite_glob_0_37, b as __vite_glob_0_36, c as __vite_glob_0_35, d as __vite_glob_0_34, e as __vite_glob_0_33, f as __vite_glob_0_32, g as __vite_glob_0_31, h as __vite_glob_0_30, i as __vite_glob_0_29, j as __vite_glob_0_28, k as __vite_glob_0_27, l as __vite_glob_0_26, m as __vite_glob_0_25, n as __vite_glob_0_24, o as __vite_glob_0_23, p as __vite_glob_0_22, q as __vite_glob_0_21, r as __vite_glob_0_20, s as __vite_glob_0_19, t as __vite_glob_0_18, u as __vite_glob_0_17, v as __vite_glob_0_16, w as __vite_glob_0_15, x as __vite_glob_0_14, y as __vite_glob_0_13, z as __vite_glob_0_12, A as __vite_glob_0_11, B as __vite_glob_0_10, C as __vite_glob_0_9, D as __vite_glob_0_8, E as __vite_glob_0_7, F as __vite_glob_0_6, G as __vite_glob_0_5, H as __vite_glob_0_4, I as __vite_glob_0_3$1, J as __vite_glob_0_2$1, K as __vite_glob_0_1$1, L as __vite_glob_0_0$1 } from '../chunks/proyectoHero_ByyPjilN.mjs';
import 'clsx';
import { $ as $$ServiceIntro } from '../chunks/ServiceIntro_Ct04C3dn.mjs';
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

function ServiciosSplitReact({
  services,
  projectsByService,
  projectsBaseHref
}) {
  const firstId = services?.[0]?.id ?? "";
  const getInitialTab = () => {
    if (typeof window === "undefined") return firstId;
    const tab = new URLSearchParams(window.location.search).get("tab") ?? "";
    return services.some((s) => s.id === tab) ? tab : firstId;
  };
  const [activeId, setActiveId] = useState(getInitialTab);
  const active = useMemo(
    () => services.find((s) => s.id === activeId) ?? services[0],
    [activeId, services]
  );
  const [animTick, setAnimTick] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!activeId) return;
    const url = new URL(window.location.href);
    url.searchParams.set("tab", activeId);
    window.history.replaceState({}, "", url.toString());
  }, [activeId]);
  useEffect(() => {
    setAnimTick((x) => x + 1);
  }, [activeId]);
  useEffect(() => {
    const urls = (services ?? []).map((s) => s.imageSrc).filter(Boolean);
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    return () => {
    };
  }, [services]);
  return /* @__PURE__ */ jsxs("section", { className: "services-folders", children: [
    /* @__PURE__ */ jsxs("div", { className: "container cnt-service", children: [
      /* @__PURE__ */ jsx("h2", { className: "services-title", children: "Nuestros Servicios" }),
      /* @__PURE__ */ jsx("p", { className: "services-subtitle", children: "Ingeniería y ejecución especializada para proyectos de alto impacto." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "services-folders__tabs", role: "tablist", "aria-label": "Servicios", children: services.map((s) => {
      const selected = s.id === activeId;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: `services-folders__tab ${selected ? "is-active" : ""}`,
          role: "tab",
          "aria-selected": selected,
          "aria-controls": `svc-panel-${s.id}`,
          onClick: () => setActiveId(s.id),
          children: s.title.replaceAll("\n", " ")
        },
        s.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "services-folders__panel", children: activeId ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "services-folders__media", "data-anim": animTick, "aria-hidden": "true", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: active?.imageSrc ?? "",
          alt: active?.imageAlt ?? active?.title ?? "Servicio",
          loading: "lazy",
          decoding: "async"
        }
      ) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          id: `svc-panel-${active?.id ?? ""}`,
          className: "services-folders__content",
          "data-anim": animTick,
          role: "tabpanel",
          "aria-label": active?.title ?? "Servicio",
          children: [
            /* @__PURE__ */ jsx("p", { className: "services-folders__tagline", children: active?.tagline }),
            /* @__PURE__ */ jsx("ul", { className: "services-folders__list", children: (active?.items ?? []).slice(0, 6).map((it) => /* @__PURE__ */ jsx("li", { children: it }, it)) }),
            /* @__PURE__ */ jsxs("div", { className: "services-folders__ctaRow", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  className: "btn btn-primary btn-sm",
                  href: `${projectsBaseHref}?servicio=${encodeURIComponent(active?.id ?? "")}`,
                  children: active?.projectsCtaLabel ?? "Ver proyectos"
                }
              ),
              /* @__PURE__ */ jsx("a", { className: "btn btn-sm services-btn-outline", href: "/contacto", children: "Cotizar" })
            ] })
          ]
        },
        activeId
      )
    ] }) : /* @__PURE__ */ jsx("div", { className: "services-folders__empty", children: /* @__PURE__ */ jsx("p", { children: "Selecciona un servicio para ver el detalle." }) }) })
  ] });
}

const construccion = new Proxy({"src":"/_astro/industria.D-UAh4Hh.jpg","width":5508,"height":4389,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/servicios/cards/construccion.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: construccion
}, Symbol.toStringTag, { value: 'Module' }));

const industria = new Proxy({"src":"/_astro/industria.D-UAh4Hh.jpg","width":5508,"height":4389,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/servicios/cards/industria.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: industria
}, Symbol.toStringTag, { value: 'Module' }));

const ingenieria = new Proxy({"src":"/_astro/industria.D-UAh4Hh.jpg","width":5508,"height":4389,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/servicios/cards/ingenieria.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: ingenieria
}, Symbol.toStringTag, { value: 'Module' }));

const maquinaria = new Proxy({"src":"/_astro/industria.D-UAh4Hh.jpg","width":5508,"height":4389,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/servicios/cards/maquinaria.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: maquinaria
}, Symbol.toStringTag, { value: 'Module' }));

const serviceCardImages = /* #__PURE__ */ Object.assign({"/src/assets/images/servicios/cards/construccion.jpg": __vite_glob_0_0,"/src/assets/images/servicios/cards/industria.jpg": __vite_glob_0_1,"/src/assets/images/servicios/cards/ingenieria.jpg": __vite_glob_0_2,"/src/assets/images/servicios/cards/maquinaria.jpg": __vite_glob_0_3


});
function getServiceImageByKey(key) {
  const base = `/src/assets/images/servicios/cards/${key}`;
  const entry = serviceCardImages[`${base}.webp`] ?? serviceCardImages[`${base}.jpg`] ?? serviceCardImages[`${base}.jpeg`] ?? serviceCardImages[`${base}.png`];
  if (!entry) {
    throw new Error(
      `No se encontró imagen para imageKey="${key}". Colócala en src/assets/images/servicios/cards/ con nombre ${key}.webp|jpg|png`
    );
  }
  return entry.default;
}

const projectImages = /* #__PURE__ */ Object.assign({"/src/assets/images/proyecto/proj_001/01.jpg": __vite_glob_0_0$1,"/src/assets/images/proyecto/proj_001/01.webp": __vite_glob_0_1$1,"/src/assets/images/proyecto/proj_001/02.jpg": __vite_glob_0_2$1,"/src/assets/images/proyecto/proj_001/02.webp": __vite_glob_0_3$1,"/src/assets/images/proyecto/proj_001/03.jpg": __vite_glob_0_4,"/src/assets/images/proyecto/proj_001/03.webp": __vite_glob_0_5,"/src/assets/images/proyecto/proj_001/04.jpg": __vite_glob_0_6,"/src/assets/images/proyecto/proj_001/04.webp": __vite_glob_0_7,"/src/assets/images/proyecto/proj_001/05.jpg": __vite_glob_0_8,"/src/assets/images/proyecto/proj_001/05.webp": __vite_glob_0_9,"/src/assets/images/proyecto/proj_001/06.jpg": __vite_glob_0_10,"/src/assets/images/proyecto/proj_001/06.webp": __vite_glob_0_11,"/src/assets/images/proyecto/proj_001/cover.jpg": __vite_glob_0_12,"/src/assets/images/proyecto/proj_001/cover.webp": __vite_glob_0_13,"/src/assets/images/proyecto/proj_002/01.jpg": __vite_glob_0_14,"/src/assets/images/proyecto/proj_002/01.webp": __vite_glob_0_15,"/src/assets/images/proyecto/proj_002/cover.jpg": __vite_glob_0_16,"/src/assets/images/proyecto/proj_002/cover.webp": __vite_glob_0_17,"/src/assets/images/proyecto/proj_003/01.jpg": __vite_glob_0_18,"/src/assets/images/proyecto/proj_003/01.webp": __vite_glob_0_19,"/src/assets/images/proyecto/proj_003/cover.jpg": __vite_glob_0_20,"/src/assets/images/proyecto/proj_003/cover.webp": __vite_glob_0_21,"/src/assets/images/proyecto/proj_004/01.jpg": __vite_glob_0_22,"/src/assets/images/proyecto/proj_004/01.webp": __vite_glob_0_23,"/src/assets/images/proyecto/proj_004/cover.jpg": __vite_glob_0_24,"/src/assets/images/proyecto/proj_004/cover.webp": __vite_glob_0_25,"/src/assets/images/proyecto/proj_005/01.jpg": __vite_glob_0_26,"/src/assets/images/proyecto/proj_005/01.webp": __vite_glob_0_27,"/src/assets/images/proyecto/proj_005/cover.jpg": __vite_glob_0_28,"/src/assets/images/proyecto/proj_005/cover.webp": __vite_glob_0_29,"/src/assets/images/proyecto/proj_006/01.jpg": __vite_glob_0_30,"/src/assets/images/proyecto/proj_006/01.webp": __vite_glob_0_31,"/src/assets/images/proyecto/proj_006/cover.jpg": __vite_glob_0_32,"/src/assets/images/proyecto/proj_006/cover.webp": __vite_glob_0_33,"/src/assets/images/proyecto/proyecto-1.jpg": __vite_glob_0_34,"/src/assets/images/proyecto/proyecto-2.jpg": __vite_glob_0_35,"/src/assets/images/proyecto/proyecto-3.jpg": __vite_glob_0_36,"/src/assets/images/proyecto/proyecto-4.jpg": __vite_glob_0_37,"/src/assets/images/proyecto/proyectoHero.jpg": __vite_glob_0_38


});
function getProjectImageFromPath(pathFromJson) {
  const full = `/src/assets/images/proyecto/${pathFromJson}`;
  const entry = projectImages[full];
  return entry?.default ?? null;
}

const $$ServiciosSplit = createComponent(($$result, $$props, $$slots) => {
  const servicios = serviciosRaw.map((s) => {
    const img = getServiceImageByKey(s.imageKey);
    return {
      id: s.id,
      title: s.title,
      tagline: s.tagline,
      items: s.items,
      imageSrc: img.src,
      imageAlt: s.title,
      projectsCtaLabel: s.projectsCtaLabel ?? "Ver proyectos"
    };
  });
  const proyectos = proyectosRaw.filter((p) => p.visible !== false).map((p) => {
    const cover = p.portada ? getProjectImageFromPath(p.portada) : null;
    return {
      id: p.id,
      slug: p.slug,
      nombre: p.nombre,
      cliente: p.cliente ?? "",
      estado: p.estado ?? "",
      servicios: p.servicios ?? [],
      ubicacionText: p.ubicacion ? [p.ubicacion.distrito, p.ubicacion.provincia, p.ubicacion.departamento].filter(Boolean).join(", ") : "",
      coverSrc: cover?.src ?? ""
    };
  });
  const projectsByService = {};
  for (const s of servicios) {
    projectsByService[s.id] = proyectos.filter((p) => p.servicios.includes(s.id)).slice(0, 3);
  }
  return renderTemplate`${maybeRenderHead()}<section class="section services-split" id="servicios"> <div class="container"> ${renderComponent($$result, "ServiciosSplitReact", ServiciosSplitReact, { "client:visible": true, "services": servicios, "projectsByService": projectsByService, "projectsBaseHref": "/proyectos", "client:component-hydration": "visible", "client:component-path": "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/servicios/ServiciosSplitReact", "client:component-export": "default" })} </div> </section>`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/servicios/ServiciosSplit.astro", void 0);

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
  return renderTemplate`${maybeRenderHead()}<section class="section" id="iso" data-astro-cid-dclbtk5i> <div class="container" data-astro-cid-dclbtk5i> <header class="iso-head" data-astro-cid-dclbtk5i> <h2 data-astro-cid-dclbtk5i>Certificaciones ISO</h2> <p class="iso-lead" data-astro-cid-dclbtk5i>
Estándares internacionales que respaldan nuestros procesos, seguridad operativa y gestión.
</p> </header> <div class="iso-grid" role="list" data-astro-cid-dclbtk5i> ${iso.map((item) => renderTemplate`<article class="iso-card" role="listitem"${addAttribute(`ISO ${item.number}`, "aria-label")} data-astro-cid-dclbtk5i> <div class="iso-top" data-astro-cid-dclbtk5i> <div class="iso-label" data-astro-cid-dclbtk5i> <span class="iso-label__text" data-astro-cid-dclbtk5i>ISO</span> <span class="iso-number" data-astro-cid-dclbtk5i>${item.number}</span> </div> ${item.status && renderTemplate`<span${addAttribute(`iso-badge iso-badge--${item.status}`, "class")} data-astro-cid-dclbtk5i> ${item.status === "vigente" ? "Vigente" : "En proceso"} </span>`} </div> <div class="iso-body" data-astro-cid-dclbtk5i> <h3 class="iso-title" data-astro-cid-dclbtk5i>${item.title}</h3> <p class="iso-scope" data-astro-cid-dclbtk5i>${item.scope}</p> ${typeof item.year === "number" && renderTemplate`<p class="iso-year" data-astro-cid-dclbtk5i>Año: ${item.year}</p>`} </div> <div class="iso-foot" data-astro-cid-dclbtk5i> ${item.certificate ? renderTemplate`<a class="iso-link"${addAttribute(item.certificate, "href")} target="_blank" rel="noopener" data-astro-cid-dclbtk5i>
Ver certificado
</a>` : renderTemplate`<span class="iso-muted" data-astro-cid-dclbtk5i>Certificado disponible a solicitud</span>`} </div> </article>`)} </div> </div> </section> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/servicios/IsoGrid.astro", void 0);

const $$Servicios = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Valcer - Servicios", "heroTitle": "Servicios", "heroImage": servicioHero }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "ServiceIntro", $$ServiceIntro, {})} ${renderComponent($$result2, "ServiciosSplit", $$ServiciosSplit, {})} ${renderComponent($$result2, "IsoGrid", $$IsoGrid, {})} ` })}`;
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
