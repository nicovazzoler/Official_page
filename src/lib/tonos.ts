// Tonos del fondo: cada zona de la página lleva data-fondo y data-brillo, y
// scripts/ambiente.ts los aplica cuando la zona cruza la mitad de la pantalla.

const NAVY = '#060E1E';

type Zona = { 'data-fondo': string; 'data-brillo': string };

const zona = (fondo: string, brillo: string): Zona => ({ 'data-fondo': fondo, 'data-brillo': brillo });

export const tonos = {
  negro: zona('#030405', 'rgb(212 238 94 / 0.05)'),
  navy: zona(NAVY, 'rgb(60 110 230 / 0.16)'),
  turquesa: zona('#04111A', 'rgb(94 234 212 / 0.15)'),
};

// Un proyecto tiñe apenas el navy con su color y lo usa entero para el brillo.
export function tonoDeProyecto(color: string): Zona {
  return zona(mezclar(color, NAVY, 0.05), conAlfa(color, 0.16));
}

function canales(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

// t es cuánto del primer color entra en la mezcla (0 a 1).
function mezclar(a: string, b: string, t: number): string {
  const ca = canales(a);
  const cb = canales(b);
  return '#' + ca.map((v, i) => Math.round(v * t + cb[i] * (1 - t)).toString(16).padStart(2, '0')).join('');
}

function conAlfa(hex: string, alfa: number): string {
  return `rgb(${canales(hex).join(' ')} / ${alfa})`;
}
