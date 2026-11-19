# gohanckz.github.io

Portfolio, CV y blog de writeups de **Iván González (Gohanckz)**: <https://gohanckz.github.io>

| Ruta | Qué es | Archivo |
|------|--------|---------|
| `/` | Portada del portfolio | `index.html` |
| `/cv/` | CV web, imprimible a PDF (botón "Descargar PDF") | `cv/index.html` |
| `/blog/` | Listado de writeups (tema [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy)) | `blog/index.html` |
| `/posts/...` | Cada writeup | `_posts/*.md` |

## Actualizar el CV

Todo el contenido del CV y de la portada sale de **`_data/cv.yml`**. No hace falta tocar HTML:

- **Nueva experiencia:** copia un bloque de `experience:` y pégalo arriba (el orden del archivo es el orden en pantalla).
- **Nueva certificación:** añade una entrada en `certifications:`.
- **Nuevo proyecto:** añade un bloque en `projects:`; con `featured: true` se destaca.
- **Cifras de la portada:** `basics.stats`.

Haz commit y push a `main`: GitHub Actions compila y publica el sitio en un par de minutos.

## Nuevo writeup

Crea `_posts/AAAA-MM-DD-titulo.md` con el front matter habitual de Chirpy (`title`, `date`, `categories`, `tags`).

## Probar en local

```bash
bundle install
bundle exec jekyll serve --livereload
# http://localhost:4000
```

## Estructura del diseño

Todo el sitio (portada, CV y blog) usa un diseño propio; del tema Chirpy solo se aprovechan sus plugins
(SEO, feed, sitemap, archivos de categorías y etiquetas, redirecciones).

- `_layouts/default.html`: estructura común (navegación, footer, cursor).
- `_layouts/home.html`, `post.html`, `categories.html`, `category.html`, `tags.html`, `tag.html`, `archives.html`, `page.html`: blog.
- `assets/css/site.css`: estilos (tokens de color en `:root`, estilos de impresión del CV al final).
- `_includes/favicons.html` y `assets/img/favicons/`: favicon del ojo pixelado (SVG + PNG/ICO).
- `assets/img/og-image.png`: imagen de vista previa al compartir el enlace (1200×630), definida en `defaults` de `_config.yml`.
- `assets/js/site.js`: ojo ASCII animado, cursor de selección, texto que se descifra, buscador del blog, índice y botón de copiar en los posts.

## Licencia

Tema Chirpy bajo licencia [MIT](LICENSE).
