import { Component, input } from '@angular/core';
import { Experience } from '../../talent-profile/profile/profile.model';
import { NgIf } from '@angular/common';
import { ExperienceCardInputComponent } from './experience-card-input/experience-card-input.component';

@Component({
  selector: 'app-experience-card',
  imports: [NgIf, ExperienceCardInputComponent],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.css',
})
export class ExperienceCardComponent {
  experience = input.required<Experience>();

  // taking input for edit or delete
  edit = input<boolean>(false);

  // state for showing the edit
  canEdit: boolean = false;

  toggleEdit() {
    this.canEdit = !this.canEdit;
  }
}
