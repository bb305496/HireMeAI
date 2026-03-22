import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {HeaderComponent} from '../../../shared/header/header-component/header-component';
import {AnalyzerFormComponent} from '../../analyzer/analyzer-form-component/analyzer-form-component';
import {HomeComponent} from '../../home/home-component/home-component';
import {FooterComponent} from '../../../shared/footer/footer-component/footer-component';
import {Store} from '@ngrx/store';
import {selectIsRegisterOpen} from '../../../store/ui/ui-selectors';
import {RegisterModalComponent} from '../../../shared/register-modal-component/register-modal-component';

@Component({
  selector: 'app-hire-me-component',
  imports: [
    HeaderComponent,
    AnalyzerFormComponent,
    HomeComponent,
    FooterComponent,
    RegisterModalComponent
  ],
  templateUrl: './hire-me-component.html',
  styleUrl: './hire-me-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HireMeComponent {
  store = inject(Store);

  isRegisterOpen = this.store.selectSignal(selectIsRegisterOpen);

}
