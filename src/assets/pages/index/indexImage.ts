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
// Define tus servicios aquí
export const infoServicios = [
  {
    id: 'construccion',
    title: 'Construcción Industrial',
    description: 'Especializados en proyectos de construcción industrial de gran escala. Contamos con más de 15 años de experiencia ejecutando proyectos que cumplen con los más altos estándares de calidad y seguridad. Nuestro equipo gestiona cada fase desde la planificación hasta la entrega final.',
    icon: 'construccion' as const,
    image: about
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento Preventivo',
    description: 'Servicios de mantenimiento preventivo y correctivo para instalaciones industriales. Maximizamos la vida útil de tus equipos y minimizamos tiempos de inactividad mediante programas personalizados de mantenimiento que se adaptan a las necesidades específicas de tu operación.',
    icon: 'mantenimiento' as const,
    image: about
  },
  {
    id: 'fabricacion',
    title: 'Fabricación de Estructuras',
    description: 'Fabricamos estructuras metálicas y componentes industriales de alta precisión. Utilizamos tecnología de punta y procesos certificados para garantizar productos que cumplen con especificaciones técnicas rigurosas y normativas internacionales de calidad.',
    icon: 'fabricacion' as const,
    image: about
  },
  {
    id: 'consultoria',
    title: 'Consultoría Técnica',
    description: 'Asesoramiento especializado en optimización de procesos industriales, evaluación de proyectos y mejora continua. Nuestros consultores trabajan junto a tu equipo para identificar oportunidades de eficiencia y desarrollar soluciones técnicas innovadoras.',
    icon: 'consultoria' as const,
    image: about
  }
];
