# Web de Ignacio Isa-Vargas

Web personal académica, publicada en https://iisav.netlify.app.

## Qué se publica

Netlify publica la carpeta **`preview-mayank/`** tal cual (HTML, CSS y JS escritos a mano,
sin paso de build). La configuración está en `netlify.toml`: carpeta publicada, cabeceras de
seguridad y redirecciones `/publicaciones`, `/actividades` y `/cv`.

| Archivo | Qué es |
|---|---|
| `index.html`, `publicaciones.html`, `actividades.html`, `cv.html` | Páginas del sitio |
| `styles.css`, `site.js` | Estilos y comportamiento comunes |
| `cv.pdf` | CV vigente (el único) |
| `cv-print.html` | Plantilla para imprimir el CV en PDF; se publica pero no está enlazada |
| `googledaf79e9a4c448e32.html` | Verificación de Google Search Console; no borrar |

## Cómo actualizar

1. Editar los archivos de `preview-mayank/`.
2. Si cambia `styles.css` o `site.js`, subir el número de `?v=clean-N` **en las cuatro páginas
   a la vez** (todas deben pedir la misma versión).
3. Probar en local: `python -m http.server 8765 --directory preview-mayank` y abrir
   http://localhost:8765.
4. Commit y `git push` a `main`: Netlify publica solo.

El repo es **público**: no subir `.env`, claves ni capturas personales (`tmp/` y
`.claude/settings.local.json` están en `.gitignore`).

La versión anterior en Quarto (`.qmd`, `docs/`) y los borradores `preview-*` se archivaron
el 2026-10-10 en `C:\dev\_ARCHIVO\web-ignacio-pagina\` (ver su `LEEME.md`).
