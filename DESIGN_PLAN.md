# Gran Price — Rediseño Web (POC)
### Documento maestro de diseño + plan de ejecución

> **Rol de este documento.** Lo redacta el equipo de diseño (Opus). Lo **ejecuta Sonnet 5**.
> Todo lo necesario para construir la landing está aquí: concepto, sistema de diseño con
> valores concretos, wireframe sección a sección, especificación de animaciones, arquitectura
> técnica, i18n, integración con WodBuster, assets reales a reutilizar, accesibilidad,
> rendimiento, SEO, deploy en GitHub Pages y el plan de tareas por fases.

---

## 0. Resumen ejecutivo

- **Cliente:** Club de Boxa Gran Price (Barcelona, Eixample).
- **Objetivo:** POC de rediseño de la **landing** (marketing), manteniendo intacto WodBuster
  (reservas, tarifas dinámicas, zona socios), que gestiona un tercero.
- **Concepto:** *"La Historia se Repite"* — el nuevo club es el renacimiento del mítico
  **Gran Price**, "el templo del boxeo" (C/ Casanova–Floridablanca, 1934–1973, 4.500 localidades,
  leyendas como Luís Romero, Fred Galiana y Mimoun Ben Ali). Toda la web se cuenta como un
  **cartel de velada de boxeo** de época, pero con ejecución moderna, limpia y fluida.
- **Stack:** Astro + Tailwind CSS.
- **Estructura:** single-page con scroll y anclas.
- **Estética:** Cartel de combate Art Déco → negro carbón · crema papel · oro · rojo óxido.
- **Idiomas:** ES / CA / EN con conmutador.
- **Animaciones:** cinematográficas (parallax, reveals, textura de papel/grano, campana).
- **Deploy:** GitHub Pages vía GitHub Actions.

---

## 1. Concepto creativo

**Idea central:** una web que se siente como el **programa impreso de una gran velada de boxeo**
de los años 30–50, restaurado y llevado a pantalla. Tinta sobre papel crema, tipografía
condensada de cartel, tacos de oro, sellos de "campeonato", y fotografía histórica en
blanco y negro conviviendo con las fotos reales del club actual.

**Tono de voz:** épico pero cercano. Barcelonés, deportivo, con orgullo de barrio y de historia.
Frases ancla: *"La Historia se Repite"*, *"El templo del boxeo vuelve a abrir"*, *"Súbete al ring"*.

**Principios de diseño**
1. **Impacto tipográfico** — los titulares son el héroe, como en un cartel.
2. **Papel vivo** — textura sutil de papel/grano, no plano digital estéril.
3. **Oro con moderación** — el oro es acento (líneas, filetes, sellos), nunca relleno masivo.
4. **Moderno de verdad** — grid limpio, mucho aire, responsive impecable, performance alta.
5. **Movimiento con intención** — cada animación refuerza la narrativa (round, campana, reveal).

---

## 2. Sistema de diseño

### 2.1 Paleta de color

| Token | Hex | Uso |
|---|---|---|
| `ink` (negro carbón) | `#141210` | Fondos oscuros, texto sobre crema |
| `ink-soft` | `#211E1A` | Superficies oscuras secundarias |
| `paper` (crema) | `#F3E9D2` | Fondo claro principal (papel) |
| `paper-deep` | `#E7D9BA` | Papel sombreado / secciones alternas |
| `gold` | `#C8A24C` | Acento principal (filetes, sellos, hovers) |
| `gold-bright` | `#E4C06B` | Brillo/destello en oro (gradiente marquesina) |
| `oxblood` (rojo óxido) | `#8E2420` | CTA, acentos de alto impacto, "VS" |
| `oxblood-bright` | `#B23A2E` | Hover de CTA |
| `smoke` | `#B9A88C` | Bordes suaves, texto terciario sobre papel |

**Reglas de contraste:** texto `ink` sobre `paper` y texto `paper`/`gold-bright` sobre `ink`.
Verificar AA (≥4.5:1 en texto normal). El oro puro sobre papel NO cumple para texto pequeño →
usar `ink` para cuerpo y reservar oro a titulares grandes/decoración.

