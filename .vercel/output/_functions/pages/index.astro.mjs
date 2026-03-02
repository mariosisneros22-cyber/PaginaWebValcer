import { c as createComponent, d as renderTemplate, f as defineScriptVars, a as addAttribute, r as renderComponent, m as maybeRenderHead, e as createAstro, b as renderScript } from '../chunks/astro/server_DEPTrjPg.mjs';
import 'piccolore';
import { $ as $$Image } from '../chunks/_astro_assets_hQqkGHLl.mjs';
import { $ as $$Layout } from '../chunks/Layout_DqsIHtQ9.mjs';
import { $ as $$RelatedProyecto } from '../chunks/RelatedProyecto_DUprCtGF.mjs';
import { $ as $$Button } from '../chunks/button_B7UJg7TY.mjs';
/* empty css                                 */
import { h as heroImages, a as about, i as infoSliders } from '../chunks/indexImage_D4ymw4AB.mjs';
import { $ as $$ServiceIntro } from '../chunks/ServiceIntro_Ct04C3dn.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$2 = createAstro();
const $$InfoSlider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$InfoSlider;
  const { slider, autoplayInterval = 5e3 } = Astro2.props;
  const sliderId = `slider-${Math.random().toString(36).slice(2, 9)}`;
  return renderTemplate(_a || (_a = __template(["", '<div class="about-slider-fade"', ' data-astro-cid-upefa63r> <div class="cards-container" data-astro-cid-upefa63r> ', ' </div> <div class="button-mid" data-astro-cid-upefa63r> ', ' </div> <div class="slider-controls" data-astro-cid-upefa63r> <div class="slider-indicators" role="tablist" aria-label="Slider navigation" data-astro-cid-upefa63r> ', " </div> </div> </div>  <script>(function(){", "\n  // Objeto global para trackear instancias activas\n  window.__sliderInstances = window.__sliderInstances || {};\n\n  function initAboutSlider() {\n    const slider = document.querySelector(`[data-slider=\"${sliderId}\"]`);\n    if (!slider) return;\n\n    // Cleanup de instancia anterior si existe\n    if (window.__sliderInstances[sliderId]) {\n      window.__sliderInstances[sliderId].cleanup();\n    }\n\n    let currentCard = 0;\n    let autoplayTimer = null;\n    const cards = slider.querySelectorAll('.about-card');\n    const indicators = slider.querySelectorAll('.indicator');\n    const totalCards = cards.length;\n\n    if (totalCards === 0) return;\n\n    function showCard(index) {\n      if (index < 0 || index >= totalCards) return;\n\n      const prev = cards[currentCard];\n      const next = cards[index];\n\n      if (prev && prev !== next) {\n        prev.classList.remove('active');\n        prev.classList.add('leaving');\n\n        // al terminar la animaci\xF3n, ocultar del todo\n        window.setTimeout(() => {\n          prev.classList.remove('leaving');\n        }, 1400);\n      }\n\n      indicators.forEach(ind => {\n        ind.classList.remove('active');\n        ind.setAttribute('aria-selected', 'false');\n      });\n\n      next.classList.add('active');\n      next.classList.remove('leaving');\n\n      indicators[index].classList.add('active');\n      indicators[index].setAttribute('aria-selected', 'true');\n\n      currentCard = index;\n    }\n\n    function nextCard() {\n      const nextIndex = (currentCard + 1) % totalCards;\n      showCard(nextIndex);\n    }\n\n    function startAutoplay() {\n      stopAutoplay();\n      autoplayTimer = setInterval(nextCard, autoplayInterval);\n    }\n\n    function stopAutoplay() {\n      if (autoplayTimer !== null) {\n        clearInterval(autoplayTimer);\n        autoplayTimer = null;\n      }\n    }\n\n    // Event listeners\n    const clickHandlers = [];\n    indicators.forEach((indicator, index) => {\n      const handler = () => {\n        showCard(index);\n        startAutoplay();\n      };\n      indicator.addEventListener('click', handler);\n      clickHandlers.push({ element: indicator, handler });\n    });\n\n    const mouseEnterHandler = () => stopAutoplay();\n    const mouseLeaveHandler = () => startAutoplay();\n    \n    slider.addEventListener('mouseenter', mouseEnterHandler);\n    slider.addEventListener('mouseleave', mouseLeaveHandler);\n\n    const visibilityHandler = () => {\n      if (document.hidden) {\n        stopAutoplay();\n      } else {\n        startAutoplay();\n      }\n    };\n    document.addEventListener('visibilitychange', visibilityHandler);\n\n    // Cleanup function\n    const cleanup = () => {\n      stopAutoplay();\n      \n      // Remover event listeners\n      clickHandlers.forEach(({ element, handler }) => {\n        element.removeEventListener('click', handler);\n      });\n      slider.removeEventListener('mouseenter', mouseEnterHandler);\n      slider.removeEventListener('mouseleave', mouseLeaveHandler);\n      document.removeEventListener('visibilitychange', visibilityHandler);\n      \n      // Remover del registro global\n      delete window.__sliderInstances[sliderId];\n    };\n\n    // Registrar instancia\n    window.__sliderInstances[sliderId] = { cleanup };\n\n    // Iniciar autoplay\n    startAutoplay();\n  }\n\n  // Ejecutar inmediatamente si el DOM est\xE1 listo\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', initAboutSlider);\n  } else {\n    initAboutSlider();\n  }\n  \n  // Re-inicializar en navegaci\xF3n de Astro\n  document.addEventListener('astro:page-load', initAboutSlider);\n\n  // Cleanup antes de navegaci\xF3n\n  document.addEventListener('astro:before-preparation', () => {\n    if (window.__sliderInstances[sliderId]) {\n      window.__sliderInstances[sliderId].cleanup();\n    }\n  });\n})();<\/script>"], ["", '<div class="about-slider-fade"', ' data-astro-cid-upefa63r> <div class="cards-container" data-astro-cid-upefa63r> ', ' </div> <div class="button-mid" data-astro-cid-upefa63r> ', ' </div> <div class="slider-controls" data-astro-cid-upefa63r> <div class="slider-indicators" role="tablist" aria-label="Slider navigation" data-astro-cid-upefa63r> ', " </div> </div> </div>  <script>(function(){", "\n  // Objeto global para trackear instancias activas\n  window.__sliderInstances = window.__sliderInstances || {};\n\n  function initAboutSlider() {\n    const slider = document.querySelector(\\`[data-slider=\"\\${sliderId}\"]\\`);\n    if (!slider) return;\n\n    // Cleanup de instancia anterior si existe\n    if (window.__sliderInstances[sliderId]) {\n      window.__sliderInstances[sliderId].cleanup();\n    }\n\n    let currentCard = 0;\n    let autoplayTimer = null;\n    const cards = slider.querySelectorAll('.about-card');\n    const indicators = slider.querySelectorAll('.indicator');\n    const totalCards = cards.length;\n\n    if (totalCards === 0) return;\n\n    function showCard(index) {\n      if (index < 0 || index >= totalCards) return;\n\n      const prev = cards[currentCard];\n      const next = cards[index];\n\n      if (prev && prev !== next) {\n        prev.classList.remove('active');\n        prev.classList.add('leaving');\n\n        // al terminar la animaci\xF3n, ocultar del todo\n        window.setTimeout(() => {\n          prev.classList.remove('leaving');\n        }, 1400);\n      }\n\n      indicators.forEach(ind => {\n        ind.classList.remove('active');\n        ind.setAttribute('aria-selected', 'false');\n      });\n\n      next.classList.add('active');\n      next.classList.remove('leaving');\n\n      indicators[index].classList.add('active');\n      indicators[index].setAttribute('aria-selected', 'true');\n\n      currentCard = index;\n    }\n\n    function nextCard() {\n      const nextIndex = (currentCard + 1) % totalCards;\n      showCard(nextIndex);\n    }\n\n    function startAutoplay() {\n      stopAutoplay();\n      autoplayTimer = setInterval(nextCard, autoplayInterval);\n    }\n\n    function stopAutoplay() {\n      if (autoplayTimer !== null) {\n        clearInterval(autoplayTimer);\n        autoplayTimer = null;\n      }\n    }\n\n    // Event listeners\n    const clickHandlers = [];\n    indicators.forEach((indicator, index) => {\n      const handler = () => {\n        showCard(index);\n        startAutoplay();\n      };\n      indicator.addEventListener('click', handler);\n      clickHandlers.push({ element: indicator, handler });\n    });\n\n    const mouseEnterHandler = () => stopAutoplay();\n    const mouseLeaveHandler = () => startAutoplay();\n    \n    slider.addEventListener('mouseenter', mouseEnterHandler);\n    slider.addEventListener('mouseleave', mouseLeaveHandler);\n\n    const visibilityHandler = () => {\n      if (document.hidden) {\n        stopAutoplay();\n      } else {\n        startAutoplay();\n      }\n    };\n    document.addEventListener('visibilitychange', visibilityHandler);\n\n    // Cleanup function\n    const cleanup = () => {\n      stopAutoplay();\n      \n      // Remover event listeners\n      clickHandlers.forEach(({ element, handler }) => {\n        element.removeEventListener('click', handler);\n      });\n      slider.removeEventListener('mouseenter', mouseEnterHandler);\n      slider.removeEventListener('mouseleave', mouseLeaveHandler);\n      document.removeEventListener('visibilitychange', visibilityHandler);\n      \n      // Remover del registro global\n      delete window.__sliderInstances[sliderId];\n    };\n\n    // Registrar instancia\n    window.__sliderInstances[sliderId] = { cleanup };\n\n    // Iniciar autoplay\n    startAutoplay();\n  }\n\n  // Ejecutar inmediatamente si el DOM est\xE1 listo\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', initAboutSlider);\n  } else {\n    initAboutSlider();\n  }\n  \n  // Re-inicializar en navegaci\xF3n de Astro\n  document.addEventListener('astro:page-load', initAboutSlider);\n\n  // Cleanup antes de navegaci\xF3n\n  document.addEventListener('astro:before-preparation', () => {\n    if (window.__sliderInstances[sliderId]) {\n      window.__sliderInstances[sliderId].cleanup();\n    }\n  });\n})();<\/script>"])), maybeRenderHead(), addAttribute(sliderId, "data-slider"), slider.map((slide, index) => renderTemplate`<div${addAttribute(`about-card ${index === 0 ? "active" : ""}`, "class")}${addAttribute(index, "data-slide")} data-astro-cid-upefa63r> <div class="slider-layout" data-astro-cid-upefa63r> <div class="slider-content" data-astro-cid-upefa63r> ${slide.metric && renderTemplate`<span class="slider-metric" data-astro-cid-upefa63r>${slide.metric}</span>`} <h3 data-astro-cid-upefa63r>${slide.title}</h3> <p data-astro-cid-upefa63r>${slide.content}</p> </div> ${slide.icon && renderTemplate`<div class="slider-icon" data-astro-cid-upefa63r> <img${addAttribute(slide.icon, "src")} alt="" aria-hidden="true" width="96" height="96"${addAttribute(index === 0 ? "eager" : "lazy", "loading")} data-astro-cid-upefa63r> </div>`} </div> </div>`), renderComponent($$result, "Button", $$Button, { "href": "/nosotros", "data-astro-cid-upefa63r": true }, { "default": ($$result2) => renderTemplate`Leer más` }), slider.map((_, index) => renderTemplate`<button${addAttribute(`indicator ${index === 0 ? "active" : ""}`, "class")}${addAttribute(index, "data-index")} role="tab"${addAttribute(index === 0, "aria-selected")}${addAttribute(`Slide ${index + 1} de ${slider.length}`, "aria-label")} data-astro-cid-upefa63r></button>`), defineScriptVars({ autoplayInterval, sliderId }));
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/index/infoSlider.astro", void 0);

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
  return renderTemplate`${maybeRenderHead()}<div class="carrusel-wrapper" data-astro-cid-zj34zbvv> <div class="carrusel-track" data-astro-cid-zj34zbvv> ${clients.map((client) => renderTemplate`<div class="cliente-logo" data-astro-cid-zj34zbvv> <div class="logo-box" data-astro-cid-zj34zbvv> ${renderComponent($$result, "Image", $$Image, { "src": client.logo, "alt": client.name, "loading": "lazy", "decoding": "async", "width": 180, "height": 180, "quality": 70, "sizes": "(max-width: 768px) 140px, 180px", "densities": [1, 2], "data-astro-cid-zj34zbvv": true })} </div> </div>`)} </div> </div>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/index/carrusel.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/index/carrusel.astro", void 0);

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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Valcer - Inicio", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "SliderHero", $$SliderHero, { "images": heroImages, "title": "Bienvenido a Valcer", "subtitle": "Tu empresa de confianza", "data-astro-cid-j7pv25f6": true })} ${maybeRenderHead()}<section class="section-2" data-astro-cid-j7pv25f6> <div class="container containerabout" data-astro-cid-j7pv25f6> <!--About us --> <div class="about-us" data-astro-cid-j7pv25f6> <div class="about-us-content" data-astro-cid-j7pv25f6> <h3 data-astro-cid-j7pv25f6>Sobre Nosotros</h3> <p data-astro-cid-j7pv25f6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> </div> <div class="about-us-image" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Image", $$Image, { "src": about, "alt": "Sobre Nosotros", "loading": "eager", "width": 800, "height": 600, "quality": 85, "densities": [1, 2], "data-astro-cid-j7pv25f6": true })} </div> </div> ${renderComponent($$result2, "Slider", $$InfoSlider, { "slider": infoSliders, "data-astro-cid-j7pv25f6": true })} </div> </section>  ${renderComponent($$result2, "ServiceIntro", $$ServiceIntro, { "buttonHref": "/servicios", "buttonLabel": "Ver nuestros servicios", "data-astro-cid-j7pv25f6": true })}  <section class="section section-video" data-astro-cid-j7pv25f6> <video class="section-video-bg" autoplay muted loop playsinline preload="none" data-astro-cid-j7pv25f6> <source src="/videos/fondo-video.mp4" type="video/mp4" data-astro-cid-j7pv25f6> <source src="/videos/fondo-video.webm" type="video/webm" data-astro-cid-j7pv25f6> </video> <div class="section-overlay" data-astro-cid-j7pv25f6></div> <div class="container section-content" data-astro-cid-j7pv25f6> <h2 class="valor-titulo" data-astro-cid-j7pv25f6>Nuestro enfoque en cada proyecto</h2> <p class="valor-subtitulo" data-astro-cid-j7pv25f6>
Un proceso estructurado que garantiza planificación técnica, ejecución controlada y entrega conforme a especificaciones.
</p> <div class="valor-grid valor-grid-3" data-astro-cid-j7pv25f6> <div class="valor-item" data-astro-cid-j7pv25f6> <div class="valor-index" data-astro-cid-j7pv25f6>01</div> <h3 data-astro-cid-j7pv25f6>Planificamos</h3> <p data-astro-cid-j7pv25f6>
Definimos alcance, riesgos, cronograma y recursos antes de iniciar,
            asegurando claridad operativa desde el primer día.
</p> </div> <div class="valor-item" data-astro-cid-j7pv25f6> <div class="valor-index" data-astro-cid-j7pv25f6>02</div> <h3 data-astro-cid-j7pv25f6>Ejecutamos</h3> <p data-astro-cid-j7pv25f6>
Supervisión en campo, coordinación técnica y control continuo
            para mantener calidad y seguridad durante toda la intervención.
</p> </div> <div class="valor-item" data-astro-cid-j7pv25f6> <div class="valor-index" data-astro-cid-j7pv25f6>03</div> <h3 data-astro-cid-j7pv25f6>Garantizamos</h3> <p data-astro-cid-j7pv25f6>
Validación final, documentación técnica y entrega estructurada
            conforme a requerimientos del cliente.
</p> </div> </div> </div> </section>  <section class="section-2" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="proyectos-ht" data-astro-cid-j7pv25f6> <h2 class="proyectos-titulo" data-astro-cid-j7pv25f6>Proyectos destacados</h2> ${renderComponent($$result2, "Button", $$Button, { "href": "/proyectos", "data-astro-cid-j7pv25f6": true }, { "default": ($$result3) => renderTemplate`Leer más` })} </div> ${renderComponent($$result2, "RelatedProyecto", $$RelatedProyecto, { "ids": ["proj_001", "proj_002", "proj_005", "proj_004"], "limit": 4, "data-astro-cid-j7pv25f6": true })} </div> </section>  <section class="section" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <h2 class="clientes-titulo" data-astro-cid-j7pv25f6>Nuestros Clientes</h2> ${renderComponent($$result2, "Carrusel", $$Carrusel, { "clients": clients, "data-astro-cid-j7pv25f6": true })} </div> </section> ` })}  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
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
