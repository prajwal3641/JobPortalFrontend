import { Component } from '@angular/core';
import { PostedJobService } from '../../Services/posted-job.service';
import { Job } from '../../post-job/post-job.component';
import { card } from '../../Data/JobDescData';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { getTimeAgo } from '../../utils/job.timer';

@Component({
  selector: 'app-posted-job-description',
  imports: [RouterLink],
  templateUrl: './posted-job-description.component.html',
  styleUrl: './posted-job-description.component.css',
})
export class PostedJobDescriptionComponent {
  cards = card;
  constructor(private postedJobService: PostedJobService) {}

  get job(): Job | undefined {
    return this.postedJobService.activeJob();
  }

  get getTime() {
    const joB = this.job;
    if (!joB || !joB.postTime) return '';
    return getTimeAgo(joB.postTime.toString());
  }
}
