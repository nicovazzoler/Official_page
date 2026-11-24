// Genera los PDF del folleto a partir de folleto.html. Necesita Playwright con Chromium.
// Uso: node marca/folleto/generar.cjs
const path = require('node:path');
const { chromium } = require('playwright');

const html = 'file://' + path.join(__dirname, 'folleto.html');
const salida = (nombre) => path.join(__dirname, nombre);

(async () => {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage();

  for (const [modo, archivo] of [['imprenta', 'folleto-a6-imprenta.pdf'], ['a4', 'folleto-a4-4-por-hoja.pdf']]) {
    await pagina.goto(`${html}?modo=${modo}`);
    await pagina.evaluate(() => document.fonts.ready);
    await pagina.pdf({ path: salida(archivo), preferCSSPageSize: true, printBackground: true });
    console.log(archivo);
  }

  // Vista previa en imagen de cada cara, al tamaño final (sin sangrado).
  const vista = await navegador.newPage({ viewport: { width: 1000, height: 700 }, deviceScaleFactor: 3 });
  await vista.goto(`${html}?modo=vista`);
  await vista.evaluate(() => document.fonts.ready);
  const ventanas = await vista.$$('.ventana');
  for (const [i, nombre] of ['vista-frente.png', 'vista-dorso.png'].entries()) {
    await ventanas[i].screenshot({ path: salida(nombre) });
    console.log(nombre);
  }
  await navegador.close();
})();
