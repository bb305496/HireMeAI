import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnalysisActions} from '../../../core/analysis/+state/analysis.actions';
import { selectResult, selectLoading, selectError } from '../../../core/analysis/+state/analysis.selectors';

@Component({
  selector: 'app-analyzer',
  imports: [],
  templateUrl: './analyzer.component.html',
  styleUrl: './analyzer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyzerComponent {
  private store = inject(Store);

  cvFile = signal<File | null>(null);
  jobOffer = signal<string>('');
  isUrl = signal<boolean>(false);

  result = this.store.selectSignal(selectResult);
  loading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.cvFile.set(input.files[0]);
    }
  }

  onSubmit(): void {
    const cv = this.cvFile();
    const offer = this.jobOffer();

    if (!cv || !offer) return;

    this.store.dispatch(AnalysisActions.analyzeCv({
      data: {
        cv,
        jobOffer: offer,
        isUrl: this.isUrl()
      }
    }));
  }
}
