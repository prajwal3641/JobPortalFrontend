import { Component, input } from '@angular/core';
import { PostedJobCardComponent } from '../posted-job-card/posted-job-card.component';
import { Job, JobStatus } from '../../post-job/post-job.component';
import { Store } from '@ngrx/store';
import { JobService } from '../../Services/job.service';
import { take, withLatestFrom } from 'rxjs';
import { selectProfile } from '../../state/user/user.feature';
import { selectProfileData } from '../../state/profile/profile.feature';
import { PostedJobService } from '../../Services/posted-job.service';

@Component({
  selector: 'app-active-jobs',
  imports: [PostedJobCardComponent],
  templateUrl: './active-jobs.component.html',
  styleUrl: './active-jobs.component.css',
})
export class ActiveJobsComponent {
  jobs = input.required<Job[]>();
  jobsData: Job[] = [];
  constructor(private postedJobService: PostedJobService) {}

  ngOnInit() {}

  active = input<boolean>(true);

  get getJobs() {
    this.jobsData = this.postedJobService.jobs();
    if (this.active()) {
      return this.jobsData.filter((job) => job.status === JobStatus.OPEN);
    } else {
      return this.jobsData.filter((job) => job.status === JobStatus.DRAFT);
    }
    return [];
  }
}
