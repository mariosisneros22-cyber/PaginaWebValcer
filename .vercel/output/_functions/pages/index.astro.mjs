import { c as createComponent, d as renderTemplate, f as defineScriptVars, a as addAttribute, m as maybeRenderHead, e as createAstro, r as renderComponent, b as renderScript } from '../chunks/astro/server_BPQpu14k.mjs';
import 'piccolore';
import { $ as $$Image } from '../chunks/_astro_assets_DDRr7B4I.mjs';
import { $ as $$Layout } from '../chunks/Layout_BEcER1h5.mjs';
import { R as RelatedProyectoReact } from '../chunks/RelatedProyectoReact_WG8NbSE0.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$Button } from '../chunks/button_CaUVeSfR.mjs';
import { r as resolveProjectAssetUrl } from '../chunks/images.server_CsA1g8SL.mjs';
import { s as servicios, g as getServiceImageByKey } from '../chunks/serviciosImages_Dq7pkIZd.mjs';
import { p as proyectos } from '../chunks/proyectos_Dy718Wo-.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$3 = createAstro();
const $$InfoSlider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$InfoSlider;
  const { slider, autoplayInterval = 5e3 } = Astro2.props;
  const sliderId = `slider-${Math.random().toString(36).slice(2, 9)}`;
  return renderTemplate(_a || (_a = __template(["", '<div class="about-slider-fade"', ' data-astro-cid-upefa63r> <div class="cards-container" data-astro-cid-upefa63r> ', ' </div> <div class="slider-controls" data-astro-cid-upefa63r> <div class="slider-indicators" role="tablist" aria-label="Slider navigation" data-astro-cid-upefa63r> ', " </div> </div> </div>  <script>(function(){", "\n  // Objeto global para trackear instancias activas\n  window.__sliderInstances = window.__sliderInstances || {};\n\n  function initAboutSlider() {\n    const slider = document.querySelector(`[data-slider=\"${sliderId}\"]`);\n    if (!slider) return;\n\n    // Cleanup de instancia anterior si existe\n    if (window.__sliderInstances[sliderId]) {\n      window.__sliderInstances[sliderId].cleanup();\n    }\n\n    let currentCard = 0;\n    let autoplayTimer = null;\n    const cards = slider.querySelectorAll('.about-card');\n    const indicators = slider.querySelectorAll('.indicator');\n    const totalCards = cards.length;\n\n    if (totalCards === 0) return;\n\n    function showCard(index) {\n      // Validar \xEDndice\n      if (index < 0 || index >= totalCards) return;\n\n      cards.forEach(card => card.classList.remove('active'));\n      indicators.forEach(ind => {\n        ind.classList.remove('active');\n        ind.setAttribute('aria-selected', 'false');\n      });\n      \n      cards[index].classList.add('active');\n      indicators[index].classList.add('active');\n      indicators[index].setAttribute('aria-selected', 'true');\n      currentCard = index;\n    }\n\n    function nextCard() {\n      const nextIndex = (currentCard + 1) % totalCards;\n      showCard(nextIndex);\n    }\n\n    function startAutoplay() {\n      stopAutoplay();\n      autoplayTimer = setInterval(nextCard, autoplayInterval);\n    }\n\n    function stopAutoplay() {\n      if (autoplayTimer !== null) {\n        clearInterval(autoplayTimer);\n        autoplayTimer = null;\n      }\n    }\n\n    // Event listeners\n    const clickHandlers = [];\n    indicators.forEach((indicator, index) => {\n      const handler = () => {\n        showCard(index);\n        startAutoplay();\n      };\n      indicator.addEventListener('click', handler);\n      clickHandlers.push({ element: indicator, handler });\n    });\n\n    const mouseEnterHandler = () => stopAutoplay();\n    const mouseLeaveHandler = () => startAutoplay();\n    \n    slider.addEventListener('mouseenter', mouseEnterHandler);\n    slider.addEventListener('mouseleave', mouseLeaveHandler);\n\n    const visibilityHandler = () => {\n      if (document.hidden) {\n        stopAutoplay();\n      } else {\n        startAutoplay();\n      }\n    };\n    document.addEventListener('visibilitychange', visibilityHandler);\n\n    // Cleanup function\n    const cleanup = () => {\n      stopAutoplay();\n      \n      // Remover event listeners\n      clickHandlers.forEach(({ element, handler }) => {\n        element.removeEventListener('click', handler);\n      });\n      slider.removeEventListener('mouseenter', mouseEnterHandler);\n      slider.removeEventListener('mouseleave', mouseLeaveHandler);\n      document.removeEventListener('visibilitychange', visibilityHandler);\n      \n      // Remover del registro global\n      delete window.__sliderInstances[sliderId];\n    };\n\n    // Registrar instancia\n    window.__sliderInstances[sliderId] = { cleanup };\n\n    // Iniciar autoplay\n    startAutoplay();\n  }\n\n  // Ejecutar inmediatamente si el DOM est\xE1 listo\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', initAboutSlider);\n  } else {\n    initAboutSlider();\n  }\n  \n  // Re-inicializar en navegaci\xF3n de Astro\n  document.addEventListener('astro:page-load', initAboutSlider);\n\n  // Cleanup antes de navegaci\xF3n\n  document.addEventListener('astro:before-preparation', () => {\n    if (window.__sliderInstances[sliderId]) {\n      window.__sliderInstances[sliderId].cleanup();\n    }\n  });\n})();<\/script>"], ["", '<div class="about-slider-fade"', ' data-astro-cid-upefa63r> <div class="cards-container" data-astro-cid-upefa63r> ', ' </div> <div class="slider-controls" data-astro-cid-upefa63r> <div class="slider-indicators" role="tablist" aria-label="Slider navigation" data-astro-cid-upefa63r> ', " </div> </div> </div>  <script>(function(){", "\n  // Objeto global para trackear instancias activas\n  window.__sliderInstances = window.__sliderInstances || {};\n\n  function initAboutSlider() {\n    const slider = document.querySelector(\\`[data-slider=\"\\${sliderId}\"]\\`);\n    if (!slider) return;\n\n    // Cleanup de instancia anterior si existe\n    if (window.__sliderInstances[sliderId]) {\n      window.__sliderInstances[sliderId].cleanup();\n    }\n\n    let currentCard = 0;\n    let autoplayTimer = null;\n    const cards = slider.querySelectorAll('.about-card');\n    const indicators = slider.querySelectorAll('.indicator');\n    const totalCards = cards.length;\n\n    if (totalCards === 0) return;\n\n    function showCard(index) {\n      // Validar \xEDndice\n      if (index < 0 || index >= totalCards) return;\n\n      cards.forEach(card => card.classList.remove('active'));\n      indicators.forEach(ind => {\n        ind.classList.remove('active');\n        ind.setAttribute('aria-selected', 'false');\n      });\n      \n      cards[index].classList.add('active');\n      indicators[index].classList.add('active');\n      indicators[index].setAttribute('aria-selected', 'true');\n      currentCard = index;\n    }\n\n    function nextCard() {\n      const nextIndex = (currentCard + 1) % totalCards;\n      showCard(nextIndex);\n    }\n\n    function startAutoplay() {\n      stopAutoplay();\n      autoplayTimer = setInterval(nextCard, autoplayInterval);\n    }\n\n    function stopAutoplay() {\n      if (autoplayTimer !== null) {\n        clearInterval(autoplayTimer);\n        autoplayTimer = null;\n      }\n    }\n\n    // Event listeners\n    const clickHandlers = [];\n    indicators.forEach((indicator, index) => {\n      const handler = () => {\n        showCard(index);\n        startAutoplay();\n      };\n      indicator.addEventListener('click', handler);\n      clickHandlers.push({ element: indicator, handler });\n    });\n\n    const mouseEnterHandler = () => stopAutoplay();\n    const mouseLeaveHandler = () => startAutoplay();\n    \n    slider.addEventListener('mouseenter', mouseEnterHandler);\n    slider.addEventListener('mouseleave', mouseLeaveHandler);\n\n    const visibilityHandler = () => {\n      if (document.hidden) {\n        stopAutoplay();\n      } else {\n        startAutoplay();\n      }\n    };\n    document.addEventListener('visibilitychange', visibilityHandler);\n\n    // Cleanup function\n    const cleanup = () => {\n      stopAutoplay();\n      \n      // Remover event listeners\n      clickHandlers.forEach(({ element, handler }) => {\n        element.removeEventListener('click', handler);\n      });\n      slider.removeEventListener('mouseenter', mouseEnterHandler);\n      slider.removeEventListener('mouseleave', mouseLeaveHandler);\n      document.removeEventListener('visibilitychange', visibilityHandler);\n      \n      // Remover del registro global\n      delete window.__sliderInstances[sliderId];\n    };\n\n    // Registrar instancia\n    window.__sliderInstances[sliderId] = { cleanup };\n\n    // Iniciar autoplay\n    startAutoplay();\n  }\n\n  // Ejecutar inmediatamente si el DOM est\xE1 listo\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', initAboutSlider);\n  } else {\n    initAboutSlider();\n  }\n  \n  // Re-inicializar en navegaci\xF3n de Astro\n  document.addEventListener('astro:page-load', initAboutSlider);\n\n  // Cleanup antes de navegaci\xF3n\n  document.addEventListener('astro:before-preparation', () => {\n    if (window.__sliderInstances[sliderId]) {\n      window.__sliderInstances[sliderId].cleanup();\n    }\n  });\n})();<\/script>"])), maybeRenderHead(), addAttribute(sliderId, "data-slider"), slider.map((slide, index) => renderTemplate`<div${addAttribute(`about-card ${index === 0 ? "active" : ""}`, "class")}${addAttribute(index, "data-slide")} data-astro-cid-upefa63r> <div class="slider-layout" data-astro-cid-upefa63r> <div class="slider-content" data-astro-cid-upefa63r> ${slide.metric && renderTemplate`<span class="slider-metric" data-astro-cid-upefa63r>${slide.metric}</span>`} <h3 data-astro-cid-upefa63r>${slide.title}</h3> <p data-astro-cid-upefa63r>${slide.content}</p> </div> ${slide.icon && renderTemplate`<div class="slider-icon" data-astro-cid-upefa63r> <img${addAttribute(slide.icon, "src")} alt="" aria-hidden="true" width="96" height="96"${addAttribute(index === 0 ? "eager" : "lazy", "loading")} decoding="async" data-astro-cid-upefa63r> </div>`} </div> </div>`), slider.map((_, index) => renderTemplate`<button${addAttribute(`indicator ${index === 0 ? "active" : ""}`, "class")}${addAttribute(index, "data-index")} role="tab"${addAttribute(index === 0, "aria-selected")}${addAttribute(`Slide ${index + 1} de ${slider.length}`, "aria-label")} data-astro-cid-upefa63r></button>`), defineScriptVars({ autoplayInterval, sliderId }));
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/index/infoSlider.astro", void 0);

