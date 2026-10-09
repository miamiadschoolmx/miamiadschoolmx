---
name: Miami Ad School México · Landing VSL
description: Editorial, preciso y aspiracional; el rosa es la pluma del maestro y el amarillo es la siguiente acción.
colors:
  paper: "#FFF3F7"
  sheet: "#FFFFFF"
  ink: "#111010"
  ink-secondary: "#5A4852"
  night: "#111010"
  night-raised: "#1B1A1A"
  on-night: "#FFF3F7"
  on-night-secondary: "#D2BEC8"
  action-yellow: "#FFCF00"
  action-yellow-press: "#F0C000"
  pink-soft: "#FFCEDD"
  pink-pen: "#EC009F"
  pink-text: "#AD007A"
  pink-on-night: "#FF5CCD"
typography:
  display:
    fontFamily: "Obviously Narrow, Archivo Variable (font-stretch 74%), sans-serif"
    fontSize: "clamp(2.25rem, 1.45rem + 3.4vw, 4.5rem)"
    fontWeight: 560
    lineHeight: 0.98
    letterSpacing: "-0.012em"
  hero-punch:
    fontFamily: "Obviously Narrow, Archivo Variable (font-stretch 74%), sans-serif"
    fontSize: "clamp(3.1rem, 1.6rem + 6.6vw, 6rem)"
    fontWeight: 560
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  heading-3:
    fontFamily: "Obviously Narrow, Archivo Variable (font-stretch 74%), sans-serif"
    fontSize: "clamp(1.375rem, 1.15rem + 0.9vw, 1.875rem)"
    fontWeight: 560
    lineHeight: 1.05
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.22vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: "0px"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 5vw, 4.5rem)"
  column-gap: "clamp(0.75rem, 1.6vw, 1.5rem)"
  section: "clamp(5rem, 3rem + 8vw, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.action-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.action-yellow-press}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    height: "56px"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "56px"
  chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
---

# Design System: Miami Ad School México · Landing VSL

## Overview

Una escuela de ideas, no una universidad. La página se lee como un book en proceso: piezas de papel, bocetos y borradores con correcciones a mano en rosa. Fondo claro de la paleta M.AD, negro para los momentos de máxima atención (VSL, veredicto, books) y amarillo solo donde hay una acción. Minimalista sin estar vacía; cada sección alterna silencio e impacto.

Implementación de referencia: `miami-ad-school-vsl/landing.css` (todo bajo `.mas-vsl`).

## Colors

### Primary
- **Paper** `#FFF3F7`: el rosa más claro de la guía web; fondo base.
- **Ink** `#111010`: texto, negro de marca y fondos de alto contraste.

### Secondary
- **Action yellow** `#FFCF00` (PMS 7548 C): **solo** botones de acción y el botón de play. Texto negro encima (12.8:1).

### Tertiary
- **Pink pen** `#EC009F` (PMS 226 C) sobre claro y `#FF5CCD` (M.AD Pink) sobre negro: marcas de corrección, el punto del proceso y el progreso de lectura.
- **Pink text** `#AD007A` (PMS 2425 C): texto rosa sobre claro (6.3:1).
- **Pink soft** `#FFCEDD` (PMS 182 C): paneles de Copywriting y de la sección de entrevista.

### Named Rules
- El rosa corrige y el amarillo actúa: nunca se intercambian.
- Texto secundario teñido de la marca (`#5A4852`, `#D2BEC8`), nunca gris neutro.

## Typography

Obviously Narrow Medium para titulares (fuente de marca; en la vista previa se usa Archivo con ancho condensado). Archivo Regular para texto, mientras llega Obviously Regular. Máximo dos familias.

### Hierarchy
- Display: el titular del hero, en dos tiempos (la premisa a tamaño medio y «Tu portafolio sí.» a gran escala).
- Títulos de sección: medianos, interlineado cerrado y ancho máximo de 13 a 22 caracteres.
- Texto: entre 65 y 75 caracteres por línea, interlineado 1.5.

### Named Rules
- Todo alineado a la izquierda, en sentence case, sin mayúsculas en titulares y sin tracking abierto (manual M.AD).

## Layout

Grid de 12 columnas, ancho máximo de 90rem y medianil fluido hasta 72 px (la guía web pide márgenes de 72 px). Mobile-first: en menos de 48em todo va a una columna; los pasos del proceso y las etapas se vuelven verticales. Secciones asimétricas: la escalera del problema, los paneles desiguales de Art Direction y Copywriting, y la galería horizontal de books que desborda el grid.

## Elevation & Depth

Solo las piezas de papel del collage, el manuscrito y el módulo de entrevista llevan sombra suave con desplazamiento. No hay sombras duras ni brillos de color.

## Shapes

Botones y planos con esquinas rectas. Solo los chips de selección y los puntos son redondos: el punto viene del M-dot.

## Components

### Buttons
Rectangulares de 56 px de alto con flecha que avanza 3 px al hover. Variantes: amarillo (acción principal), tinta (sobre claro) y papel (sobre negro).

### Chips
Selector «Me interesa» con `aria-pressed`; seleccionado = tinta sólida.

### Signature: pluma del maestro
Círculos, tachados y subrayados en rosa, como SVG con trazo dibujado. El círculo alrededor de «portafolio» es el único momento animado al cargar.

## Do's and Don'ts

### Do:
- Usar el logo y el M-dot oficiales en archivo, nunca redibujados.
- Mostrar evidencia real (books, maestros y proceso) en vez de afirmar resultados.
- Respetar `prefers-reduced-motion` y mantener el contenido visible sin JavaScript.

### Don't:
- Degradados tipo SaaS, fondos morados, neones o glassmorphism.
- Tarjetas iguales de ícono + título + texto como estructura de la página.
- Eyebrows en mayúsculas espaciadas sobre los títulos, o numeración de secciones.
- Fotos de stock de estudiantes sonriendo frente a una laptop.
