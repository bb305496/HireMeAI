import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from '../../ui/toast/service/toast.service';
import { Store } from '@ngrx/store';
import { UiActions } from '../../ui/modal/+state/ui.actions';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);
  const store = inject(Store);

  return auth.me().pipe(
    map(() => true),
    catchError(() => {
      store.dispatch(UiActions.openModal({ modal: 'login' }));
      toast.show('Please log in or create account to continue', 'info');
      return of(router.createUrlTree(['/']));
    })
  )
};
