# Fuentes

| Uso | Fuente | Archivo | En git |
|---|---|---|---|
| Headlines, info, wordmark | **Obviously Narrow** Regular / Medium / Semibold / Bold (OH no Type Co.) | `Obviously-Narrow*.woff` | **No**: es licenciada y este repo es público |
| Cuerpo de texto | **Obviously** Regular (ancho normal) | `Obviously-Regular.woff` | No; tampoco está en el Drive todavía |
| Sustituto de cuerpo | **Archivo** 400/500/600 (SIL OFL) | `archivo/*.woff2` | Sí |

## Instalar Obviously Narrow en una sesión nueva

Los `.woff` están en Google Drive → BRANDING – MIAMI AD SCHOOL → Tipografías → 07 Tipografia → Web:

| Archivo | Drive file ID |
|---|---|
| Obviously-Narrow.woff | `1m03sp912xKsIzLe4YuZDCveEQTDjHN9Y` |
| Obviously-Narrow_Medium.woff | `16LZBjDprmoM-f0b2msSett_H9Roy81Iq` |
| Obviously-Narrow_Semibold.woff | `1REAmi9L-ME3s-fKtTBHFsTaKjOaQxLO1` |
| Obviously-Narrow_Bold.woff | `1EJLONjjOvwmSgQ87L_bInxvkuIqIrEJL` |

1. Descarga los cuatro con la herramienta de Drive `download_file_content` (fileId de la tabla). El resultado es grande, así que Claude Code lo guarda en `~/.claude/projects/.../tool-results/`.
2. `python3 -I brand/scripts/drive-save.py brand/fonts ~/.claude/projects --only Obviously-Narrow`
3. Comprueba: `ls brand/fonts/*.woff` (cuatro archivos). El renderer avisa con "⚠ Obviously Narrow no cargó" si faltan.

Para activar **Obviously Regular** cuando la tengas: copia `Obviously-Regular.woff` aquí y descomenta su `@font-face` en `brand/web/mas.css`.
En Canva las fuentes ya viven en el brand kit "Miami Ad School · Collins".
