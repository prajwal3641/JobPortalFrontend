import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Signal,
  ViewChild,
  AfterViewChecked,
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
export class MultiInputSearchingComponent implements AfterViewChecked {
  private _items = signal<string[]>([]);
  @Input() set items(val: string[]) {
    this._items.set(val);
  }
  get items(): Signal<string[]> {
    return this._items.asReadonly();
  }

  dropdownOpen = signal(false);
  search = signal('');
  selectedItems = signal<string[]>([]);
  highlightedIndex = signal<number>(-1);

  iconPath = input.required<string>();
  title = input.required<string>();

  @ViewChild('searchBox') searchBoxRef!: ElementRef<HTMLInputElement>;

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  closeIfClickedOutside(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.dropdownOpen.set(false);
    }
  }

  ngAfterViewChecked() {
    if (this.dropdownOpen() && this.searchBoxRef) {
      this.searchBoxRef.nativeElement.focus({ preventScroll: true });
    }
  }

  toggleDropdown() {
    this.dropdownOpen.update((open) => !open);
  }

  filteredItems = computed(() => {
    const keyword = this.search().trim().toLowerCase();
    const results = this._items().filter((item) =>
      item.toLowerCase().includes(keyword)
    );
    if (results.length === 0 || this.highlightedIndex() >= results.length) {
      queueMicrotask(() => this.highlightedIndex.set(-1));
    }
    return results;
  });

  latestItem = computed(() => {
    const items = this.selectedItems();
    return items.length > 0 ? items.at(-1)! : null;
  });

  hiddenCount = computed(() => {
    return this.selectedItems().length > 1
      ? this.selectedItems().length - 1
      : 0;
  });

  isSelected(item: string): boolean {
    return this.selectedItems().includes(item);
  }

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
    this.highlightedIndex.set(-1);
  }

  handleKeyDown(event: KeyboardEvent) {
    const items = this.filteredItems();
    const index = this.highlightedIndex();
    const searchText = this.search().trim();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.highlightedIndex.set((index + 1) % items.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.highlightedIndex.set((index - 1 + items.length) % items.length);
    } else if (event.key === 'Enter') {
      const selected = items[this.highlightedIndex()];
      if (selected) {
        this.selectItem(selected);
      } else if (searchText) {
        this.addItemFromSearch();
      }
      this.search.set('');
      this.highlightedIndex.set(-1);
      event.preventDefault();
    }

    // 🛠️ Fix input freeze
    setTimeout(() => {
      this.searchBoxRef?.nativeElement.focus();
    }, 0);
  }

  handleItemMouseDown(event: MouseEvent, item: string) {
    event.preventDefault(); // prevents input blur
    this.selectItem(item);
    this.search.set('');
    this.highlightedIndex.set(-1);
  }
}
