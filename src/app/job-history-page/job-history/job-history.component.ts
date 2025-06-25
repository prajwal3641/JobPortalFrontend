import { Component } from '@angular/core';
import { TabsComponent } from '../../company-profile/tabs/tabs.component';
import { JobHistoryContainerComponent } from '../job-history-container/job-history-container.component';
import { jobList } from '../../Data/JobsData';

@Component({
  selector: 'app-job-history',
  imports: [TabsComponent],
  templateUrl: './job-history.component.html',
  styleUrl: './job-history.component.css',
})
export class JobHistoryComponent {
  tabComponents = [
    JobHistoryContainerComponent,
    JobHistoryContainerComponent,
    JobHistoryContainerComponent,
    JobHistoryContainerComponent,
  ];
  tabInputs = {
    Applied: { jobs: jobList, applied: true },
    Saved: { jobs: jobList, saved: true },
    Offered: { jobs: jobList, offered: true },
    Interviewing: { jobs: jobList, interviewing: true },
  };
}
