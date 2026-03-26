import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AnalysisService } from '../../../core/services/analysis.service';
import { AnalysisResponse } from '../../../core/models/analysis.model';

@Component({
  selector: 'app-analyzer',
  imports: [],
  templateUrl: './analyzer.component.html',
  styleUrl: './analyzer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyzerComponent {
  private analysisService = inject(AnalysisService);

  cvFile = signal<File | null>(null);
  jobOffer = signal<string>('');
  isUrl = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  result = signal<AnalysisResponse | null>(null);

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.cvFile.set(input.files[0]);
    }
  }

  onSubmit(): void {
    const cv = this.cvFile();
    const offer = this.jobOffer();

    if (!cv || !offer) {
      console.log('Missing CV or job offer');
      return;
    }

    this.isLoading.set(true);

    this.analysisService.analyzeCv(cv, offer, this.isUrl()).subscribe({
      next: (response) => {
        console.log('Analysis result:', response);
        this.result.set(response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Analysis error:', err);
        this.isLoading.set(false);
      }
    });
  }
}