const $$Astro$2 = createAstro();
const $$ServiceShowcase = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ServiceShowcase;
  const { services } = Astro2.props;
  const displayServices = services.slice(0, 4);
  return renderTemplate`${maybeRenderHead()}<section class="section section-alt" data-astro-cid-cv4gk7ev> <div class="container" data-astro-cid-cv4gk7ev> <div class="showcase-header" data-astro-cid-cv4gk7ev> <h2 data-astro-cid-cv4gk7ev>Nuestros Servicios</h2> <p data-astro-cid-cv4gk7ev>Soluciones integrales para tu proyecto con estándares de calidad internacional</p> </div> <div class="showcase-grid" data-astro-cid-cv4gk7ev> ${displayServices.map((service, index) => renderTemplate`<div class="showcase-card"${addAttribute(service.id, "data-service-id")} data-astro-cid-cv4gk7ev> ${service.imageSrc && renderTemplate`<div class="card-image" data-astro-cid-cv4gk7ev> <img${addAttribute(service.imageSrc, "src")}${addAttribute(service.title, "alt")} loading="lazy" data-astro-cid-cv4gk7ev> </div>`} <div class="card-content" data-astro-cid-cv4gk7ev> <h3 class="card-title" data-astro-cid-cv4gk7ev>${service.title}</h3> <p class="card-tagline" data-astro-cid-cv4gk7ev>${service.tagline}</p> <ul class="card-highlights" data-astro-cid-cv4gk7ev> ${service.items.slice(0, 2).map((item) => renderTemplate`<li data-astro-cid-cv4gk7ev> <span class="highlight-dot" data-astro-cid-cv4gk7ev></span> ${item} </li>`)} </ul> </div> <div class="card-arrow" data-astro-cid-cv4gk7ev>→</div> </div>`)} </div> <div class="showcase-cta" data-astro-cid-cv4gk7ev> <p data-astro-cid-cv4gk7ev>¿Necesitas una solución específica?</p> ${renderComponent($$result, "Button", $$Button, { "href": "/servicios", "class": "btn-large", "data-astro-cid-cv4gk7ev": true }, { "default": ($$result2) => renderTemplate`
