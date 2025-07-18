import { Component, Input, signal } from '@angular/core';
import { Location } from '@angular/common';
import { Job } from '../post-job/post-job.component';
import { JobService } from '../Services/job.service';
import { ApplyJobApplicationFormComponent } from './apply-job-application-form/apply-job-application-form.component';
import { LoadingOverlayComponent } from '../shared/loading-overlay/loading-overlay.component';
import { getTimeAgo } from '../utils/job.timer';

@Component({
  selector: 'app-apply-job',
  imports: [ApplyJobApplicationFormComponent, LoadingOverlayComponent],
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.css',
})
export class ApplyJobComponent {
  showOverlay = signal<boolean>(false);
  @Input() jobId!: number;

  job!: Job;

  constructor(private location: Location, private jobService: JobService) {}

  ngOnChanges() {
    if (this.jobId) {
      this.showOverlay.set(true);
      this.jobService.getJob(this.jobId).subscribe({
        next: (res) => {
          setTimeout(() => this.showOverlay.set(false), 300);
          // Assuming the response contains the job details
          // You can handle the response as needed, e.g., display it in the UI
          console.log('Job details:', res);
          this.job = res;
        },
        error: (err) => {
          console.error('Error fetching job details:', err);
          this.showOverlay.set(false);
        },
      });
    }
  }

  goBack() {
    this.location.back();
  }

  get getTime() {
    const job = this.job;
    if (!job || !job.postTime) return '';
    return getTimeAgo(job.postTime.toString());
  }
}
