---
name: Miami Ad School México · Landing VSL
description: Negro, fucsia M.AD a toda potencia y la paleta secundaria en campos completos; tipografía gorda que ocupa la pantalla.
colors:
  black: "#0A0A0A"
  black-raised: "#151515"
  white: "#F7F5F2"
  white-secondary: "#A9A39E"
  dim: "#6E6964"
  hot: "#FF009B"
  hot-press: "#E6008B"
  hot-ink: "#C2007A"
  on-hot-secondary: "#2B0019"
  acid: "#FFFF3E"
  blue: "#3391F4"
  orange: "#FF9812"
  green: "#00D357"
  violet: "#A572FF"
  pink: "#FF5CCD"
  light: "#F7F5F2"
  light-secondary: "#4D4844"
typography:
  giant:
    fontFamily: "Obviously Narrow Bold, Archivo Variable (wght 800, wdth 74%), sans-serif"
    fontSize: "clamp(2.4rem, 13.2vw, 12rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.035em"
  poster:
    fontFamily: "Obviously Narrow Bold, Archivo Variable (wght 800, wdth 74%), sans-serif"
    fontSize: "clamp(3rem, 0.8rem + 9vw, 10.5rem)"
    fontWeight: 800
    lineHeight: 0.88
    letterSpacing: "-0.03em"
  heading-2:
    fontFamily: "Obviously Narrow Bold, Archivo Variable (wght 800, wdth 74%), sans-serif"
    fontSize: "clamp(2.75rem, 1.3rem + 5.2vw, 6.75rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  heading-3:
    fontFamily: "Obviously Narrow Bold, Archivo Variable (wght 800, wdth 74%), sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1.1vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.22vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  card: "clamp(0.75rem, 1.6vw, 1.5rem)"
  pill: "999px"
spacing:
  gutter: "clamp(1rem, 5vw, 4.5rem)"
  column-gap: "clamp(0.75rem, 1.6vw, 1.5rem)"
  section: "clamp(5.5rem, 3rem + 9vw, 11rem)"
components:
  button-hot:
    backgroundColor: "{colors.hot}"
    textColor: "{colors.black}"
    rounded: "{rounded.pill}"
    height: "60px"
  button-hot-hover:
    backgroundColor: "{colors.acid}"
  button-ink:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "60px"
  button-ink-hover:
    backgroundColor: "{colors.white}"
    textColor: "{colors.black}"
  chip-selected:
    backgroundColor: "{colors.hot}"
    textColor: "{colors.black}"
    rounded: "{rounded.pill}"
---

# Design System: Miami Ad School México · Landing VSL

## Overview

La escuela con más títulos de Future Lions School of the Year, en voz alta. Base negra, porque el tráfico llega de Instagram de noche y en modo oscuro. Encima va tipografía gorda que ocupa la pantalla. Cada sección toma un color de la paleta M.AD a campo completo, igual que el punto del M-dot cambia de color cada vez: fucsia, ácido, azul y verde, con campos claros donde el titular pasa de negro a magenta. Nunca rosa pastel.

Implementación de referencia: `miami-ad-school-vsl/landing.css` (todo bajo `.mas-vsl`).

## Colors

### Primary
- **Black** `#0A0A0A` y **White** `#F7F5F2`: base y texto.
- **Hot** `#FF009B` (Rhodamine Red C): el color de la marca. Campos completos (veredicto y bloque de aplicar), botones principales y la palabra «portafolio». Encima, siempre texto negro (5.4:1).

### Secondary (paleta secundaria M.AD, en campos completos)
- **Acid** `#FFFF3E` (101 C): el punto. Cursor, progreso, el botón de play y la cápsula «Próximo ingreso».
- **Blue** `#3391F4` (2727 C): tarjeta final de «¿Cómo funciona…?» (lo que te llevas).
- **Campo claro** `#F7F5F2` con titular negro + magenta `#C2007A` (la referencia fue «La diferencia», que salió en la V2): la tarjeta «Después del primer año» y la sección de prácticas. Ricardo descartó el violeta y el naranja como campos.
- Portadas de books: rotan fucsia, ácido, azul, naranja, verde, violeta `#A572FF`, blanco y rosa `#FF5CCD`.