Explorar todos los servicios
` })} </div> </div> </section> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/index/ServiceShowcase.astro", void 0);

const $$Astro$1 = createAstro();
const $$SliderHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SliderHero;
  const { images, title, subtitle } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero" aria-label="Hero carousel" data-astro-cid-knfc2hot> <div class="hero-slider" data-hero-slider data-astro-cid-knfc2hot> ${images.map((image, index) => renderTemplate`<div${addAttribute(`slide ${index === 0 ? "active" : ""}`, "class")} data-astro-cid-knfc2hot> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": `Slide ${index + 1}`, "loading": index === 0 ? "eager" : "lazy", "data-astro-cid-knfc2hot": true })} </div>`)} <div class="hero-content" data-astro-cid-knfc2hot> <div class="hero-container" data-astro-cid-knfc2hot> <h1 data-astro-cid-knfc2hot>${title}</h1> ${subtitle && renderTemplate`<p data-astro-cid-knfc2hot>${subtitle}</p>`} </div> </div> <button class="slide-btn prev" data-slide-prev aria-label="Previous slide" data-astro-cid-knfc2hot>‹</button> <button class="slide-btn next" data-slide-next aria-label="Next slide" data-astro-cid-knfc2hot>›</button> <div class="slide-indicators" role="tablist" data-astro-cid-knfc2hot> ${images.map((_, index) => renderTemplate`<button${addAttribute(`indicator ${index === 0 ? "active" : ""}`, "class")}${addAttribute(index, "data-slide-to")} role="tab"${addAttribute(`Go to slide ${index + 1}`, "aria-label")}${addAttribute(index === 0, "aria-selected")} data-astro-cid-knfc2hot></button>`)} </div> </div> </section>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/hero/sliderHero.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/hero/sliderHero.astro", void 0);

