import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'analyzer',
    loadComponent: () => import('./features/analyzer/analyzer.component/analyzer.component').then(m => m.AnalyzerComponent),
  },
  {
    path: 'account',
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/account.component/account.component').then(m => m.AccountComponent),
  }
];
