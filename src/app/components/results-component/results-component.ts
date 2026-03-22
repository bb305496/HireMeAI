import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-results-component',
  imports: [],
  templateUrl: './results-component.html',
  styleUrl: './results-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {}
