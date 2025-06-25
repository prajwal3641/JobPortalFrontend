import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { card, desc, skills } from '../Data/JobDescData';

import { RecommendedJobsComponent } from './recommended-jobs/recommended-jobs.component';
import { JobDescriptionOverviewComponent } from './job-description-overview/job-description-overview.component';

@Component({
  selector: 'app-job-description',
  imports: [
    RouterLink,
    RecommendedJobsComponent,
    JobDescriptionOverviewComponent,
  ],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css',
})
export class JobDescriptionComponent {}
