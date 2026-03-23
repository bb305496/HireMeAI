import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from './auth-actions';
import { AuthService } from '../services/auth-service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ name, email, password }) =>
        this.authService.register({ name, email, password }).pipe(
          map(({ token }) => AuthActions.registerSuccess({ token, name })),
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
