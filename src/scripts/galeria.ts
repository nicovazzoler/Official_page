// Cada galería: puntos, flechas y epígrafe siguen al carril; tocar una captura la abre en el visor.
import { quieto } from '../lib/movimiento';

for (const galeria of document.querySelectorAll<HTMLElement>('.galeria')) {
  const carril = galeria.querySelector<HTMLElement>('.carril');
  if (!carril) continue;
  const slides = [...carril.children] as HTMLElement[];
  const botones = [...galeria.querySelectorAll<HTMLButtonElement>('.ampliar')];
  const total = slides.length;

  // Las diapositivas no miden todas igual (compu, celu, ticket): se navega por la posición de cada una.
  const posicion = (i: number) => slides[i].offsetLeft - slides[0].offsetLeft;
  const ir = (i: number) => carril.scrollTo({ left: posicion(i), behavior: quieto ? 'auto' : 'smooth' });

  conectarControles(galeria, carril, botones, total, posicion, ir);
  conectarVisor(galeria, botones, total, ir);
}

function conectarControles(
  galeria: HTMLElement,
  carril: HTMLElement,
  botones: HTMLButtonElement[],
  total: number,
  posicion: (i: number) => number,
  ir: (i: number) => void,
) {
  if (total < 2) return;
  const puntos = [...galeria.querySelectorAll<HTMLButtonElement>('.punto')];
  const anterior = galeria.querySelector<HTMLButtonElement>('[data-ir="-1"]');
  const siguiente = galeria.querySelector<HTMLButtonElement>('[data-ir="1"]');
  const contador = galeria.querySelector('.contador');
  const nombre = galeria.querySelector('.nombre-captura');
  let actual = 0;

  const marcar = (i: number) => {
    if (i === actual) return;
    actual = i;
    puntos.forEach((p, j) => p.setAttribute('aria-current', String(j === i)));
    if (contador) contador.textContent = `${i + 1} / ${total}`;
    if (nombre) nombre.textContent = botones[i].dataset.epigrafe ?? '';
    if (anterior) anterior.disabled = i === 0;
    if (siguiente) siguiente.disabled = i === total - 1;
  };

  // La actual es la más cercana al borde izquierdo; al llegar al final del carril, la última.
  const cercana = () => {
    if (carril.scrollLeft >= carril.scrollWidth - carril.clientWidth - 2) return total - 1;
    let mejor = 0;
    for (let i = 1; i < total; i++) {
      if (Math.abs(posicion(i) - carril.scrollLeft) < Math.abs(posicion(mejor) - carril.scrollLeft)) mejor = i;
    }
    return mejor;
  };
  carril.addEventListener('scroll', () => marcar(cercana()), { passive: true });
  puntos.forEach((p, i) => p.addEventListener('click', () => ir(i)));
  anterior?.addEventListener('click', () => ir(Math.max(0, actual - 1)));
  siguiente?.addEventListener('click', () => ir(Math.min(total - 1, actual + 1)));
}

function conectarVisor(galeria: HTMLElement, botones: HTMLButtonElement[], total: number, ir: (i: number) => void) {
  const visor = galeria.querySelector<HTMLDialogElement>('.visor');
  const foto = visor?.querySelector<HTMLImageElement>('.visor-foto');
  const epigrafe = visor?.querySelector('.visor-epigrafe');
  if (!visor || !foto || !epigrafe) return;
  const anterior = visor.querySelector<HTMLButtonElement>('[data-visor="-1"]');
  const siguiente = visor.querySelector<HTMLButtonElement>('[data-visor="1"]');
  let abierta = 0;

  const mostrar = (i: number) => {
    abierta = i;
    const boton = botones[i];
    foto.src = boton.dataset.grande ?? '';
    foto.alt = boton.querySelector('img')?.alt ?? '';
    epigrafe.textContent = total > 1 ? `${boton.dataset.epigrafe} · ${i + 1} / ${total}` : (boton.dataset.epigrafe ?? '');
    if (anterior) anterior.disabled = i === 0;
    if (siguiente) siguiente.disabled = i === total - 1;
  };
  const mover = (d: number) => mostrar(Math.min(total - 1, Math.max(0, abierta + d)));

  botones.forEach((b, i) =>
    b.addEventListener('click', () => {
      mostrar(i);
      visor.showModal();
    }),
  );
  anterior?.addEventListener('click', () => mover(-1));
  siguiente?.addEventListener('click', () => mover(1));
  visor.querySelector('.cerrar')?.addEventListener('click', () => visor.close());
  // Tocar fuera de la imagen cierra; las flechas del teclado pasan de captura.
  visor.addEventListener('click', (e) => {
    if (e.target === visor || (e.target as HTMLElement).tagName === 'FIGURE') visor.close();
  });
  visor.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') mover(-1);
    if (e.key === 'ArrowRight') mover(1);
  });
  // Al cerrar, el carril queda en la última captura que se miró.
  visor.addEventListener('close', () => ir(abierta));
}
