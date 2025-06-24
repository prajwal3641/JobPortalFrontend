import { Component } from '@angular/core';
import { JobCardComponent } from '../../find-jobs/job-card/job-card.component';
import { jobList } from '../../Data/JobsData';

@Component({
  selector: 'app-company-jobs',
  imports: [JobCardComponent],
  templateUrl: './company-jobs.component.html',
  styleUrl: './company-jobs.component.css',
})
export class CompanyJobsComponent {
  jobsData = jobList;
}
