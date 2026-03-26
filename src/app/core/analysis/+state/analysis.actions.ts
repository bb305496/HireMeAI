import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AnalysisData, AnalysisResponse } from '../model/analysis.model';

export const AnalysisActions = createActionGroup({
  source: 'Analysis',
  events: {
    'Analyze Cv': props<{ data: AnalysisData }>(),
    'Analyze Cv Success': props<{ result: AnalysisResponse }>(),
    'Analyze Cv Failure': props<{ error: string }>(),
    'Clear Result': emptyProps(),
  }
});
