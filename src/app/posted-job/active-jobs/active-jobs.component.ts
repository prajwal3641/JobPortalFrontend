import { Component, input } from '@angular/core';
import { PostedJobCardComponent } from '../posted-job-card/posted-job-card.component';

@Component({
  selector: 'app-active-jobs',
  imports: [PostedJobCardComponent],
  templateUrl: './active-jobs.component.html',
  styleUrl: './active-jobs.component.css',
})
export class ActiveJobsComponent {
  jobs = input.required<
    {
      jobTitle: string;
      location: string;
      posted: string;
    }[]
  >();
}
