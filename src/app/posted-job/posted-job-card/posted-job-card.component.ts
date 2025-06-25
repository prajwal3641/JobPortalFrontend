import { Component, input } from '@angular/core';

@Component({
  selector: 'app-posted-job-card',
  imports: [],
  templateUrl: './posted-job-card.component.html',
  styleUrl: './posted-job-card.component.css',
})
export class PostedJobCardComponent {
  job = input.required<{
    jobTitle: string;
    location: string;
    posted: string;
  }>();
}
