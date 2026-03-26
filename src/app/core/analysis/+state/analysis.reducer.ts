import { createFeature, createReducer, on } from '@ngrx/store';
import { AnalysisResponse} from '../model/analysis.model';
import { AnalysisActions } from './analysis.actions';

export interface AnalysisState {
  result: AnalysisResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnalysisState = {
  result: null,
  loading: false,
  error: null,
};

export const analysisReducer = createReducer(
  initialState,
  on(AnalysisActions.analyzeCv, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AnalysisActions.analyzeCvSuccess, (state, { result }) => ({
    ...state,
    loading: false,
    result,
  })),
  on(AnalysisActions.analyzeCvFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AnalysisActions.clearResult, (state) => ({
    ...state,
    result: null,
    error: null,
  }))
);
