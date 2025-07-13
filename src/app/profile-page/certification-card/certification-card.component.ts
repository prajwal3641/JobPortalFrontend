import { Component, EventEmitter, input, Output } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import {
  Certification,
  ProfileActions,
  selectProfileData,
} from '../../state/profile/profile.feature';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, switchMap, take, tap } from 'rxjs';
import { ProfileService } from '../../Services/profile.service';
import { NotificationComponent } from '../../shared/notification/notification.component';

@Component({
  selector: 'app-certification-card',
  imports: [NgIf, DatePipe],
  templateUrl: './certification-card.component.html',
  styleUrl: './certification-card.component.css',
})
export class CertificationCardComponent {
  constructor(private store: Store, private profileService: ProfileService) {}
  certification = input.required<Certification>();

  // take a edit bool for showing dynamic data from the profile
  edit = input<boolean>(false);

  // for notification
  @Output() deleteCerti = new EventEmitter();

  onDeleteCerti() {
    this.deleteCerti.emit(this.certification().id);
    // trigger notification
  }
}
