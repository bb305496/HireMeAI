import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'analyzer',
    loadComponent: () => import('./features/analyzer/analyzer.component/analyzer.component').then(m => m.AnalyzerComponent),
  }
];
