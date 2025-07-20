import { Component, input, SimpleChange, SimpleChanges } from '@angular/core';
import { Talent } from './talent.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import {
  Profile,
  selectProfileData,
} from '../../state/profile/profile.feature';
import { Applicant } from '../../apply-job/apply-job-application-form/apply-job-application-form.component';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../Services/profile.service';
import { PostedJobService } from '../../Services/posted-job.service';
import { JobService } from '../../Services/job.service';
import { ApplicationStatus } from '../../post-job/post-job.component';
import { NotificationComponent } from '../../shared/notification/notification.component';
import { LoadingOverlayComponent } from '../../shared/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-talent-card',
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    LoadingOverlayComponent,
    NotificationComponent,
    DatePipe,
  ],
  templateUrl: './talent-card.component.html',
  styleUrl: './talent-card.component.css',
})
export class TalentCardComponent {
  applicant = input.required<Applicant>();
  profile!: Profile;

  id!: number;

  // for posted-jobs section
  posted = input<boolean>(false);
  invited = input<boolean>(false);
  offered = input<boolean>(false);
  rejected = input<boolean>(false);

  constructor(
    private profileService: ProfileService,
    private postedJobService: PostedJobService,
    private jobService: JobService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Fetch the job ID from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id')) || 0;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    // Fetch profile data
    if (changes['applicant']) {
      this.profileService.getProfile(this.applicant().applicantId).subscribe({
        next: (profileData) => {
          this.profile = profileData;
          // console.log('Profile data fetched:', this.profile);
        },
        error: (err) => {
          console.error('Error fetching profile:', err);
        },
      });
    }
  }

  // for save
  isLiked = false;

  toggleHeart() {
    this.isLiked = !this.isLiked;
  }

  // for schedule modal
  showScheduleModal = false;

  // for application
  showApplicationModal = false;

  interviewDate: string = '';
  interviewTime: string = '';

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  showOverlay = false;

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

  scheduleInterview() {
    // console.log('Scheduled Date:', this.interviewDate);
    // console.log('Scheduled Time:', this.interviewTime);
    // console.log('Scheduling interview for:', this.applicant().name);
    this.changeApplicantStatus(
      'INTERVIEWING',
      this.interviewTime,
      this.interviewDate
    );

    // console.log(new Date(`${this.interviewDate}T${this.interviewTime}`));
    this.showScheduleModal = false;
  }

  changeApplicantStatus(
    status: string,
    interviewTime: string = '',
    interviewDate: string = ''
  ) {
    this.showOverlay = true;
    // console.log('Changing applicant status to:', status);
    this.jobService
      .changeApplicantStatus(
        this.id,
        this.applicant().applicantId,
        ApplicationStatus[status as keyof typeof ApplicationStatus],
        new Date(`${this.interviewDate}T${this.interviewTime}`)
      )
      .subscribe({
        next: (res) => {
          console.log('Applicant status changed successfully');
          this.triggerNotification(
            `${res.message}`,
            `Applicant status of ${this.applicant().name} changed to ${status}`,
            'success',
            2000
          );
          setTimeout(() => {
            this.showOverlay = false;
            this.postedJobService.fetchJobs();
          }, 2000); // Refresh jobs after scheduling
        },
        error: (err) => {
          console.error('Error changing applicant status:', err);
          // Handle error (e.g., show notification)
          this.triggerNotification(
            'Error',
            err.error.errorMessage || 'Failed to change applicant status',
            'error',
            2000
          );
        },
      });
  }

  showResume(base64: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl); // Opens in new tab
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
