import { c as createComponent, m as maybeRenderHead, a as addAttribute, g as renderSlot, d as renderTemplate, e as createAstro } from './astro/server_DEPTrjPg.mjs';
import 'piccolore';
import 'clsx';

const $$Astro = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    href,
    variant = "primary",
    class: extraClass = "",
    type = "button",
    disabled = false
  } = Astro2.props;
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(`btn btn-${variant} ${extraClass}`, "class")}>${renderSlot($$result, $$slots["default"])}</a>` : renderTemplate`<button${addAttribute(type, "type")}${addAttribute(`btn btn-${variant} ${extraClass}`, "class")}${addAttribute(disabled, "disabled")}>${renderSlot($$result, $$slots["default"])}</button>`}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/ui/button.astro", void 0);

export { $$Button as $ };
