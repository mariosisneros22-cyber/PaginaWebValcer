// Consolidated homepage content and assets
// This file replaces exportContent.ts and indexImage.ts

import img1 from '../assets/images/index/hero/hero_1.jpg';   
import img2 from '../assets/images/index/hero/hero_2.jpg';
import img3 from '../assets/images/index/hero/hero_3.jpg';
import img4 from '../assets/images/index/hero/hero_4.jpg';

import about from '../assets/images/index/about.jpg';
import about2 from '../assets/images/index/about2.jpg';
import about3 from '../assets/images/index/about3.jpg';

// Hero images for slider
export const heroImages = [img1, img2, img3, img4];

// About section image
export { about };

// Service tabs for homepage
export const serviceTabs = [
  {
    id:'1',
    label: 'Proveedor de Bienes',
    title: 'Proveedor de Bienes',
    description: 'Descripción del servicio de Proveedor de Bienes.',
    points: [
      'Provisión de materiales de alta calidad para proyectos industriales.',
      'Amplia red de proveedores confiables y certificados.',
      'Logística eficiente para entrega oportuna.'
    ],
    image: about
  },
  {
    id:'2',
    label: 'Ejecutor de Obras',
    title: 'Ejecutor de Obras',
    description: 'Descripción del servicio de Ejecutor de Obras.',
    points:[
      'Gestión integral de proyectos de construcción industrial.',
      'Equipo especializado en diversas disciplinas de la construcción.',
      'Cumplimiento estricto de normativas de seguridad y calidad.'
    ],
    image: about2
  },
  {
    id:'3',
    label: 'Consultor de Obras',
    title: 'Consultor de Obras',
    description: 'Descripción del servicio de Consultor de Obras.',
    points:[
      'Asesoramiento experto en planificación y ejecución de proyectos.',
      'Evaluación de riesgos y optimización de recursos.',
      'Soluciones personalizadas para cada etapa del proyecto.'
    ],
    image: about3
  },
  {
    id:'4',
    label: 'Servicios generales',
    title: 'Servicios Generales',
    description: 'Descripción del servicio de Servicios Generales.',
    points:[
      'Mantenimiento preventivo y correctivo de instalaciones.',
      'Servicios de limpieza y desinfección especializada.',
      'Asistencia técnica en operaciones industriales.'
    ],
    image: about
  }
];

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
