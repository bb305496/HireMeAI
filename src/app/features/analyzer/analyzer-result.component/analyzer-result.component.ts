import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectResult } from '../../../core/analysis/+state/analysis.selectors';
import { AnalysisActions } from '../../../core/analysis/+state/analysis.actions';

@Component({
  selector: 'app-analyzer-result',
  standalone: true,
  imports: [],
  templateUrl: './analyzer-result.component.html',
  styleUrl: './analyzer-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyzerResultComponent {
  private store = inject(Store);

  result = this.store.selectSignal(selectResult);

  onResetClicked(): void {
    this.store.dispatch(AnalysisActions.clearResult());
  }
}
