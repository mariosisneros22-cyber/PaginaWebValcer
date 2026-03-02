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

export { about as a, heroImages as h, infoSliders as i };
