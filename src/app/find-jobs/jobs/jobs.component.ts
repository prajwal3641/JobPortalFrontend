import { Component } from '@angular/core';
import { SortComboboxComponent } from '../../shared/sort-combobox/sort-combobox.component';
import { JobCardComponent } from '../job-card/job-card.component';
import { jobList } from '../../Data/JobsData';

@Component({
  selector: 'app-jobs',
  imports: [SortComboboxComponent, JobCardComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent {
  jobsData = jobList;
}
