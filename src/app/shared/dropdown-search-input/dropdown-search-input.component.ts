import {
  Component,
  Input,
  signal,
  computed,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown-search-input.component.html',
  styleUrl: './dropdown-search-input.component.css',
})
export class DropdownSearchInputComponent {
  @Input() field: { label: string; placeholder: string; options: string[] } = {
    label: '',
    placeholder: '',
    options: [],
  };

  @Input() required = false;

  dropdownOpen = signal(false);
  search = signal('');
  selected = signal('');

  constructor(private elRef: ElementRef) {}

  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
  }

  selectOption(option: string) {
    this.selected.set(option);
    this.search.set(option);
    this.closeDropdown();
  }

  filteredOptions = computed(() =>
    this.field.options.filter((opt) =>
      opt.toLowerCase().includes(this.search().trim().toLowerCase())
    )
  );

  // @HostListener('document:click', ['$event'])
  // handleClickOutside(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   if (!target.closest('.dropdown-container')) {
  //     this.closeDropdown();
  //   }
  // }

  @HostListener('document:click', ['$event'])
  closeIfClickedOutside(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.dropdownOpen.set(false);
    }
  }
}
