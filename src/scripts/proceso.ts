// "Cómo trabajo": la pista se llena con el scroll y cada paso se enciende cuando la pista llega.
const lista = document.getElementById('pasos');
const llena = document.getElementById('pista-llena');

if (lista && llena) {
  const pasos = [...lista.children] as HTMLElement[];
  const horizontal = matchMedia('(min-width: 960px)');
  const limitar = (v: number) => Math.min(1, Math.max(0, v));

  const actualizar = () => {
    const r = lista.getBoundingClientRect();
    if (horizontal.matches) {
      // Se llena mientras la lista sube del 85% al 40% de la pantalla.
      const p = limitar((innerHeight * 0.85 - r.top) / (innerHeight * 0.45));
      llena.style.transform = `scaleX(${p})`;
      for (const paso of pasos) {
        paso.classList.toggle('activo', p > 0.02 && paso.getBoundingClientRect().left - r.left <= p * r.width);
      }
    } else {
      const referencia = innerHeight * 0.6;
      llena.style.transform = `scaleY(${limitar((referencia - r.top) / r.height)})`;
      for (const paso of pasos) {
        paso.classList.toggle('activo', paso.getBoundingClientRect().top + 20 < referencia);
      }
    }
  };

  let pendiente = false;
  addEventListener(
    'scroll',
    () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        actualizar();
      });
    },
    { passive: true },
  );
  addEventListener('resize', actualizar);
  actualizar();
}

// Módulo: sus variables no se mezclan con las de otros scripts.
export {};
