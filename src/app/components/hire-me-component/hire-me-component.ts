import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from '../header-component/header-component';
import {AnalyzerFormComponent} from '../analyzer-form-component/analyzer-form-component';
import {HomeComponent} from '../home-component/home-component';
import {FooterComponent} from '../footer-component/footer-component';

@Component({
  selector: 'app-hire-me-component',
  imports: [
    HeaderComponent,
    AnalyzerFormComponent,
    HomeComponent,
    FooterComponent
  ],
  templateUrl: './hire-me-component.html',
  styleUrl: './hire-me-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HireMeComponent {

}
