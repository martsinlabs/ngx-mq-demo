# NGX-MQ Demo

Interactive playground for [ngx-mq](https://github.com/martsinlabs/ngx-mq) **v3**,
signals-native media queries for Angular.

Built with Angular 20 (standalone, **zoneless**): no Zone.js and no UI framework,
just custom CSS. The whole page reacts to viewport and device changes live, with
zero subscription code.

## What it shows

- **Breakpoints**: `up` / `down` / `between` over the Tailwind scale.
- **Media features** (new in 3.0): `orientation`, `colorScheme`, `reducedMotion`,
  `hover`, `anyHover`, `pointer`, `anyPointer`, `colorGamut`, `displayMode`.
- **Composition**: `and` / `or` / `not` combine query signals into derived
  conditions with no extra wiring.
- **SSR-safe** defaults via `provideSsrValue`.

## Develop

```bash
npm start      # ng serve, http://localhost:4200/
npm run build  # production build into dist/
```

Try it: resize the window or open the browser device toolbar, every chip updates
in real time.
