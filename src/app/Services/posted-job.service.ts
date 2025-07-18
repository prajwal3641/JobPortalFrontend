import { Injectable, computed, signal } from '@angular/core';
import { JobService } from './job.service'; // Your backend API service
import { toSignal } from '@angular/core/rxjs-interop';
import { effect } from '@angular/core';
import { Job } from '../post-job/post-job.component';
import { Applicant } from '../apply-job/apply-job-application-form/apply-job-application-form.component';

@Injectable({
  providedIn: 'root',
})
export class PostedJobService {
  private jobsSignal = signal<Job[]>([]);
  private activeJobIdSignal = signal<number>(1);

  readonly jobs = computed(() => this.jobsSignal());
  readonly activeJobId = computed(() => this.activeJobIdSignal());

  readonly activeJob = computed(() =>
    this.jobs().find((job) => job.id === this.activeJobId())
  );

  readonly activeJobApplicants = computed(
    () => this.activeJob()?.applicants || []
  );

  constructor(private jobService: JobService) {
    this.fetchJobs();

    // Example effect if needed (auto-log updates for debug)
    effect(() => {
      console.log('Active job updated:', this.activeJob());
    });
  }

  fetchJobs() {
    console.log('Fetching jobs...');
    this.jobService.getAllJobs().subscribe({
      next: (fetchedJobs) => {
        this.activeJobIdSignal.set(fetchedJobs[0]?.id); // Set first job as active if available
        this.jobsSignal.set(fetchedJobs);
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
    console.log('Fetching applicants for job ID:', id);
    if (!job) {
      console.warn('Job not found for ID:', id);
      return [];
    }
    return job?.applicants || [];
  }
}