### 2.2 Tipografía (Google Fonts, self-hosted vía `@fontsource` para performance)

- **Display / cartel:** `Anton` (titulares hero y seccionales, condensada, mayúsculas).
- **Sub-display alterno:** `Oswald` (etiquetas de sección, kickers, nav, botones).
- **Acento woodtype (cartel boxeo):** `Alfa Slab One` **solo** para elementos puntuales
  ("VS", números de round, precios grandes). Usar con mucha moderación.
- **Cuerpo / editorial:** `Lora` (serif elegante para párrafos y citas históricas).

**Escala tipográfica (clamp responsive):**
```
display-xl : clamp(3.5rem, 9vw, 8rem)   / Anton / line-height .9 / tracking .02em / uppercase
display-l  : clamp(2.5rem, 6vw, 5rem)   / Anton
h2         : clamp(2rem, 4vw, 3.25rem)  / Anton
h3         : 1.5rem                       / Oswald 600 / uppercase / tracking .08em
kicker     : .875rem                      / Oswald 500 / uppercase / tracking .28em / gold
body       : 1.0625rem                    / Lora / line-height 1.7
small      : .875rem                      / Lora
price-big  : clamp(2.5rem, 5vw, 4rem)   / Alfa Slab One
```

### 2.3 Espaciado, grid y radios

- **Grid:** contenedor máx. `1200px`, gutters `24px`, 12 columnas conceptuales.
- **Ritmo vertical de secciones:** `py` `clamp(5rem, 10vw, 9rem)`.
- **Escala de espaciado:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px.
- **Radios:** casi rectos (estética impresa). `radius-sm: 2px`, `radius-md: 4px`.
  Botones y tarjetas con esquina apenas suavizada; evitar pills muy redondeadas.
- **Bordes decorativos:** filetes dobles de oro (línea 2px + línea 1px separadas 3px),
  estilo orla de cartel. Componente reutilizable `<DecoRule/>`.

### 2.4 Sombras, texturas y motivos

- **Textura de papel:** overlay sutil (PNG/SVG de grano) a baja opacidad (~6–10%) sobre `paper`.
- **Grano de película:** capa de ruido animado muy tenue sobre secciones oscuras (opcional,
  respetando `prefers-reduced-motion`).
- **Sombras:** duras y bajas (estilo tinta), no blurs suaves de material design.
  `shadow-poster: 6px 6px 0 rgba(20,18,16,.25)`.
- **Motivos gráficos reutilizables:**
  - Sello circular "EST. 1934 · BARCELONA · BOXA" (SVG).
  - Estrella de cinco puntas (guiño a "Estrella", el fundador) como bullet/decoración.
  - Filete Art Déco (zigzag/escalonado) como separador de secciones.
  - Guantes / campana / ring como iconografía lineal (SVG stroke, 1.5px).
  - Marquesina de teatro: fila de "bombillas" (círculos oro) en bordes del hero.

### 2.5 Componentes base (a crear en `src/components`)

`Button` (variantes: `primary`=oxblood, `gold`, `ghost`) · `Kicker` · `SectionHeader` ·
`DecoRule` · `Stamp` (sello circular) · `CoachCard` · `PriceCard` · `ScheduleTable` ·
`LangSwitcher` · `Nav` (sticky) · `MobileMenu` · `Marquee` (texto en bucle) ·
`Reveal` (wrapper de animación scroll) · `Footer`.

---

## 3. Estructura de la landing (single-page)

Orden de secciones y ancla (`#id`). El nav sticky enlaza a estas anclas.

1. **Hero** `#inicio` — Cartel principal.
2. **Historia** `#historia` — El mito del Gran Price (1934–1973).
3. **El Club** `#club` — Qué es el boxeo aquí + el espacio (techos 5m, muros de piedra).
4. **Actividades** `#actividades` — Boxa Dirigit · Open Libre · Clases Personales.
5. **Coaches** `#coaches` — Los 9 entrenadores.
6. **Horario** `#horario` — Tabla semanal.
7. **Tarifas** `#tarifas` — Cuotas y bonos (enlazan a WodBuster).
8. **Galería** `#galeria` — Fotos del espacio + históricas (opcional según assets).
9. **Contacto / Localización** `#contacto` — Dirección, mapa, teléfonos, form/CTA.
10. **Footer** — Redes, legal, logo WodBuster, N.19441, federaciones.

