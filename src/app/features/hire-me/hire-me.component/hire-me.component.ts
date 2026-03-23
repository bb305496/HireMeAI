import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {HeaderComponent} from '../../../shared/header/header.component/header.component';
import {AnalyzerFormComponent} from '../../analyzer/analyzer-form.component/analyzer-form.component';
import {HomeComponent} from '../../home/home.component/home.component';
import {FooterComponent} from '../../../shared/footer/footer.component/footer.component';
import {Store} from '@ngrx/store';
import {selectIsLoginOpen, selectIsRegisterOpen} from '../../../core/ui/+state/ui.selectors';
import {RegisterModalComponent} from '../../../shared/register/register-modal.component/register-modal.component';
import {LoginModalComponent} from '../../../shared/login/login-modal.component/login-modal.component';

@Component({
  selector: 'app-hire-me',
  imports: [
    HeaderComponent,
    AnalyzerFormComponent,
    HomeComponent,
    FooterComponent,
    RegisterModalComponent,
    LoginModalComponent
  ],
  templateUrl: './hire-me.component.html',
  styleUrl: './hire-me.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HireMeComponent {
  store = inject(Store);

  isRegisterOpen = this.store.selectSignal(selectIsRegisterOpen);

  isLoginOpen = this.store.selectSignal(selectIsLoginOpen);

}
