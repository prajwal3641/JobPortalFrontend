import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FindJobsComponent } from './find-jobs/find-jobs.component';

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
    component: HomeComponent,
  },
  {
    path: 'upload-job',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: HomeComponent,
  },
];
