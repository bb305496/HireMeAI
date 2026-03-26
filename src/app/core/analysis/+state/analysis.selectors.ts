import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnalysisState} from './analysis.reducer';

export const selectAnalysisState = createFeatureSelector<AnalysisState>('analysis');

export const selectResult  = createSelector(selectAnalysisState, (state) => state.result);
export const selectLoading = createSelector(selectAnalysisState, (state) => state.loading);
export const selectError   = createSelector(selectAnalysisState, (state) => state.error);
