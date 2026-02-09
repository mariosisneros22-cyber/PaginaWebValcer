export type PilarDirection = 'left' | 'right' | 'up' |'down';

export interface PilarData{
  title: string;
  text: string;
  color?: string;
  direction?:PilarDirection;
}

export const valPilar: PilarData[] = [
  {
    title: 'Seguridad',
    text: 'Trabajamos bajo losmás altos estándares de seguridad industrial.',
    color: '#0f172a',
    direction: 'left',
  },
  {
    title: 'Calidad',
    text: 'Garantizamos procesos certificados y resultados consistentes.',
    color: '#1d4ed8',
    direction: 'right',
  },
  {
    title: 'Cumplimiento',
    text: 'Cunplimos plazos, normativas y compromisos asumidos.',
    color: '#15803d',
    direction: 'up',
  }
];