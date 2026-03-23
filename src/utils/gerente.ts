import gerenteGeneralPhoto from "../assets/images/nosotros/gerentes/gerente.jpg";
import gerenteOperacionesPhoto from "../assets/images/nosotros/gerentes/gerente.jpg";
import gerenteComercialPhoto from "../assets/images/nosotros/gerentes/gerente.jpg";

export const gerentes = [
  {
    name: "Gerencia General",
    role: "Direccion ejecutiva",
    message:
      "Creemos en hacer bien el trabajo desde el inicio, con orden, compromiso y responsabilidad. Cada proyecto representa una oportunidad para responder con criterio tecnico, cumplir nuestra palabra y construir relaciones de confianza sostenibles con cada cliente.",
    photo: gerenteGeneralPhoto,
    alt: "Gerente general",
  },
  {
    name: "Gerencia de Operaciones",
    role: "Ejecucion y control",
    message:
      "Nuestra prioridad es sostener una ejecucion ordenada, segura y verificable. Trabajamos para que cada frente avance con claridad tecnica, coordinacion y foco en el cumplimiento real.",
    photo: gerenteOperacionesPhoto,
    alt: "Gerente de operaciones",
  },
  {
    name: "Gerencia Comercial",
    role: "Relacion con clientes",
    message:
      "Buscamos relaciones de largo plazo basadas en confianza, respuesta oportuna y entendimiento del contexto de cada cliente. Mas que prometer, nos interesa cumplir con consistencia.",
    photo: gerenteComercialPhoto,
    alt: "Gerente comercial",
  },
] as const;
