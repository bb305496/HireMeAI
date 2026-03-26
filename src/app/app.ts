import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FooterComponent } from './shared/footer/footer.component/footer.component';
import { HeaderComponent } from './shared/header/header.component/header.component';
import { LoginModalComponent } from './shared/login/login-modal.component/login-modal.component';
import { RegisterModalComponent } from './shared/register/register-modal.component/register-modal.component';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from './shared/toast/toast-container.component/toast-container.component';
import { Store } from '@ngrx/store';
import { selectIsLoginOpen, selectIsRegisterOpen } from './core/ui/modal/+state/ui.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    FooterComponent,
    HeaderComponent,
    LoginModalComponent,
    RegisterModalComponent,
    RouterOutlet,
    ToastContainerComponent
  ],
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  store = inject(Store);

  isRegisterOpen = this.store.selectSignal(selectIsRegisterOpen);

  isLoginOpen = this.store.selectSignal(selectIsLoginOpen);

}