const $$Astro = createAstro();
const $$Carrusel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Carrusel;
  const { clients } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="section clientes-seccion" data-astro-cid-zj34zbvv> <div class="carrusel-wrapper" data-astro-cid-zj34zbvv> <div class="carrusel-track" data-astro-cid-zj34zbvv> ${clients.map((client) => renderTemplate`<div class="cliente-logo" data-astro-cid-zj34zbvv> <div class="logo-box" data-astro-cid-zj34zbvv> ${renderComponent($$result, "Image", $$Image, { "src": client.logo, "alt": client.name, "loading": "eager", "width": 180, "height": 180, "quality": 80, "data-astro-cid-zj34zbvv": true })} </div> </div>`)} </div> </div> </section>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/index/carrusel.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/index/carrusel.astro", void 0);

const img1 = new Proxy({"src":"/_astro/hero_1.CgR2KOdp.jpg","width":821,"height":360,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/hero/hero_1.jpg";
							}
							
							return target[name];
						}
					});

const img2 = new Proxy({"src":"/_astro/hero_2.CuGR_Qh6.jpg","width":5496,"height":3672,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/hero/hero_2.jpg";
							}
							
							return target[name];
						}
					});

const img3 = new Proxy({"src":"/_astro/hero_3.BASp41Tl.jpg","width":612,"height":408,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/hero/hero_3.jpg";
							}
							
							return target[name];
						}
					});

