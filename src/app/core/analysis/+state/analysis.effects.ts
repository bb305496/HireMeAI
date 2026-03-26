import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AnalysisActions } from './analysis.actions';
import { AnalysisService } from '../services/analysis.service';

@Injectable()
export class AnalysisEffects {
  private actions$ = inject(Actions);
  private analysisService = inject(AnalysisService);

  analyzeCv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalysisActions.analyzeCv),
      switchMap(({ data }) =>
        this.analysisService.analyzeCv(data.cv, data.jobOffer, data.isUrl).pipe(
          map((result) => AnalysisActions.analyzeCvSuccess({ result })),
          catchError((err) =>
            of(AnalysisActions.analyzeCvFailure({
              error: err?.error?.message ?? 'Analysis failed'
            }))
          )
        )
      )
    )
  );
}
