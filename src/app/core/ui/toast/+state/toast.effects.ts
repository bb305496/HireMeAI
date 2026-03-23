import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from '../../../auth/+state/auth.actions';
import { ToastService} from '../service/toast.service';

export const loginToast$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const toast = inject(ToastService);
    return actions$.pipe(
      ofType(
        AuthActions.loginSuccess,
        AuthActions.loginFailure),
      tap((action) => {
        switch (action.type) {
          case AuthActions.loginSuccess.type:
            toast.show('Logged in successfully', 'success'); break;
          case AuthActions.loginFailure.type:
            toast.show('Unable to login', 'error'); break;
        }
      })
    );
  },
  { functional: true, dispatch: false }
);

export const registerSuccessToast$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const toast = inject(ToastService);
    return actions$.pipe(
      ofType(
        AuthActions.registerSuccess,
        AuthActions.registerFailure
      ),
      tap((action) => {
        switch (action.type) {
          case AuthActions.registerSuccess.type:
            toast.show('Account created successfully', 'success'); break;
          case AuthActions.registerFailure.type:
            toast.show('Unable to create account', 'error'); break;
        }
      })
    );
  },
  { functional: true, dispatch: false }
);

export const logOutSuccessToast$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const toast = inject(ToastService);
    return actions$.pipe(
      ofType(
        AuthActions.logoutSuccess,
        AuthActions.logoutFailure
      ),
      tap((action) => {
        switch (action.type) {
          case AuthActions.logoutSuccess.type:
            toast.show('Logged out successfully', 'success'); break;
          case AuthActions.logoutFailure.type:
            toast.show('Unable to logout', 'error'); break;
        }
      })
    );
  },
  { functional: true, dispatch: false }
)
