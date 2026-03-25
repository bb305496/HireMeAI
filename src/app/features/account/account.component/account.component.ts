import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectName} from '../../../core/auth/+state/auth.selectors';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  private readonly store = inject(Store)
  protected userName = this.store.selectSignal(selectName)


  user = {
    name: 'Anna Kowalska',
    email: 'anna.kowalska@email.com',
    location: 'Warsaw, Poland',
    avatarInitials: 'AK',
  };

}