**Nav sticky:** logo Gran Price a la izquierda; enlaces de ancla al centro;
`LangSwitcher` + botón CTA "Apúntate" (oxblood) a la derecha. En móvil → menú hamburguesa
a pantalla completa estilo telón.

---

## 4. Wireframe y contenido por sección

> El contenido real se reutiliza del sitio actual. Aquí se indica la copy base (ES) y la
> intención de layout. Sonnet debe crear las 3 versiones de idioma (ver §6).

### 4.1 Hero `#inicio`
- Fondo `ink` con textura + foto histórica del Gran Price al 20–30% en blanco/negro (parallax).
- Marquesina de bombillas de oro en borde superior.
- Kicker: `BARCELONA · EST. 1934` (Oswald, oro, tracking amplio).
- Titular `display-xl`: **"LA HISTORIA SE REPITE"** (Anton, crema, con "REPITE" en oro).
- Subtítulo (Lora): *"El templo del boxeo de Barcelona vuelve a abrir sus puertas."*
- Doble CTA: **"Apúntate ahora"** (oxblood → WodBuster) + **"Reserva clase de prueba"** (ghost).
- Sello circular "EST. 1934" abajo a la derecha.
- Indicador de scroll animado (campana o flecha).

### 4.2 Historia `#historia`
- Fondo `paper`. Layout editorial a 2 columnas.
- Kicker "EL MITO" · H2 "El Gran Price, 1934–1973".
- Texto: teatro de C/ Casanova con Floridablanca, 4.500 localidades, "el templo del boxeo",
  arquitecto Marino Canosa, leyendas Luís Romero / Fred Galiana / Mimoun Ben Ali, demolido 1973.
- **Timeline horizontal** con hitos (1934 inauguración · 1935 primeras veladas · 1947–51 Romero ·
  1972 última velada · 1973 demolición · Hoy renace).
- Cita destacada en `display-l` sobre foto histórica.

### 4.3 El Club `#club`
- Fondo `ink`. Foto real del gimnasio (parallax suave).
- Copy: el boxeo como entrenamiento cardiovascular por intervalos (3' trabajo / 1' descanso),
  beneficios físicos y mentales, clases de 1h (manoplas, técnica, saco, comba, sombra, circuitos,
  contacto ajustable). El espacio: edificio catalogado, techos de 5 m, muros de piedra, Eixample.
- Fila de **stats** animadas (contadores): `+35 años` experiencia · `9` coaches · `5 m` de techo ·
  `N.19441` club federado.

### 4.4 Actividades `#actividades`
- Fondo `paper`. 3 tarjetas tipo "cartel de combate":
  - **Boxa Dirigit** — clases grupales dirigidas.
  - **Open Libre** — entrenamiento libre/fitness.
  - **Clases Personales** — 1 a 1.
- Cada tarjeta: número de round (Alfa Slab One), icono lineal, título, descripción, enlace.

### 4.5 Coaches `#coaches`
- Fondo `ink`. Grid responsive (2/3/4 col) de `CoachCard`.
- Foto B/N con duotono (viraje a `paper`/`gold` en hover → pasa a color o gana filete oro).
- Nombre (Oswald) + rol/logro. Miguel Estrella destacado como **fundador, +35 años**.
- Los 9 (ver §8 para mapping de fotos): Jorge Estrella, Alvaro, **Miguel Estrella**, Walker,
  Alex Miserol, Martín, Alex Melvar, "lefoumusicon" (Campeón amateur Catalunya 2000–03, oro
  España 2001–02), Valentín. *(Nombres a confirmar/limpiar con el club.)*

