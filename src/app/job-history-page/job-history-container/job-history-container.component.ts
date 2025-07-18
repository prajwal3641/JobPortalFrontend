import { Component, input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ApplicationStatus, Job } from '../../post-job/post-job.component';
import { getTimeAgo } from '../../utils/job.timer';
import { JobHistoryJobCardComponent } from '../job-history-job-card/job-history-job-card.component';
import { JobCardComponent } from '../../find-jobs/job-card/job-card.component';
import { Store } from '@ngrx/store';
import { JobService } from '../../Services/job.service';
import { selectProfile } from '../../state/user/user.feature';
import { selectProfileData } from '../../state/profile/profile.feature';
import { take, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-job-history-container',
  imports: [JobHistoryJobCardComponent],
  templateUrl: './job-history-container.component.html',
  styleUrl: './job-history-container.component.css',
})
export class JobHistoryContainerComponent {
  // jobs = input<Job[]>([]);

  allJobsData: Job[] = [];
  jobsData: Job[] = []; // applied jobs
  savedJobsData: Job[] = [];
  offeredJobsData: Job[] = [];
  interviewingJobsData: Job[] = [];

  constructor(private store: Store, private jobService: JobService) {}

  ngOnInit() {
    // note for every tab , this component is initialized only once ,
    // so for saved jobs and rest tabs it is not initialized again
    console.log(
      'Job History Container Component Initialized for ',
      this.saved(),
      this.applied()
    );
    this.jobService
      .getAllJobs()
      .pipe(
        take(1), // Take only the first emission
        withLatestFrom(
          this.store.select(selectProfile),
          this.store.select(selectProfileData)
        )
      )
      .subscribe({
        next: ([jobs, user, profile]) => {
          this.allJobsData = jobs;

          // Filter applied jobs
          this.jobsData = jobs.filter(
            (job) =>
              job.applicants.filter((applicant) => {
                // console.log('Applicant:', applicant);
                return (
                  applicant.applicantId === user?.id &&
                  applicant.status === ApplicationStatus.APPLIED
                );
              }).length > 0
          );
          // console.log('Applied Jobs:', this.jobsData);

          // Filter saved jobs
          const savedIds = new Set(profile?.savedJobs ?? []);
          this.savedJobsData = jobs.filter((job) => savedIds.has(job.id));

          // Example logic: filter offered jobs
          this.offeredJobsData = jobs.filter((job) => {
            return (
              job.applicants.filter(
                (a) =>
                  a.applicantId === user?.id &&
                  a.status === ApplicationStatus.OFFERED
              ).length > 0
            );
          });

          // Example logic: filter interviewing jobs
          this.interviewingJobsData = jobs.filter((job) => {
            return (
              job.applicants.filter(
                (a) =>
                  a.applicantId === user?.id &&
                  a.status === ApplicationStatus.INTERVIEWING
              ).length > 0
            );
          });
        },
        error: (err) => {
          console.error('Error fetching jobs or profile:', err);
          this.jobsData = [];
          this.savedJobsData = [];
          this.offeredJobsData = [];
          this.interviewingJobsData = [];
        },
      });

    // for updation of saved jobs data
    this.store.select(selectProfileData).subscribe((profile) => {
      if (profile && this.allJobsData.length > 0) {
        const savedIds = new Set(profile.savedJobs ?? []);
        this.savedJobsData = this.allJobsData.filter((job) =>
          savedIds.has(job.id)
        );
      }
    });
  }

  // for job history page tabs
  applied = input<boolean>(false);
  saved = input<boolean>(false);
  offered = input<boolean>(false);
  interviewing = input<boolean>(false);

  get getRightJobsData() {
    if (this.applied()) {
      return this.jobsData;
    } else if (this.saved()) {
      return this.savedJobsData;
    } else if (this.offered()) {
      return this.offeredJobsData;
    } else if (this.interviewing()) {
      return this.interviewingJobsData;
    } else {
      return [];
    }
  }
}
