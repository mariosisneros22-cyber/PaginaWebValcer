import { c as createComponent, m as maybeRenderHead, a as addAttribute, d as renderTemplate, r as renderComponent, F as Fragment, e as createAstro, b as renderScript, u as unescapeHTML } from '../chunks/astro/server_BPQpu14k.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BEcER1h5.mjs';
import { $ as $$Button } from '../chunks/button_CaUVeSfR.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_DDRr7B4I.mjs';
/* empty css                                    */
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$Timelineitem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Timelineitem;
  const { index, year, title, description, image, imageAlt, layout, side, tagline } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<article class="scene" data-scene${addAttribute(index, "data-index")}${addAttribute(layout, "data-layout")}${addAttribute(side ?? void 0, "data-side")}${addAttribute(`A\xF1o ${year}: ${layout === "outro" ? tagline ?? "" : title}`, "aria-label")} data-astro-cid-fxj26z35> <div class="scene-marker" data-astro-cid-fxj26z35> <div class="scene-year" data-astro-cid-fxj26z35> ${layout === "split" ? renderTemplate`<span class="year year-vertical"${addAttribute(year.split("").join("\n"), "data-text")} data-astro-cid-fxj26z35> ${year.split("").join("\n")} </span>` : renderTemplate`<span class="year year-horizontal"${addAttribute(year, "data-text")} data-astro-cid-fxj26z35> ${year} </span>`} </div> <div class="scene-dot" aria-hidden="true" data-astro-cid-fxj26z35></div> </div> <div class="scene-content" data-astro-cid-fxj26z35> ${layout === "outro" ? renderTemplate`<p class="scene-tagline" data-astro-cid-fxj26z35>${tagline ?? ""}</p>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-fxj26z35": true }, { "default": ($$result2) => renderTemplate` <h2 data-astro-cid-fxj26z35>${title}</h2> <p data-astro-cid-fxj26z35>${description}</p> ` })}`} </div> ${image ? renderTemplate`<div class="scene-media" data-astro-cid-fxj26z35> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": imageAlt ?? "", "loading": "lazy", "data-astro-cid-fxj26z35": true })} </div>` : null} </article> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/ui/timelineitem.astro", void 0);

const imagetest = new Proxy({"src":"/_astro/imagetest.CNeJRZlr.jpg","width":5213,"height":6951,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/nosotros/timeline/imagetest.jpg";
							}
							
							return target[name];
						}
					});

