# Portafolio · Ángel Martín

Portafolio personal hecho con React + Vite, publicado en <https://malaaya.github.io>.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # genera /dist
npm run lint
```

## Deploy

Cada push a `main` ejecuta `.github/workflows/deploy.yml`, que compila el proyecto y lo publica en GitHub Pages.
Requiere que en **Settings → Pages → Source** esté seleccionado **GitHub Actions**.

## Editar contenido

Todo el contenido (proyectos, skills, educación, links) está en los arreglos al inicio de `src/App.jsx`.
