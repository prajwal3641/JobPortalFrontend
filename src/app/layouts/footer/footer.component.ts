import { Component } from '@angular/core';
import { footerLinks } from '../../Data/Data';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerLinksData = footerLinks;
}
