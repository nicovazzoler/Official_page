// Efectos de terminal en Servicios.
import { quieto } from '../lib/movimiento';

tipearTitulos();
escribirIdeas();

// Los títulos se escriben letra por letra al entrar en pantalla. Solo si la sección
// arrancó fuera de pantalla: lo que ya se ve al cargar nunca se borra.
function tipearTitulos() {
  const mapa = document.getElementById('mapa');
  if (!mapa || quieto || mapa.getBoundingClientRect().top < innerHeight) return;

  const titulos = [...mapa.querySelectorAll<HTMLElement>('.tipeo')];
  const textos = titulos.map((t) => t.textContent ?? '');
  titulos.forEach((t, i) => {
    t.setAttribute('aria-label', textos[i]);
    t.textContent = '';
    t.classList.add('esperando');
  });

  const tipear = (i: number, listo: () => void) => {
    const el = titulos[i];
    let n = 0;
    el.classList.replace('esperando', 'escribiendo');
    const paso = () => {
      el.textContent = textos[i].slice(0, ++n);
      if (n < textos[i].length) setTimeout(paso, 26);
      else {
        el.classList.remove('escribiendo');
        listo();
      }
    };
    paso();
  };

  const observador = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      observador.disconnect();
      let k = 0;
      const siguiente = () => {
        if (k < titulos.length) tipear(k++, () => setTimeout(siguiente, 90));
      };
      siguiente();
    },
    { threshold: 0.35 },
  );
  observador.observe(mapa);
}

// "Todo lo que necesites": escribe ideas una atrás de otra y nunca termina.
function escribirIdeas() {
  const el = document.getElementById('idea');
  if (!el || quieto) return;
  const ideas = [
    'Control de vencimientos',
    'Presupuestos en PDF con un clic',
    'Lista de precios que se actualiza sola',
    'Recordatorios de turnos por WhatsApp',
    'Pedidos a proveedores',
    'Fichaje de empleados',
    'Lo que se te ocurra',
  ];
  const ultima = ideas.length - 1;
  // Arranca borrando la última, que es la que está escrita en el HTML.
  let n = ultima;
  let texto = ideas[n];
  let borrando = true;

  const paso = () => {
    if (borrando) {
      texto = texto.slice(0, -1);
      el.textContent = texto;
      if (!texto) {
        borrando = false;
        n = (n + 1) % ideas.length;
      }
      setTimeout(paso, 28);
      return;
    }
    const meta = ideas[n];
    texto = meta.slice(0, texto.length + 1);
    el.textContent = texto;
    if (texto === meta) {
      borrando = true;
      setTimeout(paso, n === ultima ? 2600 : 1500);
      return;
    }
    setTimeout(paso, 45);
  };
  setTimeout(paso, 2600);
}
