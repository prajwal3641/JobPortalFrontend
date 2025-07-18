import { Component } from '@angular/core';
import { SortComboboxComponent } from '../../shared/sort-combobox/sort-combobox.component';
import { JobCardComponent } from '../job-card/job-card.component';
import { jobList } from '../../Data/JobsData';
import { JobService } from '../../Services/job.service';
import { Job, JobStatus } from '../../post-job/post-job.component';

@Component({
  selector: 'app-jobs',
  imports: [SortComboboxComponent, JobCardComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  jobsData!: Job[];

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.jobService.getAllJobs().subscribe({
      next: (response) => {
        this.jobsData = response.filter(
          (job: Job) => job.status === JobStatus.OPEN
        );
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
        // Handle error appropriately, e.g., show a notificatio
        this.jobsData = [];
      },
    });
  }
}
