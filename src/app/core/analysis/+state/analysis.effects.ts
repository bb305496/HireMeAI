import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AnalysisActions } from './analysis.actions';
import { AnalysisService } from '../services/analysis.service';
import { ToastService } from '../../ui/toast/service/toast.service';

@Injectable()
export class AnalysisEffects {
  private actions$ = inject(Actions);
  private analysisService = inject(AnalysisService);
  private toast = inject(ToastService);

  analyzeCv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnalysisActions.analyzeCv),
      switchMap(({ data }) =>
        this.analysisService.analyzeCv(data.cv, data.jobOffer, data.isUrl).pipe(
          map((result) => AnalysisActions.analyzeCvSuccess({ result })),
          catchError((err) => {
            const message = err?.status === 403
              ? 'AI query limit has been reached. Please try again next day.'
              : (err?.error?.message ?? 'Analysis failed');

            this.toast.show(message, 'error');

            return of(AnalysisActions.analyzeCvFailure({ error: message }));
          })
        )
      )
    )
  );
}
