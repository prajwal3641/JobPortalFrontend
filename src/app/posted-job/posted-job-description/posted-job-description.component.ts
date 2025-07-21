import { Component, input } from '@angular/core';
import { PostedJobService } from '../../Services/posted-job.service';
import { Job, JobStatus } from '../../post-job/post-job.component';
import { card } from '../../Data/JobDescData';
import { NgClass, NgIf } from '@angular/common';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterLink,
} from '@angular/router';
import { getTimeAgo } from '../../utils/job.timer';
import { filter } from 'rxjs';
import { JobService } from '../../Services/job.service';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-posted-job-description',
  imports: [RouterLink, NgIf, NotificationComponent],
  templateUrl: './posted-job-description.component.html',
  styleUrl: './posted-job-description.component.css',
})
export class PostedJobDescriptionComponent {
  cards = card;
  jobId!: number;

  // for notification
  notification: {
    title: string;
    message: string;
    type: 'success' | 'error';
    show: boolean;
    time?: number;
  } = {
    title: '',
    message: '',
    show: false,
    type: 'success',
    time: 0,
  };

  constructor(
    private postedJobService: PostedJobService,
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.jobId = Number(params.get('id')!);
      // console.log('Job ID:', this.jobId);
    });
  }
  get job(): Job | undefined {
    return this.postedJobService.getJobById(this.jobId);
  }

  get getTime() {
    const joB = this.job;
    if (!joB || !joB.postTime) return '';
    return getTimeAgo(joB.postTime.toString());
  }

  // to close the job
  closeJob(id: number) {
    this.jobService.updateJobStatus(id, JobStatus.CLOSED).subscribe({
      next: (response) => {
        console.log('Job closed successfully:', response);
        this.triggerNotification(
          'Success',
          'Job closed successfully',
          'success',
          2000
        );

        // Navigate back to the jobs list after closing
        setTimeout(() => {
          this.postedJobService.fetchJobs();
          this.postedJobService.setActiveTab(2);
          this.postedJobService.setActiveJobId(this.job!.id);
          this.router.navigate(['/posted-job', this.job!.id]);
        }, 2000); // slight delay to show notification
      },
      error: (error) => {
        console.error('Error closing job:', error);
        this.triggerNotification(
          'Error',
          error.error.errorMessage ||
            'Failed to close the job. Please try again.',
          'error',
          2000
        );
      },
    });
  }

  triggerNotification(
    title: string,
    message: string,
    type: 'success' | 'error',
    time = 3000
  ) {
    // Hide it first to reset state (important for same repeated errors)
    this.notification.show = false;

    // Wait a bit and then trigger new one
    setTimeout(() => {
      this.notification = {
        title,
        message,
        type,
        time,
        show: true,
      };
    }, 10); // ⏱️ gives Angular time to detect the transition
  }
}
