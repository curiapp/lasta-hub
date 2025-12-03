import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideRouter, withViewTransitions } from '@angular/router';
import { InMemoryCache } from '@apollo/client';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { loadingInterceptor } from './interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
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