### 4.6 Horario `#horario`
- Fondo `paper-deep`. `ScheduleTable` semanal (L–D, 8:00–20:00), franjas alternando
  **Boxa Dirigit** / **Open Libre** (color-coded: oxblood / gold).
- Responsive: tabla en desktop → acordeón por día en móvil.
- Nota "Horario Standard 1" y CTA a WodBuster para horario/reserva en vivo.

### 4.7 Tarifas `#tarifas`
- Fondo `ink`. Tarjetas de precio estilo "entrada de boxeo".
- **Cuotas mensuales:** Open Libre 5/sem **59€** · Boxa Dirigit 3/sem **69€** ·
  Boxa Dirigit 5/sem **79€** (destacada).
- **Bonos/servicios:** Clase de prueba **15€** · Bono 5 dirigidas **60€** · Clase personal **50€** ·
  Masaje deportivo **45€** · Entreno personal (2 pers.) **60€** · Seguro anual (obligatorio) **15€** ·
  Matrícula **50€**. Nota de descuentos por 2/3/6/12 meses.
- Cada botón enlaza a la URL de contratación de WodBuster correspondiente (ver §7).

### 4.8 Galería `#galeria` (opcional)
- Mosaico masonry mezclando fotos actuales del club + históricas B/N. Lightbox simple.
- Si no hay suficientes assets, fusionar con Historia/Club.

### 4.9 Contacto / Localización `#contacto`
- Fondo `paper`. 2 columnas: datos + mapa.
- Dirección: **Calle Aragón 289** (entre Pau Claris y Roger de Llúria), 08009 Barcelona.
- Teléfonos: **648 10 76 10** / **932 65 97 49**. Redes: Instagram / Facebook.
- Mapa embebido (Google Maps iframe, lazy).
- CTA principal → WodBuster (clase de prueba). *(Formulario propio descartado: usamos enlaces.)*

### 4.10 Footer
- Fondo `ink` profundo. Logo Gran Price, tagline, enlaces de ancla, redes,
  "Powered by WodBuster" (logo), N.19441, Consell Català de l'Esport, Federació Catalana de
  Boxa Amateur, aviso legal / privacidad, © año.

---

## 5. Especificación de animaciones (cinematográficas)

**Librerías:** GSAP + ScrollTrigger (animación e interacción de scroll) y Lenis (smooth scroll).
Alternativa ligera si se quiere evitar GSAP: Intersection Observer + CSS. **Recomendado GSAP**
por el nivel "wow" pedido. Todo debe respetar `prefers-reduced-motion: reduce` (desactivar
parallax, contadores instantáneos, sin grano animado).

| Zona | Animación |
|---|---|
| Carga inicial | Cortina/telón que sube revelando el hero (overlay `ink` con easing); logo fade-in. |
| Hero | Parallax de la foto de fondo; titular con reveal por líneas (mask-up); bombillas de marquesina con parpadeo aleatorio sutil; indicador de scroll con bounce. |
| Reveal genérico | `Reveal` wrapper: entrada fade + translateY 24px + clip-path, stagger en grupos. |
| Historia timeline | Línea que se "dibuja" al hacer scroll; hitos aparecen en secuencia. |
| Stats (El Club) | Contadores numéricos que suben al entrar en viewport (35, 9, 5, 19441). |
| Coaches | Hover: duotono → color + filete oro que se traza; ligero tilt 3D. |
| Tarifas | Tarjeta destacada con leve flotación; sello "MÁS POPULAR" con stamp-in. |
| Transición de sección | Filete Art Déco que se expande; cambio ink↔paper con "campana" (sonido opcional, muteado por defecto y con toggle). |
| Marquee | Texto en bucle horizontal ("BOXA · GRAN PRICE · 1934 · LA HISTORIA SE REPITE ·"). |
| Scroll global | Smooth scroll con Lenis; nav se compacta al bajar. |

**Presupuesto de motion:** nada de animaciones que bloqueen interacción > 400ms; usar
`transform`/`opacity` (GPU), no propiedades que fuercen layout. Grano/ruido con `will-change`
controlado.

---

## 6. Internacionalización (ES / CA / EN)

