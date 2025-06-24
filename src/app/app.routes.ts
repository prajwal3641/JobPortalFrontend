import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FindJobsComponent } from './find-jobs/find-jobs.component';
import { FindTalentComponent } from './find-talent/find-talent.component';
import { TalentProfileComponent } from './talent-profile/talent-profile.component';
import { PostJobComponent } from './post-job/post-job.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'find-jobs',
    component: FindJobsComponent,
  },
  {
    path: 'find-talent',
    component: FindTalentComponent,
    children: [],
  },
  {
    path: 'post-job',
    component: PostJobComponent,
  },
  {
    path: 'about',
    component: HomeComponent,
  },
  {
    path: 'talent-profile/:userName',
    component: TalentProfileComponent,
  },
  {
    path: 'jobs/:jobId',
    component: JobDescriptionComponent,
  },
  {
    path: 'apply-job',
    component: ApplyJobComponent,
  },
  {
    path: 'company',
    component: CompanyProfileComponent,
  },
  // {
  //   path: '**',
  //   component:
  // }
];
