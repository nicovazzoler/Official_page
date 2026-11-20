// Si la persona pidió menos movimiento en su sistema, las animaciones quedan quietas.
export const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
