import { Component, input, Signal, signal } from '@angular/core';
import { ExperienceCardComponent } from '../experience-card/experience-card.component';
import { CertificationCardComponent } from '../certification-card/certification-card.component';
import { Talent } from '../../find-talent/talent-card/talent.model';
import { TalentProfile } from './profile.model';
import { Profile } from '../../state/profile/profile.feature';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ExperienceCardComponent, CertificationCardComponent, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profile = input.required<Profile>();
}
