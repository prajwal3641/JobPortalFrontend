import { Component, input } from '@angular/core';
import { Certification } from '../profile/profile.model';

@Component({
  selector: 'app-certification-card',
  imports: [],
  templateUrl: './certification-card.component.html',
  styleUrl: './certification-card.component.css',
})
export class CertificationCardComponent {
  certification = input.required<Certification>();
}
