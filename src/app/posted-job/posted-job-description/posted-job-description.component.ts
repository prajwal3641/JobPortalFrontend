import { Component, input } from '@angular/core';
import { PostedJobService } from '../../Services/posted-job.service';
import { Job } from '../../post-job/post-job.component';
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

@Component({
  selector: 'app-posted-job-description',
  imports: [RouterLink, NgIf],
  templateUrl: './posted-job-description.component.html',
  styleUrl: './posted-job-description.component.css',
})
export class PostedJobDescriptionComponent {
  cards = card;
  jobId!: number;

  constructor(
    private postedJobService: PostedJobService,
    private route: ActivatedRoute
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
}
