import { Component } from '@angular/core';
import {HireMeComponent} from './components/hire-me-component/hire-me-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    HireMeComponent
  ],
  styleUrl: './app.css'
})
export class App {

}
