import { Component } from '@angular/core';
import { HeaderComponent } from '../layouts/header/header.component';
import { DreamJobComponent } from './dream-job/dream-job.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { JobCategoryComponent } from './job-category/job-category.component';
import { WorkingComponent } from './working/working.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    DreamJobComponent,
    CompanyListComponent,
    JobCategoryComponent,
    WorkingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
