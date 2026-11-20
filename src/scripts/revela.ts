// Los bloques .revela suben un poco al entrar en pantalla.
// Solo se mueven los que arrancan fuera de pantalla, y nunca se ocultan.
import { quieto } from '../lib/movimiento';

if (!quieto) {
  const bloques = [...document.querySelectorAll<HTMLElement>('.revela')];
  for (const b of bloques) {
    if (b.getBoundingClientRect().top > innerHeight) b.classList.add('abajo');
  }
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.remove('abajo');
        observador.unobserve(e.target);
      }
    },
    { threshold: 0.1 },
  );
  bloques.forEach((b) => observador.observe(b));
}
