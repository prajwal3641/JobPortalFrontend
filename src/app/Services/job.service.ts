import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Profile } from '../state/profile/profile.feature';
import { ApplicationStatus, Job } from '../post-job/post-job.component';
import { Applicant } from '../apply-job/apply-job-application-form/apply-job-application-form.component';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private base_url = 'http://localhost:8080/jobs/';

  constructor(private httpClient: HttpClient) {}

  postJob(job: Job) {
    return this.httpClient.post<Job>(this.base_url + 'post', job).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
  getAllJobs() {
    return this.httpClient.get<Job[]>(this.base_url + 'getAll').pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getJob(id: number) {
    return this.httpClient.get<Job>(this.base_url + `get/${id}`).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  applyJob(jobId: number, applicant: Applicant) {
    return this.httpClient
      .post<{ message: string }>(this.base_url + `apply/${jobId}`, applicant)
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getJobsPostedBy(id: any) {
    return this.httpClient.get<Job[]>(this.base_url + `postedBy/${id}`).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  changeApplicantStatus(
    jobId: number,
    applicantId: number,
    status: ApplicationStatus,
    interviewTime: Date | null = null
  ) {
    return this.httpClient
      .post<{ message: string }>(this.base_url + `changeApplicantStatus`, {
        id: jobId,
        applicantId,
        status,
        interviewTime,
      })
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
