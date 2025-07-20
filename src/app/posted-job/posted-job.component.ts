import { Component, effect, Input } from '@angular/core';
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
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobStatus } from '../post-job/post-job.component';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-posted-job',
  imports: [TabsComponent],
  templateUrl: './posted-job.component.html',
  styleUrl: './posted-job.component.css',
})
export class PostedJobComponent {
  id!: number;
  tabComponents = [ActiveJobsComponent, ActiveJobsComponent];
  tabComponentsInputs = {
    Active: { id: this.id, active: true },
    Drafts: { id: this.id, active: false },
  };

  tabComponents2 = [
    PostedJobDescriptionComponent,
    TalentsListComponent,
    TalentsListComponent,
    TalentsListComponent,
    TalentsListComponent,
  ];

  tabComponentInput2 = {
    Overview: { edit: true },
    Applicants: { posted: true },
    Invited: { invited: true },
    Offered: { offered: true },
    Rejected: { rejected: true },
  };

  ngOnInit() {
    this.postedJobService.fetchJobs();
    // console.log('Posted Job Component Initialized with ID:', this.id);
    // Fetch jobs or any other initialization logic can go here

    // why assign new obect , is bcz angular change detection will not work if we don't create a new object
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          this.id = id ? Number(id) : 0;
          if (this.id !== 0) this.postedJobService.setActiveJobId(this.id);

          // Update the tab inputs reactively
          this.tabComponentsInputs = {
            ...this.tabComponentsInputs,
            Active: { ...this.tabComponentsInputs.Active, id: this.id },
            Drafts: { ...this.tabComponentsInputs.Drafts, id: this.id },
          };

          return of(null); // just to complete the observable chain
        })
      )
      .subscribe();
  }
  constructor(
    private postedJobService: PostedJobService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    effect(() => {
      const jobs = this.postedJobService.jobs();
      // If we are on the default route (id=0) and jobs have been loaded
      if (this.id === 0 && jobs.length > 0) {
        const newId = jobs[0]?.id;
        if (newId) {
          // Navigate to the first job, replacing the URL to avoid bad history
          this.router.navigate(['posted-job', newId], { replaceUrl: true });
        }
      }
    });
  }

  get activeJob() {
    const job = this.postedJobService.getJobById(this.id);
    if (job) {
      return job;
    } else {
      console.error('Job not found for ID:', this.id);
      return undefined;
    }
  }

  get getStatus() {
    const job = this.postedJobService.getJobById(this.id);
    if (!job) return 0;
    return job.status === JobStatus.OPEN ? 0 : 1;
  }

  get totalJobs() {
    return this.postedJobService.jobs().length;
  }
}
