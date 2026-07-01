# Boxa Gran Price — Landing (POC)

Rediseño de la landing de [Club de Boxa Gran Price](https://www.boxagranprice.com/), inspirado en
el mítico teatro Gran Price de Barcelona (Casanova / Floridablanca, 1934–1973): estética de cartel
de combate Art Déco, contenido real del club y animaciones cinematográficas.

Ver [`DESIGN_PLAN.md`](./DESIGN_PLAN.md) para el sistema de diseño completo y el plan de ejecución.

La gestión de reservas, tarifas dinámicas y zona de socios sigue en **WodBuster** (tercero); esta
landing solo enlaza a ella, no la sustituye.

## Stack

- [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com)
- [GSAP](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering) para las animaciones
- i18n nativo de Astro: ES (por defecto) / CA / EN

## Estructura

```
src/
├─ components/        # componentes base + components/sections (una por bloque de la landing)
├─ config/            # WodBuster, coaches, horario, tarifas (datos reales del club)
├─ i18n/              # diccionarios es.json / ca.json / en.json
├─ layouts/           # BaseLayout.astro
├─ pages/             # index.astro (ES), ca/, en/
├─ scripts/           # animations.ts (Lenis + GSAP ScrollTrigger)
├─ styles/            # global.css (tokens de Tailwind v4 vía @theme)
└─ utils/             # asset() — antepone el `base` de Astro a las rutas de public/
```

## Comandos

| Comando           | Acción                                          |
| :----------------- | :----------------------------------------------- |
| `npm install`       | Instala dependencias                             |
| `npm run dev`        | Arranca el servidor de desarrollo                |
| `npm run build`      | Compila a `./dist/`                              |
| `npm run preview`    | Sirve el build de producción en local            |
| `npx astro check`   | Type-check de los componentes `.astro`           |

## Despliegue

Se despliega automáticamente a GitHub Pages vía `.github/workflows/deploy.yml` al hacer push a
`main`. El `base` en `astro.config.mjs` está fijado al nombre del repositorio.
