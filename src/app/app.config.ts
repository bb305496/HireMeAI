import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  provideAppInitializer, inject
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';
import { provideStore, Store } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authReducer } from './core/auth/+state/auth.reducer';
import { AuthEffects } from './core/auth/+state/auth.effects';
import * as ToastEffects from './core/ui/toast/+state/toast.effects';
import { uiReducer } from './core/ui/modal/+state/ui.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthActions } from './core/auth/+state/auth.actions';
import { analysisReducer } from './core/analysis/+state/analysis.reducer';
import { AnalysisEffects } from './core/analysis/+state/analysis.effects';

export function initializeApp(store: Store) {
  return () => store.dispatch(AuthActions.checkSession());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN'
      })
    ),
    provideStore({
      auth: authReducer,
      ui: uiReducer,
      analysis: analysisReducer,
    },
    ),
    provideEffects([AuthEffects, ToastEffects, AnalysisEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAppInitializer(() => {
      const store = inject(Store);
      store.dispatch(AuthActions.checkSession());
    })
  ],
};
