// El fondo toma el tono de la zona que cruza la mitad de la pantalla.
// Cada zona trae sus colores en data-fondo y data-brillo (ver lib/tonos.ts).
const ambiente = document.querySelector<HTMLElement>('.ambiente');

if (ambiente) {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        const { fondo, brillo } = (entrada.target as HTMLElement).dataset;
        if (fondo) ambiente.style.setProperty('--amb-fondo', fondo);
        if (brillo) ambiente.style.setProperty('--amb-brillo', brillo);
      }
    },
    // Raíz de alto cero en la mitad de la pantalla: entra la zona que la cruza.
    { rootMargin: '-50% 0px -50% 0px' },
  );
  document.querySelectorAll('[data-fondo]').forEach((zona) => observador.observe(zona));
}

// Módulo: sus variables no se mezclan con las de otros scripts.
export {};
