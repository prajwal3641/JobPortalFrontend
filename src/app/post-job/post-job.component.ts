import { Component } from '@angular/core';
import { DropdownSearchInputComponent } from '../shared/dropdown-search-input/dropdown-search-input.component';
import { fields } from '../Data/PostJob';
import { TagsInputComponent } from '../shared/tags-input/tags-input.component';
import { JobDescriptionInputComponent } from './job-description-input/job-description-input.component';
import { InputFieldComponent } from '../shared/input-field/input-field.component';
import { skills } from '../Data/JobDescData';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { JobService } from '../Services/job.service';
import { NotificationComponent } from '../shared/notification/notification.component';
import { LoadingOverlayComponent } from '../shared/loading-overlay/loading-overlay.component';
import { Applicant } from '../apply-job/apply-job-application-form/apply-job-application-form.component';
import { Store } from '@ngrx/store';
import { selectProfile } from '../state/user/user.feature';

export interface Job {
  id: number;
  jobTitle: string;
  company: string;
  applicants: Applicant[];
  about: string;
  experience: string;
  jobType: string;
  location: string;
  packageOffered: number;
  postTime: Date;
  description: string;
  skillsRequired: string[];
  status: JobStatus;
  postedBy: number; // who posted the jobs
  [key: string]: any;
}
export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  INTERVIEWING = 'INTERVIEWING',
  OFFERED = 'OFFERED',
  REJECTED = 'REJECTED',
}

export enum JobStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  DRAFT = 'DRAFT',
}

@Component({
  selector: 'app-post-job',
  imports: [
    DropdownSearchInputComponent,
    TagsInputComponent,
    JobDescriptionInputComponent,
    InputFieldComponent,
    NgIf,
    NotificationComponent,
    LoadingOverlayComponent,
  ],
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css',
})
export class PostJobComponent {
  constructor(
    private router: Router,
    private store: Store,
    private jobService: JobService
  ) {}
  dropDownSearchData = fields;
  showOverlay = false;

  submitted = false;

  form: Job = {
    id: 0,
    jobTitle: '',
    company: '',
    applicants: [],
    about: '',
    experience: '',
    jobType: '',
    location: '',
    packageOffered: 0,
    postTime: new Date(),
    description: '',
    skillsRequired: [],
    status: JobStatus.OPEN,
    postedBy: 0, // Assuming you will set this to the current user's ID
  };

  touched: { [key: string]: boolean } = {
    jobTitle: false,
    company: false,
    about: false,
    experience: false,
    jobType: false,
    location: false,
    packageOffered: false,
    description: false,
    skillsRequired: false,
  };

