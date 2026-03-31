import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Dynamic routes with URL params must use Server render mode
  // (they cannot be statically prerendered without getPrerenderParams)
  { path: 'cars/:id',         renderMode: RenderMode.Server },
  { path: 'cars/:id/edit',    renderMode: RenderMode.Server },
  { path: 'cars/:id/book',    renderMode: RenderMode.Server },
  { path: 'cars/:id/review',  renderMode: RenderMode.Server },

  // All other routes are statically prerendered at build time
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
