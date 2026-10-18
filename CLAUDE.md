# Miami Ad School México

Este repo guarda el **sistema de marca de MAS México** para producir piezas con Claude (Canva, carruseles, PDFs, motion).

- Antes de producir cualquier pieza visual, usa la skill **`mas-brand`** (`.claude/skills/mas-brand/SKILL.md`) y lee `brand/BRAND.md`.
- Colores: solo los de `brand/tokens/colors.json`, en los pares aprobados. Fuentes: Obviously Narrow para headlines y Obviously (ancho normal) para cuerpo (ver `brand/fonts/README.md`).
- **Tipografía (indicación de Ricardo)**: headlines grandes y bold. Usa las tipografías y pesos que se vean más cool aunque no estén en el manual: Obviously Narrow **Black** por defecto, **Super** para golpes cortos y Obviously **ancha** (`.h.wide`) para golpes de 1–2 palabras, o cualquier otra fuente con licencia que esté en `brand/fonts/`. Logo, paleta y alineación a la izquierda no cambian.
- **Indicaciones de Ricardo (mandan sobre el manual)**: nunca letras negras (todo el texto en rosas de la paleta); sin M-dots dentro de los slides, el logo solo en el cierre; texto de apoyo grande y grueso (Obviously Narrow Bold, clase `.support`, 52–64 px; excepción: el estilo con imágenes de `templates/carousel-imagenes.html` usa Narrow Regular de 46–48 px con la frase clave en Black); fotos con sus colores originales, sin filtros ni duotonos; sin flechas (→) en ninguna parte; rompe reglas de layout como director de arte cuando la idea salga del contenido (ver la skill).
- Nunca publiques (web, Artifact, repo) los archivos de fuentes de Obviously: su licencia lo prohíbe.
- `README.md` de la raíz es el perfil público de GitHub: no lo modifiques salvo que se pida.
- El repo es **público**: no subir fuentes licenciadas, manuales internos (PDF), datos de negocio ni archivos de alumnos.
