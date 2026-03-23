import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  provideAppInitializer, inject
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {ActionReducer, provideStore, Store} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './core/auth/+state/auth.reducer';
import { AuthEffects } from './core/auth/+state/auth.effects';
import { uiReducer } from './core/ui/+state/ui.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import {AuthActions} from './core/auth/+state/auth.actions';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    const nextState = reducer(state, action);

    if (nextState.auth?.name) {
      localStorage.setItem('name', nextState.auth.name);
    } else {
      localStorage.removeItem('name');
    }

    return nextState;
  };
}

export function getInitialState() {
  return {
    auth: {
      name:    localStorage.getItem('name'),
      loading: false,
      error:   null,
    }
  };
}

export function initializeApp(store: Store) {
  return () => store.dispatch(AuthActions.checkSession());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      auth: authReducer,
      ui: uiReducer,
    },
    {
      initialState: getInitialState(),
      metaReducers: [localStorageSyncReducer]
    }
      ),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAppInitializer(() => {
      const store = inject(Store);
      store.dispatch(AuthActions.checkSession());
    })
  ],
};
