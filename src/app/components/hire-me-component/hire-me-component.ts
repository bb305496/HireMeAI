import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from '../header-component/header-component';
import {AnalyzerFormComponent} from '../analyzer-form-component/analyzer-form-component';
import {HeroComponent} from '../hero-component/hero-component';
import {ResultsComponent} from '../results-component/results-component';
import {FooterComponent} from '../footer-component/footer-component';

@Component({
  selector: 'app-hire-me-component',
  imports: [
    HeaderComponent,
    AnalyzerFormComponent,
    HeroComponent,
    ResultsComponent,
    FooterComponent
  ],
  templateUrl: './hire-me-component.html',
  styleUrl: './hire-me-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HireMeComponent {

}
