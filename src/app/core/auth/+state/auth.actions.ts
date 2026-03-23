import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {AuthResponse, LoginRequest, RegisterRequest} from '../model/auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Register': props<RegisterRequest>(),
    'Register Success': props<AuthResponse>(),
    'Register Failure': props<{ error: string }>(),

    'Login': props<LoginRequest>(),
    'Login Success': props<AuthResponse>(),
    'Login Failure': props<{ error: string }>(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>(),
  }
});
