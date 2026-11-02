// Genera el PDF del CV desde cv-print.html con Edge (vía Playwright) y la letra Lato local.
// Uso: node herramientas/cvpdf.js preview-mayank/cv-print.html preview-mayank/cv.pdf
// Requiere: cd herramientas && npm install (usa el Edge de Windows, no hace falta bajar Chromium)
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const [src, out] = process.argv.slice(2);
if (!src || !out) { console.error('Uso: node cvpdf.js <cv-print.html> <salida.pdf>'); process.exit(1); }

const dirLato = path.dirname(require.resolve('@fontsource/lato/package.json'));
const archivo = (w, s) => path.join(dirLato, 'files', `lato-latin-${w}-${s}.woff2`);
const variantes = [['300', 'normal'], ['400', 'normal'], ['700', 'normal'], ['400', 'italic'], ['700', 'italic']];
const fuentes = variantes.map(([w, s]) =>
  `@font-face{font-family:Lato;font-weight:${w};font-style:${s};src:url(${pathToFileURL(archivo(w, s)).href})}`).join('\n');

// Cambia la carga de Google Fonts por la letra local
const html = fs.readFileSync(src, 'utf8').replace(/@import url\([^)]*\);/, fuentes);
const temporal = path.join(os.tmpdir(), 'cv-gen.html');
fs.writeFileSync(temporal, html);

const cursiva = fs.readFileSync(archivo('400', 'italic')).toString('base64');
const azul = '#2f6fad';
const punto = '<span style="margin:0 6px">&bull;</span>';
const pie = `<style>@font-face{font-family:LatoI;src:url(data:font/woff2;base64,${cursiva})}</style>` +
  `<div style="width:100%;font-family:LatoI,Arial;font-style:italic;font-size:8pt;color:${azul};padding:0 14mm;position:relative;text-align:center">` +
  `iisav.netlify.app${punto}linkedin.com/in/ignacio-isa${punto}ORCID 0009-0007-9837-4500` +
  `<span style="position:absolute;right:14mm"><span class="pageNumber"></span>/<span class="totalPages"></span></span></div>`;

(async () => {
  const navegador = await chromium.launch({ channel: 'msedge' });
  const pagina = await navegador.newPage();
  await pagina.goto(pathToFileURL(temporal).href, { waitUntil: 'networkidle' });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.pdf({
    path: out, preferCSSPageSize: true, printBackground: true,
    displayHeaderFooter: true, headerTemplate: '<span></span>', footerTemplate: pie,
  });
  await navegador.close();
  console.log('PDF listo en', out);
})();
