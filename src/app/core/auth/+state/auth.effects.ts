import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from './auth.actions';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ name, email, password }) =>
        this.authService.register({ name, email, password }).pipe(
          map(({ name }) => AuthActions.registerSuccess({ name })),
          catchError((err) =>
            of(AuthActions.registerFailure({
              error: err?.error?.message ?? 'Unable to register',
            }))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map(({ name }) => AuthActions.loginSuccess({ name })),
          catchError((err) =>
            of(AuthActions.loginFailure({
              error: err?.error?.message ?? 'Unable to login',
            }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() =>
        this.authService.logout().pipe(
          tap(() => this.router.navigate(['/'])),
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutFailure({ error: 'Logout failed' })))
        )
      )
    )
  );

  checkSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkSession),
      switchMap(() =>
        this.authService.me().pipe(
          map(({ name }) => AuthActions.checkSessionSuccess({ name })),
          catchError(() => of(AuthActions.checkSessionFailure()))
        )
      )
    )
  );

}
