import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from './loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  // 1. Show Loader immediately
  loaderService.show();

  return next(req).pipe(
    // 2. Hide Loader when observable completes (success or error)
    finalize(() => {
      loaderService.hide();
    })
  );
};
