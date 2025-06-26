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
      name: 'Post Job',
      url: '/post-job',
    },
    {
      name: 'Posted Job',
      url: '/posted-job',
    },
    {
      name: 'Job History',
      url: '/job-history',
    },
    {
      name: 'Sign Up',
      url: '/sign-up',
    },
    {
      name: 'Login',
      url: '/login',
    },
  ];
}
