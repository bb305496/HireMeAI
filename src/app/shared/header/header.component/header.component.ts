import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  HostListener, inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {Store} from '@ngrx/store';
import {UiActions} from '../../../core/ui/+state/ui.actions';
import {selectIsLoggedIn} from '../../../core/auth/+state/auth.selectors';
import {AuthActions} from '../../../core/auth/+state/auth.actions';

interface NavLink {
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  store = inject(Store);

  isLoggedIn = this.store.selectSignal(selectIsLoggedIn);

  readonly navLinks: NavLink[] = [
    { label: 'Home', route: '/', exact: true },
    { label: 'How it works', route: '/how-it-works' },
    { label: 'CV Analysis', route: '/analysis' },
  ];

  isScrolled = false;
  mobileOpen = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 12;
    this.cdr.markForCheck();
  }

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
