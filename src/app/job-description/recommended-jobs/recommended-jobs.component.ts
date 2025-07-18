import { Component, Input } from '@angular/core';
import { jobList } from '../../Data/JobsData';
import { JobCardComponent } from '../../find-jobs/job-card/job-card.component';
import { JobService } from '../../Services/job.service';
import { Job } from '../../post-job/post-job.component';

@Component({
  selector: 'app-recommended-jobs',
  imports: [JobCardComponent],
  templateUrl: './recommended-jobs.component.html',
  styleUrl: './recommended-jobs.component.css',
})
export class RecommendedJobsComponent {
  jobs!: Job[];

  @Input() jobId!: number;

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.getAllJobs().subscribe({
      next: (response) => {
        this.jobs = response.filter((job) => job.id !== this.jobId);
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
        // Handle error appropriately, e.g., show a notification
        this.jobs = [];
      },
    });
  }
}
