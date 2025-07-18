import { Component, Input, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Job } from '../../post-job/post-job.component';
import { DatePipe } from '@angular/common';
import { getTimeAgo } from '../../utils/job.timer';
import { Store } from '@ngrx/store';
import {
  ProfileActions,
  selectProfileData,
} from '../../state/profile/profile.feature';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-job-card',
  imports: [RouterLink],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  job = input.required<Job>();

  constructor(private store: Store) {}

  ngOnInit() {
    // console.log('Job Card Component Initialized');
    // console.log('Job:', this.job());

    // why not take(1)
    // bcz we want to keep the bookmark state reactive
    this.store.select(selectProfileData).subscribe((profile) => {
      // console.log('Profile Data:', profile);
      if (profile) {
        this.isBookmarked = profile.savedJobs?.includes(this.job().id) || false;
      }
    });
  }

  //  for bookmark icon functionlity
  isBookmarked = false;

  toggleBookmark() {
    this.store
      .select(selectProfileData)
      .pipe(take(1))
      .subscribe({
        next: (profile) => {
          if (!profile) return;

          const jobId = this.job().id;
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
    const job = this.job?.();
    if (!job || !job.postTime) return '';
    return getTimeAgo(job.postTime.toString());
  }
}
