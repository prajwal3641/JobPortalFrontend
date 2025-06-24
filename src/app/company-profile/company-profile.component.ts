import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { JobCardComponent } from '../find-jobs/job-card/job-card.component';
import { AboutComponent } from './about/about.component';

import { CompanyJobsComponent } from './company-jobs/company-jobs.component';
import { CompanyEmployeesComponent } from './company-employees/company-employees.component';
import { RecommendedCompaniesComponent } from './recommended-companies/recommended-companies.component';

@Component({
  selector: 'app-company-profile',
  imports: [TabsComponent, RecommendedCompaniesComponent],
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.css',
})
export class CompanyProfileComponent {
  tabTitles = ['about', 'jobs', 'employees'];
  tabComponents = [
    AboutComponent,
    CompanyJobsComponent,
    CompanyEmployeesComponent,
  ];
  constructor(public location: Location) {}
  goBackWithFallback(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      // this.router.navigate(['/fallback']);
      console.log('No previous page');
    }
  }
}
