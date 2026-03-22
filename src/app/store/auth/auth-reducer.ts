import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth-actions';

export interface AuthState {
  token:         string | null;
  loading:       boolean;
  error:         string | null;
}

export const initialAuthState: AuthState = {
  token:   null,
  loading: false,
  error:   null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error:   null,
  })),
  on(AuthActions.registerSuccess, (state, { token }) => ({
    ...state,
    loading: false,
    token,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, () => initialAuthState),
);
