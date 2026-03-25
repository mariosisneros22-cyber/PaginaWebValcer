import imagetest from '../assets/images/nosotros/timeline/imagetest.jpg'
import img1 from '../assets/images/nosotros/timeline/img-1.jpg'
import img2 from '../assets/images/nosotros/timeline/img-2.jpg'
import img3 from '../assets/images/nosotros/timeline/img-3.jpg'
import img4 from '../assets/images/nosotros/timeline/img-4.jpg'
import img5 from '../assets/images/nosotros/timeline/img-5.jpg'
import img6 from '../assets/images/nosotros/timeline/img-6.jpg'
import type { ImageMetadata } from 'astro';

export type TimelineLayout = "intro" | "split" | "outro";

export interface TimelineItemData{
  id: number;
  year: string;
  datetime?: string;
  title: string;
  description: string;
  image?: ImageMetadata;
  imageAlt?: string;
  layout?: TimelineLayout;
  tagline?: string;
}

export const timelineData: TimelineItemData[] = [
  {
    id: 1,
    year: '2007',
    title: 'Inicio de operaciones',
    description: 'En octubre de 2007 iniciamos nuestras actividades, sentando las bases de lo que hoy es la empresa.',
    image: img1,
    imageAlt: 'Inicio de la empresa',
    layout: "intro",
  },
  {
    id: 2,
    year: '2008',
    title: 'Primera obra ejecutada',
    description: 'Desarrollamos nuestra primera obra, marcando el inicio de nuestra experiencia en proyectos.',
    image: img2,
    imageAlt: 'Primera obra',
  },
  {
    id: 3,
    year: '2014',
    title: 'Proyecto Carhuamayo',
    description: 'Ejecución del proyecto de mejoramiento vial y tratamiento paisajístico en Carhuamayo (Junín), consolidando nuestra presencia en obras de infraestructura.',
    image: img3,
    imageAlt: 'Proyecto Carhuamayo',
  },
  {
    id: 4,
    year: '2017',
    title: '10 años de trayectoria',
    description: 'Celebramos una década de crecimiento, consolidando experiencia y confianza en el sector.',
    image: img1,
    imageAlt: '10 años de la empresa',
  },
  {
    id: 5,
    year: '2021',
    title: 'Primera oficina en Lima',
    description: 'Abrimos nuestra oficina en Lima, fortaleciendo nuestra presencia y capacidad operativa.',
    image: img4,
    imageAlt: 'Oficina Lima',
  },
  {
    id: 6,
    year: '2023',
    title: 'Cambio de oficina en Lima',
    description: 'Trasladamos nuestra oficina a una nueva ubicación en Lima, optimizando nuestros espacios de trabajo.',
    image: img5,
    imageAlt: 'Nueva oficina Lima',
  },
  {
    id: 7,
    year: '2024',
    title: 'Proyecto Uchumarca',
    description: 'Ejecución de nuestro proyecto más grande: mejoramiento de la carretera departamental en Pasco, con una inversión significativa que marca un hito en nuestra historia.',
    image: img6,
    imageAlt: 'Proyecto Uchumarca',
  },
];

export const timelineDataSorted = [...timelineData].sort((a, b) => {
  const dy = Number(a.year) - Number(b.year);
  if (dy !== 0) return dy;
  return a.id - b.id; 
});