import { Component } from '@angular/core';
import { jobList } from '../../Data/JobsData';
import { JobCardComponent } from '../../find-jobs/job-card/job-card.component';

@Component({
  selector: 'app-recommended-jobs',
  imports: [JobCardComponent],
  templateUrl: './recommended-jobs.component.html',
  styleUrl: './recommended-jobs.component.css',
})
export class RecommendedJobsComponent {
  jobs = jobList;
}
