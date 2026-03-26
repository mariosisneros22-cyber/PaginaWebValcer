export type PilarDirection = 'left' | 'right' | 'up' |'down';
export type PilarAlign = 'left' | 'right';

export interface ValorData {
  title: string;
  principle: string; // 1 línea fuerte
  body: string;      // “en la práctica”
  icon: string;
}

export const valores: ValorData[] = [
  {
    title: "Trabajo en equipo y motivación",
    principle: "La coordinación genera resultados superiores.",
    body: "Cooperamos y conjugamos tareas para alcanzar objetivos comunes, promoviendo compromiso, comunicación y cohesión operativa.",
    icon: "/icons/team.svg"
  },
  {
    title: "Responsabilidad corporativa empresarial",
    principle: "Cada acción tiene impacto.",
    body: "Actuamos con responsabilidad social, valorando el impacto de nuestras decisiones en comunidades, trabajadores y medio ambiente.",
    icon: "/icons/business.svg"
  },
  {
    title: "Excelencia e innovación",
    principle: "Mejora continua como estándar.",
    body: "Buscamos la excelencia en cada acción, optimizando procesos con eficiencia y eficacia para cumplir objetivos con alto rendimiento.",
    icon: "/icons/excellence.svg"
  },
  {
    title: "Entrega de resultados",
    principle: "El compromiso se demuestra en la ejecución.",
    body: "Contamos con un equipo calificado y capacitado, orientado a cumplir con entregables verificables y metas en tiempo y forma.",
    icon: "/icons/results.svg"
  }
];