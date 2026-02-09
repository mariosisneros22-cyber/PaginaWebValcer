export type PilarDirection = 'left' | 'right' | 'up' |'down';
export type PilarAlign = 'left' | 'right';

export interface PilarData{
  title: string;
  text: string;
  color?: string;
  direction?:PilarDirection;
  align?: PilarAlign;
  offsetx? : number;
}

export const valPilar: PilarData[] = [
  {
    title: 'Seguridad',
    text: 'Trabajamos bajo losmás altos estándares de seguridad industrial.',
    color: '#e9efff',
    direction: 'right',
    align: 'left',
    offsetx: 40,
  },
  {
    title: 'Calidad',
    text: 'Garantizamos procesos certificados y resultados consistentes.',
    color: '#c8d8ff',
    direction: 'left',
    align: 'right',
    offsetx: -35,
  },
  {
    title: 'Cumplimiento',
    text: 'Cunplimos plazos, normativas y compromisos asumidos.',
    color: 'rgb(180, 201, 255)',
    direction: 'right',
    align: 'left',
    offsetx: 30,
  }
];