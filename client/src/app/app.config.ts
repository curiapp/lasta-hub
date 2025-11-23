import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom, inject } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import { environment } from '../environments/environment';

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
    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        link: httpLink.create({
          uri: environment.graphqlUrl,
        }),
        cache: new InMemoryCache(),
      };
    }),
  ]
};
