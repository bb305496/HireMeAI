import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component/home.component';
import {AnalyzerComponent} from './features/analyzer/analyzer.component/analyzer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'analyzer', component: AnalyzerComponent},
  { path: '**', redirectTo: '' },
];
