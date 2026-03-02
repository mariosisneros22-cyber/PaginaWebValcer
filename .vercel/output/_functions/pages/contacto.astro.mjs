import { c as createComponent, m as maybeRenderHead, a as addAttribute, r as renderComponent, b as renderScript, d as renderTemplate } from '../chunks/astro/server_DEPTrjPg.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_B3F6PsX_.mjs';
import { $ as $$Button } from '../chunks/button_B7UJg7TY.mjs';
/* empty css                                    */
import 'clsx';
export { renderers } from '../renderers.mjs';

const contactoHero = new Proxy({"src":"/_astro/industria.D-UAh4Hh.jpg","width":5508,"height":4389,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/ttt/Paginaweb/LandingPage/super-shell/src/assets/images/contacto/contactoHero.jpg";
							}
							
							return target[name];
						}
					});

const $$ContactForm = createComponent(async ($$result, $$props, $$slots) => {
  const WEB3FORMS_KEY = "7c5e0c4d-2a3a-47c3-9723-54411bc0914a";
  return renderTemplate`${maybeRenderHead()}<div class="contact-form" data-astro-cid-7ztdzczf> <h3 data-astro-cid-7ztdzczf> Solicita informacion</h3> <form id="contact-form" action="https://api.web3forms.com/submit" method="POST" data-astro-cid-7ztdzczf> <input type="hidden" name="access_key"${addAttribute(WEB3FORMS_KEY, "value")} data-astro-cid-7ztdzczf> <input type="hidden" name="subject" value="Nuevo mensaje desde la web" data-astro-cid-7ztdzczf> <input type="hidden" name="from_name" value="Valcer Web" data-astro-cid-7ztdzczf> <input type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off" data-astro-cid-7ztdzczf> <!-- Nombre + Apellidos --> <div class="field-row" data-astro-cid-7ztdzczf> <div class="field" data-astro-cid-7ztdzczf> <label for="name" data-astro-cid-7ztdzczf>Nombre</label> <input id="name" name="name" type="text" required data-astro-cid-7ztdzczf> </div> <div class="field" data-astro-cid-7ztdzczf> <label for="last_name" data-astro-cid-7ztdzczf>Apellidos</label> <input id="last_name" name="last_name" type="text" required data-astro-cid-7ztdzczf> </div> </div> <!-- RUC / DNI --> <div class="field-row" data-astro-cid-7ztdzczf> <div class="field" data-astro-cid-7ztdzczf> <label for="doc_type" data-astro-cid-7ztdzczf>Documento</label> <select id="doc_type" name="doc_type" required data-astro-cid-7ztdzczf> <option value="DNI" data-astro-cid-7ztdzczf>DNI</option> <option value="RUC" data-astro-cid-7ztdzczf>RUC</option> </select> </div> <div class="field" data-astro-cid-7ztdzczf> <label for="doc_number" data-astro-cid-7ztdzczf>N° Documento</label> <input id="doc_number" name="doc_number" type="text" inputmode="numeric" autocomplete="off" placeholder="8 dígitos (DNI) / 11 dígitos (RUC)" required data-astro-cid-7ztdzczf> </div> </div> <!-- Correo + Telefono --> <div class="field-row" data-astro-cid-7ztdzczf> <div class="field" data-astro-cid-7ztdzczf> <label for="email" data-astro-cid-7ztdzczf>Correo</label> <input id="email" name="email" type="email" required data-astro-cid-7ztdzczf> </div> <div class="field" data-astro-cid-7ztdzczf> <label for="phone" data-astro-cid-7ztdzczf>Telefono</label> <input id="phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="Ej: 999988721" data-astro-cid-7ztdzczf> </div> </div> <!-- Mensaje --> <div class="field" data-astro-cid-7ztdzczf> <label for="message" data-astro-cid-7ztdzczf>Mensaje</label> <textarea id="message" name="message" rows="6" required data-astro-cid-7ztdzczf></textarea> </div> <div class="form-actions" data-astro-cid-7ztdzczf> ${renderComponent($$result, "Button", $$Button, { "type": "submit", "class": "submit-btn", "data-astro-cid-7ztdzczf": true }, { "default": async ($$result2) => renderTemplate`
Enviar
` })} </div> <div id="form-message" class="form-message" aria-live="polite" data-astro-cid-7ztdzczf></div> </form> <dialog id="contact-modal" class="contact-modal" aria-labelledby="contact-modal-title" data-astro-cid-7ztdzczf> <div class="modal-card" data-astro-cid-7ztdzczf> <h4 id="contact-modal-title" data-astro-cid-7ztdzczf>Mensaje</h4> <p id="contact-modal-text" data-astro-cid-7ztdzczf>Se envio correctamente el mensaje a VALCER </p> <div class="modal-actions" data-astro-cid-7ztdzczf> <button type="button" id="contact-modal-ok" class="btn btn-primary btn-sm" data-astro-cid-7ztdzczf>
OK
</button> </div> </div> </dialog> </div>  ${renderScript($$result, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/contacto/ContactForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/contacto/ContactForm.astro", void 0);

const $$ContactInfo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="info-block" data-astro-cid-zvtih34t> <h3 data-astro-cid-zvtih34t>Contactanos</h3> <dl class="info-list" data-astro-cid-zvtih34t> <div class="info-row" data-astro-cid-zvtih34t> <dt data-astro-cid-zvtih34t>Dirección:</dt> <dd data-astro-cid-zvtih34t>Calle Falsa 123, Ciudad</dd> </div> <div class="info-row" data-astro-cid-zvtih34t> <dt data-astro-cid-zvtih34t>Teléfono:</dt> <dd data-astro-cid-zvtih34t>+52 123 456 7890</dd> </div> <div class="info-row" data-astro-cid-zvtih34t> <dt data-astro-cid-zvtih34t>Email:</dt> <dd data-astro-cid-zvtih34t>contacto@ejemplo.com</dd> </div> <div class="info-row" data-astro-cid-zvtih34t> <dt data-astro-cid-zvtih34t>Horario:</dt> <dd data-astro-cid-zvtih34t> <div data-astro-cid-zvtih34t>Lunes a Viernes: 9:00 - 18:00</div> <div data-astro-cid-zvtih34t>Sábados: 9:00 - 13:00</div> </dd> </div> </dl> <div class="social" data-astro-cid-zvtih34t> <a class="social-link" href="#" aria-label="Instagram" data-astro-cid-zvtih34t> <!-- SVG Instagram --> <svg viewBox="0 0 24 24" width="22" height="22" role="img" aria-hidden="true" data-astro-cid-zvtih34t> <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.2-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z" data-astro-cid-zvtih34t></path> </svg> </a> <a class="social-link" href="#" aria-label="Facebook" data-astro-cid-zvtih34t> <!-- SVG Facebook --> <svg viewBox="0 0 24 24" width="22" height="22" role="img" aria-hidden="true" data-astro-cid-zvtih34t> <path d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.3-1.6 1.7-1.6h1.4V4.8c-.2 0-1.1-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.9V11H8v3h2.3v8h3.2z" data-astro-cid-zvtih34t></path> </svg> </a> <a class="social-link" href="#" aria-label="LinkedIn" data-astro-cid-zvtih34t> <!-- SVG LinkedIn --> <svg viewBox="0 0 24 24" width="22" height="22" role="img" aria-hidden="true" data-astro-cid-zvtih34t> <path d="M6.5 6.8A1.9 1.9 0 1 1 6.5 3a1.9 1.9 0 0 1 0 3.8zM5 21h3V9H5v12zm5.5-12h2.9v1.6h.04c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.9V21h-3v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-3V9z" data-astro-cid-zvtih34t></path> </svg> </a> </div> </div> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/contacto/ContactInfo.astro", void 0);

const $$ContactMap = createComponent(($$result, $$props, $$slots) => {
  const MAP_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.2611897473507!2d-77.0300987!3d-12.094263300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8665147d66b%3A0xc7638c414bc0b012!2sCa.%20Coronel%20Andr%C3%A9s%20Reyes%20175%2C%20San%20Isidro%2015046!5e0!3m2!1ses-419!2spe!4v1770933644467!5m2!1ses-419!2spe";
  return renderTemplate`${maybeRenderHead()}<div class="map-block" aria-label="Mapa de ubicación" data-astro-cid-5urc7wtv> <iframe class="map-iframe"${addAttribute(MAP_SRC, "src")} loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen title="Ubicación de la empresa" data-astro-cid-5urc7wtv></iframe> </div> `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/components/sections/contacto/ContactMap.astro", void 0);

const $$Contacto = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Valcer - Contacto", "heroTitle": "Contacto", "heroImage": contactoHero, "data-astro-cid-2mxdoeuz": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="section" data-astro-cid-2mxdoeuz> <div class="container contact-grid" data-astro-cid-2mxdoeuz> ${renderComponent($$result2, "ContactForm", $$ContactForm, { "data-astro-cid-2mxdoeuz": true })} ${renderComponent($$result2, "ContactInfo", $$ContactInfo, { "data-astro-cid-2mxdoeuz": true })} </div> <div class="map-wrap" data-astro-cid-2mxdoeuz> <div class="container" data-astro-cid-2mxdoeuz> ${renderComponent($$result2, "ContactMap", $$ContactMap, { "data-astro-cid-2mxdoeuz": true })} </div> </div> </section>  ` })} `;
}, "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/contacto.astro", void 0);

const $$file = "D:/ttt/Paginaweb/LandingPage/super-shell/src/pages/contacto.astro";
const $$url = "/contacto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Contacto,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
