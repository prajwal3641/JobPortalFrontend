import {
  Component,
  HostListener,
  Signal,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css',
})
export class ProfileMenuComponent {
  dropdownOpen = signal(false);
  isDarkMode = signal(true);

  toggleDropdown() {
    this.dropdownOpen.update((prev) => !prev);
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }

  toggleTheme() {
    this.isDarkMode.update((prev) => !prev);
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
