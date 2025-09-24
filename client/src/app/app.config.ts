import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // importProvidersFrom(RouterModule),
    provideClientHydration(withEventReplay(), withHttpTransferCacheOptions({
      includeRequestsWithAuthHeaders: true,
      includePostRequests: true
    })),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
  ]
};
