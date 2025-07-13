import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  Experience,
  ProfileActions,
  selectError,
  selectLoading,
  selectProfileData,
} from '../../../state/profile/profile.feature';
import { ProfileInputComponent } from '../../profile-input/profile-input.component';
import fields from '../../../Data/Profile';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../shared/input-field/input-field.component';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../../Services/profile.service';
import { NotificationComponent } from '../../../shared/notification/notification.component';
import { skip, switchMap, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-add-experience-card',
  imports: [
    ProfileInputComponent,
    FormsModule,
    InputFieldComponent,
    NotificationComponent,
  ],
  templateUrl: './add-experience-card.component.html',
  styleUrl: './add-experience-card.component.css',
})
export class AddExperienceCardComponent {
  fields = fields;

  private store = inject(Store);
  private profileService = inject(ProfileService);

  // loading$ = this.store.select(selectLoading);

  showOverlay = false;

  experience: Experience = {
    id: 0,
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    working: false,
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

  startDate!: string;
  endDate!: string;

  now = new Date();
  yearMonth = this.now.toISOString().slice(0, 7); // "2025-06"

  maxDate = this.yearMonth;

  disableEndDate = signal<boolean>(false);

  // for two way binding for closing the add
  @Input() canAdd: boolean = true;
  @Output() canAddChange = new EventEmitter<boolean>();

  makeDisableEndDate(checked: boolean) {
    this.disableEndDate.set(checked);
    if (checked) {
      // Set end date to max date if currently working
      this.endDate = this.maxDate;
    }
  }
  makeCanAddFalse() {
    this.canAddChange.emit(false);
  }

  addExperience() {
    // form validation
    if (this.checkValid()) {
      return;
    }

    const experienceCopy: Experience = { ...this.experience };
    // Format dates
    experienceCopy.startDate = this.startDate + '-01T00:00:00';
    experienceCopy.endDate = this.endDate + '-01T00:00:00';
    experienceCopy.working = this.disableEndDate();

    experienceCopy.id = Number(
      `${Date.now()}${Math.floor(Math.random() * 1000)}`
    );
    // update the state
    this.store.dispatch(
      ProfileActions.addExperienceRequest({ experienceObject: experienceCopy })
    );

    // call to backend
    this.showOverlay = true;

    this.store
      .select(selectLoading)
      .pipe(skip(1), take(1))
      .subscribe({
        next: (loading) => {
          // loading finished , now check for errors
          if (!loading) {
            // now check for errors
            this.store
              .select(selectError)
              .pipe(take(1))
              .subscribe({
                next: (error) => {
                  if (error) {
                    // Handle error
                    this.showOverlay = false;
                    this.triggerNotification(
                      'Error adding Experience',
                      error || 'Unknown error occurred',
                      'error',
                      2000
                    );
                  } else {
                    // Handle success
                    this.triggerNotification(
                      'Experience Added Successfully',
                      'Congrats',
                      'success',
                      2000
                    );

                    setTimeout(() => {
                      this.showOverlay = false;
                      this.canAddChange.emit(false);
                    }, 2000);
                  }
                },
              });
          }
        },
      });
  }

  // to check form validation
  checkValid() {
    if (!this.experience.title) {
      this.triggerNotification('Title is required', '', 'error', 2000);
      return true;
    }

    if (!this.experience.company) {
      this.triggerNotification('Company is required', '', 'error', 2000);
      return true;
    }

    if (!this.experience.location) {
      this.triggerNotification('Location is required', '', 'error', 2000);
      return true;
    }

    if (!this.startDate) {
      this.triggerNotification('Start date is required', '', 'error', 2000);
      return true;
    }

    if (!this.endDate) {
      this.triggerNotification('End date is required', '', 'error', 2000);
      return true;
    }

    if (
      this.startDate &&
      this.endDate &&
      new Date(this.startDate) > new Date(this.endDate)
    ) {
      this.triggerNotification(
        'Start date must be before end date',
        '',
        'error',
        2000
      );
      return true;
    }

    if (new Date(this.endDate) > new Date(this.maxDate)) {
      this.triggerNotification(
        'End date cannot be in the future',
        '',
        'error',
        2000
      );
      return true;
    }

    return false;
  }

  // to trigger the notification
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
}
