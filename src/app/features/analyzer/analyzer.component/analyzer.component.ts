import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AnalysisActions} from '../../../core/analysis/+state/analysis.actions';
import { selectResult, selectLoading, selectError } from '../../../core/analysis/+state/analysis.selectors';
import { ToastService } from '../../../core/ui/toast/service/toast.service';
import { AnalyzerResultComponent } from '../analyzer-result.component/analyzer-result.component';

@Component({
  selector: 'app-analyzer',
  imports: [
    AnalyzerResultComponent
  ],
  templateUrl: './analyzer.component.html',
  styleUrl: './analyzer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyzerComponent {
  private store = inject(Store);
  private toast = inject(ToastService);

  cvFile = signal<File | null>(null);
  jobOffer = signal<string>('');
  isUrl = signal<boolean>(false);
  readonly maxPDFSize = 5;
  currentStep = signal<number>(0);
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
    this.currentStep.set(0);
    this.stepInterval = setInterval(() => {
      const next = this.currentStep() + 1;
      if (next <= 3) {
        this.currentStep.set(next);
      } else {
        this.stopStepProgress();
      }
    }, 7000);
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
      const file = input.files[0];

      if (file.type !== 'application/pdf') {
        this.toast.show('Only PDF files are allowed', 'error');
        input.value = '';
        return;
      }

      if (file.size > this.maxPDFSize * 1024 * 1024) {
        this.toast.show(`File exceeds the ${this.maxPDFSize}MB size limit`, 'error');
        input.value = '';
        return;
      }

      this.cvFile.set(file);

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
