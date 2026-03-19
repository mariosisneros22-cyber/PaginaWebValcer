// Consolidated homepage content and assets
// This file replaces exportContent.ts and indexImage.ts

import img1 from '../assets/images/index/hero/hero_1.jpg';   
import img2 from '../assets/images/index/hero/hero_2.jpg';
import img3 from '../assets/images/index/hero/hero_3.jpg';
import img4 from '../assets/images/index/hero/hero_4.jpg';

import about from '../assets/images/index/about.jpg';

// Hero images for slider
export const heroImages = [img1, img2, img3, img4];

// About section image
export { about };

// Info sliders for about section
export const infoSliders = [
  {
    title: "Años de experiencia",
    metric: "15+",
    content: "Más de una década desarrollando soluciones estables, escalables y adaptadas a las necesidades reales de cada cliente.",
    icon: '/icons/align-center-vertical.svg'
  },
  {
    title: "Proyectos entregados",
    metric: "20+",
    content: "Hemos participado en proyectos de distintas industrias, cumpliendo plazos y manteniendo altos estándares de calidad.",
    icon: '/icons/anchor.svg'
  },
  {
    title: "Satisfacción del cliente",
    metric: "98%",
    content: "Nuestro enfoque está centrado en relaciones a largo plazo, priorizando resultados medibles y comunicación constante.",
    icon: '/icons/archive-box.svg'
  },
  {
    title: "Equipo especializado",
    metric: "25+",
    content: "Contamos con un equipo multidisciplinario de profesionales comprometidos con la mejora continua y la innovación.",
    icon: '/icons/baseball.svg'
  },
];
