import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-analyzer',
  imports: [],
  templateUrl: './analyzer.component.html',
  styleUrl: './analyzer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyzerComponent {}
