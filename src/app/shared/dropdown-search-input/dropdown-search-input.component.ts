import {
  Component,
  Input,
  signal,
  computed,
  HostListener,
  ElementRef,
  AfterViewChecked,
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
export class DropdownSearchInputComponent implements AfterViewChecked {
  @Input() field: { label: string; placeholder: string; options: string[] } = {
    label: '',
    placeholder: '',
    options: [],
  };

  @Input() required = false;

  dropdownOpen = signal(false);
  search = signal('');
  selected = signal('');
  highlightedIndex = signal<number>(-1);

  constructor(private elRef: ElementRef) {}

  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
    if (this.dropdownOpen()) {
      this.highlightedIndex.set(-1);
    }
  }

  closeDropdown() {
    this.dropdownOpen.set(false);
    this.highlightedIndex.set(-1);
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

  @HostListener('document:click', ['$event'])
  closeIfClickedOutside(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  ngAfterViewChecked() {
    const options = this.filteredOptions();
    const index = this.highlightedIndex();
    if (index >= options.length) {
      this.highlightedIndex.set(options.length - 1);
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (!this.dropdownOpen()) return;

    const items = this.filteredOptions();
    let index = this.highlightedIndex();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (items.length > 0) {
        index = (index + 1) % items.length;
        this.highlightedIndex.set(index);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (items.length > 0) {
        index = (index - 1 + items.length) % items.length;
        this.highlightedIndex.set(index);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (items.length > 0) {
        const selectedItem =
          index >= 0 && index < items.length ? items[index] : items[0];
        this.selectOption(selectedItem);
      }
    }
  }
}
