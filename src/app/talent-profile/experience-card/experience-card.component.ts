import { Component, input } from '@angular/core';
import { Experience } from '../profile/profile.model';

@Component({
  selector: 'app-experience-card',
  imports: [],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.css',
})
export class ExperienceCardComponent {
  experience = input.required<Experience>();
}