- **Enfoque Astro i18n:** rutas `/` (ES por defecto), `/ca/`, `/en/`. Configurar
  `i18n` en `astro.config.mjs` con `defaultLocale: 'es'`, `locales: ['es','ca','en']`,
  `routing: { prefixDefaultLocale: false }`.
- **Contenido:** diccionarios JSON en `src/i18n/{es,ca,en}.json` con las mismas claves;
  helper `t(key)` por locale. Todas las secciones consumen del diccionario, cero texto hardcodeado.
- **`LangSwitcher`:** conmutador ES/CA/EN en nav (y en footer) que preserva el ancla actual.
- **Contenido de partida:** el sitio actual ya es ES/CA → reutilizar ambos; traducir EN.
  `hreflang` y `<html lang>` correctos por versión.

---

## 7. Integración WodBuster (enlaces externos, pestaña nueva)

No se toca WodBuster. Todos los CTA relevantes enlazan con `target="_blank" rel="noopener"`.
Centralizar las URLs en `src/config/wodbuster.ts`:

```ts
export const WB_BASE = "https://boxagranprice.wodbuster.com";
export const WB = {
  socios:   `${WB_BASE}/user/default.aspx`,               // Zona socios / login
  // Contratación (IDs reales observados en el sitio actual; verificar antes de publicar):
  cuotaOpenLibre:      `${WB_BASE}/contratar.aspx?q=1&c=%7b%22Item1%22%3a4%2c%22Item2%22%3a1%7d`,
  cuotaDirigit3:       `${WB_BASE}/contratar.aspx?q=1&c=%7b%22Item1%22%3a17%2c%22Item2%22%3a1%7d`,
  cuotaDirigit5:       `${WB_BASE}/contratar.aspx?q=1&c=%7b%22Item1%22%3a18%2c%22Item2%22%3a1%7d`,
  // Bonos/servicios: /contratar.aspx?q=2&c=2 ... c=14 (mapear cada bono a su id).
} as const;
```

> **Acción de verificación:** los `Item1`/`c` pueden cambiar en WodBuster. Antes de publicar,
> confirmar cada enlace haciendo clic. Si algún id no resuelve, enlazar al listado general
> `${WB_BASE}/contratar.aspx`.

---

## 8. Assets reales a reutilizar

Todas las imágenes cuelgan del CDN de WodBuster. **Estrategia:** descargarlas a
`public/img/` y servirlas locales (evita hotlinking, permite optimización y duotono),
manteniendo copia de las URLs originales como referencia.

**Logo:** `https://cdn.wodbuster.com/static/2447/Logo.png?v=638255787080158763`

**Fotos de coaches (9):**
```
09b58582-0946-4553-b5a3-fcd6079a12f5.jpg
e49fa3bb-d848-45fd-9cbe-cbeaee333b97.jpg
c47a2aec-803d-45f7-8ab5-92fecfe410ee.jpg
7491715f-8426-4170-aeb7-8bcb86d50227.jpg
c59f4e6f-495e-441a-a658-994a2cf4fd46.jpg
1480a1fa-f502-45d5-ba3e-c767c024eab4.jpg
31df2b05-1c7b-410c-992f-a008892600f4.jpg
a3770247-2cbc-4fa2-9e7a-2f2e3ec21c87.jpg
b0452a1e-110a-45c1-b9b9-e2cbbae170cd.jpg
```
(prefijo `https://cdn.wodbuster.com/static/atletas/<x>/<y>/<z>/<uuid>.jpg`)

> **Mapping nombre↔foto:** no es fiable por la URL. Sonnet debe abrir el sitio actual,
> emparejar cada foto con su coach y guardarlas como `coach-<slug>.jpg`.

**Fotos históricas del Gran Price:** buscar en fuentes de dominio público / prensa histórica
(labarcelonadeantes.com, barcelonamemory.com, paseodegracia.com). Usar en B/N.
Si no hay licencia clara, aplicar duotono a fotos genéricas de boxeo de época libres de
derechos (Unsplash/openverse) y confirmar con el club qué imágenes propias pueden ceder.

