import {
  Component,
  Input,
  input,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { card, desc, skills } from '../../Data/JobDescData';
import DOMPurify from 'dompurify';
import { RouterLink } from '@angular/router';
import { Job } from '../../post-job/post-job.component';
import { getTimeAgo } from '../../utils/job.timer';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs';
import { selectProfile } from '../../state/user/user.feature';
import { NgClass } from '@angular/common';
import {
  ProfileActions,
  selectProfileData,
} from '../../state/profile/profile.feature';
@Component({
  selector: 'app-job-description-overview',
  imports: [RouterLink, NgClass],
  templateUrl: './job-description-overview.component.html',
  styleUrl: './job-description-overview.component.css',
})
export class JobDescriptionOverviewComponent {
  cards = card;
  skills = skills;
  desc = desc;
  safeHtml = '';
  isApplied = false;

  @Input({ required: true }) job!: Job;
  // jobId = input.required<string>();

  constructor(private store: Store) {}

  // for posted jobs page , taking this input
  edit = input<boolean>(false);

  //  for bookmark icon functionlity
  isBookmarked = false;

  ngOnInit() {
    console.log('Job Description Overview Component Initialized');
    this.safeHtml = DOMPurify.sanitize(desc);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['job']?.currentValue) {
      console.log('Job:', this.job);
      this.store
        .select(selectProfile)
        .pipe(take(1))
        .subscribe({
          next: (user) => {
            if (user) {
              // console.log('User profile:', user);
              this.isApplied = this.job.applicants?.some(
                (applicant) => applicant.applicantId === user.id
              );
            }
          },
        });

      // for bookmark functionality
      this.store.select(selectProfileData).subscribe({
        next: (profile) => {
          if (profile) {
            this.isBookmarked =
              profile.savedJobs?.includes(this.job.id) || false;
          }
        },
        error: (error) => {
          console.error('Error fetching profile data:', error);
        },
      });
    }
  }

  toggleBookmark() {
    this.store
      .select(selectProfileData)
      .pipe(take(1))
      .subscribe({
        next: (profile) => {
          if (!profile) return;

          const jobId = this.job.id;
          const currentBookmarks = profile.savedJobs || [];

          const isBookmarked = currentBookmarks.includes(jobId);
          let updatedBookmarks;

          if (isBookmarked) {
            // 🔴 Unsave (remove job ID)
            updatedBookmarks = currentBookmarks.filter((id) => id !== jobId);
          } else {
            // ✅ Save (add job ID), ensuring uniqueness
            updatedBookmarks = Array.from(
              new Set([...currentBookmarks, jobId])
            );
          }

          const updatedProfile = {
            ...profile,
            savedJobs: updatedBookmarks, // ✅ correct field name
          };

          console.log('Current:', currentBookmarks);
          console.log('Job ID:', jobId);
          console.log('Is Bookmarked:', isBookmarked);

          this.store.dispatch(
            ProfileActions.updateProfileRequest({
              updatedProfile,
            })
          );

          this.isBookmarked = !isBookmarked;
        },
        error: (error) => {
          console.error('Error toggling bookmark:', error);
        },
      });
  }

  get getTime() {
    const job = this.job;
    if (!job || !job.postTime) return '';
    return getTimeAgo(job.postTime.toString());
  }
}
