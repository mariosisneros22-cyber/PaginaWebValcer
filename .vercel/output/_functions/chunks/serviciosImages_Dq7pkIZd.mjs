const servicios = [
	{
		id: "construccion-infraestructura",
		title: "Construcción e \nInfraestructura",
		tagline: "Ejecución integral de obras con control de calidad, plazo y seguridad.",
		items: [
			"Ejecución de obras civiles",
			"Obras urbanas y edificaciones",
			"Obras viales, puertos y afines",
			"Represas e irrigaciones",
			"Saneamiento básico"
		],
		imageKey: "construccion",
		projectsCtaLabel: "Ver proyectos"
	},
	{
		id: "ingenieria-consultoria",
		title: "Ingeniería y \nConsultoría",
		tagline: "Supervisión, control y gestión técnica para proyectos públicos y privados.",
		items: [
			"Supervisión de obras civiles",
			"Consultoría técnica",
			"Formulación de proyectos",
			"Evaluación de inversión pública y privada"
		],
		imageKey: "ingenieria",
		projectsCtaLabel: "Ver proyectos"
	},
	{
		id: "maquinaria-logistica",
		title: "Maquinaria y \nLogística",
		tagline: "Flota operativa para soporte de obra y transporte de carga.",
		items: [
			"Alquiler de maquinaria pesada",
			"Alquiler de maquinaria liviana",
			"Transporte de carga por carretera"
		],
		imageKey: "maquinaria",
		projectsCtaLabel: "Ver proyectos"
	},
	{
		id: "industria-mineria",
		title: "Industria y \nMinería",
		tagline: "Mantenimiento industrial y trabajos en mina con estándares de seguridad.",
		items: [
			"Mantenimiento y reparación de plantas",
			"Trabajos en mina",
			"Servicios generales"
		],
		imageKey: "industria",
		projectsCtaLabel: "Ver proyectos"
	}
];

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

export { getServiceImageByKey as g, servicios as s };
