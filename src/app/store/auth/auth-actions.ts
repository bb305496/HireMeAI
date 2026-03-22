import {createActionGroup, emptyProps, props} from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Register': props<{ email: string; password: string }>(),
    'Register Success': props<{ token: string; }>(),
    'Register Failure': props<{ error: string }>(),

    'Logout': emptyProps(),
  }
});