**Optimización:** usar `astro:assets` (`<Image/>`) → AVIF/WebP, `loading="lazy"`,
tamaños responsive. Coaches en duotono vía CSS `filter`/`mix-blend` o SVG.

---

## 9. Arquitectura técnica

### 9.1 Estructura de carpetas
```
/
├─ astro.config.mjs          # integración tailwind, i18n, site + base (GitHub Pages)
├─ tailwind.config.mjs       # tokens de color/tipografía/espaciado
├─ package.json
├─ public/
│  ├─ img/                    # imágenes descargadas (logo, coaches, históricas)
│  ├─ textures/               # papel.png, grano.png/svg
│  └─ favicon / og-image
├─ src/
│  ├─ config/wodbuster.ts
│  ├─ i18n/{es,ca,en}.json + utils.ts
│  ├─ styles/global.css       # @font-face/@fontsource, capa de tokens, utilidades
│  ├─ components/             # (ver §2.5)
│  ├─ layouts/BaseLayout.astro
│  └─ pages/
│     ├─ index.astro          # ES
│     ├─ ca/index.astro
│     └─ en/index.astro
└─ .github/workflows/deploy.yml
```

### 9.2 `tailwind.config.mjs` (extracto de tokens)
```js
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#141210', 'ink-soft': '#211E1A',
        paper: '#F3E9D2', 'paper-deep': '#E7D9BA',
        gold: '#C8A24C', 'gold-bright': '#E4C06B',
        oxblood: '#8E2420', 'oxblood-bright': '#B23A2E',
        smoke: '#B9A88C',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sub: ['Oswald', 'sans-serif'],
        wood: ['"Alfa Slab One"', 'serif'],
        body: ['Lora', 'serif'],
      },
      boxShadow: { poster: '6px 6px 0 rgba(20,18,16,.25)' },
      borderRadius: { sm: '2px', md: '4px' },
    },
  },
  plugins: [],
};
```

### 9.3 `astro.config.mjs` (i18n + GitHub Pages)
```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://<usuario>.github.io',
  base: '/BoxeoPOC',              // nombre del repo (ver §11); '/' si dominio propio
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'ca', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
```

---

## 10. Accesibilidad, rendimiento y SEO

**Accesibilidad (objetivo AA):** contraste verificado (§2.1); navegación por teclado y `:focus-visible`
con anillo de oro; `alt` descriptivos; landmarks semánticos (`header/main/section/footer`);
`aria-current` en nav; menú móvil con trap de foco; respetar `prefers-reduced-motion`;
toggle de sonido muteado por defecto.

**Rendimiento (objetivo Lighthouse ≥90):** fuentes self-hosted con `font-display: swap` y
solo pesos usados; imágenes AVIF/WebP responsive y lazy; JS mínimo (Astro islands solo donde haga
falta: nav, lang switcher, animaciones); GSAP cargado diferido; sin CLS (reservar tamaños de imagen);
precargar el fondo del hero.

**SEO:** `<title>`/meta description por idioma; Open Graph + Twitter Card con og-image tipo cartel;
`hreflang` ES/CA/EN; JSON-LD `SportsClub`/`LocalBusiness` (nombre, dirección Aragón 289 08009 BCN,
teléfonos, redes, horario); sitemap (`@astrojs/sitemap`); URLs limpias.

---

## 11. Deploy en GitHub Pages

1. **`base`** en `astro.config.mjs` = `/<nombre-repo>` (confirmar el nombre real del repo en
   GitHub; el directorio local es `BoxeoPOC`). Todos los enlaces internos/anclas y `src` de
   assets deben respetar `import.meta.env.BASE_URL`.
2. **Workflow** `.github/workflows/deploy.yml` con la action oficial `withastro/action` +
   `actions/deploy-pages`:
```yaml
name: Deploy to GitHub Pages
on:
  push: { branches: [main] }        # o la rama que se decida publicar
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: false }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3        # detecta package manager, build, sube artifact
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: '${{ steps.deployment.outputs.page_url }}' }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
3. En **Settings → Pages** del repo: Source = **GitHub Actions**.
4. Verificar la URL pública `https://<usuario>.github.io/<repo>/` con el `base` correcto.

