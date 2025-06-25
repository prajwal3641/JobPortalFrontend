import { Component, input } from '@angular/core';
import { Talent } from './talent.model';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-talent-card',
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './talent-card.component.html',
  styleUrl: './talent-card.component.css',
})
export class TalentCardComponent {
  talent = input.required<Talent>();

  // for posted-jobs section
  posted = input<boolean>(false);
  invited = input<boolean>(false);

  // for save
  isLiked = false;

  toggleHeart() {
    this.isLiked = !this.isLiked;
  }

  // for schedule modal
  showScheduleModal = false;

  interviewDate: string = '';
  interviewTime: string = '';

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  scheduleInterview() {
    console.log('Scheduled Date:', this.interviewDate);
    console.log('Scheduled Time:', this.interviewTime);
    this.showScheduleModal = false;
  }
}
