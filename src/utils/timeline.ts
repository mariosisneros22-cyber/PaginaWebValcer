import imagetest from '../assets/images/nosotros/nosotrosHero.jpg'
import type { ImageMetadata } from 'astro';

export type TimelineLayout = "intro" | "right";
export interface TimelineItemData{
  id: number;
  year: string;
  datetime?: string;
  title: string;
  description: string;
  image?: ImageMetadata;
  imageAlt?: string;
  layout?: string;

}

export const timelineData: TimelineItemData[] =[
  {
    id: 1,
    year: '2000',
    title: 'Fundación de la empresa',
    description: 'Iniciamos con el objetivo de brnidar  soluciones industriales seguras y eficientes',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
    layout: "intro",
  },
  {
    id: 2,
    year: '2010',
    title: 'Primer gran proyecto',
    description: 'Ejecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidad.',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },
  {
    id: 3,
    year: '2023',
    title: 'Expansión regional',
    description: 'Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },
  {
    id: 4,
    year: '2007',
    title: 'Fundación de la empresa',
    description: 'Iniciamos con el objetivo de brnidar  soluciones industriales seguras y eficientes',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },
  {
    id: 5,
    year: '2010',
    title: 'Primer gran proyecto',
    description: 'Ejecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidad.Ejecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidadEjecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidadEjecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidadEjecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidad',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },
  {
    id: 6,
    year: '2023',
    title: 'Expansión regional',
    description: 'Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento. Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },
  {
    id: 7,
    year: '2007',
    title: 'Fundación de la empresa',
    description: 'Iniciamos con el objetivo de brnidar  soluciones industriales seguras y eficientes',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },
  {
    id: 8,
    year: '2010',
    title: 'Primer gran proyecto',
    description: 'Ejecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidad.',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },
  {
    id: 9,
    year: '2023',
    title: 'Expansión regional',
    description: 'Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },
  {
    id: 10,
    year: '2007',
    title: 'Fundación de la empresa',
    description: 'Iniciamos con el objetivo de brnidar  soluciones industriales seguras y eficientes',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },
  {
    id: 11,
    year: '2010',
    title: 'Primer gran proyecto',
    description: 'Ejecutamos nuestro primer proyecto de gran escala cumpliendo altos estándares de calidad.',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },
  {
    id: 12,
    year: '2023',
    title: 'Expansión regional',
    description: 'Ampliamos nuestras operaciones a nuevas regiones, consolidando nuestro crecimiento.',
    image: imagetest,
    imageAlt: 'Fundación de la empresa',
  },

]

export const timelineDataSorted = [...timelineData].sort((a, b) => {
  const dy = Number(a.year) - Number(b.year);
  if (dy !== 0) return dy;
  return a.id - b.id; 
});