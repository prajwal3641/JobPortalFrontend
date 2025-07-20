import { Component, input } from '@angular/core';
import { Experience } from '../profile/profile.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-experience-card',
  imports: [DatePipe],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.css',
})
export class ExperienceCardComponent {
  experience = input.required<Experience>();
}
