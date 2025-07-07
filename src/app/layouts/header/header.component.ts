import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileComponent } from '../../talent-profile/profile/profile.component';
import { ProfileMenuComponent } from '../../header/profile-menu/profile-menu.component';
import { Observable } from 'rxjs';
import { selectProfile, UserProfile } from '../../state/user/user.feature';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink, RouterLinkActive, ProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  // user$!: Observable<UserProfile | null>;
  // private store = inject(Store);

  // ngOnInit() {
  //   this.user$ = this.store.select(selectProfile);
  // }
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
  ];
}
