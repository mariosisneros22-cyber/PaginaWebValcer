import { c as createComponent, m as maybeRenderHead, a as addAttribute, d as renderTemplate, r as renderComponent, F as Fragment, e as createAstro, b as renderScript } from '../chunks/astro/server_DEPTrjPg.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_B3F6PsX_.mjs';
import { $ as $$Button } from '../chunks/button_B7UJg7TY.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_hQqkGHLl.mjs';
/* empty css                                    */
import 'clsx';
import { h as heroImages } from '../chunks/indexImage_D4ymw4AB.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$4 = createAstro();
const $$Timelineitem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
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
  return renderTemplate`${maybeRenderHead()}<section class="timeline-section" data-timeline${addAttribute(`--n:${scenes.length}; --tail:0.6;`, "style")} data-astro-cid-zd5g3drv> <div class="container" data-astro-cid-zd5g3drv> <header class="timeline-header" data-astro-cid-zd5g3drv> <h2 class="timeline-title" data-astro-cid-zd5g3drv>Conoce nuestra historia y trayectoria</h2> </header> <div class="timeline-track" data-track data-astro-cid-zd5g3drv> <div class="timeline-stage" data-stage data-astro-cid-zd5g3drv> <div class="timeline-axis" aria-hidden="true" data-astro-cid-zd5g3drv> <div class="axis-line" data-astro-cid-zd5g3drv></div> <div class="axis-progress" data-astro-cid-zd5g3drv></div> </div> <div class="timeline-scenes" data-astro-cid-zd5g3drv> ${scenes.map((item, index) => renderTemplate`${renderComponent($$result, "TimelineItem", $$Timelineitem, { ...item, "index": index, "data-astro-cid-zd5g3drv": true })}`)} </div> </div> </div> </div> </section>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/timeline.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/timeline.astro", void 0);

const $$Astro$3 = createAstro();
const $$Mv = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Mv;
  const {
    title = "Prop\xF3sito y rumbo",
    manifesto = "Construimos infraestructura con seguridad y rigor t\xE9cnico, para generar confianza hoy y desarrollo ma\xF1ana.",
    leftTag = "Prop\xF3sito",
    rightTag = "Rumbo",
    mission,
    vision
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="section" data-astro-cid-bnl7p2gw> <div class="container mvx" data-mv data-astro-cid-bnl7p2gw> <header class="mvx__header" data-reveal style="--d:0ms" data-astro-cid-bnl7p2gw> <h2 class="mvx__title" data-astro-cid-bnl7p2gw>${title}</h2> ${manifesto ? renderTemplate`<p class="mvx__manifesto" aria-label="Declaración" data-astro-cid-bnl7p2gw> ${manifesto} </p>` : null} </header> <div class="mvx__cols" role="group" aria-label="Propósito y rumbo" data-astro-cid-bnl7p2gw> <article class="mvx__block" data-reveal style="--d:140ms" aria-labelledby="mvx-left-tag" data-astro-cid-bnl7p2gw> <p class="mvx__tag" id="mvx-left-tag" data-astro-cid-bnl7p2gw>${leftTag}</p> <h3 class="mvx__label" data-astro-cid-bnl7p2gw>${mission.title}</h3> <p class="mvx__text" data-astro-cid-bnl7p2gw>${mission.body}</p> </article> <article class="mvx__block" data-reveal style="--d:240ms" aria-labelledby="mvx-right-tag" data-astro-cid-bnl7p2gw> <p class="mvx__tag" id="mvx-right-tag" data-astro-cid-bnl7p2gw>${rightTag}</p> <h3 class="mvx__label" data-astro-cid-bnl7p2gw>${vision.title}</h3> <p class="mvx__text" data-astro-cid-bnl7p2gw>${vision.body}</p> </article> </div> </div> </section>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/mv.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/mv.astro", void 0);

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

const $$Astro$2 = createAstro();
const $$ValoresZigZag = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ValoresZigZag;
  const {
    title = "Nuestros valores",
    lead = "Son los principios que gu\xEDan c\xF3mo trabajamos, c\xF3mo decidimos y c\xF3mo entregamos resultados.",
    items
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="section values-zigzag" aria-labelledby="values-title" data-astro-cid-muhgpgjn> <div class="container" data-astro-cid-muhgpgjn> <header class="values-head" data-astro-cid-muhgpgjn> <h2 id="values-title" class="val-title" data-astro-cid-muhgpgjn>${title}</h2> <p class="val-subtitle" data-astro-cid-muhgpgjn>${lead}</p> </header> <ol class="values-track" data-astro-cid-muhgpgjn> ${items.map((it, i) => renderTemplate`<li class="value" data-value data-astro-cid-muhgpgjn> <div class="value-card" data-astro-cid-muhgpgjn> <div class="value-top" data-astro-cid-muhgpgjn> <span class="value-num" data-astro-cid-muhgpgjn>${String(i + 1).padStart(2, "0")}</span> <h3 class="value-title" data-astro-cid-muhgpgjn>${it.title}</h3> </div> <p class="value-principle" data-astro-cid-muhgpgjn>${it.principle}</p> <p class="value-body" data-astro-cid-muhgpgjn>${it.body}</p> </div> <span class="value-node" aria-hidden="true" data-astro-cid-muhgpgjn></span> </li>`)} </ol> </div> </section>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/valoresZigZag.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/valoresZigZag.astro", void 0);

const valores = [
  {
    title: "Trabajo en equipo y motivación",
    principle: "La coordinación genera resultados superiores.",
    body: "Cooperamos y conjugamos tareas para alcanzar objetivos comunes, promoviendo compromiso, comunicación y cohesión operativa."
  },
  {
    title: "Responsabilidad corporativa empresarial",
    principle: "Cada acción tiene impacto.",
    body: "Actuamos con responsabilidad social, valorando el impacto de nuestras decisiones en comunidades, trabajadores y medio ambiente."
  },
  {
    title: "Excelencia e innovación",
    principle: "Mejora continua como estándar.",
    body: "Buscamos la excelencia en cada acción, optimizando procesos con eficiencia y eficacia para cumplir objetivos con alto rendimiento."
  },
  {
    title: "Entrega de resultados",
    principle: "El compromiso se demuestra en la ejecución.",
    body: "Contamos con un equipo calificado y capacitado, orientado a cumplir con entregables verificables y metas en tiempo y forma."
  }
];

const $$Astro$1 = createAstro();
const $$Diagonal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Diagonal;
  const { images, ratio = "16 / 7" } = Astro2.props;
  const imgs = (images ?? []).slice(0, 4);
  return renderTemplate`${maybeRenderHead()}<div class="diag-lamellas"${addAttribute(`--ratio:${ratio};`, "style")} data-lamellas data-astro-cid-iz6sbbw6> ${imgs.map((img, i) => renderTemplate`<button type="button"${addAttribute(`lamella ${i === 0 ? "is-active" : ""}`, "class")}${addAttribute(`background-image:url('${img.src}')`, "style")}${addAttribute(img.alt ?? `Imagen ${i + 1}`, "aria-label")} data-astro-cid-iz6sbbw6></button>`)} </div>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/diagonal.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/diagonal.astro", void 0);

