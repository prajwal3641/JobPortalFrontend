import { Component, input } from '@angular/core';
import { Job } from './job.model';

@Component({
  selector: 'app-job-card',
  imports: [],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  job = input.required<Job>();

  //  for bookmark icon functionlity
  isBookmarked = false;

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
  }
}
