import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectEmail, selectLocation, selectName} from '../../../core/auth/+state/auth.selectors';
import {AuthActions} from '../../../core/auth/+state/auth.actions';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  private readonly store = inject(Store);
  protected userName = this.store.selectSignal(selectName);
  protected profileAvatar = this.userName()?.charAt(0).toUpperCase();
  protected userEmail = this.store.selectSignal(selectEmail);
  protected userLocation = this.store.selectSignal(selectLocation);

  protected isEditingLocation = signal(false);
  protected editLocationValue = signal('');

  protected startEditing(): void {
    this.editLocationValue.set(this.userLocation() || '');
    this.isEditingLocation.set(true);
  }

  protected get counterClass(): string {
    const len = this.editLocationValue().length;
    if (len >= this.MAX_LOCATION_LENGTH) return 'is-at-limit';
    if (len >= this.MAX_LOCATION_LENGTH * 0.8) return 'is-near-limit';
    return '';
  }

  protected readonly MAX_LOCATION_LENGTH = 80;

  protected updateEditValue(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.editLocationValue.set(input.value.slice(0, this.MAX_LOCATION_LENGTH));
  }

  protected cancelEditing(): void {
    this.isEditingLocation.set(false);
  }

  protected saveLocation(): void {
    const newLocation = this.editLocationValue().trim().slice(0, this.MAX_LOCATION_LENGTH);
    this.store.dispatch(AuthActions.updateLocation({ location: newLocation }));

    this.isEditingLocation.set(false);
  }

}
