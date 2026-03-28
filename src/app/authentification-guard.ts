import { CanActivateFn, Router } from '@angular/router';
import { Authentification } from './services/auth';
import { inject } from '@angular/core';

export const authentificationGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(Authentification);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigateByUrl('/', { replaceUrl: true });
  return false;
};
