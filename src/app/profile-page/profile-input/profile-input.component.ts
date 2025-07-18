import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  AfterViewChecked,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { signal, computed } from '@angular/core';
import { ProfileFeilds } from '../../Data/Profile';

@Component({
  selector: 'app-profile-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-input.component.html',
  styleUrl: './profile-input.component.css',
})
export class ProfileInputComponent implements OnInit, AfterViewChecked {
  @Input({ required: true }) field!: ProfileFeilds;
  @Input({ required: true }) value!: string;
  @Output() valueChange = new EventEmitter<string>();

  @Input() required = false;

  dropdownOpen = signal(false);
  search = signal('');
  selected = signal('');
  highlightedIndex = signal<number>(-1);

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    // waise no need of this , since value is not used in the template
    // it is just seetting the initial value which is not required
    if (this.value && this.field.options.includes(this.value)) {
      this.selected.set(this.value);
      this.search.set(this.value);
    } else if (this.field.options.length > 0) {
      // const first = this.field.options[0];
      this.selected.set('');
      this.search.set('');
      this.valueChange.emit('');
    }
  }

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
    if (!this.field.options.includes(option)) return;
    this.selected.set(option);
    this.search.set(option);
    this.valueChange.emit(option);
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
