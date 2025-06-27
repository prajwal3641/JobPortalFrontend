import { Component, input } from '@angular/core';
import { Certification } from '../../talent-profile/profile/profile.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-certification-card',
  imports: [NgIf],
  templateUrl: './certification-card.component.html',
  styleUrl: './certification-card.component.css',
})
export class CertificationCardComponent {
  certification = input.required<Certification>();

  // take a edit bool for showing dynamic data from the profile
  edit = input<boolean>(false);
}
