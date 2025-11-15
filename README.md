# Aplicación de Recetas

Proyecto de recetas desarrollado con React, React Router y Material-UI (MUI) sobre Vite. Incluye listado de recetas, detalle con ingredientes y pasos, navegación, Context API para estado global y varios extras: buscador, filtros, favoritos, calificaciones, dark mode, animaciones y estilos para impresión.

## Tecnologías
- React 19
- React Router DOM 7
- Material-UI 7 + Icons
- Vite 7
- Notistack, Framer Motion

## Ejecutar el proyecto
```powershell
npm install
npm run dev
```
Abrir en el navegador: `http://localhost:5173`

## Estructura
```
src/
  components/
    layout/
    recetas/
  constants/
  contexts/
  data/
  hooks/
  pages/
  utils/
```

## Funcionalidades
- Listado de recetas en cards responsive
- Detalle de receta con ingredientes y pasos
- Navegación con rutas: `/`, `/recetas`, `/recetas/:id`, `/favoritos`, `/acerca-de`, `*` (404)
- Context API: recetas, filtros, orden, paginación, favoritos, ratings
- Datos locales en `src/data/recetas.json` (18 recetas)
- Extras: buscador, filtros (categoría/dificultad), favoritos (localStorage), compartir enlace, calificaciones con baseline, modal de receta, dark mode, animaciones, estilos de impresión
