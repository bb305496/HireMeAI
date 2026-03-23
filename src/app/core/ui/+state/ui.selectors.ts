import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const selectActiveModal  = createSelector(selectUiState, (state) => state.activeModal);
export const selectIsModalOpen  = createSelector(selectActiveModal, (modal) => modal !== null);
export const selectIsRegisterOpen = createSelector(selectActiveModal, (modal) => modal === 'register');
export const selectIsLoginOpen    = createSelector(selectActiveModal, (modal) => modal === 'login');
