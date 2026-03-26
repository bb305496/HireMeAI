import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
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
  readonly maxPDFSize = 5;
  currentStep = signal<number>(1);
  private stepInterval: ReturnType<typeof setInterval> | null = null;

  result = this.store.selectSignal(selectResult);
  loading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);

  constructor() {
    effect(() => {
      if (this.loading()) {
        this.startStepProgress();
      } else {
        this.stopStepProgress();
      }
    });
  }

  private startStepProgress(): void {
    this.stopStepProgress();
    this.currentStep.set(1);
    this.stepInterval = setInterval(() => {
      const next = this.currentStep() + 1;
      if (next <= 3) {
        this.currentStep.set(next);
      } else {
        this.stopStepProgress();
      }
    }, 5000);
  }

  private stopStepProgress(): void {
    if (this.stepInterval) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
    }
  }

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

  onReset(): void {
    this.store.dispatch(AnalysisActions.clearResult());
    this.cvFile.set(null);
    this.jobOffer.set('');
    this.isUrl.set(false);
  }
}
