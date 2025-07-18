import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { card, desc, skills } from '../Data/JobDescData';

import { RecommendedJobsComponent } from './recommended-jobs/recommended-jobs.component';
import { JobDescriptionOverviewComponent } from './job-description-overview/job-description-overview.component';
import { LoadingOverlayComponent } from '../shared/loading-overlay/loading-overlay.component';
import { JobService } from '../Services/job.service';
import { Job } from '../post-job/post-job.component';

@Component({
  selector: 'app-job-description',
  imports: [
    RouterLink,
    RecommendedJobsComponent,
    JobDescriptionOverviewComponent,
    LoadingOverlayComponent,
  ],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css',
})
export class JobDescriptionComponent {
  @Input() jobId!: number;

  job!: Job;

  showOverlay = false;

  constructor(private jobService: JobService) {}

  ngOnChanges() {
    if (this.jobId) {
      this.showOverlay = true;
      this.jobService.getJob(this.jobId).subscribe({
        next: (res) => {
          setTimeout(() => (this.showOverlay = false), 300);
          // Assuming the response contains the job details
          // You can handle the response as needed, e.g., display it in the UI
          console.log('Job details:', res);
          this.job = res;
        },
        error: (err) => {
          console.error('Error fetching job details:', err);
          this.showOverlay = false;
        },
      });
    }
  }
}
