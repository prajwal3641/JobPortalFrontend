import { Component } from '@angular/core';
import { TabsComponent } from '../company-profile/tabs/tabs.component';
import { PostedJobCardComponent } from './posted-job-card/posted-job-card.component';
import { activeJobs, drafts } from '../Data/PostedJob';
import { ActiveJobsComponent } from './active-jobs/active-jobs.component';
import { JobsComponent } from '../find-jobs/jobs/jobs.component';
import { CompanyProfileComponent } from '../company-profile/company-profile.component';
import { JobDescriptionComponent } from '../job-description/job-description.component';
import { JobDescriptionOverviewComponent } from '../job-description/job-description-overview/job-description-overview.component';
import { TalentsComponent } from '../find-talent/talents/talents.component';
import { TalentsListComponent } from '../find-talent/talents-list/talents-list.component';
import { PostedJobDescriptionComponent } from './posted-job-description/posted-job-description.component';
import { PostedJobService } from '../Services/posted-job.service';

@Component({
  selector: 'app-posted-job',
  imports: [TabsComponent],
  templateUrl: './posted-job.component.html',
  styleUrl: './posted-job.component.css',
})
export class PostedJobComponent {
  tabComponents = [ActiveJobsComponent, ActiveJobsComponent];
  tabComponentsInputs = {
    Active: { jobs: activeJobs, active: true },
    Drafts: { jobs: drafts, active: false },
  };

  tabComponents2 = [
    PostedJobDescriptionComponent,
    TalentsListComponent,
    TalentsListComponent,
  ];

  tabComponentInput2 = {
    Overview: { edit: true },
    Applicants: { posted: true },
    Invited: { invited: true },
  };

  constructor(private postedJobService: PostedJobService) {}

  get activeJob() {
    return this.postedJobService.activeJob();
  }
}
