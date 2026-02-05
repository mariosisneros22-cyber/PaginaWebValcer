import img1 from '../assets/images/index/hero/hero_1.jpg';   
import img2 from '../assets/images/index/hero/hero_2.jpg';
import img3 from '../assets/images/index/hero/hero_3.jpg';
import img4 from '../assets/images/index/hero/hero_4.jpg';

import about from '../assets/images/index/about.jpg';
import about2 from '../assets/images/index/about2.jpg';
import about3 from '../assets/images/index/about3.jpg';

export { about, about2, about3 };
export const heroImages = [img1, img2, img3, img4];
export const infoCards = [
  {
    title: "Años de experiencia",
    metric: "15+",
    content: "Más de una década desarrollando soluciones estables, escalables y adaptadas a las necesidades reales de cada cliente.",
    icon: '/icons/align-center-vertical.svg'
  },
  {
    title: "Proyectos entregados",
    metric: "120+",
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
  {
    title: "Presencia regional",
    metric: "8 regiones",
    content: "Colaboramos con clientes en distintos mercados, adaptándonos a contextos culturales y técnicos diversos.",
    icon: '/icons/battery-full.svg'
  }

];
// Define tus servicios aquí
export const infoServicios = [
  {
    id: 'construccion',
    title: 'Construcción Industrial',
    description: 'Especializados en proyectos de construcción industrial de gran escala. Contamos con más de 15 años de experiencia ejecutando proyectos que cumplen con los más altos estándares de calidad y seguridad. Nuestro equipo gestiona cada fase desde la planificación hasta la entrega final.',
    icon: 'construccion' as const,
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento Preventivo',
    description: 'Servicios de mantenimiento preventivo y correctivo para instalaciones industriales. Maximizamos la vida útil de tus equipos y minimizamos tiempos de inactividad mediante programas personalizados de mantenimiento que se adaptan a las necesidades específicas de tu operación.',
    icon: 'mantenimiento' as const,
  },
  {
    id: 'fabricacion',
    title: 'Fabricación de Estructuras',
    description: 'Fabricamos estructuras metálicas y componentes industriales de alta precisión. Utilizamos tecnología de punta y procesos certificados para garantizar productos que cumplen con especificaciones técnicas rigurosas y normativas internacionales de calidad.',
    icon: 'fabricacion' as const,
  },
  {
    id: 'consultoria',
    title: 'Consultoría Técnica',
    description: 'Asesoramiento especializado en optimización de procesos industriales, evaluación de proyectos y mejora continua. Nuestros consultores trabajan junto a tu equipo para identificar oportunidades de eficiencia y desarrollar soluciones técnicas innovadoras.',
    icon: 'consultoria' as const,
  }
];
