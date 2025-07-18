import {
  Component,
  computed,
  effect,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
  signal,
} from '@angular/core';
import { Job } from '../../post-job/post-job.component';
import { Store } from '@ngrx/store';
import {
  ProfileActions,
  selectError,
  selectProfileData,
} from '../../state/profile/profile.feature';
import { take } from 'rxjs';
import { getTimeAgo } from '../../utils/job.timer';
import { NgIf } from '@angular/common';
import { selectProfile } from '../../state/user/user.feature';

@Component({
  selector: 'app-job-history-job-card',
  imports: [NgIf],
  templateUrl: './job-history-job-card.component.html',
  styleUrl: './job-history-job-card.component.css',
  standalone: true,
})
export class JobHistoryJobCardComponent {
  job = input.required<Job>();
  applied = input<boolean>(false);
  saved = input<boolean>(false);
  offered = input<boolean>(false);
  interviewing = input<boolean>(false);

  @Output() unsavedJob = new EventEmitter<number>(); // emit job ID

  private store = inject(Store);
  private profileSignal = this.store.selectSignal(selectProfileData);
  private userSignal = this.store.selectSignal(selectProfile);

  readonly isBookmarked = computed(() => {
    const jobId = this.job().id;
    const profile = this.profileSignal();
    return profile?.savedJobs?.includes(jobId) ?? false;
  });

  readonly isApplied = computed(() => {
    const user = this.userSignal();
    return (
      this.job().applicants.filter((applicant) => {
        return applicant.applicantId === user?.id;
      }).length > 0
    );
  });

  toggleBookmark() {
    this.store
      .select(selectProfileData)
      .pipe(take(1))
      .subscribe((profile) => {
        if (!profile) return;

        const jobId = this.job().id;
        const currentBookmarks = profile.savedJobs || [];
        const isBookmarked = currentBookmarks.includes(jobId);

        const updatedBookmarks = isBookmarked
          ? currentBookmarks.filter((id) => id !== jobId)
          : [...new Set([...currentBookmarks, jobId])];

        const updatedProfile = {
          ...profile,
          savedJobs: updatedBookmarks,
        };

        this.store.dispatch(
          ProfileActions.updateProfileRequest({ updatedProfile })
        );
      });
  }

  get getTime() {
    const job = this.job?.();
    if (!job || !job.postTime) return '';
    return getTimeAgo(job.postTime.toString());
  }
}
