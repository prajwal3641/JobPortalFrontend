import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { card, desc, skills } from '../Data/JobDescData';
import DOMPurify from 'dompurify';
import { RecommendedJobsComponent } from './recommended-jobs/recommended-jobs.component';

@Component({
  selector: 'app-job-description',
  imports: [RouterLink, RecommendedJobsComponent],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css',
})
export class JobDescriptionComponent {
  cards = card;
  skills = skills;
  desc = desc;
  safeHtml = '';

  jobId = input.required<string>();

  ngOnInit() {
    this.safeHtml = DOMPurify.sanitize(desc);
  }
  //  for bookmark icon functionlity
  isBookmarked = false;

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
  }
}
