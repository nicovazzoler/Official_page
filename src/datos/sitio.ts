// Datos de la marca y de contacto. Cambiar algo acá lo cambia en toda la página.
const mensajeWhatsapp = 'Hola Nico, quiero consultarte por mi negocio.';

export const sitio = {
  nombre: 'Vazzoler',
  bajada: 'Soluciones digitales',
  titulo: 'Vazzoler · Sistemas a medida para comercios',
  descripcion:
    'Sistemas, páginas web y automatizaciones a medida para comercios de zona oeste. Hechos para la forma en que ya trabaja tu negocio.',
  autor: 'Nicolás Vazzoler',
  zona: 'Zona oeste',
  whatsapp: `https://wa.me/5491157979172?text=${encodeURIComponent(mensajeWhatsapp)}`,
  mail: `mailto:nicovazzoler99@gmail.com?subject=${encodeURIComponent('Consulta desde la web')}`,
  linkedin: 'https://www.linkedin.com/in/nicovazzoler/',
  // Prende o apaga el "Tomando proyectos nuevos" del pie.
  disponible: true,
};