> Si más adelante se conecta un dominio propio (p. ej. subdominio de boxagranprice.com para
> la POC), poner `base: '/'` y configurar CNAME.

---

## 12. Plan de ejecución por fases (para Sonnet 5)

**Fase 0 — Scaffold**
- [ ] `npm create astro@latest` (plantilla mínima) + `@astrojs/tailwind`, `@astrojs/sitemap`.
- [ ] Añadir `@fontsource/anton`, `oswald`, `alfa-slab-one`, `lora`; GSAP + Lenis.
- [ ] Configurar `astro.config.mjs` (i18n + site + base) y `tailwind.config.mjs` (tokens §9.2).
- [ ] `global.css`: capa de tokens, textura de papel, utilidades (kicker, deco-rule).

**Fase 1 — Contenido y assets**
- [ ] Descargar logo + 9 fotos de coaches a `public/img/`; emparejar nombre↔foto.
- [ ] Conseguir/optimizar fotos históricas del Gran Price (B/N) — confirmar licencias con el club.
- [ ] Volcar toda la copy real a `src/i18n/es.json` y `ca.json`; traducir `en.json`.
- [ ] Rellenar `src/config/wodbuster.ts` y verificar cada enlace.

**Fase 2 — Componentes base**
- [ ] `BaseLayout`, `Nav` (sticky + móvil telón), `LangSwitcher`, `Footer`, `Button`, `Kicker`,
      `SectionHeader`, `DecoRule`, `Stamp`, `Marquee`, `Reveal`.

**Fase 3 — Secciones** (en orden §3)
- [ ] Hero → Historia → El Club → Actividades → Coaches → Horario → Tarifas → Galería → Contacto.
- [ ] `CoachCard`, `PriceCard`, `ScheduleTable`.

**Fase 4 — Animaciones**
- [ ] Lenis + ScrollTrigger; telón de carga; parallax hero; reveals con stagger; timeline;
      contadores; hover coaches; transiciones de sección; marquee. Gate con `prefers-reduced-motion`.

**Fase 5 — Pulido**
- [ ] Responsive (360 / 768 / 1024 / 1440); QA de contraste y teclado; alt e i18n completos.
- [ ] SEO/OG/JSON-LD/sitemap; og-image tipo cartel.
- [ ] Lighthouse ≥90 en todas las categorías; corregir CLS/JS pesado.

**Fase 6 — Deploy**
- [ ] `deploy.yml`; activar Pages (GitHub Actions); validar URL pública con `base`.

---

## 13. Criterios de aceptación

- [ ] Landing single-page en 3 idiomas (ES/CA/EN) con conmutador funcional.
- [ ] Estética "cartel de combate Art Déco" coherente (paleta y tipografía del §2).
- [ ] Todas las secciones del §3 con el contenido real reutilizado.
- [ ] CTA de "Apúntate", tarifas y "Zona socios" enlazan correctamente a WodBuster (pestaña nueva).
- [ ] Animaciones cinematográficas fluidas y con fallback `reduced-motion`.
- [ ] Responsive impecable y accesible (AA); Lighthouse ≥90.
- [ ] Desplegada en GitHub Pages con URL pública.

---

## 14. Preguntas abiertas / a confirmar con el club

1. **Nombres reales y roles** de los 9 coaches (limpiar handles como "lefoumusicon",
   "alex.miserol", "valentintrabajoss").
2. **Fotos históricas** con derechos de uso (¿tiene el club material propio de archivo?).
3. **Dirección definitiva:** el sitio actual muestra *Calle Aragón 289* pero el brief menciona
   la ubicación histórica Casanova/Floridablanca (esa es solo del teatro original). Confirmar.
4. **Idioma por defecto** (asumido ES) y si quieren detección por navegador.
5. **Dominio** para la POC (subdominio propio vs. `github.io`) → decide el valor de `base`.
6. **Sonido** en transiciones (campana): ¿lo quieren, aunque sea opt-in?
```
