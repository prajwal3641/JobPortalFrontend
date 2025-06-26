import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
})
export class InputFieldComponent {
  @Input() type: string = 'text'; // 'text', 'number', 'email', 'file', 'textarea'
  @Input() label: string = '';
  @Input() placeholder: string = 'Enter value';
  @Input() required: boolean = false;
  @Input() readOnly: boolean = false;

  @Input() min?: number;
  @Input() max?: number;

  @Input() minRows: number = 2;

  value: any = null;

  // for password toggle
  showPassword = false;
  // ngOnChanges() {
  //   console.log('inppt' + this.readOnly);
  // }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.value = file;
    }
  }

  removeFile(input: HTMLInputElement): void {
    this.value = null;
    input.value = ''; // reset the input to allow re-selecting the same file
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  get inputType(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }
}
