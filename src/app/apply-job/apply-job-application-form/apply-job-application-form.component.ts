import { Component, Input, signal } from '@angular/core';
import { LoadingOverlayComponent } from '../../shared/loading-overlay/loading-overlay.component';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { NgIf } from '@angular/common';
import { JobService } from '../../Services/job.service';
import {
  catchError,
  Observable,
  of,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProfile } from '../../state/user/user.feature';
import { Router } from '@angular/router';
import { ApplicationStatus } from '../../post-job/post-job.component';

export interface Applicant {
  applicantId: any;
  name: string;
  email: string;
  phone: string;
  website: string;
  resume: string | null;
  coverLetter: string;
  status: ApplicationStatus;
}

@Component({
  selector: 'app-apply-job-application-form',
  imports: [
    LoadingOverlayComponent,
    InputFieldComponent,
    NotificationComponent,
    NgIf,
  ],
  templateUrl: './apply-job-application-form.component.html',
  styleUrl: './apply-job-application-form.component.css',
})
export class ApplyJobApplicationFormComponent {
  preview = signal<boolean>(false);
  submit = signal<boolean>(false);
  time = 5;
  showOverlay = signal<boolean>(false);

  @Input() jobId!: number;

  constructor(
    private jobService: JobService,
    private store: Store,
    private router: Router
  ) {}

  //  form !!!
  form = {
    name: '',
    email: '',
    phone: '',
    website: '',
    resume: null as File | null,
    coverLetter: '',
  };

  formError: { [key: string]: string } = {
    name: '',
    email: '',
    phone: '',
    website: '',
    resume: '',
    coverLetter: '',
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

  hasError() {
    return Object.values(this.formError).some((err) => err !== '');
  }

  validateOnChange(field: string) {
    // this.formError[field] = '';

    switch (field) {
      case 'name':
        if (!this.form.name.trim()) {
          this.formError[field] = 'Name is Required';
        } else if (this.form.name.trim().length <= 3) {
          this.formError[field] = 'Atleast 4 characters are required';
        } else {
          this.formError[field] = '';
        }
        break;
      case 'email':
        if (!this.form.email) {
          this.formError[field] = 'Email is Required';
        } else if (
          this.form.email &&
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            this.form.email
          )
        ) {
          this.formError[field] = 'Email is not valid';
        } else {
          this.formError[field] = '';
        }
        break;
      case 'phone':
        if (!this.form.phone) {
          this.formError[field] = 'Phone is Required';
        } else if (this.form.phone && this.form.phone.length < 10) {
          this.formError[field] = 'Phone number should be at least 10 digits';
        } else {
          this.formError[field] = '';
        }
        break;
      case 'website':
        if (!this.form.website) {
          this.formError[field] = 'Website is Required';
        } else if (this.form.website && !this.form.website.startsWith('http')) {
          this.formError[field] = 'Website should start with http or https';
        } else {
          this.formError[field] = '';
        }
        break;
      case 'resume':
        if (!this.form.resume) {
          this.formError[field] = 'Resume is Required';
        } else if (this.form.resume && this.form.resume.size > 2 * 1024 * 1024)
          this.formError[field] = 'Resume size should be less than 2MB';
        else {
          this.formError[field] = '';
        }
        break;

      default:
        this.formError[field] = '';
    }
  }

  togglePreview() {
    // check if all the feilds are touched or not
    Object.keys(this.form).forEach((key) => {
      if (key !== 'coverLetter') {
        this.validateOnChange(key);
      }
    });

    // check for error
    if (this.hasError()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    console.log(this.form);
    this.preview.set(!this.preview());
    // handling the windows scroll up whenever toggle for edit or preview
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleSubmit() {
    // submit logic
    this.submit.set(true);
    this.showOverlay.set(true);

    // convert resume to base64
    this.convertToBase64(this.form.resume as File)
      .pipe(
        catchError((err) => {
          console.error('Error converting resume to base64: ', err);
          this.showOverlay.set(false);
          return of(null); // Or return an empty observable: EMPTY;
        }),
        withLatestFrom(this.store.select(selectProfile).pipe(take(1))),
        switchMap(([base64Resume, userProfile]) => {
          const newApplicant = {
            ...this.form,
            applicantId: userProfile?.id, // Use userProfile.id if available, otherwise default to 0
            resume: base64Resume,
            status: ApplicationStatus.APPLIED,
          };
          console.log('Submitting application with:', newApplicant);
          return this.jobService.applyJob(this.jobId, newApplicant);
        })
      )
      .subscribe({
        next: (res) => {
          // console.log('Application submitted successfully: ', res);

          this.triggerNotification(
            'Success!',
            res.message || 'Application submitted successfully',
            'success',
            3000
          );

          setTimeout(() => {
            this.showOverlay.set(false);
            this.router.navigate(['/job-history']);
          }, 3000);

          // Navigate to success page or show success message
        },
        error: (err) => {
          // console.error('Error submitting application: ', err);
          this.showOverlay.set(false);
          this.triggerNotification(
            'Error!',
            err.error?.errorMessage || 'Failed to submit application',
            'error',
            3000
          );
        },
      });

    // const interval = setInterval(() => {
    //   this.time--;
    // }, 1000);

    // setTimeout(() => {
    //   this.submit.set(false);
    //   clearInterval(interval);
    //   this.showOverlay.set(false);

    //   // navigate to other page
    // }, 5000);
  }

  convertToBase64(file: File): Observable<string> {
    return new Observable<string>((observer) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        observer.next((reader.result as string).split(',')[1]); // Return only the base64 part
        observer.complete();
      };
      reader.onerror = (error) => {
        observer.error(error);
      };
    });
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
}
