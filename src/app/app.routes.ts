import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FindJobsComponent } from './find-jobs/find-jobs.component';
import { FindTalentComponent } from './find-talent/find-talent.component';
import { TalentProfileComponent } from './talent-profile/talent-profile.component';
import { PostJobComponent } from './post-job/post-job.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { PostedJobComponent } from './posted-job/posted-job.component';
import { JobHistoryPageComponent } from './job-history-page/job-history-page.component';
import { SignupLoginPageComponent } from './signup-login-page/signup-login-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { redirectIfLoggedInGuard } from './signup-login-page/login.guard';

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
    path: 'posted-job',
    component: PostedJobComponent,
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
  {
    path: 'job-history',
    component: JobHistoryPageComponent,
  },
  {
    path: 'sign-up',
    component: SignupLoginPageComponent,
  },
  {
    path: 'login',
    component: SignupLoginPageComponent,
    canActivate: [redirectIfLoggedInGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

// for lazy loading
// import { Routes } from '@angular/router';
// import { redirectIfLoggedInGuard } from './signup-login-page/login.guard';

// export const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () =>
//       import('./home/home.component').then((m) => m.HomeComponent),
//   },
//   {
//     path: 'find-jobs',
//     loadComponent: () =>
//       import('./find-jobs/find-jobs.component').then((m) => m.FindJobsComponent),
//   },
//   {
//     path: 'find-talent',
//     loadComponent: () =>
//       import('./find-talent/find-talent.component').then((m) => m.FindTalentComponent),
//     children: [], // no change
//   },
//   {
//     path: 'post-job',
//     loadComponent: () =>
//       import('./post-job/post-job.component').then((m) => m.PostJobComponent),
//   },
//   {
//     path: 'posted-job',
//     loadComponent: () =>
//       import('./posted-job/posted-job.component').then((m) => m.PostedJobComponent),
//   },
//   {
//     path: 'talent-profile/:userName',
//     loadComponent: () =>
//       import('./talent-profile/talent-profile.component').then((m) => m.TalentProfileComponent),
//   },
//   {
//     path: 'jobs/:jobId',
//     loadComponent: () =>
//       import('./job-description/job-description.component').then((m) => m.JobDescriptionComponent),
//   },
//   {
//     path: 'apply-job',
//     loadComponent: () =>
//       import('./apply-job/apply-job.component').then((m) => m.ApplyJobComponent),
//   },
//   {
//     path: 'company',
//     loadComponent: () =>
//       import('./company-profile/company-profile.component').then((m) => m.CompanyProfileComponent),
//   },
//   {
//     path: 'job-history',
//     loadComponent: () =>
//       import('./job-history-page/job-history-page.component').then((m) => m.JobHistoryPageComponent),
//   },
//   {
//     path: 'sign-up',
//     loadComponent: () =>
//       import('./signup-login-page/signup-login-page.component').then((m) => m.SignupLoginPageComponent),
//   },
//   {
//     path: 'login',
//     canActivate: [redirectIfLoggedInGuard],
//     loadComponent: () =>
//       import('./signup-login-page/signup-login-page.component').then((m) => m.SignupLoginPageComponent),
//   },
//   {
//     path: 'profile',
//     loadComponent: () =>
//       import('./profile-page/profile-page.component').then((m) => m.ProfilePageComponent),
//   },
//   {
//     path: '**',
//     loadComponent: () =>
//       import('./page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent),
//   },
// ];
