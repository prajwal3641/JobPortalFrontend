import { NgClass, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
})
export class InputFieldComponent {
  @Input() type: string = 'text'; // 'text', 'number', 'email', 'file', 'textarea', 'checkbox'
  @Input() label: string = '';
  @Input() placeholder: string = 'Enter value';
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() min?: number;
  @Input() max?: number;
  @Input() minRows: number = 2;

  // ngModel binding
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  ngOnInit() {
    // this.value = '';
  }

  // Password toggle
  showPassword: boolean = false;

  get inputType(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.checked;
    this.valueChange.emit(this.value);
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.value = file;
      this.valueChange.emit(this.value);
    }
  }

  removeFile(input: HTMLInputElement): void {
    this.value = null;
    input.value = '';
    this.valueChange.emit(this.value);
  }
}
