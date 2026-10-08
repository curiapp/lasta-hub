import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const USE_GLOBAL_LOADING = new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.context.get(USE_GLOBAL_LOADING)) {
    return next(req);
  }

  const loadingService = inject(LoadingService);
  loadingService.begin();
  return next(req).pipe(
    finalize(() => loadingService.end())
  );
};
