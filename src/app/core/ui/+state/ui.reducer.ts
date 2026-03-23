import { createReducer, on } from '@ngrx/store';
import { UiActions, ModalType } from './ui.actions';
import { AuthActions } from '../../auth/+state/auth.actions';

export interface UiState {
  activeModal: ModalType;
}

export const initialUiState: UiState = {
  activeModal: null,
};

export const uiReducer = createReducer(
  initialUiState,

  on(UiActions.openModal, (state, { modal }) => ({
    ...state,
    activeModal: modal,
  })),

  on(UiActions.closeModal, (state) => ({
    ...state,
    activeModal: null,
  })),

  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    activeModal: null,
  })),
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    activeModal: null,
  })),
);
