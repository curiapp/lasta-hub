import { RenderMode } from '@angular/ssr';
export const serverRoutes = [
    {
        path: '**',
        renderMode: RenderMode.Client
    }
];
