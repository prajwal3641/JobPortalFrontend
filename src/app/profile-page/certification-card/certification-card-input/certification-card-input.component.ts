import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InputFieldComponent } from '../../../shared/input-field/input-field.component';
import { ProfileInputComponent } from '../../profile-input/profile-input.component';

import fields, { ProfileFeilds } from '../../../Data/Profile';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../../Services/profile.service';
import { NotificationComponent } from '../../../shared/notification/notification.component';
import {
  Certification,
  ProfileActions,
  selectError,
  selectLoading,
  selectProfileData,
} from '../../../state/profile/profile.feature';
import { skip, switchMap, take } from 'rxjs';
@Component({
  selector: 'app-certification-card-input',
  imports: [
    InputFieldComponent,
    ProfileInputComponent,
    FormsModule,
    NotificationComponent,
  ],
  templateUrl: './certification-card-input.component.html',
  styleUrl: './certification-card-input.component.css',
})
export class CertificationCardInputComponent {
  constructor(private store: Store, private profileService: ProfileService) {}
  fields: ProfileFeilds[] = fields;
  todayDate!: string;
  showOverlay = false;

  ngOnInit() {
    this.todayDate = new Date().toISOString().slice(0, 10);
    // console.log(this.todayDate);
  }
  //  certification obecjt
  certification: Certification = {
    id: 0,
    name: '',
    issuer: '',
    issueDate: '',
    certificationId: '',
  };

  // for notification
  notification: {
    title: string;
    message: string;
    type: 'success' | 'error';
    show: boolean;
    time?: number;
  } = {
    title: '',
    message: '',
    show: false,
    type: 'success',
    time: 0,
  };

  // for closing the input , like saving or cancelling
  @Input() addCerti = true;
  @Output() addCertiChange = new EventEmitter<boolean>();

  onSaveCertification() {
    // check if form is valid or not !

    if (!this.validateCertification()) {
      return;
    }
    // proceed

    // let newModyDate = this.certification.issueDate + 'T00:00:00';
    // this.certification.issueDate = newModyDate;
    // this.certification.id = Number(
    //   `${Date.now()}${Math.floor(Math.random() * 1000)}`
    // ); // Max ~15 digits

    // Clone before editing
    const certCopy: Certification = { ...this.certification };

    certCopy.issueDate = certCopy.issueDate + 'T00:00:00';
    certCopy.id = Number(`${Date.now()}${Math.floor(Math.random() * 1000)}`);

    // show overlay
    this.showOverlay = true;

    // dispatch action to add certification, now the state is upadted based on api call
    // 1. Dispatch the action
    this.store.dispatch(
      ProfileActions.addCertificationRequest({
        certificationObject: certCopy,
      })
    );

    // 3. Subscribe to loading changes
    this.store
      .select(selectLoading)
      .pipe(skip(1), take(1)) // Skip initial value, take only the next change
      .subscribe((isLoading) => {
        if (!isLoading) {
          // Loading finished, now check for error
          this.store
            .select(selectError)
            .pipe(take(1))
            .subscribe((error) => {
              if (error) {
                // Handle error
                console.log('error occocred in certificate');
                this.showOverlay = false;
                this.triggerNotification(
                  'Error adding Certificate',
                  error || 'Unknown error occurred',
                  'error',
                  2000
                );
              } else {
                // Handle success
                this.triggerNotification(
                  'Certificate Added Successfully',
                  'Congrats',
                  'success',
                  2000
                );

                setTimeout(() => {
                  this.showOverlay = false;
                  this.addCertiChange.emit(false);
                }, 2000);
              }
            });
        }
      });
  }

  // on cancel button
  onCancelAddCerti() {
    this.addCertiChange.emit(false);
  }

  triggerNotification(
    title: string,
    message: string,
    type: 'success' | 'error',
    time = 3000
  ) {
    // Hide it first to reset state (important for same repeated errors)
    this.notification.show = false;

    // Wait a bit and then trigger new one
    setTimeout(() => {
      this.notification = {
        title,
        message,
        type,
        time,
        show: true,
      };
    }, 10); // ⏱️ gives Angular time to detect the transition
  }

  validateCertification(): boolean {
    const errors: string[] = [];

    if (this.certification.name === '')
      errors.push('Please Enter Certificate Name');
    if (this.certification.issueDate === '')
      errors.push('Please Enter Certificate Issue Date');
    if (this.certification.issuer === '')
      errors.push('Please Enter Certificate Issuer');
    if (this.certification.certificationId === '')
      errors.push('Please Enter Certificate Id');
    if (this.certification.issueDate > this.todayDate)
      errors.push('Please Enter Valid Issue Date');

    if (errors.length > 0) {
      this.triggerNotification(
        'Please enter Valid Details',
        errors.join('\n'),
        'error',
        2000
      );
      return false;
    }

    return true;
  }
}
