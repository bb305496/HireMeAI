import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  HostListener, inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {Store} from '@ngrx/store';
import {UiActions} from '../../../store/ui/ui-actions';

interface NavLink {
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-header-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  store = inject(Store);
  openRegister(): void {
    this.store.dispatch(UiActions.openModal({ modal: 'register' }));
  }

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

  toggleMobile(): void {
    this.mobileOpen = !this.mobileOpen;
  }

  closeMobile(): void {
    this.mobileOpen = false;
  }
}
