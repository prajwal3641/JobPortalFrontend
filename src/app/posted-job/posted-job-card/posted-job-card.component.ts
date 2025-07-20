import { Component, input } from '@angular/core';
import { Job } from '../../post-job/post-job.component';
import { getTimeAgo } from '../../utils/job.timer';
import { PostedJobService } from '../../Services/posted-job.service';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-posted-job-card',
  imports: [NgClass],
  templateUrl: './posted-job-card.component.html',
  styleUrl: './posted-job-card.component.css',
})
export class PostedJobCardComponent {
  job = input.required<Job>();
  id = input<number>();

  constructor(
    private postedJobService: PostedJobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    // console.log('Posted Job Card Component Initialized with ID:', this.id());
  }
  get getTime() {
    const job = this.job?.();
    if (!job || !job.postTime) return '';
    return getTimeAgo(job.postTime.toString());
  }

  navigate() {
    this.router.navigate(['/posted-job', this.job().id]);
  }
}
