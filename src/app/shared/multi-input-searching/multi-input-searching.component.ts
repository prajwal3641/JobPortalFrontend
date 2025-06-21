import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Signal,
  WritableSignal,
  computed,
  input,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-input-searching',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multi-input-searching.component.html',
  styleUrl: './multi-input-searching.component.css',
})
export class MultiInputSearchingComponent {
  // Items input passed to the component
  private _items = signal<string[]>([]);
  @Input() set items(val: string[]) {
    this._items.set(val);
  }
  get items(): Signal<string[]> {
    return this._items.asReadonly();
  }

  // Component state as signals
  dropdownOpen = signal(false);
  search = signal('');
  selectedItems = signal<string[]>([]);
  iconPath = input.required<string>();
  title = input.required<string>();

  constructor(private elRef: ElementRef) {}
  @HostListener('document:click', ['$event'])
  closeIfClickedOutside(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.dropdownOpen.set(false);
    }
  }

  // Toggle dropdown open/close
  toggleDropdown() {
    this.dropdownOpen.update((open) => !open);
  }

  // Filtered items based on search input
  filteredItems = computed(() => {
    const keyword = this.search().trim().toLowerCase();
    return this._items().filter((item) => item.toLowerCase().includes(keyword));
  });

  // Latest selected item
  latestItem = computed(() => {
    const items = this.selectedItems();
    return items.length > 0 ? items.at(-1)! : null;
  });

  // Count of hidden selected items (for "+n new")
  hiddenCount = computed(() => {
    return this.selectedItems().length > 1
      ? this.selectedItems().length - 1
      : 0;
  });

  // Check if item is already selected
  isSelected(item: string): boolean {
    return this.selectedItems().includes(item);
  }

  // Add or remove item from selectedItems
  selectItem(item: string) {
    const current = this.selectedItems();
    const index = current.indexOf(item);
    if (index > -1) {
      this.selectedItems.set([
        ...current.slice(0, index),
        ...current.slice(index + 1),
      ]);
    } else {
      this.selectedItems.set([...current, item]);
    }
  }

  // Add item from search input and select it
  addItemFromSearch() {
    const trimmed = this.search().trim();
    if (!trimmed) return;

    const currentItems = this._items();
    const selected = this.selectedItems();

    if (!currentItems.includes(trimmed)) {
      this._items.set([...currentItems, trimmed]);
    }

    if (!selected.includes(trimmed)) {
      this.selectedItems.set([...selected, trimmed]);
    }

    this.search.set('');
  }
}
