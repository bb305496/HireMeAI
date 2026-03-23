import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export interface AuthState {
  name: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  name: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error:   null,
  })),
  on(AuthActions.registerSuccess, (state, { name }) => ({
    ...state,
    loading: false,
    name,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error:   null,
  })),
  on(AuthActions.loginSuccess, (state, { name }) => ({
    ...state,
    loading: false,
    name,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logoutSuccess, () => {
    localStorage.removeItem('name');
    return initialAuthState;
  }),
);