const img4 = new Proxy({"src":"/_astro/hero_4.Bzc06X-o.jpg","width":3306,"height":4281,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/hero/hero_4.jpg";
							}
							
							return target[name];
						}
					});

const about = new Proxy({"src":"/_astro/about.CtsCOCR2.jpg","width":5318,"height":3341,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/about.jpg";
							}
							
							return target[name];
						}
					});

new Proxy({"src":"/_astro/about2.CJ0z_yyd.jpg","width":6000,"height":4000,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/about2.jpg";
							}
							
							return target[name];
						}
					});

new Proxy({"src":"/_astro/about3.6o8SWCzy.jpg","width":2048,"height":1536,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/about3.jpg";
							}
							
							return target[name];
						}
					});

const heroImages = [img1, img2, img3, img4];
const infoSliders = [
  {
    title: "Años de experiencia",
    metric: "15+",
    content: "Más de una década desarrollando soluciones estables, escalables y adaptadas a las necesidades reales de cada cliente.",
    icon: "/icons/align-center-vertical.svg"
  },
  {
    title: "Proyectos entregados",
    metric: "120+",
    content: "Hemos participado en proyectos de distintas industrias, cumpliendo plazos y manteniendo altos estándares de calidad.",
    icon: "/icons/anchor.svg"
  },
  {
    title: "Satisfacción del cliente",
    metric: "98%",
    content: "Nuestro enfoque está centrado en relaciones a largo plazo, priorizando resultados medibles y comunicación constante.",
    icon: "/icons/archive-box.svg"
  },
  {
    title: "Equipo especializado",
    metric: "25+",
    content: "Contamos con un equipo multidisciplinario de profesionales comprometidos con la mejora continua y la innovación.",
    icon: "/icons/baseball.svg"
  },
  {
    title: "Presencia regional",
    metric: "8 regiones",
    content: "Colaboramos con clientes en distintos mercados, adaptándonos a contextos culturales y técnicos diversos.",
    icon: "/icons/battery-full.svg"
  }
];

const client1 = new Proxy({"src":"/_astro/client-1.K8qSMG33.jpg","width":3850,"height":3011,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/clients/client-1.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client1
}, Symbol.toStringTag, { value: 'Module' }));

const client2 = new Proxy({"src":"/_astro/client-2.BV6LGmey.jpg","width":5184,"height":3456,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/clients/client-2.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client2
}, Symbol.toStringTag, { value: 'Module' }));

const client3 = new Proxy({"src":"/_astro/client-3.DjmOuh59.jpg","width":4321,"height":4321,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/clients/client-3.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client3
}, Symbol.toStringTag, { value: 'Module' }));

const client4 = new Proxy({"src":"/_astro/client-4.DeRKB3YI.jpg","width":3024,"height":4032,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/clients/client-4.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client4
}, Symbol.toStringTag, { value: 'Module' }));

const client5 = new Proxy({"src":"/_astro/client-5.DSErNJsg.jpg","width":4320,"height":4321,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/index/clients/client-5.jpg";
							}
							
							return target[name];
						}
					});

const __vite_glob_0_4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: client5
}, Symbol.toStringTag, { value: 'Module' }));

