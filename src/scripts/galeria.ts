// Conecta puntos, flechas y contador de cada galería con el desplazamiento del carril.
import { quieto } from '../lib/movimiento';

for (const galeria of document.querySelectorAll<HTMLElement>('.galeria')) {
  const carril = galeria.querySelector<HTMLElement>('.carril');
  const slides = carril ? [...carril.children] as HTMLElement[] : [];
  if (!carril || slides.length < 2) continue;

  const puntos = [...galeria.querySelectorAll<HTMLButtonElement>('.punto')];
  const anterior = galeria.querySelector<HTMLButtonElement>('[data-ir="-1"]');
  const siguiente = galeria.querySelector<HTMLButtonElement>('[data-ir="1"]');
  const contador = galeria.querySelector('.contador');
  const total = slides.length;

  // En el celu cada diapositiva mide menos que el carril, así que el paso se mide entre dos.
  const paso = () => slides[1].offsetLeft - slides[0].offsetLeft;
  let actual = 0;

  const marcar = (i: number) => {
    if (i === actual) return;
    actual = i;
    puntos.forEach((p, j) => p.setAttribute('aria-current', String(j === i)));
    if (contador) contador.textContent = `${i + 1} / ${total}`;
    if (anterior) anterior.disabled = i === 0;
    if (siguiente) siguiente.disabled = i === total - 1;
  };
  const ir = (i: number) => carril.scrollTo({ left: i * paso(), behavior: quieto ? 'auto' : 'smooth' });

  carril.addEventListener('scroll', () => marcar(Math.min(total - 1, Math.round(carril.scrollLeft / paso()))), { passive: true });
  puntos.forEach((p, i) => p.addEventListener('click', () => ir(i)));
  anterior?.addEventListener('click', () => ir(Math.max(0, actual - 1)));
  siguiente?.addEventListener('click', () => ir(Math.min(total - 1, actual + 1)));
}
