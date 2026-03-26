import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { NavLink } from '../../../core/models/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly appVersion = environment.version;
  readonly currentYear = new Date().getFullYear();
  readonly contactEmail = 'barb305496@gmail.com';
  readonly githubUrl = 'https://github.com/bb305496';
  readonly linkedinUrl = 'https://www.linkedin.com/in/biebar/';

  // TODO add links
  readonly productLinks: NavLink[] = [
    { label: 'How  it works?', route: '/', fragment: 'how-it-works' },
    { label: 'FAQ', route: '/' },
    { label: 'Changelog', route: '/' },
  ];
}