const images = /* #__PURE__ */ Object.assign({"../assets/images/index/clients/client-1.jpg": __vite_glob_0_0,"../assets/images/index/clients/client-2.jpg": __vite_glob_0_1,"../assets/images/index/clients/client-3.jpg": __vite_glob_0_2,"../assets/images/index/clients/client-4.jpg": __vite_glob_0_3,"../assets/images/index/clients/client-5.jpg": __vite_glob_0_4


});
const names = [
  "Cliente 1",
  "Cliente 2",
  "Cliente 3",
  "Cliente 4",
  "Cliente 5"
];
const clients = Object.values(images).map((mod, index) => ({
  name: names[index] ?? `Cliente ${index + 1}`,
  logo: mod.default
}));

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const getRelatedProjects = (ids) => {
    return ids.map((id) => proyectos.find((p) => p.id === id)).filter((p) => p !== void 0).slice(0, 4).map((p) => ({
      ...p,
      coverUrl: resolveProjectAssetUrl(p.portada)
    }));
  };
  const relatedProjects = getRelatedProjects(["proj_001", "proj_002", "proj_005", "proj_004"]);
  const serviciosWithImages = servicios.map((s) => ({
    ...s,
    imageSrc: getServiceImageByKey(s.imageKey).src
  }));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Valcer - Inicio", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SliderHero", $$SliderHero, { "images": heroImages, "title": "Bienvenido a Valcer", "subtitle": "Tu empresa de confianza", "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<section class="section" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <!--About us --> <div class="about-us" data-astro-cid-j7pv25f6> <div class="about-us-content" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Sobre Nosotros</h2> <p data-astro-cid-j7pv25f6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> ${renderComponent($$result2, "Button", $$Button, { "href": "/nosotros", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`Leer más` })} </div> <div class="about-us-image" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Image", $$Image, { "src": about, "alt": "Sobre Nosotros", "loading": "eager", "width": 800, "height": 600, "quality": 85, "densities": [1, 2], "data-astro-cid-j7pv25f6": true })} </div> </div> ${renderComponent($$result2, "Slider", $$InfoSlider, { "slider": infoSliders, "data-astro-cid-j7pv25f6": true })} </div> </section>  ${renderComponent($$result2, "ServiceShowcase", $$ServiceShowcase, { "services": serviciosWithImages, "data-astro-cid-j7pv25f6": true })}  <section class="section section-video" data-astro-cid-j7pv25f6> <video class="section-video-bg" autoplay muted loop playsinline preload="none" poster="/images/logo-video.jpg" data-astro-cid-j7pv25f6> <source src="/videos/fondo-video.mp4" type="video/mp4" data-astro-cid-j7pv25f6> <source src="/videos/fondo-video.webm" type="video/webm" data-astro-cid-j7pv25f6> </video> <div class="section-overlay" data-astro-cid-j7pv25f6></div> <div class="container section-content" data-astro-cid-j7pv25f6> <h2 class="valor-titulo" data-astro-cid-j7pv25f6>Por qué elegir Valcer</h2> <div class="valor-grid" data-astro-cid-j7pv25f6> <div class="valor-item" data-astro-cid-j7pv25f6> <div class="valor-numero" data-astro-cid-j7pv25f6>01</div> <h3 data-astro-cid-j7pv25f6>Experiencia Industrial</h3> <p data-astro-cid-j7pv25f6>Más de 15 años trabajando en proyectos de alta complejidad en el sector industrial.</p> </div> <div class="valor-item" data-astro-cid-j7pv25f6> <div class="valor-numero" data-astro-cid-j7pv25f6>02</div> <h3 data-astro-cid-j7pv25f6>Estándares de Calidad</h3> <p data-astro-cid-j7pv25f6>Cumplimos con las certificaciones internacionales más exigentes.</p> </div> <div class="valor-item" data-astro-cid-j7pv25f6> <div class="valor-numero" data-astro-cid-j7pv25f6>03</div> <h3 data-astro-cid-j7pv25f6>Equipo Especializado</h3> <p data-astro-cid-j7pv25f6>Profesionales altamente capacitados.</p> </div> <div class="valor-item" data-astro-cid-j7pv25f6> <div class="valor-numero" data-astro-cid-j7pv25f6>04</div> <h3 data-astro-cid-j7pv25f6>Compromiso y Seguridad</h3> <p data-astro-cid-j7pv25f6>Seguridad laboral como prioridad.</p> </div> </div> </div> </section>  <section class="section section-accent" data-astro-cid-j7pv25f6> <div class="container container-proyect" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "RelatedProyectoReact", RelatedProyectoReact, { "client:visible": true, "projects": relatedProjects, "client:component-hydration": "visible", "client:component-path": "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/proyectos/react/RelatedProyectoReact.tsx", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Button", $$Button, { "href": "/proyectos", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`Leer más` })} </div> </section>  <section class="section" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 class="clientes-titulo" data-astro-cid-j7pv25f6>Nuestros Clientes</h2> ${renderComponent($$result2, "Carrusel", $$Carrusel, { "clients": clients, "data-astro-cid-j7pv25f6": true })} </div> </section> ` })}  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/index.astro", void 0);

const $$file = "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
