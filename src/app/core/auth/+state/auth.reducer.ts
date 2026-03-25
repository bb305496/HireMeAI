import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export interface AuthState {
  name: string | null;
  email: string | null;
  location: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  name: null,
  email: null,
  location: null,
  loading: false,
  error: null,
};

const setUser = (state: AuthState, { name, email, location }: { name: string; email: string; location: string | null }) => ({
  ...state,
  name,
  email,
  location,
  loading: false,
  error: null,
});

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, setUser),
  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, setUser),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.checkSessionSuccess, setUser),
  on(AuthActions.checkSessionFailure, (state) => ({
    ...state,
    name: null,
  })),
  on(AuthActions.updateLocation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.updateLocationSuccess, setUser),
  on(AuthActions.updateLocationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.logoutSuccess, () => {
    return initialAuthState;
  }),
  on(AuthActions.clearAuthError, (state) => ({
    ...state,
    error: null,
  })),
);
