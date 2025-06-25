import { Component, input } from '@angular/core';
import { card, desc, skills } from '../../Data/JobDescData';
import DOMPurify from 'dompurify';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-job-description-overview',
  imports: [RouterLink],
  templateUrl: './job-description-overview.component.html',
  styleUrl: './job-description-overview.component.css',
})
export class JobDescriptionOverviewComponent {
  cards = card;
  skills = skills;
  desc = desc;
  safeHtml = '';

  // jobId = input.required<string>();

  // for posted jobs page , taking this input
  edit = input<boolean>(false);

  ngOnInit() {
    this.safeHtml = DOMPurify.sanitize(desc);
  }
  //  for bookmark icon functionlity
  isBookmarked = false;

  toggleBookmark() {
    this.isBookmarked = !this.isBookmarked;
  }
}
