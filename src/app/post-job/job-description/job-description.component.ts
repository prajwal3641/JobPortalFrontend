import { Component, signal } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css',
})
export class JobDescriptionComponent {
  description = signal<string>(''); // Two-way reactive binding if needed

  submitDescription() {
    console.log('Job Description:', this.description());
  }
}
