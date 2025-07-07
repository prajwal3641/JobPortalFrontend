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
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  UserActions,
  selectProfile,
  UserProfile,
} from '../../state/user/user.feature';

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

  private store = inject(Store);

  ngOnInit(): void {
    this.user$ = this.store.select(selectProfile);
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
