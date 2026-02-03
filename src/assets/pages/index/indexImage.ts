import img1 from './hero/hero_1.jpg';   
import img2 from './hero/hero_2.jpg';
import img3 from './hero/hero_3.jpg';

import about from './about.jpg';
import about2 from './about2.jpg';
import about3 from './about3.jpg';
export { about };
export const heroImages = [img1, img2, img3];
export const aboutCards = [
  {
    title: "¿Quiénes somos?",
    content: "VALCER es una empresa líder en servicios industriales y construcción, dedicada a ofrecer soluciones integrales con los más altos estándares de calidad y seguridad.",
    image: about,
  },
  {
    title: "Experiencia",
    content: "Con más de 15 años en el sector, hemos completado proyectos de alta complejidad en minería, construcción y manufactura, consolidándonos como referentes del mercado.",
    image: about2,
  },
  {
    title: "Proyectos realizados",
    content: "Hemos ejecutado exitosamente más de 100 proyectos para empresas líderes en diversos sectores industriales, manteniendo un 98% de satisfacción del cliente.",
    image: about3,
  },
];
