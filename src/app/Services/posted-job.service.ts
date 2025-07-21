import { Injectable, computed, signal } from '@angular/core';
import { JobService } from './job.service'; // Your backend API service
import { toSignal } from '@angular/core/rxjs-interop';
import { effect } from '@angular/core';
import { Job } from '../post-job/post-job.component';
import { Applicant } from '../apply-job/apply-job-application-form/apply-job-application-form.component';
import { Store } from '@ngrx/store';
import { selectProfile } from '../state/user/user.feature';

@Injectable({
  providedIn: 'root',
})
export class PostedJobService {
  private jobsSignal = signal<Job[]>([]);
  private activeJobIdSignal = signal<number>(0);

  readonly jobs = computed(() => this.jobsSignal());
  readonly activeJobId = computed(() => this.activeJobIdSignal());

  readonly activeJob = computed(() =>
    this.jobs().find((job) => job.id === this.activeJobId())
  );

  readonly activeJobApplicants = computed(
    () => this.activeJob()?.applicants || []
  );

  private activeTab = signal<number>(0); // Default to Active Jobs tab
  setActiveTab(tabIndex: number) {
    this.activeTab.set(tabIndex);
  }
  readonly activeTabIndex = computed(() => this.activeTab());
  constructor(private jobService: JobService, private store: Store) {
    this.fetchJobs();

    // Example effect if needed (auto-log updates for debug)
    effect(() => {
      // console.log('Active job updated:', this.activeJob());
    });
  }

  fetchJobs() {
    console.log('Fetching jobs...');
    this.jobService
      .getJobsPostedBy(this.store.selectSignal(selectProfile)()?.id)
      .subscribe({
        next: (fetchedJobs) => {
          this.activeJobIdSignal.set(fetchedJobs[0]?.id); // Set first job as active if available
          this.jobsSignal.set(fetchedJobs.reverse());
        },
        error: (err) => {
          console.error('Error fetching jobs:', err);
          this.jobsSignal.set([]); // fallback to empty list
        },
      });
  }

  setActiveJobId(id: number) {
    this.activeJobIdSignal.set(id);
  }

  getJobById(id: number): Job | undefined {
    return this.jobsSignal().find((job) => job.id === id);
  }

  getAllApplicantsFromJob(id: number): Applicant[] {
    const job = this.getJobById(id);
    if (!job) {
      console.warn('Job not found for ID:', id);
      return [];
    }
    return job?.applicants || [];
  }
}
