import { Component, input } from '@angular/core';
import { Job } from '../../find-jobs/job-card/job.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-job-history-container',
  imports: [NgIf],
  templateUrl: './job-history-container.component.html',
  styleUrl: './job-history-container.component.css',
})
export class JobHistoryContainerComponent {
  jobs = input<Job[]>([]);

  // for job history page tabs
  applied = input<boolean>(false);
  saved = input<boolean>(false);
  offered = input<boolean>(false);
  interviewing = input<boolean>(false);
}