  error: { [key: string]: string } = {
    jobTitle: '',
    company: '',
    about: '',
    experience: '',
    jobType: '',
    location: '',
    packageOffered: '',
    description: '',
    skillsRequired: '',
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

  // on value changes , means the inpuit has touched
  markAsTouched(field: string) {
    this.touched[field] = true;
    this.validateField(field);
  }

  validateField(field: string) {
    // Reset error message
    this.error[field] = '';

    switch (field) {
      case 'jobTitle':
        console.log('Validating job title:', this.form.jobTitle);
        if (!this.form.jobTitle) {
          this.error[field] = 'Job title is required.';
        }
        break;
      case 'company':
        if (!this.form.company) {
          this.error[field] = 'Company name is required.';
        }
        break;
      case 'about':
        if (!this.form.about) {
          this.error[field] = 'About is required';
        } else if (this.form.about.length < 50) {
          this.error[field] = 'About should be at least 50 characters';
        }
        break;
      case 'experience':
        if (!this.form.experience) {
          this.error[field] = 'Experience is required.';
        }
        break;
      case 'jobType':
        if (!this.form.jobType) {
          this.error[field] = 'Job type is required.';
        }
        break;
      case 'location':
        if (!this.form.location) {
          this.error[field] = 'Location is required.';
        }
        break;
      case 'packageOffered':
        if (!this.form.packageOffered) {
          this.error[field] = 'Package offered is required.';
        } else if (this.form.packageOffered <= 0) {
          this.error[field] = 'Package offered must be a positive number.';
        } else if (
          Number(this.form.packageOffered) > 30 ||
          Number(this.form.packageOffered) < 2
        ) {
          this.error[field] = 'Package offered must be between 2 and 30 LPA.';
        }
        break;
      // case 'description':
      //   if (!this.form.description) {
      //     this.error[field] = 'Description is required.';
      //   } else if (this.form.description.length < 100) {
      //     this.error[field] = 'Description should be at least 100 characters.';
      //   }
      //   break;
      case 'skillsRequired':
        if (this.form.skillsRequired.length <= 1) {
          this.error[field] = 'At least two skill are required.';
        }
        break;
      default:
        this.error[field] = '';
        break;
    }
  }

  // Helper to check if field should show error
  shouldShowError(field: string): boolean {
    return (this.touched[field] || this.submitted) && !!this.error[field];
  }
  validateAllFields() {
    Object.keys(this.touched).forEach((field) => {
      this.touched[field] = true;
      this.validateField(field);
    });
  }
  // Check if form has any errors
  hasErrors(): boolean {
    return Object.values(this.error).some((errorMsg) => errorMsg !== '');
  }

  submitJob(draft: boolean = false) {
    if (draft) {
      console.log('Saving as draft:', this.form);
      this.form.status = JobStatus.DRAFT;
      this.form.postedBy = this.store.selectSignal(selectProfile)()?.id || 0; // Set postedBy to current user's ID

      this.saveJob();
    } else {
      // lets say kisi ne touch nhi kiya hai,and direct submit kiya hai
      // toh errors toh '' empty rahege
      this.validateAllFields();
      // validate krke bhi koi erros nhi hai to save karo
      if (this.hasErrors()) {
        // if error is present, scroll to top and show error
        // Object.keys(this.error).forEach((key) => {
        //   console.warn(`${key} error: ${this.error[key]}`);
        // });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.warn('Form is incomplete or has errors');
        return;
      }
      // console.log('Form Submitted:', this.form);
      // Here you would make API call to submit the job
      this.form.status = JobStatus.OPEN;
      this.submitted = true;
      this.form.postedBy = this.store.selectSignal(selectProfile)()?.id || 0; // Set postedBy to current user's ID

      this.saveJob();
    }
  }

  saveJob() {
    this.showOverlay = true;
    this.form.postTime = new Date();

    // make a call to backend

    this.jobService.postJob(this.form).subscribe({
      next: (response) => {
        this.resetForm(); // Reset form after successful submission

        console.log('Job posted successfully:', response);
        this.triggerNotification(
          `Job ${this.submitted ? 'Submitted' : 'Drafted'} Successfully`,
          'Your job has been posted successfully.',
          'success',
          3000
        );
        setTimeout(() => {
          this.showOverlay = false;
          this.router.navigate(['/posted-job', response.id]);
        }, 3000);
        // this.router.navigate(['/']);
      },
      error: (err) => {
        this.showOverlay = false;
        this.submitted = false; // Reset submitted state on error
        console.error('Error posting job:', err);
        const message =
          err.status === 0
            ? 'Backend server is unreachable.'
            : err.error?.errorMessage || 'An error occurreds.';
        this.triggerNotification('Error Posting Job', message, 'error', 3000);
        // Handle error appropriately, e.g., show a notification
      },
    });
  }

  resetForm() {
    this.form = {
      id: 0,
      jobTitle: '',
      company: '',
      applicants: [],
      about: '',
      experience: '',
      jobType: '',
      location: '',
      packageOffered: 0,
      postTime: new Date(),
      description: '',
      skillsRequired: [],
      status: JobStatus.DRAFT,
      postedBy: 0, // Reset postedBy to 0 or current user's ID
    };
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
