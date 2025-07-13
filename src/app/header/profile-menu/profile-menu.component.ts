import {
  Component,
  HostListener,
  Signal,
  signal,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  UserActions,
  selectProfile,
  UserProfile,
} from '../../state/user/user.feature';
import {
  Profile,
  ProfileActions,
  selectProfileData,
} from '../../state/profile/profile.feature';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css',
})
export class ProfileMenuComponent implements OnInit {
  dropdownOpen = signal(false);
  isDarkMode = signal(true);
  user$!: Observable<UserProfile | null>;
  profile$!: Observable<Profile | null>;

  private store = inject(Store);
  private router = inject(Router);

  ngOnInit(): void {
    this.user$ = this.store.select(selectProfile);
    this.profile$ = this.store.select(selectProfileData);
  }

  toggleDropdown() {
    this.dropdownOpen.update((prev) => !prev);
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }

  toggleTheme() {
    this.isDarkMode.update((prev) => !prev);
  }

  logout() {
    this.store.dispatch(UserActions.logoutSubmitted());
    this.store.dispatch(ProfileActions.removeProfile());
    this.router.navigate(['/'], {
      replaceUrl: true,
    });
  }

  // Close dropdown on outside click
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-menu-container')) {
      this.closeDropdown();
    }
  }

  get icon(): string {
    return this.isDarkMode() ? '🌞' : '🌙';
  }
}
