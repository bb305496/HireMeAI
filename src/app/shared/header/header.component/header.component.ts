import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  HostListener, inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {Store} from '@ngrx/store';
import {UiActions} from '../../../core/ui/modal/+state/ui.actions';
import {selectIsLoggedIn} from '../../../core/auth/+state/auth.selectors';
import {AuthActions} from '../../../core/auth/+state/auth.actions';
import {NavLink} from '../../../core/models/models';
import {toSignal} from '@angular/core/rxjs-interop';
import {distinctUntilChanged, fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  store = inject(Store);

  isLoggedIn = this.store.selectSignal(selectIsLoggedIn);

  readonly navLinks: NavLink[] = [
    { label: 'Home', route: '/', exact: true },
    { label: 'CV Analysis', route: '/analyzer' },
  ];

  mobileOpen = false;

  isScrolled = toSignal(
    fromEvent(window, 'scroll').pipe(
      map(() => window.scrollY > 12),
      distinctUntilChanged()
    ), { initialValue: false }
  );

  openRegister(): void {
    this.store.dispatch(UiActions.openModal({ modal: 'register' }));
  }

  openLogin(): void {
    this.store.dispatch(UiActions.openModal({ modal: 'login' }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobile(): void {
    this.mobileOpen = false;
  }
}