const timelineData = [
  {
    id: 1,
    year: "2000",
    title: "Fundación de la empresa",
    description: "Iniciamos con el objetivo de brnidar  soluciones industriales seguras y eficientes",
    image: imagetest,
    imageAlt: "Fundación de la empresa",
    layout: "intro"
  },
  {
    id: 2,
    year: "2010",
    title: "Primer gran proyecto",
    description: "Ejecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidad.",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  },
  {
    id: 3,
    year: "2023",
    title: "Expansión regional",
    description: "Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  },
  {
    id: 4,
    year: "2007",
    title: "Fundación de la empresa",
    description: "Iniciamos con el objetivo de brnidar  soluciones industriales seguras y eficientes",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  },
  {
    id: 5,
    year: "2010",
    title: "Primer gran proyecto",
    description: "Ejecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidad.Ejecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidadEjecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidadEjecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidadEjecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidad",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  },
  {
    id: 6,
    year: "2023",
    title: "Expansión regional",
    description: "Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento. Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  },
  {
    id: 7,
    year: "2007",
    title: "Fundación de la empresa",
    description: "Iniciamos con el objetivo de brnidar  soluciones industriales seguras y eficientes",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  },
  {
    id: 8,
    year: "2010",
    title: "Primer gran proyecto",
    description: "Ejecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidad.",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  },
  {
    id: 9,
    year: "2023",
    title: "Expansión regional",
    description: "Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  },
  {
    id: 10,
    year: "2007",
    title: "Fundación de la empresa",
    description: "Iniciamos con el objetivo de brnidar  soluciones industriales seguras y eficientes",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  },
  {
    id: 11,
    year: "2010",
    title: "Primer gran proyecto",
    description: "Ejecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidad.",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  },
  {
    id: 12,
    year: "2023",
    title: "Expansión regional",
    description: "Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.",
    image: imagetest,
    imageAlt: "Fundación de la empresa"
  }
];
const timelineDataSorted = [...timelineData].sort((a, b) => {
  const dy = Number(a.year) - Number(b.year);
  if (dy !== 0) return dy;
  return a.id - b.id;
});

const $$Timeline = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear().toString();
  const outro = {
    id: 999,
    year: currentYear,
    title: "",
    description: "",
    layout: "outro",
    tagline: "Construyendo hoy, proyectando el ma\xF1ana"
  };
  const scenes = [...timelineDataSorted, outro].map((item, index) => {
    const layout = item.layout ?? (index === 0 ? "intro" : "split");
    const side = layout === "split" ? (index - 1) % 2 === 0 ? "A" : "B" : void 0;
    return { ...item, layout, side };
  });
  return renderTemplate`${maybeRenderHead()}<section class="section timeline-section" data-timeline${addAttribute(`--n:${scenes.length}; --tail:0.6;`, "style")} data-astro-cid-zd5g3drv> <div class="container" data-astro-cid-zd5g3drv> <header class="timeline-header" data-astro-cid-zd5g3drv> <h2 data-astro-cid-zd5g3drv>Historia y trayectoria</h2> </header> <div class="timeline-track" data-track data-astro-cid-zd5g3drv> <div class="timeline-stage" data-stage data-astro-cid-zd5g3drv> <div class="timeline-axis" aria-hidden="true" data-astro-cid-zd5g3drv> <div class="axis-line" data-astro-cid-zd5g3drv></div> <div class="axis-progress" data-astro-cid-zd5g3drv></div> </div> <div class="timeline-scenes" data-astro-cid-zd5g3drv> ${scenes.map((item, index) => renderTemplate`${renderComponent($$result, "TimelineItem", $$Timelineitem, { ...item, "index": index, "data-astro-cid-zd5g3drv": true })}`)} </div> </div> </div> </div> </section>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/timeline.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/timeline.astro", void 0);

const $$Astro$1 = createAstro();
const $$Pilar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Pilar;
  const {
    title,
    text,
    color = "#000",
    direction = "right",
    align = "left",
    offsetx = "0"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`pillar from-${direction} align-${align}`, "class")}${addAttribute(`--pillar-color: ${color}; --pillar-offsetx: ${offsetx}%`, "style")} data-astro-cid-zagzordr> <h3 data-astro-cid-zagzordr>${title}</h3> <p data-astro-cid-zagzordr>${text}</p> </div> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/pilar.astro", void 0);

const $$Astro = createAstro();
const $$Mvv = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Mvv;
  const {
    title = "Misi\xF3n, visi\xF3n y valores",
    mission,
    vision,
    values,
    mediaImage,
    mediaAlt,
    mediaSide = "left"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-74zkp6bd> <div class="container mvv" data-astro-cid-74zkp6bd> <h2 class="mvv__title" data-astro-cid-74zkp6bd>${title}</h2> <div${addAttribute(`mvv__frame ${mediaSide === "right" ? "mvv__frame--right" : ""}`, "class")} data-mvv data-astro-cid-74zkp6bd> <div class="mvv__top" data-astro-cid-74zkp6bd> <div class="mvv__media"${addAttribute(mediaAlt?.trim() ? void 0 : "true", "aria-hidden")} data-reveal style="--d:0ms" data-astro-cid-74zkp6bd> <img class="mvv__mediaImg"${addAttribute(mediaImage.src, "src")}${addAttribute(mediaImage.width, "width")}${addAttribute(mediaImage.height, "height")}${addAttribute(mediaAlt?.trim() ? mediaAlt : "", "alt")} loading="lazy" decoding="async" data-astro-cid-74zkp6bd> </div> <div class="mvv__mv" aria-label="Misión y Visión" data-reveal style="--d:0ms" data-astro-cid-74zkp6bd> <article class="mvv__mvItem" aria-labelledby="mvv-mision-title" data-astro-cid-74zkp6bd> <h3 class="mvv__mvLabel" id="mvv-mision-title" data-astro-cid-74zkp6bd>${mission.title}</h3> <p class="mvv__mvText" data-astro-cid-74zkp6bd>${mission.body}</p> </article> <div class="mvv__divider" aria-hidden="true" data-astro-cid-74zkp6bd></div> <article class="mvv__mvItem" aria-labelledby="mvv-vision-title" data-astro-cid-74zkp6bd> <h3 class="mvv__mvLabel" id="mvv-vision-title" data-astro-cid-74zkp6bd>${vision.title}</h3> <p class="mvv__mvText" data-astro-cid-74zkp6bd>${vision.body}</p> </article> </div> </div> <div class="mvv__values"${addAttribute(values.title, "aria-label")} data-reveal style="--d:140ms" data-astro-cid-74zkp6bd> <h3 class="mvv__mvLabel" data-astro-cid-74zkp6bd>${values.title}</h3> ${values.items?.length > 0 && renderTemplate`<ul class="mvv__valuesGrid" role="list" data-astro-cid-74zkp6bd> ${values.items.map((v, i) => renderTemplate`<li class="mvv__valuesCard" data-reveal-item${addAttribute(`--d:${220 + i * 150}ms`, "style")} data-astro-cid-74zkp6bd> <div class="mvv__valuesText" data-astro-cid-74zkp6bd> <h4 class="mvv__valuesLabel" data-astro-cid-74zkp6bd>${v.label}</h4> ${v.desc ? renderTemplate`<p class="mvv__valuesDesc" data-astro-cid-74zkp6bd>${v.desc}</p>` : null} </div> ${v.icon ? renderTemplate`<div class="mvv__valuesIcon" aria-hidden="true" data-astro-cid-74zkp6bd>${unescapeHTML(v.icon)}</div>` : null} </li>`)} </ul>`} </div> </div> </div> </section>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/mvv.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/mvv.astro", void 0);

const nosotrosHero = new Proxy({"src":"/_astro/nosotrosHero.DLoHjq2l.jpg","width":6000,"height":3243,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/nosotros/nosotrosHero.jpg";
							}
							
							return target[name];
						}
					});

const valPilar = [
  {
    title: "Seguridad",
    text: "Trabajamos bajo losmás altos estándares de seguridad industrial.",
    color: "#e9efff",
    direction: "right",
    align: "left",
    offsetx: 40
  },
  {
    title: "Calidad",
    text: "Garantizamos procesos certificados y resultados consistentes.",
    color: "#c8d8ff",
    direction: "left",
    align: "right",
    offsetx: -35
  },
  {
    title: "Cumplimiento",
    text: "Cunplimos plazos, normativas y compromisos asumidos.",
    color: "rgb(180, 201, 255)",
    direction: "right",
    align: "left",
    offsetx: 30
  }
];

const $$Nosotros = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Valcer - Nosotros", "heroTitle": "Nosotros", "heroImage": nosotrosHero, "data-astro-cid-noeej2nj": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="section" data-astro-cid-noeej2nj> <div class="container who-grid" data-astro-cid-noeej2nj> <div class="who-content" data-astro-cid-noeej2nj> <h2 data-astro-cid-noeej2nj>Quiénes somos</h2> <p data-astro-cid-noeej2nj>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
</p> <p data-astro-cid-noeej2nj>
Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur.
</p> </div> <div class="who-video youtube-video" data-video-id="PmRv-3-tUwA" data-astro-cid-noeej2nj> <div class="youtube-overlay " data-astro-cid-noeej2nj>
▶
</div> </div> </div> </section>  <section class="section section-accent" data-astro-cid-noeej2nj> <div class="container" data-astro-cid-noeej2nj> <h2 data-astro-cid-noeej2nj>Nuestros pilares</h2> <div class="pillars-grid" data-astro-cid-noeej2nj> ${valPilar.map((pillar) => renderTemplate`${renderComponent($$result2, "Pilar", $$Pilar, { ...pillar, "data-astro-cid-noeej2nj": true })}`)} </div> </div> </section>  ${renderComponent($$result2, "Mvv", $$Mvv, { "mediaImage": nosotrosHero, "mediaAlt": "Ejecuci\xF3n de obra de Valcer", "mediaSide": "left", "mission": {
    title: "Misi\xF3n",
    body: "es brindar servicios de ejecuci\xF3n, supervisi\xF3n y consultor\xEDa en obras civiles y de esta manera podamos satisfacer las necesidades de nuestros clientes entregando un servicio de calidad bajo las normas y leyes vigentes, propiciando un ambiente de trabajo seguro. \nApoyados con tecnolog\xEDa renovada, asegurando la protecci\xF3n de la integridad f\xEDsica de nuestros trabajadores, protegiendo el medio ambiente, trabajando dentro de un marco de \xE9tica; buscando la mejora continua y cumpliendo con la responsabilidad corporativa empresarial."
  }, "vision": {
    title: "Visi\xF3n",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }, "values": {
    title: "Valores",
    items: [
      {
        label: "Responsabilidad",
        desc: "Cumplimos plazos y est\xE1ndares.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 6 9 17l-5-5"/></svg>`
      },
      {
        label: "Compromiso",
        desc: "Acompa\xF1amiento de inicio a fin.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M2 12h20"/></svg>`
      },
      {
        label: "Transparencia",
        desc: "Informaci\xF3n clara y trazable.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`
      },
      {
        label: "Trabajo en equipo",
        desc: "Coordinaci\xF3n y comunicaci\xF3n constante.",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3Z"/><path d="M8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Z"/><path d="M8 13c-2.21 0-4 1.79-4 4v2"/><path d="M16 13c2.21 0 4 1.79 4 4v2"/><path d="M12 12c1.66 0 3-1.34 3-3S13.66 6 12 6 9 7.34 9 9s1.34 3 3 3Z"/><path d="M12 14c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4Z"/></svg>`
      }
    ]
  }, "data-astro-cid-noeej2nj": true })}  ${renderComponent($$result2, "Timeline", $$Timeline, { "data-astro-cid-noeej2nj": true })}  <section class="section-2" data-astro-cid-noeej2nj> <div class="container cta-content" data-astro-cid-noeej2nj> <h2 data-astro-cid-noeej2nj>¿Tienes un proyecto en mente?</h2> <p data-astro-cid-noeej2nj>
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</p> ${renderComponent($$result2, "Button", $$Button, { "href": "/contacto", "data-astro-cid-noeej2nj": true }, { "default": ($$result3) => renderTemplate`CONTACTAR` })} </div> </section> ` })}  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/nosotros.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/nosotros.astro", void 0);

const $$file = "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/nosotros.astro";
const $$url = "/nosotros";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nosotros,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
