import { c as createComponent, m as maybeRenderHead, d as renderTemplate, r as renderComponent, e as createAstro } from './astro/server_DEPTrjPg.mjs';
import 'piccolore';
import { $ as $$Button } from './button_B7UJg7TY.mjs';
/* empty css                         */

const $$Astro = createAstro();
const $$ServiceIntro = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ServiceIntro;
  const {
    title = "Soluciones Integrales para tu Proyecto",
    description = "En Valcer, ofrecemos servicios especializados que combinan experiencia de m\xE1s de 15 a\xF1os, est\xE1ndares internacionales de calidad y un equipo dedicado a tu \xE9xito.",
    buttonHref,
    buttonLabel = "Ver nuestros servicios"
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
  return renderTemplate`${maybeRenderHead()}<section class="section " data-astro-cid-nizysu5r> <div class="container" data-astro-cid-nizysu5r> <div class="intro-header" data-astro-cid-nizysu5r> <h1 class="intro-title" data-astro-cid-nizysu5r>${title}</h1> <p class="intro-description" data-astro-cid-nizysu5r>${description}</p> </div> <div class="advantages-grid" data-astro-cid-nizysu5r> ${advantages.map((advantage) => renderTemplate`<div class="advantage-card" data-astro-cid-nizysu5r> <div class="advantage-icon" data-astro-cid-nizysu5r>${advantage.icon}</div> <h3 class="advantage-title" data-astro-cid-nizysu5r>${advantage.title}</h3> <p class="advantage-description" data-astro-cid-nizysu5r>${advantage.description}</p> </div>`)} </div> <div class="intro-cta" data-astro-cid-nizysu5r> <p data-astro-cid-nizysu5r>Cada proyecto es único. Contamos con soluciones personalizadas para tus necesidades específicas.</p> </div> ${buttonHref && renderTemplate`<div class="button-mid" data-astro-cid-nizysu5r> ${renderComponent($$result, "Button", $$Button, { "href": buttonHref, "data-astro-cid-nizysu5r": true }, { "default": ($$result2) => renderTemplate`${buttonLabel}` })} </div>`} </div></section> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/servicios/ServiceIntro.astro", void 0);

export { $$ServiceIntro as $ };