### Named Rules
- Sobre cualquier color de la paleta el texto va en negro. El blanco solo va sobre negro.
- Fucsia como texto sobre claro: `#C2007A` (5.4:1), nunca `#FF009B` (3.4:1).
- Texto secundario teñido del campo, nunca gris neutro sobre color.

## Typography

Obviously Narrow **Bold** para todos los titulares. En la vista previa se imita con Archivo a peso 800 y ancho 74%. El texto corrido va en Archivo Regular hasta que llegue Obviously Regular.

### Hierarchy
- **Hero (V2):** eyebrow con el programa, la línea «Tu título no te consigue el mejor trabajo.» y el gigante «Tu portafolio sí.», con «portafolio» encerrado en la pluma. El gigante ocupa el ancho; el JS (`data-fit`) lo ajusta para que nunca desborde. Debajo, a dos columnas en escritorio, el subtítulo y los datos; a la derecha, el video con su portada y la píldora fucsia «Ver el video · 3:30». Sin botón de folleto.
- **Poster:** frase de sección a pantalla completa (veredicto «La industria creativa contrata evidencia.»).
- **H2:** de 13 a 15 caracteres por línea, interlineado 0.9.
- **Texto:** 1.0625–1.1875rem, 65–75 caracteres por línea.

### Named Rules
- Sentence case, alineado a la izquierda, sin mayúsculas en titulares y sin tracking abierto (manual M.AD). El tracking negativo solo se usa en tamaños grandes.

## Layout

Grid de 12 columnas, ancho máximo de 90rem y medianil fluido hasta 72 px. Secciones a sangre completa que alternan negro, campo de color y claro. Composición asimétrica: escalera en «Problema», paneles que se expanden en Art Direction y Copywriting, galería que se arrastra y las cuatro tarjetas de «El Programa» que se apilan con `position: sticky` en tablet y escritorio (en móvil y en pantallas bajas van una debajo de otra, para que ninguna tape texto).

## Elevation & Depth

Solo el manuscrito, el módulo de aplicar y las tarjetas apiladas llevan sombra suave con desplazamiento. No hay brillos de color.

## Photography

Fotos de marca M.AD: personas haciendo (pintar, saltar, desplegar un póster, pensar), con la M fluida y el punto como gráfico o en el vestuario. Blanco y negro contra campo de color, o color saturado de la paleta. Se colocan como piezas físicas: la gorra con la M girada −2° en el footer y el Grad Show a sangre dentro de la última tarjeta de «El Programa». WebP en dos tamaños con `srcset`; solo la del hero carga con prioridad.

## Shapes

Botones y chips en píldora; tarjetas con radio de 0.75 a 1.5rem. El punto (círculo ácido) es la forma de marca: viene del M-dot.

## Components

### Buttons
Píldora de 60 px. El hover llena el botón desde abajo con el color de acción (fucsia → ácido; tinta → blanco) y la flecha avanza 4 px.

### Signature: el punto y la pluma
- Cursor-punto ácido que sigue al mouse. Solo con mouse y solo si se permite movimiento; nunca reemplaza al cursor nativo.
- Pluma: el círculo ácido alrededor de «portafolio».
- Las líneas de «Problema» se encienden al leerlas.
- Cinta fucsia debajo del hero que avanza con el scroll, no por tiempo (salió en la V2 y volvió a pedido de Ricardo).
- Muro de logos de agencias que avanza con el scroll, como la cinta (sin botón de pausa); todos los logos en negro. Con movimiento reducido es una cuadrícula quieta.

## Do's and Don'ts

### Do:
- Usar los archivos oficiales del logo y del M-dot; nunca redibujarlos.
- Mostrar evidencia real (books, maestros y testimonios solo con permiso) antes que afirmar resultados.
- Mantener todo el contenido visible sin JavaScript y con `prefers-reduced-motion`.

### Don't:
- Rosa pastel, degradados tipo SaaS, glassmorphism ni neones con brillo.
- Recortar al 100% un elemento observado por IntersectionObserver: deja de detectarse y no se revela.
- Tarjetas iguales de ícono + título + texto como estructura de la página.
- Fotos de stock de estudiantes sonriendo frente a una laptop.
