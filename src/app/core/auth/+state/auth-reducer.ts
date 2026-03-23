import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth-actions';

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
    name,
  })),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logoutSuccess, () => {
    localStorage.removeItem('name');
    return initialAuthState;
  }),
);
