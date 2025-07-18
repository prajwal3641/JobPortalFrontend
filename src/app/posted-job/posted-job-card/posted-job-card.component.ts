import { Component, input } from '@angular/core';
import { Job } from '../../post-job/post-job.component';
import { getTimeAgo } from '../../utils/job.timer';
import { PostedJobService } from '../../Services/posted-job.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-posted-job-card',
  imports: [NgClass],
  templateUrl: './posted-job-card.component.html',
  styleUrl: './posted-job-card.component.css',
})
export class PostedJobCardComponent {
  job = input.required<Job>();

  constructor(private postedJobService: PostedJobService) {}

  get getTime() {
    const job = this.job?.();
    if (!job || !job.postTime) return '';
    return getTimeAgo(job.postTime.toString());
  }

  navigateToJob(jobId: number) {
    this.postedJobService.setActiveJobId(jobId);
    console.log(`Navigating to job with ID: ${jobId}`);
  }

  get activeJobId() {
    // console.log('Active Job ID:', this.postedJobService.activeJobId());
    return this.postedJobService.activeJobId();
  }
}
