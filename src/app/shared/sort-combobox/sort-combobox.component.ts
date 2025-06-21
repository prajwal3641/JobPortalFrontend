import {
  Component,
  ElementRef,
  Host,
  HostListener,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-sort-combobox',
  imports: [],
  templateUrl: './sort-combobox.component.html',
  styleUrl: './sort-combobox.component.css',
})
export class SortComboboxComponent {
  options = ['Relevance', 'Newest', 'Salary High to Low', 'Salary Low to High'];
  selected = signal('Relevance');
  open = signal(false);

  constructor(private elRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  closeIfClickedOutside(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.open.set(false);
    }
  }

  toggleDropdown() {
    this.open.update((v) => !v);
  }

  select(val: string) {
    this.selected.set(val);
    this.open.set(false);
  }
}
