---
name: SEO para Agencias by Ferova
description: Una consola de entrega técnica, física y confiable para agencias.
colors:
  charcoal-housing: "#242322"
  graphite-ink: "#3c3c3b"
  ferova-wine: "#541014"
  deep-wine: "#2b0a0d"
  warm-brown: "#6a4c30"
  signal-gold: "#c0930e"
  signal-gold-light: "#e0bd52"
  warm-ivory: "#f8f0e2"
  paper: "#fffaf1"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(4.2rem, 6.3vw, 6.8rem)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3.2rem, 5.6vw, 5.8rem)"
    fontWeight: 800
    lineHeight: 0.91
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.07em"
rounded:
  control: "12px"
  housing: "14px"
  round: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "48px"
  section: "clamp(5rem, 9vw, 8.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.signal-gold}"
    textColor: "#211b0b"
    rounded: "{rounded.control}"
    padding: "14px 22px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.signal-gold-light}"
    textColor: "#211b0b"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.warm-ivory}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
    height: "52px"
---

# Design System: SEO para Agencias by Ferova

## Overview

**Creative North Star: "Agency Delivery Console"**

La interfaz se comporta como una consola física de entrega: una necesidad entra, se activa capacidad especializada y sale una entrega documentada. El mundo visual es industrial y táctil, pero sobrio; combina superficies oscuras, metal dorado, esmalte vino y papel cálido para expresar operación senior sin caer en ciencia ficción.

La información manda sobre el efecto. La pieza 3D sostiene el recuerdo de marca, mientras que titulares, controles, estados y enlaces siguen siendo HTML legible y accesible.

**Key Characteristics:**

- Contraste fuerte entre grafito y marfil.
- Oro reservado para señales, acciones y estados activos.
- Titulares condensados y directos; cuerpo sereno y altamente legible.
- Módulos conectados en lugar de cuadrículas de tarjetas genéricas.
- Movimiento puntual que representa el paso de una señal por el sistema.

## Colors

La paleta proviene del manual Ferova y excluye explícitamente el azul de las superficies del mercado español.

### Primary

- **Vino Ferova:** superficie de operación, bandas de proceso y acciones secundarias con autoridad.
- **Oro de señal:** acciones primarias, estados activos, iconos funcionales y conectores.

### Secondary

- **Marrón cálido:** texto auxiliar, iconografía sobre papel y transiciones entre vino y oro.

### Neutral

- **Carcasa grafito:** navegación, hero, cierre y alojamiento visual del objeto 3D.
- **Marfil cálido:** texto sobre fondos oscuros y superficies cerámicas del mundo físico.
- **Papel:** fondo principal de lectura y zonas editoriales.

**The Signal Gold Rule.** El oro indica acción, flujo o estado; no rellena grandes superficies decorativas.

**The No Blue Rule.** Las superficies españolas no usan azul ni variantes azuladas como sustituto del grafito.

## Typography

**Display Font:** Barlow Condensed (sans-serif)
**Body Font:** Archivo (sans-serif)

**Character:** la voz display es compacta, mecánica y frontal; Archivo mantiene claridad en explicaciones, navegación y detalles de contratación. Nexa continúa siendo la referencia de marca, pero la implementación web usa esta pareja disponible para preservar el contraste de carácter.

### Hierarchy

- **Display** (800, escala fluida, 0.82): promesa principal y momentos de máximo énfasis.
- **Headline** (800, escala fluida, 0.91): títulos de secciones operativas.
- **Title** (700, 1.35–2.45rem): capacidades y pasos.
- **Body** (400, 1rem, 1.7): explicaciones con una medida máxima cercana a 65ch.
- **Label** (700, 0.72rem, espaciado amplio): estados, modalidades y datos de operación.

**The Compressed Promise Rule.** Los titulares se escriben en frases breves y ocupan pocas líneas densas; los párrafos nunca imitan su peso.

## Layout

La portada usa contenedores de 1240px para contenido y hasta 1480px cuando la consola necesita profundidad. El ritmo separa secciones con 5–8.5rem y agrupa texto relacionado con intervalos de 8–24px. En escritorio, copy y mecanismo comparten la primera vista; por debajo de 1100px se apilan. En móvil, el copy aparece primero, las acciones ocupan el ancho y la consola se recorta de forma intencional sin crear desplazamiento horizontal.

Las capacidades se presentan como un rack continuo de filas conectadas, no como tarjetas equivalentes. Los procesos usan una línea vertical real porque el orden modifica la comprensión.

## Elevation & Depth

El sistema combina material fotográfico para la profundidad principal con sombras ambientales suaves para elementos flotantes. Los contenedores de contenido son planos; la elevación aparece en la consola, la navegación fija, botones activos y controles superpuestos al video.

**The Real Material Rule.** La carcasa, el metal y el papel que funcionan como foco visual se producen como imagen; CSS solo organiza, ilumina y conecta el material.

## Shapes

Los controles usan esquinas de 12px y las carcasas mayores llegan a 14px. Las cápsulas completas se reservan para estados pequeños y nunca para contenedores de contenido. Los divisores son finos y teñidos desde vino, oro o marfil; no se emplean bordes grises genéricos.

## Components

### Buttons

- **Shape:** tecla suavemente redondeada (12px), altura mínima de 52px.
- **Primary:** oro de señal con texto oscuro y sombra ambiental corta.
- **Hover / Focus:** elevación de 2px, oro más claro y anillo visible de alto contraste.
- **Secondary:** transparente, borde marfil tenue y texto marfil.

### Chips

- **Style:** cápsula pequeña, borde dorado tenue, texto dorado y punto luminoso de estado.
- **State:** solo comunica modalidad o estado; no reemplaza botones.

### Cards / Containers

- **Corner Style:** 12–14px cuando existe una carcasa real.
- **Background:** papel o vino; las capacidades permanecen como filas dentro de un rack.
- **Shadow Strategy:** plana por defecto; elevación solo cuando una pieza físicamente flota.
- **Border:** 1px teñido desde la superficie.

### Navigation

La navegación española vive sobre grafito translúcido, usa cinco rutas de alta intención y una tecla de cotización visible. En móvil se convierte en un panel oscuro con el mismo orden y conserva la acción principal.

### Agency Delivery Console

La consola 3D es el componente firma. Su lectura accesible se expresa debajo como “brief recibido → capacidad activada → entrega documentada”; un pulso dorado lento refuerza ese flujo y se detiene cuando el usuario prefiere movimiento reducido.

## Do's and Don'ts

### Do:

- **Do** usar vino, grafito, marfil y oro con funciones consistentes.
- **Do** mantener acciones y estados en HTML aunque exista una imagen 3D.
- **Do** escribir CTAs que nombren la acción real: cotizar, ver habilidades o dejar datos.
- **Do** respetar `prefers-reduced-motion` y mantener foco visible.

### Don't:

- **Don't** usar azul en las superficies españolas.
- **Don't** introducir personas en el hero ni sustituir el objeto por fotografía de agencia genérica.
- **Don't** convertir la página en una cuadrícula de tarjetas del mismo tamaño.
- **Don't** inventar métricas, testimonios o resultados comerciales como decoración.
- **Don't** usar degradado en texto, cristal decorativo o sombras duras sin relación con el mundo físico.
