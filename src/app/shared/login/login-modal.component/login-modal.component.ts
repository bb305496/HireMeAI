import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {selectError, selectLoading} from '../../../core/auth/+state/auth.selectors';
import {AuthActions} from '../../../core/auth/+state/auth.actions';
import {UiActions} from '../../../core/ui/+state/ui.actions';

@Component({
  selector: 'app-login-modal',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent {
  private store = inject(Store);
  private fb    = inject(FormBuilder);

  loading = this.store.selectSignal(selectLoading);
  error   = this.store.selectSignal(selectError);

  form = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const { email, password } = this.form.value;
    this.store.dispatch(AuthActions.login({ email: email!, password: password! }));
  }

  switchToRegister(): void {
    this.store.dispatch(UiActions.openModal({ modal: 'register'}));
  }

  close(): void {
    this.store.dispatch(UiActions.closeModal());
  }
}
