import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { filter } from 'rxjs';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { LocalStorageService } from './Services/local-storage.service';
import { UserActions } from './state/user/user.feature';
import { ProfileActions } from './state/profile/profile.feature';
import { ProfileService } from './Services/profile.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  showLayout = true;

  constructor(
    private router: Router,
    private store: Store,
    private localStorageService: LocalStorageService,
    private profileService: ProfileService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        // Log it to debug
        // console.log('Navigated to:', url);

        // Update layout visibility
        this.showLayout = !(url === '/sign-up' || url === '/login');
      });
  }

  ngOnInit(): void {
    const user = this.localStorageService.getItem('user');
    // const profile = sessionStorage.getItem('profile');
    if (user) {
      console.log('Rehydrating state with user:', user);
      this.store.dispatch(UserActions.rehydrateState({ userObject: user }));
      this.profileService.getProfile(user.profileId).subscribe({
        next: (profile) => {
          this.store.dispatch(
            ProfileActions.setProfile({ profileObject: profile })
          );
        },
        error: (error) => {
          console.error('Error fetching profile:', error);
        },
      });
    }
  }
}
