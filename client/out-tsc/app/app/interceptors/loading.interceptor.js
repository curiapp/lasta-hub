import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';
export const loadingInterceptor = (req, next) => {
    const loadingService = inject(LoadingService);
    loadingService.setLoading(true);
    return next(req).pipe(finalize(() => loadingService.setLoading(false)));
};
