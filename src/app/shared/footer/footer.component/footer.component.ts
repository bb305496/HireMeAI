import {ChangeDetectionStrategy, Component} from '@angular/core';
import {environment} from "../../../../environments/environment";

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-footer.component',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly appVersion = environment.version;
  readonly currentYear = new Date().getFullYear();
  // TODO add links
  readonly contactEmail = 'mail@mail.com';
  readonly githubUrl = 'toDO';
  readonly linkedinUrl = 'toDO';

  // TODO add links
  readonly productLinks: NavLink[] = [
    { label: 'How does it work?', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Changelog', href: '#' },
  ];
}
