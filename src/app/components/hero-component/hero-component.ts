import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-hero-component',
  imports: [],
  templateUrl: './hero-component.html',
  styleUrl: './hero-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}
