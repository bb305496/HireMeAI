import { createActionGroup, emptyProps, props } from '@ngrx/store';

export type ModalType = 'register' | 'login' | null;

export const UiActions = createActionGroup({
  source: 'UI',
  events: {
    'Open Modal': props<{ modal: 'register' | 'login' }>(),
    'Close Modal': emptyProps(),
  }
});
