# Vazzoler

Página de Vazzoler · Soluciones digitales: sistemas, páginas web y automatizaciones para comercios de zona oeste.

Está hecha con [Astro](https://astro.build) y genera HTML estático: no necesita servidor ni base de datos, se sube la carpeta `dist/` a cualquier hosting.

## Correrla

Hace falta Node 22 o más nuevo.

```bash
npm install
npm run dev       # http://localhost:4321, se recarga al guardar
npm run build     # revisa los tipos y deja la página en dist/
npm run preview   # sirve dist/ para verla como queda publicada
```

## Dónde está cada cosa

```
src/
  pages/index.astro        arma la página con las secciones en orden
  components/              una sección o pieza por archivo (Portada, Servicios, Trabajos…)
  content/proyectos/       un trabajo por carpeta: index.md + capturas
  content.config.ts        qué campos lleva cada trabajo (Astro los valida)
  datos/sitio.ts           WhatsApp, mail, LinkedIn y textos de la marca
  scripts/                 animaciones del lado del navegador
  styles/global.css        colores, tipografías y estilos compartidos
public/                    favicon, ícono del celu e imagen para compartir el link
bocetos/                   el boceto de diseño del que salió la página
marca/                     logo final y opciones descartadas
```

## Agregar un trabajo

1. Crear una carpeta en `src/content/proyectos/`, por ejemplo `src/content/proyectos/mi-cliente/`.
2. Poner adentro las capturas. Las de compu van en 16:10 (por ejemplo 1600 × 1000); las de celu, verticales.
3. Crear `index.md` con este formato:

```md
---
nombre: Mi Cliente
rubro: Ferretería
estado: En uso todos los días
orden: 5                    # posición en la lista
color: '#38BDF8'            # tiñe el fondo, los puntos y el rubro
datos:                      # opcional: si no hay, el bloque no aparece
  - etiqueta: Se usa en
    valor: La compu del mostrador
capturas:
  - archivo: ./venta.webp
    epigrafe: Venta
    alt: Qué se ve en la captura, para quien no puede verla
  - archivo: ./venta-celu.webp
    tipo: celu              # compu (por defecto), celu o papel
    epigrafe: En el celular
    alt: La venta desde el celular
---
Descripción del trabajo en uno o dos párrafos.
```

Si falta un campo o el color no está en hex, `npm run build` falla y dice cuál.
Las capturas se optimizan solas al construir (AVIF y WebP en varios tamaños).

## Cambiar datos de contacto

Todo está en `src/datos/sitio.ts`: el número y el mensaje de WhatsApp, el mail, LinkedIn y si se muestra "Tomando proyectos nuevos" en el pie.

## Publicación

La página está en Cloudflare (Worker `official-page`, dominio `vazzoler.com.ar`). Cada push a la rama de
producción dispara solo `npm run build` y `npx wrangler deploy`, que sube `dist/` tal cual
(la configuración está en `wrangler.jsonc`). Si la compilación falla, la versión anterior sigue online
y el error queda en Deployments, en el panel de Cloudflare.
