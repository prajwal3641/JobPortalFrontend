import {
  Component,
  EventEmitter,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import fields from '../../../Data/Profile';
import { FormsModule } from '@angular/forms';
import { ProfileInputComponent } from '../../profile-input/profile-input.component';
import { InputFieldComponent } from '../../../shared/input-field/input-field.component';
import { Experience } from '../../../state/profile/profile.feature';
import { NotificationComponent } from '../../../shared/notification/notification.component';

@Component({
  selector: 'app-experience-card-input',
  imports: [
    FormsModule,
    ProfileInputComponent,
    InputFieldComponent,
    NotificationComponent,
  ],
  templateUrl: './experience-card-input.component.html',
  styleUrl: './experience-card-input.component.css',
})
export class ExperienceCardInputComponent {
  fields = fields;

  // 2 way bind for experience
  @Input() experience!: Experience;
  @Output() experienceChange = new EventEmitter();

  startDate!: string;
  endDate!: string;

  // problem is , my expereince is 2 way binded ,upon change, even if i click on cancel , ti it changed .
  experienceTemp!: Experience;

  ngOnInit() {
    this.experienceTemp = { ...this.experience };
    this.startDate = this.experience.startDate.slice(0, 7);
    this.endDate = this.experience.endDate.slice(0, 7);
  }

  now = new Date();
  yearMonth = this.now.toISOString().slice(0, 7); // "2025-06"

  maxDate = this.yearMonth;

  disableEndDate = signal<boolean>(false);

  // for two way binding for closing the edit
  @Input() canEdit: boolean = true;
  @Output() canEditChange = new EventEmitter<boolean>();

  // to make the text Add Experience , instead of Edit Experience
  add = input<boolean>(false);

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
  constructor() {
    // console.log('insdien');
  }

  makeDisableEndDate(checked: boolean) {
    this.disableEndDate.set(checked);
    if (checked) {
      this.endDate = this.yearMonth;
      this.experienceTemp.working = true;
    } else {
      this.experienceTemp.working = false;
      // this.endDate = this.endDate;
    }
  }
  makeCanEditFalse() {
    // this.experienceTemp.description = 'dnakuedbk';
    this.canEditChange.emit(false);
  }

  saveExperience() {
    // date validation
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
      return;
    }

    if (new Date(this.endDate) > new Date(this.maxDate)) {
      this.triggerNotification(
        'End date cannot be in the future',
        '',
        'error',
        2000
      );
      return;
    }
    this.experience = {
      ...this.experience,
      startDate: this.startDate + '-01T00:00:00',
      endDate: this.endDate + '-01T00:00:00',
      company: this.experienceTemp.company,
      description: this.experienceTemp.description,
      location: this.experienceTemp.location,
      title: this.experienceTemp.title,
      working: this.experienceTemp.working,
    };
    this.experienceChange.emit(this.experience);
    this.canEditChange.emit(false);
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