const $$Astro = createAstro();
const $$NosotrosSplit = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NosotrosSplit;
  const { title, lead, paragraphs, images } = Astro2.props;
  const imgs = (images ?? []).slice(0, 4);
  return renderTemplate`${maybeRenderHead()}<section class="section section-who" data-astro-cid-fz2jav5i> <div class="container who-wrap" data-astro-cid-fz2jav5i> <!-- Fila superior: 2 columnas --> <div class="who-top" data-astro-cid-fz2jav5i> <div class="who-top__left" data-astro-cid-fz2jav5i> ${paragraphs.map((p) => renderTemplate`<p data-astro-cid-fz2jav5i>${p}</p>`)} </div> <div class="who-top__right" data-astro-cid-fz2jav5i> <h2 data-astro-cid-fz2jav5i>${title}</h2> ${lead ? renderTemplate`<p class="who-lead" data-astro-cid-fz2jav5i>${lead}</p>` : null} </div> </div> <!-- Fila inferior: imágenes a todo el ancho --> <div class="who-bottom" data-astro-cid-fz2jav5i> ${renderComponent($$result, "Diagonal", $$Diagonal, { "images": imgs, "ratio": "16/9", "data-astro-cid-fz2jav5i": true })} </div> </div> </section> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/nosotros/nosotrosSplit.astro", void 0);

const $$Nosotros = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Valcer - Nosotros", "heroTitle": "Nosotros", "heroImage": nosotrosHero, "data-astro-cid-noeej2nj": true }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "NosotrosSplit", $$NosotrosSplit, { "title": "Qui\xE9nes somos", "lead": "M\xE1s de X a\xF1os ejecutando proyectos con est\xE1ndares t\xE9cnicos y compromiso profesional.", "paragraphs": [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  ], "images": heroImages, "data-astro-cid-noeej2nj": true })}  ${renderComponent($$result2, "ValoresZigZag", $$ValoresZigZag, { "items": valores, "data-astro-cid-noeej2nj": true })}  ${renderComponent($$result2, "Mvv", $$Mv, { "title": "Prop\xF3sito y rumbo", "manifesto": "Construimos infraestructura con seguridad y rigor t\xE9cnico, para generar confianza hoy y desarrollo ma\xF1ana.", "leftTag": "Prop\xF3sito", "rightTag": "Rumbo", "mission": {
    title: "C\xF3mo trabajamos",
    body: "Brindar servicios de ejecuci\xF3n, supervisi\xF3n y consultor\xEDa en obras civiles y de esta manera podamos satisfacer las necesidades de nuestros clientes entregando un servicio de calidad bajo las normas y leyes vigentes, propiciando un ambiente de trabajo seguro."
  }, "vision": {
    title: "Hacia d\xF3nde vamos",
    body: "Ser una empresa l\xEDder, y promotor en el desarrollo del pa\xEDs a nivel nacional ejecutando los mejores proyectos constructivos, aplicando los m\xE1s altos est\xE1ndares de calidad."
  }, "data-astro-cid-noeej2nj": true })} ${renderComponent($$result2, "Timeline", $$Timeline, { "data-astro-cid-noeej2nj": true })}  ${maybeRenderHead()}<section class="section-2" data-astro-cid-noeej2nj> <div class="container cta-content" data-astro-cid-noeej2nj> <h2 data-astro-cid-noeej2nj>¿Tienes un proyecto en mente?</h2> <p data-astro-cid-noeej2nj>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> ${renderComponent($$result2, "Button", $$Button, { "href": "/contacto", "data-astro-cid-noeej2nj": true }, { "default": ($$result3) => renderTemplate`CONTACTAR` })} </div> </section> ` })}  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/nosotros.astro?astro&type=script&index=0&lang.ts")}`;
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
