import { Component, input, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tags-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tags-input.component.html',
  styleUrl: './tags-input.component.css',
})
export class TagsInputComponent {
  label = input<string>('');
  @Input() placeholder = 'Enter tag';
  @Input() splitChars: string[] = [',', ' ', '|'];

  @Input() required = false;

  // if i want a list of tags as a input , optional (to handle profile page skills edit part)
  @Input() inputTags: string[] = [];

  tags = signal<string[]>([]);
  inputValue = signal('');

  ngOnInit() {
    this.tags.set(this.inputTags);
  }

  addTag(tag: string) {
    const trimmed = tag.trim();
    if (trimmed && !this.tags().includes(trimmed)) {
      this.tags.update((t) => [...t, trimmed]);
    }
    this.inputValue.set('');
  }

  handleKey(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'Enter' || this.splitChars.includes(key)) {
      event.preventDefault();
      this.addTag(this.inputValue());
    }
  }

  onBlur() {
    this.addTag(this.inputValue());
  }

  removeTag(tag: string) {
    this.tags.update((t) => t.filter((x) => x !== tag));
  }

  clearAll() {
    this.tags.set([]);
  }
}
