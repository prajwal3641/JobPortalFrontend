import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  links = [
    {
      name: 'Find Jobs',
      url: '/find-jobs',
    },
    {
      name: 'Find Talent',
      url: '/find-talent',
    },
    {
      name: 'Upload Job',
      url: '/upload-job',
    },
    {
      name: 'about',
      url: '/about',
    },
  ];
}
