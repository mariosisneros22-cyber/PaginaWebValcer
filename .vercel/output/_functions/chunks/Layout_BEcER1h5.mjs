import { c as createComponent, a as addAttribute, b as renderScript, d as renderTemplate, e as createAstro, m as maybeRenderHead, r as renderComponent, h as renderHead, g as renderSlot, i as renderTransition } from './astro/server_BPQpu14k.mjs';
import 'piccolore';
import 'clsx';
/* empty css                            */
import { $ as $$Image } from './_astro_assets_DDRr7B4I.mjs';

const $$Astro$3 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro$2 = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const currentPath = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-3ef6ksr2> <nav class="nav" aria-label="Navegación principal" data-astro-cid-3ef6ksr2> <div class="logo" data-astro-cid-3ef6ksr2> <a href="/" data-astro-cid-3ef6ksr2>Valcer</a> </div> <button class="menu-toggle" data-menu-toggle aria-label="Abrir menú" aria-expanded="false" aria-controls="navLinks" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2></span> <span data-astro-cid-3ef6ksr2></span> <span data-astro-cid-3ef6ksr2></span> </button> <ul class="nav-links" data-nav-links id="navLinks" data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2> <a href="/"${addAttribute(currentPath === "/" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>
Inicio
</a> </li> <li data-astro-cid-3ef6ksr2> <a href="/proyectos"${addAttribute(currentPath === "/proyectos" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>
Proyectos
</a> </li> <li data-astro-cid-3ef6ksr2> <a href="/servicios"${addAttribute(currentPath === "/servicios" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>
Servicios
</a> </li> <li data-astro-cid-3ef6ksr2> <a href="/nosotros"${addAttribute(currentPath === "/nosotros" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>
Nosotros
</a> </li> <li data-astro-cid-3ef6ksr2> <a href="/contacto"${addAttribute(currentPath === "/contacto" ? "active" : "", "class")} data-astro-cid-3ef6ksr2>
Contacto
</a> </li> </ul> </nav> </header>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <div class="footer-content" data-astro-cid-sz7xmlte> <div class="footer-section" data-astro-cid-sz7xmlte> <h3 data-astro-cid-sz7xmlte>Valcer</h3> <p data-astro-cid-sz7xmlte>Tu empresa de confianza</p> </div> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Enlaces</h4> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/" data-astro-cid-sz7xmlte>Inicio</a></li> <li data-astro-cid-sz7xmlte><a href="/proyectos" data-astro-cid-sz7xmlte>Proyectos</a></li> <li data-astro-cid-sz7xmlte><a href="/servicios" data-astro-cid-sz7xmlte>Servicios</a></li> <li data-astro-cid-sz7xmlte><a href="/contacto" data-astro-cid-sz7xmlte>Contacto</a></li> </ul> </div> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Contacto</h4> <p data-astro-cid-sz7xmlte>Email: info@valcer.com</p> <p data-astro-cid-sz7xmlte>Tel: +51 123 456 789</p> </div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>&copy; 2026 Valcer. Todos los derechos reservados.</p> </div> </div> </footer> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$StaticHero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StaticHero;
  const { title, image, eager = true } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="page-hero"${addAttribute(title, "aria-label")} data-astro-cid-hd6wmb5x> <div class="page-hero-media" aria-hidden="true" data-astro-cid-hd6wmb5x> ${renderComponent($$result, "Image", $$Image, { "src": image, "alt": title, "class": "page-hero-img", "loading": eager ? "eager" : "lazy", "decoding": "async", "fetchpriority": eager ? "high" : "auto", "format": "avif", "widths": [640, 768, 1024, 1280, 1600, 1920], "sizes": "100vw", "data-astro-cid-hd6wmb5x": true })} </div> <div class="page-hero-overlay" aria-hidden="true" data-astro-cid-hd6wmb5x></div> <div class="page-hero-content" data-astro-cid-hd6wmb5x> <div class="container" data-astro-cid-hd6wmb5x> <h1 data-astro-cid-hd6wmb5x>${title}</h1> </div> </div> </section> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/hero/staticHero.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, heroTitle, heroImage, disableHero } = Astro2.props;
  return renderTemplate`<html lang="es" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">${maybeRenderHead()}<noscript><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet"></noscript>${renderComponent($$result, "ViewTransitions", $$ClientRouter, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-sckkx6r4": true })} ${!disableHero && heroTitle && heroImage && renderTemplate`${renderComponent($$result, "PageHero", $$StaticHero, { "title": heroTitle, "image": heroImage, "data-astro-cid-sckkx6r4": true })}`} ${renderSlot($$result, $$slots["hero"])} <main data-astro-cid-sckkx6r4${addAttribute(renderTransition($$result, "askmj6t7"), "data-astro-transition-scope")}> <!--<main transition:animate="slide">   Opcional: animación al cambiar --> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sckkx6r4": true })} </body></html>`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/layouts/Layout.astro", "self");

export { $$Layout as $ };
