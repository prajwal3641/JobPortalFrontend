import { Component, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-job-description-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './job-description-input.component.html',
  styleUrl: './job-description-input.component.css',
})
export class JobDescriptionInputComponent {
  description = signal<string>(''); // Two-way reactive binding if needed

  submitDescription() {
    console.log('Job Description:', this.description());
  }
}
