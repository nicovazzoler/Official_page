// Esfera de puntos detrás del robot: respira y gira lento, con los colores del robot.
// Solo se anima mientras está en pantalla; con movimiento reducido queda quieta.
import { quieto } from '../lib/movimiento';

const lienzo = document.getElementById('malla');

if (lienzo instanceof HTMLCanvasElement) {
  const ctx = lienzo.getContext('2d');
  if (ctx) iniciar(lienzo, ctx);
}

function iniciar(lienzo: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const paleta = ['#DDB35C', '#86B6F2', '#C9C6BA', '#4FCDB4', '#D4EE5E'];

  // Puntos repartidos parejo sobre la esfera (espiral de Fibonacci).
  const N = 900;
  const oro = Math.PI * (3 - Math.sqrt(5));
  const puntos = Array.from({ length: N }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / N;
    const r = Math.sqrt(1 - y * y);
    return { x: Math.cos(i * oro) * r, y, z: Math.sin(i * oro) * r, color: paleta[(i * 7) % paleta.length] };
  });

  let ancho = 0;
  let alto = 0;
  function medir() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    ancho = lienzo.clientWidth;
    alto = lienzo.clientHeight;
    lienzo.width = ancho * dpr;
    lienzo.height = alto * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function dibujar(t: number) {
    ctx.clearRect(0, 0, ancho, alto);
    const R = ancho * 0.4;
    const giro = t * 0.00012;
    const cg = Math.cos(giro), sg = Math.sin(giro);
    const ci = Math.cos(0.38), si = Math.sin(0.38); // inclinación fija
    for (const p of puntos) {
      // La deformación suave es lo que la hace "respirar".
      const d = 1 + 0.09 * Math.sin(3 * p.x + t * 0.0006) * Math.cos(2 * p.y + t * 0.0004) + 0.05 * Math.sin(4 * p.z - t * 0.0005);
      const x = p.x * d, y = p.y * d, z = p.z * d;
      const x1 = x * cg - z * sg, z1 = x * sg + z * cg;
      const y2 = y * ci - z1 * si, z2 = y * si + z1 * ci;
      const perspectiva = 3 / (3 - z2);
      const cerca = (z2 + 1) / 2; // 0 atrás, 1 adelante
      ctx.globalAlpha = 0.06 + 0.5 * cerca * cerca;
      ctx.fillStyle = p.color;
      const lado = 0.7 + 1.3 * cerca;
      ctx.fillRect(ancho / 2 + x1 * R * perspectiva, alto / 2 + y2 * R * perspectiva, lado, lado);
    }
    ctx.globalAlpha = 1;
  }

  medir();
  addEventListener('resize', () => {
    medir();
    if (quieto) dibujar(0);
  });
  if (quieto) {
    dibujar(0);
    return;
  }

  let cuadro = 0;
  const animar = (t: number) => {
    dibujar(t);
    cuadro = requestAnimationFrame(animar);
  };
  new IntersectionObserver(([e]) => {
    cancelAnimationFrame(cuadro);
    if (e.isIntersecting) cuadro = requestAnimationFrame(animar);
  }).observe(lienzo);
}
