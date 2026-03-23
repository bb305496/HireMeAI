import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {AuthResponse, RegisterRequest} from '../model/auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Register': props<RegisterRequest>(),
    'Register Success': props<AuthResponse>(),
    'Register Failure': props<{ error: string }>(),

    'Logout': emptyProps(),
  }
});
