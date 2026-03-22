import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from './auth-actions';
import { AuthService } from '../../core/services/auth-service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ email, password }) =>
        this.authService.register({ email, password }).pipe(
          map(({ token }) => AuthActions.registerSuccess({ token })),
          catchError((err) =>
            of(AuthActions.registerFailure({
              error: err?.error?.message ?? 'Unable to register',
            }))
          )
        )
      )
    )
  );

}
