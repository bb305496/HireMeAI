import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {HeaderComponent} from '../../../shared/header/header.component/header.component';
import {FooterComponent} from '../../../shared/footer/footer.component/footer.component';
import {Store} from '@ngrx/store';
import {selectIsLoginOpen, selectIsRegisterOpen} from '../../../core/ui/modal/+state/ui.selectors';
import {RegisterModalComponent} from '../../../shared/register/register-modal.component/register-modal.component';
import {LoginModalComponent} from '../../../shared/login/login-modal.component/login-modal.component';
import {ToastContainerComponent} from '../../../shared/toast/toast-container.component/toast-container.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-hire-me',
  imports: [
    HeaderComponent,
    FooterComponent,
    RegisterModalComponent,
    LoginModalComponent,
    ToastContainerComponent,
    RouterOutlet
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
